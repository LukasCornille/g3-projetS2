<!DOCTYPE html>
<html lang="fr" dir="ltr">

<head>
  <title>Game Over | GuessR</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/scatterchart.css">
  <link rel="stylesheet" href="css/nv.d3.css">
  <link rel="stylesheet" href="css/about.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/font-awesome.min.css">
  <link rel="shortcut icon" type="image/x-icon" href="assets/favicon.ico">
  <script src="js/d3.min.js"></script>
  <script src="js/nv.d3.min.js"></script>
  <script src="js/multivariate-normal.min.js"></script>
  <script src="js/graph.js"></script>

</head>

<body>
<div id="game-over" class="container">
    <div class="row">
      <div id="game-over-logo" class="row mx-auto">
        Game Over
      </div>
    </div>

    <div class="row">
      <div id="result" class="mx-auto">
        <p class="text-center">
          Bien joué, vous avez fait un score de X points ! Saisissez votre pseudo pour ajouter
          votre score au classement !
        </p>
        <form name="userScore" method="post">
          <div class="form-row align-items-center">
            <div class="col">
              <label class="sr-only" for="pseudo">Pseudo</label>
              <div class="input-group">
                <input type="text" class="form-control" id="pseudo" placeholder="Pseudo">
                <input type="text" class="sr-only">
              </div>
            </div>
            <div class="col-auto my-1">
              <button type="submit" class="btn btn-primary">Envoyer</button>
            </div>
          </div>
        </form>
        <?php 
          $pseudo = $_POST['pseudo'];
          $score = $_POST['score'];
          $req ="INSERT INTO stockage (pseudo, score) VALUES('".$pseudo."','".$score."')";
          mysql_query($req);
        ?>
        <p></p>
      </div>
    </div>

    <div id="ranking" class="row">
        <?php
          function connect(){
                  $conn = mysql_connect('localhost', 'root', '');  
                  $statcon = mysql_select_db('guessr', $conn);
          }
          connect(); 
          mysql_query("DROP TABLE IF EXISTS classement");
          mysql_query("CREATE TABLE classement as
          SELECT PSEUDO, SCORE
          FROM stockage
          ORDER BY SCORE DESC
          LIMIT 10;");
          $test = mysql_query("SELECT * FROM classement LIMIT 3");
          $i = 0;
          echo "<table class='table table-hover'><thead><tr><th scope='col'>#</th><th scope='col'>Pseudo</th><th scope='col'>Score</th></tr></thead>";
          while ($data = mysql_fetch_array($test)) {
              if ($i == 0) {
                  echo "<tr><th scope='row'><i class='fa fa-trophy' style='color:gold;'></i></th>"."<td>".$data[0]."</td><td>".$data[1]."</td></tr>";
              }
              elseif ($i == 1) {
                  echo "<tr><th scope='row'><i class='fa fa-trophy' style='color:silver;'></i></th>"."<td>".$data[0]."</td><td>".$data[1]."</td></tr>";
              }
              elseif ($i == 2) {
                  echo "<tr><th scope='row'><i class='fa fa-trophy' style='color:brown;'></i></th>"."<td>".$data[0]."</td><td>".$data[1]."</td></tr>";
              }
              $i++;
          }
          echo "</tbody></table>";
        ?>
      </div>
      
      <div class="row">
        <div id="main-menu" class="mx-auto">
        <span><a href="game.html">Rejouer</a></span>
        <span><a href="menu.html">Menu principal</a></span>
      </div>
    </div>
  </div>
</body>

</html>