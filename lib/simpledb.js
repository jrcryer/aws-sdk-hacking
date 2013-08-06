var fs     = require('fs');
var sdb    = null;

module.exports = (function() {

	var createDomain = function(domain, callback) {
		sdb.createDomain({
			DomainName: domain
		}, function(err, data) {
			if (err) console.log(err);

			console.log("Creating domain:" + domain);
			console.log(data);

			if (callback) callback();
		});
	};

	var listDomains = function() {
		sdb.listDomains(function(err, data) {
			if (err) console.log(err);

			console.log("Domains");
			console.log(data.DomainNames);
		});
	};

	var putAttributes = function(domain, itemName, attributes, callback) {
		sdb.putAttributes({
			DomainName: domain,
			ItemName: itemName,
			Attributes: attributes
		}, function(err, data) {
			if (err) console.log(err);

			console.log("Adding attributes to:" + itemName);
			console.log(data);

			if (callback) callback();
		});
	};

	var getAttributes = function(domain, itemName) {
		sdb.getAttributes({
			DomainName: domain,
			ItemName: itemName
		}, function(err, data) {
			if (err) console.log(err);

			console.log("Getting attributes for:" + itemName);
			console.log(data.Attributes);
		});
	};

	var select = function(expression) {
		sdb.select({
			SelectExpression: expression
		}, function(err, data) {

			if (err) console.log(err);

			console.log("Search for:" + expression);
			console.log(data);
		});
	};

	return {
		init: function(AWS) {
			sdb = new AWS.SimpleDB();
			return this;
		},
		domain: {
			create: createDomain,
			list: listDomains
		},
		attribute: {
			put: putAttributes,
			get: getAttributes
		},
		search: select
	}
})();
