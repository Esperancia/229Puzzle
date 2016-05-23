<?php require_once('Connections/cnx229tourism.php'); ?>

<?php
if (!function_exists("GetSQLValueString")) {
    function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "")
    {
        if (PHP_VERSION < 6) {
            $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
        }

        $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

        switch ($theType) {
            case "text":
                $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
                break;
            case "long":
            case "int":
                $theValue = ($theValue != "") ? intval($theValue) : "NULL";
                break;
            case "double":
                $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
                break;
            case "date":
                $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
                break;
            case "defined":
                $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
                break;
        }
        return $theValue;
    }
}

mysql_select_db($database_cnx229tourism, $cnx229tourism);
$query_rstCategories = "SELECT * FROM categorie";
$rstCategories = mysql_query($query_rstCategories, $cnx229tourism) or die(mysql_error());
$row_rstCategories = mysql_fetch_assoc($rstCategories);
$totalRows_rstCategories = mysql_num_rows($rstCategories);
?>

<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>229CloudTourism</title>
    <meta name="description" 
    content="bonjour <?php if(isset($_REQUEST['jeu_chrono']))
	{echo 'J'; echo 'ai résolu le puzzle en'.$_REQUEST['jeu_chrono'];}?>" 
    />

    <link href="css/styles.css" rel="stylesheet" type="text/css" />

    <link href="SpryAssets/SpryTabbedPanels.css" rel="stylesheet" type="text/css" />
    <link href="SpryAssets/SpryValidationSelect.css" rel="stylesheet" type="text/css" />
    <script src="SpryAssets/SpryTabbedPanels.js" type="text/javascript"></script>
    <script src="SpryAssets/SpryValidationSelect.js" type="text/javascript"></script>

    <script type="text/javascript" src="scripts/puzzle.js"></script>
</head>

<body  onload="puzzle.action();">
<?php
if(isset($_POST['cat'])){
//si la liste a été "postée" c'est à dire choix fait
    $choix=$_POST['cat'];
//echo $choix;
}else{
    $choix=0;
} ?>

<div class="total">
<table width="800" border="1">
<tr>
<td>
<div class="contenu">
<table align="center">
    <tr>
        <td>
            <div class="banniere"></div>
        </td>
    </tr>
</table>

<table width="700" border="1" align="center">
<tr>
<td>
    <div class="galerie">
        <div id="TabbedPanels1" class="TabbedPanels">
            <ul class="TabbedPanelsTabGroup">
                <li class="TabbedPanelsTab" tabindex="0">Home</li>
                <li class="TabbedPanelsTab" tabindex="1">Instructions</li>
                <li class="TabbedPanelsTab" tabindex="2" id="play">To play</li>
                <li class="TabbedPanelsTab" tabindex="3">About</li>
                <li class="TabbedPanelsTab" tabindex="4">Our thanks</li>
            </ul>

            <div class="TabbedPanelsContentGroup">

                <div class="TabbedPanelsContent">
                    <?php
                    //TODO ce code est complique, virez moi tout xa
                    $fichier=fopen("ressources/systeme/accueil.html","r");
                    while($ligne = fgets($fichier)){
                        //$ligne = fgets($fichier);
                        print $ligne;
                    }
                    fclose($fichier);
                    //ou simplement
                    //$fichier=readfile("ressources/systeme/apropos.html");
                    ?>
                </div>
                <div class="TabbedPanelsContent">
                    <?php
                    $fichier=readfile("ressources/systeme/instructions.html");

                    ?>
                </div>
                <div class="TabbedPanelsContent">
                    <br />
                    <form action="main.php" method="post" name="Choix">
                        <div class="choixCategorie">
                            <table align="center">
                                <tr>
                                    <td><div class="labelChoix">Choisissez une catégorie / Choose category :</div>
                                    </td>
                                    <td>
                                                <span id="spryselect1">
                                                <select name="cat" id="choixCat" onFocus="verifChoixPays();">
                                                    <option value="0">--Choisissez une catégorie--</option>

                                                    <?php
                                                    do {
                                                        ?>
                                                        <option value="<?php echo $row_rstCategories['IdCat']; ?>"
                                                            <?php if ($choix==$row_rstCategories['IdCat']) echo 'selected'; ?>
                                                            >
                                                            <?php echo utf8_encode($row_rstCategories['LibCat']); ?>

                                                        </option>
                                                    <?php } while ($row_rstCategories = mysql_fetch_assoc($rstCategories)); ?>
                                                    <span class="selectRequiredMsg">Choose category.</span>
                                                </select>
                                                </span>
                                    </td>
                                    <td><input name="BtnStart" class="start" type="submit" value="START" />
                                    </td>
                                </tr>
                            </table>

                            <?php
                            //cat est la variable recuperée à la selection du combo
                            if (isset($_POST['cat']))
                            {
                                if ($_POST['cat']==0)
                                {
                                    echo "
										?>
										<script> alert ('Vous n'avez rien choisi!');</script>
										<?php
										";
                                }

                                $catselect=$_POST['cat'];
                                $requete1="SELECT * FROM regrouper WHERE regrouper.IdCat='".$catselect."'";
                                //$requete1->execute(array('CategorieChoisie'=>$catselect));
                                $resultat1 = mysql_query($requete1);
                                $requete2= mysql_query("select count(*) from regrouper WHERE regrouper.IdCat='".$catselect."'");
                                while($resultat2 = mysql_fetch_array($requete2)){$nbrOccurences =$resultat2[0] ;}

                                //echo $catselect;

                                $i=0;
                                while($remplir_tab = mysql_fetch_array($resultat1))
                                {
                                    //notre array (tableau) $nums est crée et rempli ici avec nos données IdLieu
                                    //nouveau code ajouté pour ameliorer
                                    $nums[]=$remplir_tab['IdLieu'];
                                    $i++;

                                }

                                //echo $nbrOccurences;
                                $imgaleatoire= mt_rand(1, $nbrOccurences)-1;
                                //echo $imgaleatoire;//	echo '<br />';


                                foreach($nums as $indice => $element)
                                {
                                    if($indice==$imgaleatoire)
                                    {
                                        //echo $element; 	//echo '<br />';
                                        $requete3 ="SELECT * FROM lieux WHERE lieux.IdLieu='".$element."'";
                                        $resultat3 = mysql_query($requete3);
                                        $imgaafficher = mysql_fetch_array($resultat3);
                                        $resume=$imgaafficher['ResumDesc'];
                                        $image=$imgaafficher['Image'];
										$description=$imgaafficher['Description'];
                                        //echo $resume; //echo $image;
                                    }
                                }



                            }

                            ?>

                        </div>
                    </form method="post">

                    <div id="jeu_statut">
                        <form>
                            <label>Nombre de coups / Moves counter: </label>
                            <input type="text" name="jeu_compteur_coups" id="jeu_compteur_coups" disabled />
                            <input type="text" name="jeu_chrono" id="jeu_chrono" disabled />
                            <input type="submit" value="Suivant" name="jeu_suivant" id="jeu_suivant" class="masquee" disabled />
                        </form>
                    </div>
                    <div class="jeu">
                        <div class="divdescription">
                            <br />
                            <div class="AreaDescription" id="AreaDescription">
                                <?php
                                if(isset($resume))
                                {
                                    $fichier=readfile("$resume");
                                }
                                else echo '';?>
                            </div>
                            <br/>
                            <div class="textegagnant" id="textegagnant">
                                <?php
                                if(isset($description))
                                {
                                    $fichier=readfile("$description");
                                }
								?>
                            </div>
                        </div>

                        <div class="puzzle" >
                            <canvas id="jeu_puzzle" width="400" height="400" onclick="puzzle.slot_clic_jeu_puzzle(event);">
                                Votre navigateur ne supporte pas la balise canvas. Mettez a jour vers un navigateur plus recent. / Your browser does not support the canvas tag. Please upgrade to a more recent browser.
                            </canvas>
                            <?php if(isset($image)) echo '<img src="'.$image.'" id="jeu_image" />'; ?>

                            <!--img src="<?php //if(isset($image)) echo $image; else echo '';?>" id="jeu_image" /--><!--Modifier cette balise par PHP et l'image affichee change egalement-->
                        </div>

                    </div>
                    <table width="200" border="0" align="right">
                        <tr>
                            <td>
                                <form action="partie.php" method="post">
                                    <input name="IdImgLieu" type="hidden" value="<?php if(isset($_POST['IdImgLieu'])) echo $IdImgLieu; else echo 'Pas de partie en cours';?>" />
                                    <input name="emailjoueur" type="hidden" value="<?php if(isset($_POST['emailjoueur'])) echo $IdImgLieu;?>"/>
                                    <input name="date" type="hidden" value=""
                                        />
                                    <input name="score" type="hidden" value="" />

                                    <!--input name="BtnStart" type="submit" class="start" value="Save your current score" /-->
                                    <div class="g-plus" data-action="share" href="#"></div>
                                </form>
                            </td>
                        </tr>
                    </table>

                </div>

                <div class="TabbedPanelsContent">
                    <?php
                    $fichier=readfile("ressources/systeme/apropos.html");
                    ?>
                </div>
                <div class="TabbedPanelsContent">
                    <?php
                    $fichier=readfile("ressources/systeme/remerciements.html");
                    ?>
                </div>
            </div>
        </div>
    </div>
</td>
</tr>
</table>

</div>
</td>
</tr>
</table>
</div>
<script type="text/javascript">
    var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels1");
    var spryselect1 = new Spry.Widget.ValidationSelect("spryselect1");
</script>
<script>
    function verifChoixPays()
    {
        if(document.layers)
        {
            var formulaire = document.forms.monFormulaire;
        }
        else
        {
            var formulaire = document.monFormulaire;
        }
        if (formulaire.choixPays.value == "0")
        {
            alert('Vous devez tout d\'abord choisir un pays!');
            formulaire.choixPays.focus();
        }
        else
        {
            //le reste des traitements, qui n'ont pas lieu d'être ici
        }
    }
</script>
<script type="text/javascript">
    (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();
</script>

<script src="https://apis.google.com/js/plusone.js"></script>

</body>
</html>
<?php
mysql_free_result($rstCategories);
?>
