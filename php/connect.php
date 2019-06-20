<?php
    function connect(){
        $idcon = mysql_connect('localhost', 'root', '');  
        $statcon = mysql_select_db('guessr', $idcon);
    }
?>
