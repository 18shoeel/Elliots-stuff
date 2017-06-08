var gameMode=0;//0= welcome screen, 1 = playing
var pageTitles = [];
var viewCounts = [];
var currentCorrect;
var optionA;
var optionB;
var guess;
var score;
var startTime=0;
var elapsedTime=0;

var pageUrls = [
  "San_Francisco",
  "Boston_Red_Sox",
  "Beyonce",
  "French_Revolution",
  "Woodstock_Union_High_School",
  "The_Cuckoo%27s_Egg",
  "Wikipedia",
  "YouTube",
  "Google",

]


function setup() {
  createCanvas(800,600);
  fetchQuizData();
  score = 0;
  noLoop();
  }


function draw() {
  if (gameMode == 0) {
    background(220,3,3);

textSize(16);
textAlign(RIGHT);
text("hello! press", 160, 130);
textAlign(CENTER);
text("any button to", 160, 150);
textAlign(LEFT);
text("begin",160,170);
text("you took" +elapsedTime/1000+ "seconds", 75,75);
text("Rules- when you switch from the home screen a timer begins and after you reach a score of seven your time is", 1,400);
text(" displayed on the home screen and you can play again", 1,420);
  } else if (gameMode == 1) {
    background(240);
    text("score: " + score, 90, 90);
    displayPageNames();
  }
}





function keyTyped() {
  if (gameMode == 0) {
    gameMode = 1;
    startTime=millis();
    redraw();
  } else if (gameMode == 1) {
    guess = key;
    check();
  }
}



function displayPageNames() {
  optionA = parseInt(random(pageTitles.length - 1));
  optionB = parseInt(random(pageTitles.length - 1));
  while (optionA == optionB) {
    optionB = parseInt(random(pageTitles.length - 1));
  }
  text(pageTitles[optionA], 100, 200);
  text(pageTitles[optionB], 100, 300);
}

function check() {
  console.log(guess);
  if (guess == 'a') {
    if (viewCounts[optionA] > viewCounts[optionB]) {
      console.log("correct");
      score = score + 1;
      redraw();
    } else {
      console.log("try again");
      score = 0;
      redraw();
    }
  } else if (guess == 'b'){
    if (viewCounts[optionB] > viewCounts[optionA]) {
      console.log("correct");
      score = score + 1;
      redraw();
    } else {
      console.log("Wrong");
      score = 0;
      redraw();
    }

  } else {
    console.log("strange guess");
  }
  if (score>=7){
    gameMode = 0;
    (score=0)
    elapsedTime=millis()-startTime;
    console.log(elapsedTime/1000);
    redraw();
  }
}


function fetchQuizData() {
  for (var i = 0; i < pageUrls.length; i++) {
    loadJSON("https://en.wikipedia.org/w/api.php?action=query&titles="
    + pageUrls[i] + "&prop=pageviews&format=json", processQuizData, "jsonp");
  }

}

function processQuizData(data) {
  for (var p in data.query.pages) {
    var thePage = data.query.pages[p];
    var dates = Object.keys(thePage.pageviews).slice(-7);
    var theViewCount = 0;
    for (var i = 0; i < 7; i++) {
      theViewCount = theViewCount + thePage.pageviews[dates[i]];
    }
    pageTitles.push(thePage.title);
    viewCounts.push(theViewCount);
    console.log(thePage.title + ": " + theViewCount);
    break;
  }
}
