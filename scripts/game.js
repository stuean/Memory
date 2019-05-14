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

function init(){
	var app = new Vue({
		el: '#app',
		data: { 
			user_search: "",
			pass_search: "",
			search_results: []
		}	
	});

}

function UserSearch(event) {
    if (app.user_search !== "") {
        GetJson("/Uname?" + app.user_search).then((data) => {
            app.search_results = data;
            console.log(data);
            if(search_results !== []){
            	CheckPass();
            }
            else{
            	alert('You do not have an account!');
            }
        });
    }
}

function CheckPass(){
	
}

function GetJson(url) {
    return new Promise((resolve, reject) => {
        $.get(url, (data) => {
            resolve(data);
        }, "json");
    });
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
	cards[0] = new Card('images/campus.JPG', 'images/cardback.JPG');
	cards[1] = new Card('images/campus.JPG', 'images/cardback.JPG');
	cards[2] = new Card('images/cat.JPG', 'images/cardback.JPG');
	cards[3] = new Card('images/cat.JPG', 'images/cardback.JPG');
	cards[4] = new Card('images/chapel.JPG', 'images/cardback.JPG');
	cards[5] = new Card('images/chapel.JPG', 'images/cardback.JPG');
	cards[6] = new Card('images/crest.JPG', 'images/cardback.JPG');
	cards[7] = new Card('images/crest.JPG', 'images/cardback.JPG');
	cards[8] = new Card('images/football.JPG', 'images/cardback.JPG');
	cards[9] = new Card('images/football.JPG', 'images/cardback.JPG');
	cards[10] = new Card('images/gym.JPG', 'images/cardback.JPG');
	cards[11] = new Card('images/gym.JPG', 'images/cardback.JPG');
	cards[12] = new Card('images/name.JPG', 'images/cardback.JPG');
	cards[13] = new Card('images/name.JPG', 'images/cardback.JPG');
	cards[14] = new Card('images/quad.JPG', 'images/cardback.JPG');
	cards[15] = new Card('images/quad.JPG', 'images/cardback.JPG');
	cards[16] = new Card('images/soccer.JPG', 'images/cardback.JPG');
	cards[17] = new Card('images/soccer.JPG', 'images/cardback.JPG');
	cards[18] = new Card('images/students.JPG', 'images/cardback.JPG');
	cards[19] = new Card('images/students.JPG', 'images/cardback.JPG');
	
	shuffle(cards);
	
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






