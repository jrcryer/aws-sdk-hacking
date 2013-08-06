
module.exports = (function() {

	var client     = null;

	var createTable = function(name, attributes, schema, throughput, callback) {
		client.createTable({
			TableName: name,
			AttributeDefinitions: attributes,
			KeySchema: schema,
			ProvisionedThroughput: throughput
		}, callback);
	};

	var listTables = function(callback) {
		client.listTables(callback);
	};

	var deleteTable = function(name, callback) {
		client.deleteTable({
			TableName: name
		}, callback);
	};

	var putItem = function(table, attributes, callback) {
		client.putItem({
			TableName: table,
			Item: attributes
		}, callback);
	};

	var getItem = function(table, key, callback) {
		client.getItem({
			TableName: table,
			Key: key
		}, callback);
	};

	var deleteItem = function(table, key, callback) {
		client.deleteItem({
			TableName: table,
			Key: key
		}, callback);
	};

	return {
		init: function (AWS) {
			client = new AWS.DynamoDB({apiVersion: '2012-08-10'});
			return this;
		},
		table: {
			create: createTable,
			list: listTables,
			remove: deleteTable
		},
		item: {
			put: putItem,
			get: getItem,
			remove: deleteItem
		}
	};
})();