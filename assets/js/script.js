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
