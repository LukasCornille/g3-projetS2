/* Affichage du graphique */
var chart; // Maintient une instance du graphique
var chartSVG; // Maintient une instance de l'image et de ses données

nv.addGraph(function () {
  chart = nv.models.scatterChart()
    .showLegend(false)
    .pointShape("circle")
    .pointRange([50, 50]);

  chart.xAxis.ticks(0).tickFormat(d3.format('.01f'));
  chart.yAxis.ticks(0).tickFormat(d3.format('.01f'));
  chart.tooltip.enabled(false);
  //chart.interactive(false);

  chartSVG = d3.select('#correlatedChart svg')
    .datum(generateCorrelatedSample());

  chartSVG
    .transition()
    .duration(500)
    .call(chart)

  nv.utils.windowResize(chart.update);

  return chart;
});

function updateGraph() {
  chartSVG
    .datum(generateCorrelatedSample())
    .transition()
    .duration(500)
    .call(chart);

  nv.utils.windowResize(chart.update);
}

/* Calcul du graphique */
var trueR;

function generateCorrelatedSample() {
  // Calcul de la série de données
  trueR = Math.random();
  var meanVector = [0, 0];
  var covarianceMatrix = [
    [1.0, trueR],
    [trueR, 1.0],
  ];
  var distribution = window.MultivariateNormal.default(meanVector, covarianceMatrix);

  // Récupération des coordonnées
  var coordinates = [];
  coordinates.push({
    color: "#8F3433",
    values: []
  });

  for (var i = 0; i < 250; i++) {
    var currentSample = distribution.sample();
    coordinates[0].values.push({
      x: currentSample[0],
      y: currentSample[1]
    });
  }

  return coordinates;
}

/* Récupération de la réponse utilisateur et calcul du score */
var lives = 3,
  score = 0,
  streak = 0,
  meanError = 0,
  n = 0;

function calcMeanError(guessedR, roundedR) {
  meanError += Math.abs(guessedR - roundedR) / n;
  document.getElementById("meanError").innerText = meanError.toFixed(2);
}

function addScore(scoreToAdd, streak, messageToDisplay) {
  score += scoreToAdd + streak;
  document.getElementById("replyText").innerText = messageToDisplay;
  document.getElementById("streak").innerText = streak;
  document.getElementById("score").innerText = score;
}

function addLives(value) {
  for (i = 0; i < value; i++) {
    if (!(lives === 4)) {
      lives += 1;
      document.getElementById("life" + lives).setAttribute("class", "fa fa-heart");
    }
  }
}

function removeLives(value) {
  for (i = 0; i < value; i++) {
    document.getElementById("life" + lives).setAttribute("class", "fa fa-heart-o");
    lives -= 1;
  }
}

function checkAnswer() {
  var guessedR = document.getElementById("guessedR").value,
    roundedR = Number(trueR.toFixed(2));

  if (guessedR === roundedR) {
    streak += 1;
    addScore(10, streak, "Félicitations !");
    addLives(2);
  } else if (guessedR <= roundedR + 0.05 && guessedR >= roundedR - 0.05) {
    streak += 1;
    addLives(1);
    addScore(5, streak, "Bravo !");
  } else if (guessedR <= roundedR + 0.10 && guessedR >= roundedR - 0.1) {
    streak = 0;
    addScore(1, streak, "Peut mieux faire ;)");
  } else {
    removeLives(1);
    document.getElementById("replyText").innerText = "Raté ! :(";
  }

  if (lives >= 4) {
    //document.getElementById("lives").innerText = "4"
  }

  if (lives <= 0) {
    document.getElementById("game").setAttribute("hidden", "");
    document.getElementById("game-over").removeAttribute("hidden");
    document.getElementById("result").innerText = "Bien joué, vous avez fait un score de " + score + " points ! Saisissez votre pseudo pour ajouter votre score au classement :";
    document.userScore.userScore.value = score;
  }

  n += 1;
  calcMeanError(guessedR, roundedR);
  updateGraph()
}

function checkKeyPress(event) {
  event = event || window.event;
  if (event.keyCode === 13) {
    checkAnswer();
  }
}

function redirectToRules() {
  if (confirm("Attention, cela va entraîner l'arrêt de cette partie. Voulez-vous continuer ?")) {
    window.location.href = "rules.html";
  }
}

function redirectToMenu() {
  if (confirm("Attention, cela va entraîner l'arrêt de cette partie. Voulez-vous continuer ?")) {
    window.location.href = "menu.html";
  }
}