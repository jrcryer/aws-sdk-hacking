
module.exports = (function() {

	var client = null;

	var createQueue = function(name, callback) {
		client.createQueue({
			QueueName: name
		}, callback);
	};

	var createMessage = function(url, content, callback) {
		client.sendMessage({
			QueueUrl: url,
			MessageBody: content
		}, callback);
	};

	return {
		init: function (AWS) {
			client = new AWS.SQS();
			return this;
		},
		queue: {
			create: createQueue
		},
		message: {
			create: createMessage
		}
	};
})();