<?php
	require_once('Connections/cnx229tourism.php');
	
 if (isset($_POST['IdImgLieu'])||isset($_POST['emailjoueur'])||isset($_POST['date'])||isset($_POST['score']))
	{
	$requete4 = "INSERT INTO parties( IdLieu, email, datejeu, score) VALUES (:IdImgLieu, :emailjoueur, :datejeu, :score)";
	$resultat4 = mysql_query($requete4);
	//header('Location: main.php');
	 }
	 else{
		 echo 'Pas de partie jouée ou reconnectez-vous avec votre identifiant gmail';
		 }
	// Effectuer ici la requête qui insère le message
	// Puis rediriger vers main.php comme ceci :

?>