//Global Variables//
const startButton = document.getElementById("start");
const questionsDiv = document.getElementById("questions");
const answersDiv = document.getElementById("answers");
const timerElement = document.getElementById("timer");
const submitInitialsBtn = document.getElementById("submitInitialsBtn");
const highScoresList = document.getElementById("highScoresList");
const questions = [
  {
    title: "What is David Blaine's first name?",
    answers: ["David", "Chris", "Scott", "Mike"],
    correct: "David",
  },

  {
    title: "What is Scott's last name?",
    answers: ["Anderson", "Henderson", "Jackson", "Smith"],
    correct: "Smith",
  },
];

let qIndex = 0;
let timerCount = 30;
let isWin = false;

//functions//

//function to hide intro, wonGame, and lostGame divs
function hideIntroTestwonGamelostGameDivs() {
  //hide introTest div
  document.getElementById("introTest").classList.add("hidden");
  //hide wonGame div
  document.getElementById("wonGame").classList.add("hidden");
  //hide lostGame div
  document.getElementById("lostGame").classList.add("hidden");
}

//function to hide question, answers, result, and timer divs
function hideQuestionAnswersResultTimerDivs() {
  //hide questions
  document.getElementById("questions").classList.add("hidden");
  //hide answers
  document.getElementById("answers").classList.add("hidden");
  //hide timer
  document.getElementById("timer").classList.add("hidden");
  //hide result
  document.getElementById("result").classList.add("hidden");
}

function showQuestionAnswers() {
  //hide intro div
  document.getElementById("introTest").classList.add("hidden");
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
  }
}

//timer
function startTimer() {
  //call showQuestionsAnswers function
  showQuestionAnswers();
  //show the timer element
  document.getElementById("timer").classList.remove("hidden");
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    //check if there is time left
    if (timerCount >= 0) {
      //if there are there is time left, text if win conditions are met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
      }
    } else {
      //if there is no time left, user loses. call endGame function
      endGame(0);
    }
    //checkTime();
  }, 1000);
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
  //calls function to hide question, answer, and timer divs
  hideQuestionAnswersResultTimerDivs();
  if (isWin) {
    //add final score to the span
    document.getElementById("finalScore").innerHTML = timerCount;
    //add final score to form
    document.getElementById("initialsForm").innerHTML = timerCount;
    //show wonGame div
    document.getElementById("wonGame").classList.remove("hidden");
  } else {
    //show lostGame div
    document.getElementById("lostGame").classList.remove("hidden");
  }
}

//To Do: High Scores Page

//Show High Scores
//button to Go Back
//button to Clear High Scores//

//initialization//
startButton.addEventListener("click", startTimer);

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
