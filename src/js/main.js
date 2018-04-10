const questionDiv = document.querySelector(".question");
const answerDiv = document.querySelector(".answer");
const teasers = [];

const getTeasers = () => {
  return new Promise((resolve, reject) => {
    $.getJSON("./teasers.json", function() {
      console.log("loading success");
    })
      .done(data => {
        resolve(teasers.push(...data));
      })
      .fail(() => {
        reject(console.log("Could not get teaser JSON data"));
      });
  });
};

const getRandomTeaser = () => {
  return teasers[Math.floor(Math.random() * teasers.length)];
};

const writeQuestion = question => {
  questionDiv.innerHTML = question;
};

const writeAnswer = answer => {
  answerDiv.innerHTML = answer;
};

const toggleAnswer = () => {
  $(".answer").toggle();
  $("#answerButton, #reloadButton").toggle();
};

const nextQuestion = () => {
  renderQuestion();
};

const renderQuestion = () => {
  $.when(getTeasers())
    .done(() => {
      let randomTeaser = getRandomTeaser();
      if (randomTeaser) {
        writeQuestion(randomTeaser.question);
        writeAnswer(randomTeaser.answer);
      }
    })
    .fail(() => {
      console.log("one or more requests failed.");
    });
};

renderQuestion();
