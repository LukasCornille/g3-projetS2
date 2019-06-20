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

  console.log(trueR);

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
  score = 0;

function checkAnswer() {
  var guessedR = Number(document.getElementById("guessedR").value).toFixed(2) / 100,
    roundedR = Number(trueR.toFixed(2));

  var life_full = document.createElement("img");
  life_full.setAttribute("src", "assets/life_full.png");
  life_full.setAttribute("width", "50px");
  life_full.setAttribute("height", "50px");

  var life_empty = document.createElement("img");
  life_empty.setAttribute("src", "assets/life_empty.png");
  life_empty.setAttribute("width", "50px");
  life_empty.setAttribute("height", "50px");

  if (guessedR === roundedR) {
    score += 10;
    document.getElementById("replyText").innterText = "Félicitations !";
    document.getElementById("score").innerText = score;
    lives += 1;
    document.getElementById("life" + lives).src = "assets/life_full.png";
    lives += 1;
    document.getElementById("life" + lives).src = "assets/life_full.png";
  } else if (guessedR <= roundedR + 0.05 && guessedR >= roundedR - 0.05) {
    score += 5;
    lives += 1;
    document.getElementById("life" + lives).src = "assets/life_full.png";
    document.getElementById("score").innerText = score;
    document.getElementById("replyText").innerText = "Bravo !";
  } else if (guessedR <= roundedR + 0.10 && guessedR >= roundedR - 0.10) {
    score += 1;
    //document.getElementById("lives").innerText = lives;
    document.getElementById("score").innerText = score;
    document.getElementById("replyText").innerText = "Peut mieux faire ;)";
  } else {

    document.getElementById("life" + lives).src = "assets/life_empty.png";
    lives -= 1;
    document.getElementById("replyText").innerText = "Raté ! :(";
  }

  if (lives >= 4) {
    //document.getElementById("lives").innerText = "4"
  }

  if (lives <= 0) {
    //
  }

  updateGraph()
}

function checkKeyPress(event) {
  event = event || window.event;
  if (event.keyCode === 13) {
    checkAnswer();
  }
}