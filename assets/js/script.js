//Global Variables//
const startButton = document.getElementById("start");
const questionsDiv = document.getElementById("questions");
const answersDiv = document.getElementById("answers");
const timerElement = document.getElementById("timer");
const playAgainBtn = document.getElementById("playAgainBtn");
const saveInitialsBtn = document.getElementById("saveInitialsBtn");
const clearHighScoresButton = document.getElementById("clearHighScoresButton");
const leaderboardList = document.getElementById("leaderboardList");
const showHighScoresLink = document.getElementById("showHighScoresLink");

const questions = [
  //questions were modified from w3schools.com/quiztest
  {
    title: "How do you write 'Hello World' in an alert box?",
    answers: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
    correct: "alert('Hello World');",
  },

  {
    title: "How do you create a function in JavaScript?",
    answers: ["function myFunction()", "function:myFunction()", "function = myFunction()", "function(myFunction)"],
    correct: "function myFunction()",
  },

  {
    title: "Inside which HTML element do we put the JavaScript?",
    answers: ["<javascript>", "<js>", "<script>", "<scripting>"],
    correct: "<script>",
  },

  {
    title: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answers: ["<script lnk='xxx.js'>", "<script src='xxx.js'>", "<script href='xxx.js'>", "<script name='xxx.js'>"],
    correct: "<script src='xxx.js'>",
  },

  {
    title: "How do you call a function named 'myFunction'?",
    answers: ["call myFunction()", "function myFunction()", "call function myFunction()", "myFunction()"],
    correct: "myFunction()",
  },

  {
    title: "Which of the following is a correctly written IF statement in JavaScript?",
    answers: ["if (i===5)", "if i = 5", "if i===5 then", "if i=5 then"],
    correct: "if (i===5)",
  },

  {
    title: "How can you add a comment in a JavaScript?",
    answers: ["'This is a comment", "//This is a comment", "<!--This is a comment-->", "`This is a comment`"],
    correct: "//This is a comment",
  },

  {
    title: "What is the correct way to write a JavaScript array?",
    answers: ["let colors = 1 = ('red'), 2 = ('green'), 3 - ('blue')", "let colors = 'red', 'green', 'blue'", "let colors = ['red', 'green', 'blue']", "let colors = (1:'red', 2:'green', 3:'blue')"],
    correct: "let colors = ['red', 'green', 'blue']",
  },

  {
    title: "How do you round the number 6.25, to the nearest integer?",
    answers: ["round(6.25)", "Math.round(6.25)", "rnd(6.25)", "Math.rnd(6.25)"],
    correct: "Math.round(6.25)",
  },

  {
    title: "Which event occurs when the user clicks on an HTML element?",
    answers: ["onclick", "onmouseover", "onmouseclick", "onhover"],
    correct: "onclick",
  },
];
let leaderboard = [];

let qIndex = 0;
let timerCount = 75;
let finalScore = 0;
let isWin = false;

//functions//

//initialization//
function initializeQuiz() {
  leaderboard = JSON.parse(localStorage.getItem("savedLocalScores"));
  if (!leaderboard) {
    leaderboard = [];
  }
  updateHighScoreDisplay();
  hideEverything();
  showContainerById("introContainer");
  console.log(leaderboard);
}

//record high scores function
function recordHighScore() {
  //check for initials
  var initials = document.getElementById("initialsTextInput").value;
  var score = finalScore;
  //if no initials entered, alert user
  if (!initials) {
    alert("Please enter your intials to save your score.");
    return null;
  }
  var newScore = { initials: initials, score: score };
  //append initials and score to the leaderboard
  leaderboard.push(newScore);
  //write scores to local storage
  localStorage.setItem("savedLocalScores", JSON.stringify(leaderboard));
  updateHighScoreDisplay();
  showLeaderboard();
}

//update high score display
function updateHighScoreDisplay() {
  leaderboardList.innerHTML = "";
  if (leaderboard.length > 0) {
    //sort the leaderboard by score: got help from https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    leaderboard.sort((a, b) => (a.score > b.score ? -1 : 1));
    //add each initials/score to the leaderboard list
    leaderboard.forEach(function (localStorageScore) {
      let li = document.createElement("li");
      li.textContent = localStorageScore.initials + " " + localStorageScore.score;
      leaderboardList.appendChild(li);
    });
  }
}

//clear high scores
function clearHighScores() {
  localStorage.removeItem("savedLocalScores");
  leaderboard = [];
  updateHighScoreDisplay();
  console.log("cleared scores");
}

//function to show container by id
function showContainerById(container) {
  document.getElementById(container).classList.remove("hidden");
}

//hide container by id
function hideContainerById(container) {
  document.getElementById(container).classList.add("hidden");
}

//function to hide everything
function hideEverything() {
  //hide introContainer div
  hideContainerById("introContainer");
  //hide quizContainer div
  hideContainerById("quizContainer");
  //hide wonGame div
  hideContainerById("wonGame");
  //hide lostGame div
  hideContainerById("lostGame");
  //hide resultsContainer div
  hideContainerById("resultsContainer");
  //hide leaderboard div
  hideContainerById("leaderboardContainer");
  //hide playAgainContainer div
  hideContainerById("playAgainContainer");
}

function showLeaderboard() {
  //hide everything
  hideEverything();
  //show highScoresLeaderboard
  showContainerById("leaderboardContainer");
  showContainerById("playAgainContainer");
}

function showQuestionAnswers() {
  //hide everything
  hideEverything();
  //clear out previous question
  answersDiv.textContent = "";
  //show question
  questionsDiv.innerHTML = questions[qIndex].title;
  //loop through answers
  questions[qIndex].answers.forEach((answer) => {
    //create element button
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    //add value attribute (value and text)
    answerBtn.setAttribute("value", answer);
    //add click event
    answerBtn.onclick = answerClick;
    //append button to the answers div
    answersDiv.appendChild(answerBtn);
  });
  showContainerById("quizContainer");
}

//answer click function to check the answer)
function answerClick() {
  // Determine the answer the user chose
  let clickedAnswer = this.value;
  //check to see if the answer is correct
  //if the answer is correct
  if (clickedAnswer === questions[qIndex].correct) {
    //show "Correct!" in the div under the answers
    document.getElementById("result").innerHTML = "Correct!";
    //add one to the question index
    qIndex++;
    //call function to check if there are more questions
    checkIfMoreQuestions();
  } else {
    //show "Incorrect!" in the div under the answers
    document.getElementById("result").innerHTML = "Incorrect!  Time has subtracted from the timer.";
    //subtract time from timer
    timerCount = timerCount - 5;
    updateTimerDisplay();
  }
}

//timer
function startTimer() {
  //call showQuestionsAnswers function
  showQuestionAnswers();
  //set timerCount
  updateTimerDisplay();
  // Sets timer
  timer = setInterval(function () {
    //if user won and timer is greater than zero
    if (isWin) {
      // Clears interval and stops timer
      clearInterval(timer);
      return null;
    }
    //otherwise, count down
    timerCount--;
    updateTimerDisplay();
    //check if there is time left
    if (timerCount <= 0) {
      // Clears interval and ends the game
      clearInterval(timer);
      endGame(0);
    }
  }, 1000);
}

//update timerDisplay
function updateTimerDisplay() {
  if (timerCount < 0) timerCount = 0;
  timerElement.textContent = timerCount;
}

//function to check if there are more questions
function checkIfMoreQuestions() {
  if (questions.length > qIndex) {
    //if there are more questions, call showQuestionsAnswers function
    showQuestionAnswers();
  } else {
    //the user won the game, so set isWin to true
    isWin = true;
    //call endGame function
    endGame();
  }
}

//endGame
function endGame() {
  //hide everything
  hideEverything();
  if (isWin) {
    //set finalScore
    finalScore = timerCount;
    //add final score to the span
    document.getElementById("finalScore").innerHTML = finalScore;
    //show wonGame div
    showContainerById("wonGame");
  } else {
    //show lostGame div
    showContainerById("lostGame");
    showContainerById("playAgainContainer");
  }
  showContainerById("resultsContainer");
}

//playAgain
function playAgain() {
  //reload webpage
  console.log("playing again");
  location.reload();
}

//event listener for the "Start Quiz" button
startButton.addEventListener("click", startTimer);

//event listener for the "Save Initials" button
saveInitialsBtn.addEventListener("click", recordHighScore);

//event listener to clear scores
clearHighScoresButton.addEventListener("click", clearHighScores);

//event listener to show high scores
showHighScoresLink.addEventListener("click", showLeaderboard);

//event listener to play again
playAgainBtn.addEventListener("click", playAgain);

//initialize
initializeQuiz();

/* 
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
*/
