var path = require('path');
var url = require('url');
var express = require('express');
var sqlite3 = require('sqlite3');
var md5 = require('md5');

var app = express();
var port = 8014;

var db_filename = path.join(__dirname, 'db', 'db_memory.db');
var public_dir = path.join(__dirname, 'public');

var db = new sqlite3.Database(db_filename, sqlite3.OPEN_READWRITE, (err)=>{
	if(err){
		console.log('Error opening '+ db_filename);
	}
	else{
		console.log('Now connected to ' + db_filename);
	}
});

app.use(express.static(public_dir));

app.get('/Uname', (req, res) => {
    var req_url = url.parse(req.url);
    var q = req_url.query.split("&");
    var hash = md5(q[1]);
   // console.log(q);
   // console.log(hash);
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
    //console.log(hash);
    db.all('SELECT * FROM users WHERE uname = ?', [q[0]], (err, rows) => {
        if (err) {
            console.log(err);
        }
        else if (rows[0] === undefined){
      		console.log("User does not exist");
      		db.run('INSERT INTO users (uname, pass) VALUES (? , ?)', [q[0], hash], (err) =>{
      			if (err){
      				console.log(err);
      			}
      		});
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write("true");
          res.end();
		    }
		    else{ 
			     console.log("User already exist");
			     res.writeHead(200, {'Content-Type': 'application/json'});
           res.write("false");
           res.end();
		    }   
    });
});


app.get('/newGame', (req, res)=>{
  var req_url = url.parse(req.url);
  var q = req_url.query.split("&");
  db.run('INSERT INTO gamesPlayed (uname, mode, moves, time) VALUES (?, ?, ?, ?)', [q[0],q[1],q[2],q[3]], (err)=>{
    if (err){
      console.log(err);
    }
    else{
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write("true");
      res.end();
    }
  });
  db.close();
});


app.get('/Leaderboard', (req, res) => {
    var req_url = url.parse(req.url);
    db.all('SELECT * FROM gamesPlayed', (err, rows) => {
        if (err) {
            console.log(err);
        }
        else if (rows[0] === undefined){
      		console.log("No game data!");
		    }
		    else{ 
          db.close();
			    res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(rows));
          res.end();
		}   
    });
});

app.get('/UserStats', (req,res)=>{
  var req_url = url.parse(req.url);
  db.all('SELECT * WHERE uname = ?', (err, rows)=>{
    if(err){
      console.log(err);
    }
    else if(row[0]===undefined){
      console.log("No user data");
    }
    else{
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(rows));
      res.end();
    }
  })
});




var server = app.listen(port);

