//Pseudocoding with Scott during office hours//

//Global Variables//
const startButton = document.getElementById("start");
const questionsDiv = document.getElementById("questions");
const answersDiv = document.getElementById("answers");
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

//functions//
function startGame() {
  //hide introTest div
  document.getElementById("introTest").style.display = "none";
  //show first question with answer
  questionsDiv.innerHTML = questions[0].title;

  //loop through answers
  questions[0].answers.forEach((answer) => {
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

//other functions we'll need
//answer click function (function that will check the answer)
function answerClick() {
  var clickedAnswer = this.value;

  if (clickedAnswer === questions[0].correct) {
    alert("You got the right answer!");
  } else {
    alert("You got the wrong answer");
  }
}
//timer

//end quiz - enter initials to go with high score
//save high score

//initialization//
startButton.addEventListener("click", startGame);

/* My first crack at pseudocoding
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


//Start Button//
//starts timer in top right of screen//
//presents Question 1//

//User Answers Question 1//
if (questionRight) {
  //inform user is correct//
  //move to next question//
} else {
  //inform user is wrong//
  //subtract time from clock//
  //move to next question//
}

//check if time = 0//
if (time > 0) {
  //move on to next question
} else {
  //send to Game Over
}

//User Answers Last Question
if (questionRight) {
  //inform user is correct//
  //send to Game Over//
} else {
  //inform user is wrong//
  //subtract time from clock//
  //send to Game Over//
}

//Game Over//
//prompt to enter initials//
//buttom to submit and send to High Scores Page//

//High Scores Page//
//Show High Scores//
//button to Go Back//
//button to Clear High Scores//
*/
