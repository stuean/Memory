var cards = [];
var flipNum = 1;
var cardOne;
var pairs = 0;
var moves = 0;
var timeBegan = null;
var timeStopped = null;
var started = null;
var mode;
var count = 0;
var user;
var pass;

function init(){
	console.log("loaded");

	$("#submit").click(UserSearch);
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
            	successfulSignIn();
            }
        });
    }
}

function NewUser(){
	if ($("#uname").val() !== "") {
    	user = $("#uname").val();
    	pass = $("#password").val();
    	console.log(user);
        GetJson("/NewU?" + user + "&" + pass).then((data) => {
            console.log(data);
            if (data === "false"){
            	existingUser();
            }
            else{
            	console.log(data);
            	//Add alert, click here to play game... send to game.html
            }
        });
    }
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
	moves = 0;
	document.getElementById("gameContent").innerHTML = "";
	mode = 1500;
	gameSetup(mode);
}
function medium(){
	moves = 0;
	document.getElementById("gameContent").innerHTML = "";
	mode = 750;
	gameSetup(mode);
}
function hard(){
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
	//console.log(cards);
	
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
			alert('You Win!');
			stop();
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






