<?php
        function connect(){
                $id_con = mysql_connect('localhost', 'root', '');  
                $stat_con = mysql_select_db('guessr', $id_con);
        }
        connect(); 
        mysql_query("DROP TABLE IF EXISTS classement");
        mysql_query("CREATE TABLE classement as
        SELECT PSEUDO, SCORE
        FROM stockage
        ORDER BY SCORE DESC
        LIMIT 10;");
        $test = mysql_query("SELECT * FROM classement");
        echo "<table>";
        while($data = mysql_fetch_array($test)) {
          echo "<tr><td>".$data[0]."</td><td>".$data[1]."</td></tr>";
        }
        echo "</table>";
?>