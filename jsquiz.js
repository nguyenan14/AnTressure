(function () {
  var questions = [
    {
      img: "https://an-tressure.herokuapp.com/q1.png",
      question: "What is 2*5?",
      choices: [2, 5, 10, 15, 20],
      correctAnswer: 2,
    },
    {
      img: "https://an-tressure.herokuapp.com/q2.png",
      question: "What is 3*6?",
      choices: [3, 6, 9, 12, 18],
      correctAnswer: 4,
    },
    {
      img: "https://an-tressure.herokuapp.com/q3.png",
      question: "What is 8*9?",
      choices: [72, 99, 108, 134, 156],
      correctAnswer: 0,
    },
    {
      img: "https://an-tressure.herokuapp.com/q4.png",
      question: "What is 1*7?",
      choices: [4, 5, 6, 7, 8],
      correctAnswer: 3,
    },
    {
      img: "https://an-tressure.herokuapp.com/q5.png",
      question: "What is 8*8?",
      choices: [20, 30, 40, 50, 64],
      correctAnswer: 4,
    },
  ];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $("#quiz"); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $("#next").on("click", function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(":animated")) {
      return false;
    }

    // If no user selection, progress is stopped
    if (
        $('input[name="answer"]:checked').val() ==
        questions[questionCounter].correctAnswer
    ) {
        questionCounter++;
        displayNext();
    }else {
        shake(document.querySelector('#container'))
    }
  });

  // Click handler for the 'prev' button
  $("#prev").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $("#start").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $("#start").hide();
  });

  // Animates buttons on hover
  $(".button").on("mouseenter", function () {
    $(this).addClass("active");
  });
  $(".button").on("mouseleave", function () {
    $(this).removeClass("active");
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $("<div>", {
      id: "question",
    });

    var header = $("<img src= " + questions[index].img+ " />");
    qElement.append(header);

    var question = $("<p>").append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $("<ul>");
    var item;
    var input = "";
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $("<li>");
      input = '<input type="radio" name="answer" value=' + i + " />";
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }



  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function () {
      $("#question").remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!isNaN(selections[questionCounter])) {
          $("input[value=" + selections[questionCounter] + "]").prop(
            "checked",
            true
          );
        }

        // Controls display of 'prev' button
        if (questionCounter === 0) {
          $("#prev").hide();
          $("#next").show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $("#next").hide();
        $("#prev").hide();
        $("#start").show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {

    score.append(
      "Cherches dans l'armoire et Enjoy!"
    );
    return score;
  }
})();


var shakingElements = [];

var shake = function (element, magnitude = 16, angular = false) {
  //First set the initial tilt angle to the right (+1)
  var tiltAngle = 1;

  //A counter to count the number of shakes
  var counter = 1;

  //The total number of shakes (there will be 1 shake per frame)
  var numberOfShakes = 15;

  //Capture the element's position and angle so you can
  //restore them after the shaking has finished
  var startX = 0,
    startY = 0,
    startAngle = 0;

  // Divide the magnitude into 10 units so that you can
  // reduce the amount of shake by 10 percent each frame
  var magnitudeUnit = magnitude / numberOfShakes;

  //The `randomInt` helper function
  var randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //Add the element to the `shakingElements` array if it
  //isn't already there
  if (shakingElements.indexOf(element) === -1) {
    //console.log("added")
    shakingElements.push(element);

    //Add an `updateShake` method to the element.
    //The `updateShake` method will be called each frame
    //in the game loop. The shake effect type can be either
    //up and down (x/y shaking) or angular (rotational shaking).
    if (angular) {
      angularShake();
    } else {
      upAndDownShake();
    }
  }

  //The `upAndDownShake` function
  function upAndDownShake() {
    //Shake the element while the `counter` is less than
    //the `numberOfShakes`
    if (counter < numberOfShakes) {
      //Reset the element's position at the start of each shake
      element.style.transform = "translate(" + startX + "px, " + startY + "px)";

      //Reduce the magnitude
      magnitude -= magnitudeUnit;

      //Randomly change the element's position
      var randomX = randomInt(-magnitude, magnitude);
      var randomY = randomInt(-magnitude, magnitude);

      element.style.transform =
        "translate(" + randomX + "px, " + randomY + "px)";

      //Add 1 to the counter
      counter += 1;

      requestAnimationFrame(upAndDownShake);
    }

    //When the shaking is finished, restore the element to its original
    //position and remove it from the `shakingElements` array
    if (counter >= numberOfShakes) {
      element.style.transform = "translate(" + startX + ", " + startY + ")";
      shakingElements.splice(shakingElements.indexOf(element), 1);
    }
  }

  //The `angularShake` function
  function angularShake() {
    if (counter < numberOfShakes) {
      console.log(tiltAngle);
      //Reset the element's rotation
      element.style.transform = "rotate(" + startAngle + "deg)";

      //Reduce the magnitude
      magnitude -= magnitudeUnit;

      //Rotate the element left or right, depending on the direction,
      //by an amount in radians that matches the magnitude
      var angle = Number(magnitude * tiltAngle).toFixed(2);
      console.log(angle);
      element.style.transform = "rotate(" + angle + "deg)";
      counter += 1;

      //Reverse the tilt angle so that the element is tilted
      //in the opposite direction for the next shake
      tiltAngle *= -1;

      requestAnimationFrame(angularShake);
    }

    //When the shaking is finished, reset the element's angle and
    //remove it from the `shakingElements` array
    if (counter >= numberOfShakes) {
      element.style.transform = "rotate(" + startAngle + "deg)";
      shakingElements.splice(shakingElements.indexOf(element), 1);
      //console.log("removed")
    }
  }
};

