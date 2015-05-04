<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true" hebergeur gratuit en ligne:http://www.db4free.net/
//353162
$hostname_cnx229tourism = "localhost"; //"db4free.net"; //"localhost";
$database_cnx229tourism = "229tourisme"; // database 229tourisme or b229tourisme
$username_cnx229tourism = "root";//arwyn
$password_cnx229tourism = "";//esperancia
$cnx229tourism = mysql_pconnect($hostname_cnx229tourism, $username_cnx229tourism, $password_cnx229tourism) or trigger_error(mysql_error(),E_USER_ERROR);
?>