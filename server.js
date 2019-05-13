var path = require('path');
var url = require('url');
var express = require('express');
var sqlite3 = require('sqlite3');

var app = express();
var port = 8014;

var db_filename = path.join(__dirname, 'db', 'db_memory.db');
var public_dir = path.join(__dirname, 'public');

var db = new sqlite3.Database(db_filename, sqlite3, (err)=>{
	if(err){
		console.log('Error opening '+ db_filename);
	}
	else{
		console.log('Now connected to '+db_filename);
	}
});

app.use(express.static(public_dir));




var server = app.listen(port);

