var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

// only when not started yet
$(document).on("keydown", function () {
  if (!gameStarted) {
    gameStarted = true;
    $("h1").text("Level " + level);

    //start a bit delayed
    setTimeout(function () {
      gameRound();
    }, 300);
  }
});
// only when not started yet
$("button").on("click", function () {
  if (!gameStarted) {
    gameStarted = true;
    $("h1").text("Level " + level);

    //start a bit delayed
    setTimeout(function () {
      gameRound();
    }, 300);
  }
  $("button").hide();
});

//when a user clicks a button
$(document).on("click", ".btn", function (e) {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor, 100);

  //needs to select last item of array, so length -1
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (
    userClickedPattern[currentLevel] === gamePattern[currentLevel] &&
    gameStarted
  ) {
    console.log("well done");
    if (currentLevel + 1 === level) {
      gameRound();
    }
  } else if (gameStarted) {
    console.log("oops");
    // game over, play sound and set color and h1
    setTimeout(function () {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("h1").text("GAME OVER! Press any key to restart");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
        $("button").show();
      }, 200);
    }, 300);
    //restart game
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
  }
}

function gameRound() {
  //reset user
  userClickedPattern = [];
  //next level
  level++;
  $("h1").text("Level " + level);

  //find color
  var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  //add to array
  gamePattern.push(randomChosenColor);
  patternIndex = 0;

  timerFunction = function () {
    animatePress(gamePattern[patternIndex], 200);
    playSound(gamePattern[patternIndex]);
    patternIndex += 1;

    if (patternIndex < gamePattern.length) {
      setTimeout(timerFunction, 500);
    }
  };

  setTimeout(timerFunction, 500);
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(name, time) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, time);
}
