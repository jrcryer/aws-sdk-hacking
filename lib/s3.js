
var fs     = require('fs');

module.exports = (function() {

	var bucket = "jbiuser3";
	var s3     = null;

	var createBucket  = function(bucketName) {
		s3.createBucket({
			ACL: "public-read",
			Bucket: bucketName,
			CreateBucketConfiguration: {
				LocationConstraint: "us-west-2"
			}
		}, function(err, data) {

			if (err) throw err;
			console.log(data);
		});
	};

	var listBucket = function() {
		s3.listObjects({Bucket: bucket}, function(err, data) {

			if (err) throw err;

			console.log("Contents of bucket:");
			console.log(data.Contents);
			console.log("--------------------------------------------------------------");

			s3.getObject({Bucket:bucket, Key: data.Contents[0].Key}, function(err, file) {
				if (err) throw err;
				console.log(file);
			});
		});
	};

	return {
		init: function (AWS) {
			s3 = new AWS.S3();
			return this;
		},
		createBucket: createBucket,
		listBucket: listBucket
	}
})();