
const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function() { 
    
    if(!started) {

        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;

    }

});

$('.btn').click(function(/*event*/) {

    /* First way to get the button id clicked vanilla JS */
    //let userChosenColour = event.target.id;
    /* Second way to get the button id clicked with vanilla JS */
    //let userChosenColour = this.id;
    /* Third way to get the button id clicked with jQuery */
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); //Return de last element an array

});

function nextSequence() {

    userClickedPattern = [];

    level++;

    $('#level-title').text('Level ' + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];    
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {

    let audio = new Audio(`/sounds/${name}.mp3`);
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass('pressed');
    setTimeout(function() { 
        $("#" + currentColour).removeClass('pressed');
    }, 100)

}

function checkAnswer(currentLevel) {
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function() {
                nextSequence();
            },1000);

        }

    } else {
        
        playSound("wrong");
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('h1').text('Game Over, Press Any Key to Restart');

        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}