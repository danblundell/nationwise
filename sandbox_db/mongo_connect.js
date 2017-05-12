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
		
	var user = {
		//create document
		firstname:"Will",
		lastname: "Wise", 
		age: 23, 
		email:"wwise@northamp"
	},


	db.collection('users').insertOne(
		user,
		//Check for error
		function(err,r){
			if (err) {
				console.log("Error message: " + err);
				return;
			}
			// Return success message
			console.log(r);
		});

  	db.close();
});