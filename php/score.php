<!DOCTYPE html>
<html lang="fr" dir="ltr">
    
<head>
    <title>Merci d'avoir joué ! | GuessR</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../css/about.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/font-awesome.min.css">
    <link rel="shortcut icon" type="image/x-icon" href="../assets/favicon.ico">
</head>

<body>
<div class="container">
        <div class="row">
                <?php 
                        function connect(){
                                $idcon = mysql_connect('localhost', 'root', '');  
                                $statcon = mysql_select_db('guessr', $idcon);
                        } 
                        connect(); 
                        $pseudo = !empty($_POST['pseudo']) ? $_POST['pseudo'] : 'Anonymous';
                        $score = $_POST['userScore'];
                        $req ="INSERT INTO stockage (pseudo, score) VALUES('".$pseudo."','".$score."')";
                        mysql_query($req);
                        if (mysql_query($req)) {
                                echo "Merci d'avoir joué !";
                        }
                ?>
        </div>
        <div class="row">
                <h1>Classement</h1>
                <div class="table-responsive">
                        <?php
                                connect();
                                mysql_query("DROP TABLE IF EXISTS classement");
                                mysql_query("CREATE TABLE classement as
                                SELECT PSEUDO, SCORE
                                FROM stockage
                                ORDER BY SCORE DESC
                                LIMIT 10;");
                                $test = mysql_query("SELECT * FROM classement");
                                $i = 1;
                                echo "<table class='table table-hover'><thead><tr><th scope='col'>#</th><th scope='col'>Pseudo</th><th scope='col'>Score</th></tr></thead>";
                                while ($data = mysql_fetch_array($test)) {
                                        if ($i == 1) {
                                        echo "<tr><th scope='row'><i class='fa fa-trophy' style='color:gold;'></i></th>"."<td>".$data[0]."</td><td>".$data[1]."</td></tr>";
                                        }
                                        elseif ($i == 2) {
                                        echo "<tr><th scope='row'><i class='fa fa-trophy' style='color:silver;'></i></th>"."<td>".$data[0]."</td><td>".$data[1]."</td></tr>";
                                        }
                                        elseif ($i == 3) {
                                        echo "<tr><th scope='row'><i class='fa fa-trophy' style='color:brown;'></i></th>"."<td>".$data[0]."</td><td>".$data[1]."</td></tr>";
                                        }
                                        else {
                                        echo "<tr><th scope='row'>".$i."</th>"."<td>".$data[0]."</td><td>".$data[1]."</td></tr>";
                                        }
                                        $i++;
                                }
                                echo "</tbody></table>";
                        ?>
                </div>
        </div>
        <div class="row">
                <div id="small-menu" class="mx-auto">
                        <span><a href="game.html">Rejouer</a></span>
                        <span><a href="menu.html">Menu principal</a></span>
                </div>
        </div>
</div>
</body>

</html>

