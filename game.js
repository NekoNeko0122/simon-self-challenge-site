var level = 0;
gamePattern = [];
userClickedPattern = [];
gameStarted = false;
timeOutId = null;

buttonColors = ["red", "blue", "green", "yellow"];

$(".btn").on("click", function(){
    var userChosenColor = this.id;
    flashClick(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    setTimeout(function(){
        $("#" + userChosenColor).removeClass("pressed")}, 10
    );
    if ($("h1").text() === "Press A Key to Start" || $("h1").text() === "Game Over, Press Any Key to Start") {
        wrongAnswer();
    }
    if (userClickedPattern.length > 0) {
        checkAnswer(level);
        console.log("check answer");
    }
})

// if ($("h1").text() === "Press A Key to Start" || $("h1").text() === "Game Over, Press Any Key to Start") {
//     $(document).on("keypress", function(){
//         nextSequence();
//         console.log("keypressed");
//     })
// } 

$(document).on("keypress", function() {
    if (!gameStarted || gameover) {
        gameStarted = true;
        gameOver = false;
        nextSequence();
        console.log("keypressed");
    }
})

function nextSequence() {
    level++;
    var randomNumber = Math.floor((Math.random())*4);
    $("h1").text("Level " + level);

    var newColor = buttonColors[randomNumber];
    playSound(newColor);
    flashClick(newColor);
    gamePattern.push(newColor);

    console.log("next sequence called");

}

function checkAnswer(level) {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]){
        console.log("korek");
        
        if (userClickedPattern.length === level) {
            userClickedPattern = [];
            if (timeOutId) {
                clearTimeout(timeOutId);
            }

            timeOutId = setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {
        wrongAnswer();
    }
  
}

function wrongAnswer() {
    playSound("wrong");
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    gameStarted = false;
    $("h1").text("Game Over, Press Any Key to Start");

    if (timeOutId) {
        clearTimeout(timeOutId);
    }
}

function flashClick(currentColor) {
    $("#" + currentColor).fadeOut(50).fadeIn(50);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
}

function playSound(soundId){
    new Audio("sounds/" + soundId + ".mp3").play();
}
