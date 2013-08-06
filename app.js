var AWS    = require('aws-sdk');
var tunnel = require('tunnel');
AWS.config.loadFromPath('./config.json');

// AWS.config.update({
// 	httpOptions: {
// 		agent: tunnel.httpsOverHttp({
// 			proxy: {
// 			    host: 'www-cache.reith.bbc.co.uk',
// 		        port: 80
// 			}
// 		})
// 	}
// });

var sqs = require('./lib/sqs');
sqs.init(AWS);

var sdb = require('./lib/simpledb');
sdb.init(AWS);

// sqs.queue.create("nodesdk", function(err, data) {

// 	if (err) return console.log(err);

// 	var url = data.QueueUrl;

// 	console.log("Queue URL:" + url);

// 	sdb.attribute.put("SQSQueues", "jbiuser3", [{
// 		Name: "queueUrl",
// 		Value: url
// 	}], function(err, data) {

// 		if (err) return console.log(err);

// 		console.log(data);
// 	});
// });

sdb.attribute.get("SQSQueues", "jbiuser2", function(err, data) {

	if (err) return console.log(err);

	var url = data.Attributes[0].Value;
	console.log(url);

	sqs.message.create(url, "Hello Node!", function(err, data) {

		if (err) return console.log(err);

		console.log(data);
	});
});


//var s3     = require('./lib/s3');
//s3.init(AWS).listBucket();

// var domain = "nodesdk";
// var putAttributes = function() {

// 	var getAttributes = function() {
// 		sdb.attribute.get(domain, "test");
// 	};

// 	sdb.attribute.put(domain, "test", [{
// 		Name: "name",
// 		Value: "node-bot-the-fourth"
// 	}], getAttributes);
// 	sdb.domain.list();
// };
// var sdb = require('./lib/simpledb');
// sdb.init(AWS);
// sdb.domain.create(domain, putAttributes);
// sdb.search("select * from nodesdk where name = \"node-bot-the-fourth\"");

// var dynamo = require('./lib/dynamodb');
// dynamo.init(AWS);

// dynamo.table.create("nodekeys", [
// 	{
// 		AttributeName: "isbn",
// 		AttributeType: "N"
// 	}
// ], [
// 	{
// 		AttributeName: "isbn",
// 		KeyType: "HASH"
// 	}
// ],
// {
// 	ReadCapacityUnits: 10,
// 	WriteCapacityUnits: 10
// }, function(err, data) {

// 	if (err) console.log(err);

// 	console.log(data);
// });


// dynamo.table.describe("nodekeys", function(err, data) {

// 	if (err) console.log(err);

// 	console.log(data);
// });
// dynamo.item.put("nodekeys", {
// 	isbn: {"N": "0193211"},
// 	author: {"S": "Timto 4"},
// 	title: {"S": "Timto International 4"}
// }, function(err, data) {

// 	if (err) console.log(err);

// 	console.log(data);


		// dynamo.scan("nodekeys", function(err, data) {

		// 	if (err) console.log(err);

		// 	console.log(data);
		// });
// });

// dynamo.item.remove("nodekeys", {
// 	isbn: {
// 		"N": "193207"
// 	},
// 	author: {
// 		"S": "Timto 4"
// 	}
// }, function(err, data) {

// 	if (err) console.log(err);

// 	console.log(data);
// });

// dynamo.table.list(function(err, data) {
// 	if (err) console.log(err);

// 	console.log(data.TableNames);
// });

// dynamo.table.remove("nodekeys", function(err, data) {
// 	if (err) console.log(err);

// 	console.log(data);
// });
// dynamo.table.remove("nits", function(err, data) {
// 	if (err) console.log(err);

// 	console.log(data);
// });


// dynamo.query('nodekeys',
// 	{
// 		'isbn': {
// 			AttributeValueList: [{'N': '193206'}],
// 			ComparisonOperator: 'EQ',
// 		}
// 	},
// 	function(err, callback) {
// 		if (err) console.log(err);

// 		console.log(data);
// });

