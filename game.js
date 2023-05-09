var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern=[];
var started = false;
var level =0;


    $(document).on("keydown", function () {
    
        if (!started) {
            nextSequence();
            started = true;
        }
    });
$(".btn").click (function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);  
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 120);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
        if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            if (userClickedPattern.length === gamePattern.length){
                setTimeout(function (){
                    nextSequence();
                },1000);
            }
        }
        else{
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            playSound("wrong");
            $("#level-title").html("GAME OVER <br> Press any key to restart");
            startOver();
        }
    }

function startOver(){
    level = 0;
    gamePattern = [];
    started=false;
}
