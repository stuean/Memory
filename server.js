var path = require('path');
var url = require('url');
var express = require('express');
var sqlite3 = require('sqlite3');

var app = express();
var port = 8014;

var db_filename = path.join(__dirname, 'db', 'db_memory.db');
var public_dir = path.join(__dirname, 'public');

var db = new sqlite3.Database(db_filename, sqlite3.OPEN_READWRITE, (err)=>{
	if(err){
		console.log('Error opening '+ db_filename);
	}
	else{
		console.log('Now connected to '+db_filename);
	}
});

app.use(express.static(public_dir));

app.get('/Uname', (req, res) => {
    var req_url = url.parse(req.url);
    var q = req_url.query.split("&");
    var hash = q[1];
    console.log(q);
    console.log(hash);
    db.all('SELECT * FROM users WHERE uname = ?', [q[0]], (err, rows) => {
        if (err) {
            console.log(err);
        }
        else if (rows[0] === undefined){
      		console.log("User doesn't exist");
      		res.writeHead(200, {'Content-Type': 'application/json'});
      		res.write("false");
      		res.end();
		}
		else if (rows[0].pass !== hash){
			console.log("Wrong password");
			res.writeHead(200, {'Content-Type': 'application/json'});
      		res.write("false");
      		res.end();
		}
		else{ 
			res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(rows));
            res.end();
		}   
    });
});

app.get('/NewU', (req, res) => {
    var req_url = url.parse(req.url);
    var q = req_url.query.split("&");
    var hash = md5(q[1]);
    console.log(hash);
    db.all('SELECT * FROM users WHERE uname = ?', [q[0]], (err, rows) => {
        if (err) {
            console.log(err);
        }
        else if (rows[0] === undefined){
      		console.log("User does not exist");
      		db.all('INSERT INTO users (uname, pass) VALUES (? , ?)' [q[0], q[1]], (err, rows)=>{
      			if (err){
      				console.log(err);
      			}
      			else{
      				res.writeHead(200, {'Content-Type': 'application/json'});
      				res.write(JSON.stringify(rows));
      				res.end();
      			}
      		});
		}
		else{ 
			console.log("User already exist");
			res.writeHead(200, {'Content-Type': 'application/json'});
            res.write("false");
            res.end();
		}   
    });
});


var server = app.listen(port);

