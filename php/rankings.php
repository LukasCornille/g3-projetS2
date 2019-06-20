<?php
        function connect(){
                $conn = mysql_connect('localhost', 'root', '');  
                $statcon = mysql_select_db('guessr', $conn);
                if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                } 
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