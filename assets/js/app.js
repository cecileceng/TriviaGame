
var questions = [{
question: "What was the highest price ever paid for a sushi grade Bluefin Tuna (754 pounds) on January 4th, 2011 at the Tsukiji Fish Market in Tokyo? (In USD)",
options: ['$25,940', '$396,000', '$1,000,200'],
image: "assets/images/big-tuna.jpg",
answer: 1
},
{
question: "What type of fish is saba?",
options: ['Mackerel', 'Tuna', 'Salmon'],
image: "assets/images/shimesaba.jpg",
answer: 0
},
{
question: "In regards to sushi etiquette, which of these is frowned upon?",
options: ['Eating each piece of sushi in one bite', 'Eating sushi with your fingers', 'Adding a slice of ginger to your fish before eating it'],
image: "assets/images/sushi_etiquette.jpg",
answer: 2
},
{
question: "Sake is a Japanese liquor made from ...?",
options: ['Rice', 'White grapes', 'Green tea and barley'],
image: "assets/images/sake.jpg",
answer: 0
},
{
question: "What is the Japanese word for the seaweed used to wrap your roll?",
options: ['See-weedo', 'Futari', 'Nori'],
image: "assets/images/nori.jpg",
answer: 2
}]

var currentQuestionIndex = 0;

var score = 0; //number correct answers

var totalTime = 0; //how long it takes to do all the trivia

$('#start-btn').click(function(e) {
	askQuestion();
}); 

$('#btn-0').click(function(e) {
	tryAnswer(0);
}); 

$('#btn-1').click(function(e) {
	tryAnswer(1);
}); 

$('#btn-2').click(function(e) {
	tryAnswer(2);
}); 

function tryAnswer(answerIndex) {
	resetTimer();
	q = questions[currentQuestionIndex];
	if (q.answer == answerIndex) {
		//alert('Correct!');
		$('.response').html("Correct!");
		score++;
		$('.scoreboard').html("Current score: " + score); 
	} else {
		//alert('Incorrect! The correct answer was ' + q.options[q.answer] + ".") 
		$('.response').html('Incorrect! The correct answer was ' + q.options[q.answer] + ".");
	}
	nextQuestion();
}

function nextQuestion() {
	totalTime += (20 - timer);
	currentQuestionIndex++;
	if (currentQuestionIndex >= questions.length) {
		$('.scoreboard').html("Congrats! You got " + score + " out of " + questions.length + " answers correct in " + totalTime + " seconds.");
	} else {
		askQuestion();
	}
}

function askQuestion() {
	q = questions[currentQuestionIndex];
	$('.question').html(q.question);
	for (var i = 0; i < q.options.length; i++) {
		$('#btn-' + i).html(q.options[i]); 
		$('#btn-' + i).removeClass('hidden');
		var img = $('<img>');
		img.attr('src', q.image);
		$('.image-container').html(img);
	}
	startTimer(20);
}

var timer = 0; //seconds that have gone by

var intervalID = null;

function startTimer(startTime) {
	timer = startTime;
	$('.time-left').html('<h2>' + timer + '</h2>');
	intervalID = setInterval(updateTimer, 1000);
}

//stops the clock
function resetTimer() {
	clearInterval(intervalID);
}

function updateTimer() {
	timer--;
	$('.time-left').html('<h2>' + timer + '</h2>');
	if (timer <= 0){
		resetTimer();
		timeIsUp();
	}
}

//handles when they fail the question due to time out
function timeIsUp() {
	alert('Out of time!');
	nextQuestion();
}