/**
 * @fileoverview The mongoose transaction module.
 * A factory to use mongoose transaction.
 *
 * Usage:
 *   var Transaction = require('common/common-mongoose-transaction');
 *   var transaction = new Transaction();
 *	 transaction.insert(Account, account);
 *
 * @module common/common-mongoose-transaction
 */

var TransactionTypes = require('./common-constants').TransactionTypes;
var CommonError = require('./common-error');

function Transaction (mongoose) {

	var transacts = [];
	var updateOrRemoveObjects = [];
	
	/**
	 * The transaction insert function.
   * @param {Object} Model - Model object
   * @param {Object} data - data object
   */
	this.insert = function(Model, data){
		if(!Model)
			throw new Error(CommonError.Transaction());
		transacts.push(constructInsertTask({ Model: Model, data:data, type: TransactionTypes.INSERT }));
	};

	/**
	 * The transaction update function.
   * @param {Object} Model - Model object
   * @param {string} objectId - objectId string
   * @param {Object} data - data object
   */
	this.update = function(Model, objectId, data){
		if(!Model)
			throw new Error(CommonError.Transaction());
		updateOrRemoveObjects.push({objectId: objectId, data:data, Model:Model, type: TransactionTypes.UPDATE});
	};

	/**
	 * The transaction remove function.
   * @param {Object} Model - Model object
   * @param {string} objectId - objectId string
   */
	this.remove = function(Model, objectId){
		if(!Model)
			throw new Error(CommonError.Transaction());
		updateOrRemoveObjects.push({objectId: objectId, Model:Model, type: TransactionTypes.REMOVE});
	};


	this.run = function(callback){
		var updateOrRemoveDeferredArray = [];
		updateOrRemoveObjects.forEach(function(docData){
			updateOrRemoveDeferredArray.push(getTask(docData));
		});

		Promise.all(updateOrRemoveDeferredArray).then(function(tasks){
			if(tasks && tasks.length > 0)
				transacts = transacts.concat(tasks);

	  		var transactsDeffered = [];
	  		transacts.forEach(function(transact){
	  			transactsDeffered.push(transact.call());
	  		});
	  		Promise.all(transactsDeffered).then(function(results){
	  			var errs = [], successDocData = [], docs = [];
	  			results.forEach(function(result){
	  				if (!result)
	  					return;
	  				if (result[0]) errs.push(result[0]);
	  				if (result[1]) successDocData.push(result[1]);
	  				if (result[2]) docs.push(result[2]);
	  			});
	  			if(errs.length !== 0){
	  				var rollbacksDeffered = [];
	  				if (successDocData.length !== 0){
				  		successDocData.forEach(function(docData){
				  			rollbacksDeffered.push(rollback(docData));
				  		});
				  		Promise.all(rollbacksDeffered).then(function(docs){
				  			callback(docs);
				  		});
				  	}
	  			} else {
	  				callback(null, docs);
	  			}
	  		});
		}, function(err){
			callback(err);
		});
	};

  /**
	 * The update/remove push function.
   * @param {Object} docData - docData object
   */
	function getTask (docData) {
		return new Promise(function(resolve, reject){
			docData.Model.findById(docData.objectId, function(err, oldDoc){
				if(err)
					reject(err);
				else{
					var task;
					docData.oldDoc = oldDoc;
					if (docData.type === TransactionTypes.UPDATE) {
						task = constructUpdateTask(docData);
					} else if (docData.type === TransactionTypes.REMOVE) {
						task = constructRemoveTask(docData);
					}	
					resolve(task);
				}
			});
		});
	}

	/**
	 * The rollback function.
   * @param {Object} docData - docData object
   */
	function rollback (docData) {
		return new Promise(function(resolve, reject){
			if (!docData || !docData.doc && !docData.oldDoc) { resolve(); }
			else {
				if(docData.type === TransactionTypes.INSERT)
					docData.doc.remove(function (err, doc) {
						if(err)
							reject(err);
						else
							resolve();
					});
				else if (docData.type === TransactionTypes.UPDATE) {
					for (var key in docData.oldDoc) {
						docData.doc[key] = docData.oldDoc[key];
					}
					docData.doc.save(function (err, doc){
						if(err)
							reject(err);
						else
							resolve();
					});
				}
				else if (docData.type === TransactionTypes.REMOVE){
					var oldDocData = JSON.parse(JSON.stringify(docData.oldDoc));
					var oldDoc = new docData.Model(oldDocData);
					oldDoc.save(function (err, doc){
						if(err)
							reject(err);
						else
							resolve();
					});
				}
			}
		});
	}

  /**
	 * The update function.
   * @param {Object} docData - docData object
   */
	function constructUpdateTask (docData) {
		return function () {
			return new Promise(function(resolve, reject){
				var oldDocData = JSON.parse(JSON.stringify(docData.oldDoc));
				docData.doc = docData.oldDoc;
				for (var key in docData.data) {
					docData.doc[key] = docData.data[key];
				}
				docData.doc.save(function(err, doc){
					if(err)
						resolve([err, null, null]);
					else {
						docData.oldDoc = oldDocData;
						resolve([null, docData, doc]);
					}
				});
			});
		};
	}

	/**
	 * The remove function.
   * @param {Object} docData - docData object
   */
	function constructRemoveTask (docData) {
		return function () {
			return new Promise(function(resolve, reject){
				docData.oldDoc.remove(function(err, doc){
					if(err){
						resolve([err, null, null]);
					}
					else {
						resolve([null, docData, doc]);
					}
				});
			});
		};
	}

	/**
	 * The insert function.
   * @param {Object} docData - docData object
   */
	function constructInsertTask (docData) {
		return function () {
			return new Promise(function(resolve, reject){
				var model = new docData.Model(docData.data);
				model.save(function(err, doc){
					if(err){
						resolve([err, null, null]);
					}
					else {
						docData.doc = doc;
						resolve([null, docData, doc]);
					}
				});
			});
		};
	}
}

/**
 * Exports the common mongoose transaction.
 */
module.exports = function(mongoose) {
	return function (){
		return new Transaction(mongoose);
	};
};