var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/sandbox_db';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	//Check for error
	if (err) {
		console.log("Error message: " + err);
		return;
	}
	//Success
	console.log("Connected successfully to server");
		
	//Find and update
	db.collection('users').findOneAndUpdate({lastname: 'Wise'},
		{$set: {firstname:'Donald'}},
		{
          returnOriginal: false
        },
		function(err,r) {
			//Check for error
			if (err) {
				console.log("Error message: " + err);
			return;
			}
			//Success
			console.log(r);
		}
	);

	/* Display
	db.collection('users').find({
		firstname: 'Joshua'
		}).toArray(function(err,docs){
		if (err) {
		console.log("Error message: " + err);
		return;
	}
	//Success
	console.log(docs);
	}); */

  	db.close();
});


    