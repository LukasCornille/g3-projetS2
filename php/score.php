

<?php 
        $pseudo = $_POST['pseudo'];
        $score = $_POST['score'];
        $req ="INSERT INTO stockage (pseudo, score) VALUES('".$pseudo."','".$score."')";
        mysql_query($req);
?>