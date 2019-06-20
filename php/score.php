<?php 
        $PSEUDO = $_POST['pseudo'];
        $SCORE = $_POST['score'];
        $strSQL ="INSERT INTO stockage (PSEUDO, SCORE) Values('".$PSEUDO."','".$SCORE."')";
?>