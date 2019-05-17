var cards = [];
var flipNum = 1;
var cardOne;
var pairs = 0;
var moves = 0;
var timeBegan = null;
var timeStopped = null;
var started = null;
var difficulty;
var mode;
var count = 0;
var user;
var pass;
var getUser;

function init(){
	console.log("loaded");

	$("#submit").click(UserSearch);
	$("#submitNew").click(NewUser);
//	$("#submitBoard").click(updateBoard);
}

function UserSearch() {
    if ($("#uname").val() !== "") {
    	user = $("#uname").val();
    	pass = $("#password").val();
    	console.log(user);
        GetJson("/Uname?" + user + "&" + pass).then((data) => {
            console.log(data);
            if (data === false){
            	unsuccessfulSignIn();
            }
            else{
            	console.log(data);
            	localStorage.setItem("uname", user);
            	successfulSignIn();
            }
        });
    }
}

function NewUser(){
	if ($("#uname2").val() !== "") {
    	user = $("#uname2").val();
    	pass = $("#password2").val();
    	//console.log(user);
        GetJson("/NewU?" + user + "&" + pass).then((data) => {
            console.log(data);
            if (data === false){
            	existingUser();
            }
            else{
            	console.log(user);
            	localStorage.setItem("uname", user);
            	successfulSignIn();
            }
        });
    }
}

function addStats(){
	var timer = $("#timer").val();
	console.log(timer);
	GetJson("/newGame?"+ user+ "&"+ difficulty+ "&"+ moves+ "&"+ timer).then((data)=>{
		if (data === true){
			console.log("score saved");
		}
		else{
			console.log("not saved");
		}
	});
}

function updateBoard(){
	GetJson("/Leaderboard").then((data) => {
		console.log(data);
		
		var e = [];
		var m = [];
		var h = [];
		for(i=0;i<data.length;i++){
			if(data[i].mode === "easy"){
				e.push(data[i]);
			}
			else if(data[i].mode === "medium"){
				m.push(data[i]);
			}
			else if(data[i].mode === "hard"){
				h.push(data[i]);
			}
		}
		for(i=0;i<e.length;i++){
			for(j=0;j<e.length;j++){
				if(e[i].moves<e[j].moves){
					var x;
					var x = e[i];
					e[i] = e[j];
					e[j] = x;
				}
			}
		}
		for(i=0;i<m.length;i++){
			for(j=0;j<m.length;j++){
				if(m[i].moves<m[j].moves){
					var x;
					var x = m[i];
					m[i] = m[j];
					m[j] = x;
				}
			}
		}
		for(i=0;i<h.length;i++){
			for(j=0;j<h.length;j++){
				if(h[i].moves<h[j].moves){
					var x;
					var x = h[i];
					h[i] = h[j];
					h[j] = x;
				}
			}
		}
		
		for(i=0;i<e.length;i++){
			var x = e[i].uname;
			var newRow = document.createElement("tr");
			newRow.addEventListener("click", function () {
				GetUserStats(x);
			});
			var newData = document.createElement("td");
			var text = document.createTextNode(e[i].uname);
			var newData2 = document.createElement("td");
			var text2 = document.createTextNode(e[i].mode);
			var newData3 = document.createElement("td");
			var text3 = document.createTextNode(e[i].moves);
			var newData4 = document.createElement("td");
			var text4 = document.createTextNode(e[i].time);
			
			newData.appendChild(text);
			newData2.appendChild(text2);
			newData3.appendChild(text3);
			newData4.appendChild(text4);
			newRow.appendChild(newData);
			newRow.appendChild(newData2);
			newRow.appendChild(newData3);
			newRow.appendChild(newData4);
			
			document.getElementById("etable").appendChild(newRow);

		}
		for(i=0;i<m.length;i++){
			var newRow = document.createElement("tr");
			newRow.addEventListener("click", function () {
				GetUserStats(m[i].uname);
			});
			var newData = document.createElement("td");
			var text = document.createTextNode(m[i].uname);
			var newData2 = document.createElement("td");
			var text2 = document.createTextNode(m[i].mode);
			var newData3 = document.createElement("td");
			var text3 = document.createTextNode(m[i].moves);
			var newData4 = document.createElement("td");
			var text4 = document.createTextNode(m[i].time);
			
			newData.appendChild(text);
			newData2.appendChild(text2);
			newData3.appendChild(text3);
			newData4.appendChild(text4);
			newRow.appendChild(newData);
			newRow.appendChild(newData2);
			newRow.appendChild(newData3);
			newRow.appendChild(newData4);
			
			document.getElementById("mtable").appendChild(newRow);

		}
		for(i=0;i<h.length;i++){
			var x = h[i].uname;
			var newRow = document.createElement("tr");
			newRow.addEventListener("click", function () {
				GetUserStats(x);
			});
			var newData = document.createElement("td");
			var text = document.createTextNode(h[i].uname);
			var newData2 = document.createElement("td");
			var text2 = document.createTextNode(h[i].mode);
			var newData3 = document.createElement("td");
			var text3 = document.createTextNode(h[i].moves);
			var newData4 = document.createElement("td");
			var text4 = document.createTextNode(h[i].time);
			
			newData.appendChild(text);
			newData2.appendChild(text2);
			newData3.appendChild(text3);
			newData4.appendChild(text4);
			newRow.appendChild(newData);
			newRow.appendChild(newData2);
			newRow.appendChild(newData3);
			newRow.appendChild(newData4);
			
			document.getElementById("htable").appendChild(newRow);
		}	
			
	});
}

function GetUserStats(e){
	console.log(e);
	var stats = [];
	GetJson("/UserStats?" + e).then((data)=>{
		console.log(data);
		for(i=0;i<data.length;i++){
			stats.push(data[i]);	
		}
		//Sorts stats
		for(i=0;i<stats.length;i++){
			for(j=0;j<stats.length;j++){
				if(stats[i].moves<stats[j].moves){
					var x;
					var x = stats[i];
					stats[i] = stats[j];
					stats[j] = x;
				}
			}
		}


		//Creates table
		var utable = document.createElement("table");
			utable.setAttribute("id", "utable");
			var cap = document.createElement("caption");
			var capText = document.createTextNode("User Stats");
			cap.appendChild(capText);
			utable.appendChild(cap);

			var firstRow = document.createElement("tr");
			var head1 = document.createElement("th");
			var h1text = document.createTextNode("User");
			var head2 = document.createElement("th");
			var h2text = document.createTextNode("Difficulty");
			var head3 = document.createElement("th");
			var h3text = document.createTextNode("Moves");
			var head4 = document.createElement("th");
			var h4text = document.createTextNode("Time");

			head1.appendChild(h1text);
			head2.appendChild(h2text);
			head3.appendChild(h3text);
			head4.appendChild(h4text);
			firstRow.appendChild(head1);
			firstRow.appendChild(head2);
			firstRow.appendChild(head3);
			firstRow.appendChild(head4);

			utable.appendChild(firstRow);
		//Adds stats to u table
		for(i=0; i<stats.length; i++){

			var newRow = document.createElement("tr");
			var newData = document.createElement("td");
			var text = document.createTextNode(stats[i].uname);
			var newData2 = document.createElement("td");
			var text2 = document.createTextNode(stats[i].mode);
			var newData3 = document.createElement("td");
			var text3 = document.createTextNode(stats[i].moves);
			var newData4 = document.createElement("td");
			var text4 = document.createTextNode(stats[i].time);
			
			newData.appendChild(text);
			newData2.appendChild(text2);
			newData3.appendChild(text3);
			newData4.appendChild(text4);
			newRow.appendChild(newData);
			newRow.appendChild(newData2);
			newRow.appendChild(newData3);
			newRow.appendChild(newData4);
			
			utable.appendChild(newRow);
			document.getElementById("userTable").appendChild(utable);
		}

	});
}


function GetJson(url) {
    return new Promise((resolve, reject) => {
        $.get(url, (data) => {
            resolve(data);
        }, "json");
    });
}

function successfulSignIn(){
	if(confirm("You have successfully signed in! Click 'OK' to play!")){
		console.log(user);
		window.open("game.html", '_self');
	}
}

function unsuccessfulSignIn(){
	alert("Wrong user name or password. Please try again.");
}

function existingUser(){
	alert("User already exists, please choose a different user name");
}




function easy(){
	difficulty = "easy";
	moves = 0;
	document.getElementById("gameContent").innerHTML = "";
	mode = 1500;
	gameSetup(mode);
}
function medium(){
	difficulty = "medium";
	moves = 0;
	document.getElementById("gameContent").innerHTML = "";
	mode = 750;
	gameSetup(mode);
}
function hard(){
	difficulty = "hard";
	moves = 0;
	document.getElementById("gameContent").innerHTML = "";
	mode = 250;
	gameSetup(mode);
}


function gameSetup(mode){
	cards[0] = new Card('/images/campus.jpg', '/images/cardback.jpg');
	cards[1] = new Card('/images/campus.jpg', '/images/cardback.jpg');
	cards[2] = new Card('/images/cat.jpg', '/images/cardback.jpg');
	cards[3] = new Card('/images/cat.jpg', '/images/cardback.jpg');
	cards[4] = new Card('/images/chapel.jpg', '/images/cardback.jpg');
	cards[5] = new Card('/images/chapel.jpg', '/images/cardback.jpg');
	cards[6] = new Card('/images/crest.jpg', '/images/cardback.jpg');
	cards[7] = new Card('/images/crest.jpg', '/images/cardback.jpg');
	cards[8] = new Card('/images/football.jpg', '/images/cardback.jpg');
	cards[9] = new Card('/images/football.jpg', '/images/cardback.jpg');
	cards[10] = new Card('/images/gym.jpg', '/images/cardback.jpg');
	cards[11] = new Card('/images/gym.jpg', '/images/cardback.jpg');
	cards[12] = new Card('/images/name.jpg', '/images/cardback.jpg');
	cards[13] = new Card('/images/name.jpg', '/images/cardback.jpg');
	cards[14] = new Card('/images/quad.jpg', '/images/cardback.jpg');
	cards[15] = new Card('/images/quad.jpg', '/images/cardback.jpg');
	cards[16] = new Card('/images/soccer.jpg', '/images/cardback.jpg');
	cards[17] = new Card('/images/soccer.jpg', '/images/cardback.jpg');
	cards[18] = new Card('/images/students.jpg', '/images/cardback.jpg');
	cards[19] = new Card('/images/students.jpg', '/images/cardback.jpg');
	
	shuffle(cards);
	user = localStorage.getItem("uname");
	console.log(user);
	
	for(var i = 0; i < cards.length; i++){
		var img = document.createElement('img');
		img.setAttribute("id", "img" + i);
		img.setAttribute("onclick", "flip(" + i + "," + mode + ")");
		img.src = cards[i].back;
		document.getElementById("gameContent").appendChild(img);
		document.getElementById("moveCount").innerHTML = moves;
	}
	start();
}

function shuffle(cards){
	for (var i = cards.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[j]] = [cards[j], cards[i]]; 
		}
}

function flip(i, mode){
	if(flipNum === 1){
		var img = document.getElementById("img"+i);
		img.src = cards[i].img;
		flipNum = 2;
		cardOne = i;
	}
	else if(flipNum === 2){
		var img = document.getElementById("img"+i);
		img.src = cards[i].img;
		flipNum = 1;
		setTimeout(function(){ flip2(i); }, mode);
	}
}

function flip2(i){
	var img = document.getElementById("img"+i);
	var img2 = document.getElementById("img"+cardOne);
	if(cards[i].img === cards[cardOne].img){
		pairs++;
		if(pairs === 10){
			stop();
			if(confirm("Click OK to save game!")){
				addStats();
			}
		}
	}
	else{
		img.src = cards[i].back;
		img2.src = cards[cardOne].back;
	}
	moves++;
	document.getElementById("moveCount").innerHTML = moves;	
}

function start() {
    timeBegan = new Date();
    started = setInterval(clockRunning, 1000);
}

function stop() {
    timeStopped = new Date();
    clearInterval(started);
}
 
function reset() {
    clearInterval(started);
    timeBegan = null;
    timeStopped = null;
    document.getElementById("timer").innerHTML = "00:00";
}

function clockRunning(){
    var currentTime = new Date();
    var timeElapsed = new Date(currentTime - timeBegan);
    var min = timeElapsed.getUTCMinutes();
    var sec = timeElapsed.getUTCSeconds();


    document.getElementById("timer").innerHTML = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec) ;
};

function Card(img, back){
	this.img = img;
	this.back = back;
}	





