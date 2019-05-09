var cards = [];
var flipNum = 1;
var cardOne;
var pairs = 0;





function init(){
	gameSetup();
}


function gameSetup(){
	cards[0] = new Card('images/campus.JPG', 'images/back.JPG');
	cards[1] = new Card('images/campus.JPG', 'images/back.JPG');
	cards[2] = new Card('images/cat.JPG', 'images/back.JPG');
	cards[3] = new Card('images/cat.JPG', 'images/back.JPG');
	cards[4] = new Card('images/chapel.JPG', 'images/back.JPG');
	cards[5] = new Card('images/chapel.JPG', 'images/back.JPG');
	cards[6] = new Card('images/crest.JPG', 'images/back.JPG');
	cards[7] = new Card('images/crest.JPG', 'images/back.JPG');
	cards[8] = new Card('images/football.JPG', 'images/back.JPG');
	cards[9] = new Card('images/football.JPG', 'images/back.JPG');
	cards[10] = new Card('images/gym.JPG', 'images/back.JPG');
	cards[11] = new Card('images/gym.JPG', 'images/back.JPG');
	cards[12] = new Card('images/name.JPG', 'images/back.JPG');
	cards[13] = new Card('images/name.JPG', 'images/back.JPG');
	cards[14] = new Card('images/quad.JPG', 'images/back.JPG');
	cards[15] = new Card('images/quad.JPG', 'images/back.JPG');
	cards[16] = new Card('images/soccer.JPG', 'images/back.JPG');
	cards[17] = new Card('images/soccer.JPG', 'images/back.JPG');
	cards[18] = new Card('images/students.JPG', 'images/back.JPG');
	cards[19] = new Card('images/students.JPG', 'images/back.JPG');
	
	shuffle(cards);
	
	for(var i = 0; i < cards.length; i++){
		var img = document.createElement('img');
		img.setAttribute("id", "img" + i);
		img.setAttribute("onclick", "flip(" + i + ")");
		img.src = cards[i].back;
		document.getElementById("gameContent").appendChild(img);
	}
}

function shuffle(cards){
	for (var i = cards.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[j]] = [cards[j], cards[i]]; 
		}
}

function flip(i){
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
		setTimeout(function(){ flip2(i); }, 1500);
	}
}

function flip2(i){
	app.moves = app.moves+1;
	console.log(app.moves);
	var img = document.getElementById("img"+i);
	var img2 = document.getElementById("img"+cardOne);
	if(cards[i].img === cards[cardOne].img){
		pairs++;
		if(pairs === 10){
			alert('You Win!');
		}
	}
	else{
		img.src = cards[i].back;
		img2.src = cards[cardOne].back;
	}
}

function Card(img, back){
	this.img = img;
	this.back = back;
}	






