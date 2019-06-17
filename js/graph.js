/* Affichage du graphique */
var chart; // Maintient une instance du graphique
var chartSVG; // Maintient une instance de l'image et de ses données

nv.addGraph(function () {
  chart = nv.models.scatterChart()

  chart.xAxis.tickFormat(d3.format('.02f'));
  chart.yAxis.tickFormat(d3.format('.02f'));
  chart.showLegend(false);
  //chart.interactive(false);
  //chart.showXAxis(false);
  //chart.showYAxis(false);

  chartSVG = d3.select('#chart svg')
    .datum(generateCorrelatedSample());

  chartSVG
    .transition()
    .duration(500)
    .call(chart);

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
  trueR = 2 * Math.random() - 1;
  var meanVector = [0, 0];
  var covarianceMatrix = [
    [1.0, trueR],
    [trueR, 1.0],
  ];
  var distribution = window.MultivariateNormal.default(meanVector, covarianceMatrix);

  console.log(trueR);

  // Récupération des coordonnées
  var coordinates = [];
  coordinates.push({
    color: "#009bb9",
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
var lives = 3;
var score = 0;

function checkAnswer() {
  var guessedR = Number(document.getElementById("guessedR").value).toFixed(2);
  var roundedR = trueR.toFixed(2);

  if (isNaN(guessedR) || Math.abs(guessedR) > 1) {
    alert("Vous devez spécifier une valeur numérique entre -1 et 1 !")
  } else {
    if (guessedR === roundedR) {
      score += 10;
      lives += 2;
      document.getElementById("replyText").innerText = "Félicitations !";
      document.getElementById("score").innerText = score;
      document.getElementById("lives").innerText = lives;
    } else if (guessedR <= roundedR + 0.05 && guessedR >= roundedR - 0.05) {
      score += 5;
      lives += 1;
      document.getElementById("lives").innerText = lives;
      document.getElementById("score").innerText = score;
      document.getElementById("replyText").innerText = "Bravo !";
    } else if (guessedR <= roundedR + 0.1 && guessedR >= roundedR - 0.1) {
      score += 1;
      document.getElementById("lives").innerText = lives;
      document.getElementById("score").innerText = score;
      document.getElementById("replyText").innerText = "Peut mieux faire ;)";
    } else {
      lives -= 1;
      document.getElementById("lives").innerText = lives;
      document.getElementById("replyText").innerText = "Raté ! :(";
    }

    if (lives === 0) {
      document.getElementById("lives").innerText = "Game Over"
    }

    updateGraph()
  }
}

function checkKeyPress(event) {
  event = event || window.event;
  if (event.keyCode === 13) {
    checkAnswer();
  }
}