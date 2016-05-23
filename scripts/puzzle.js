//1. Souhaiter la bienvenue au joueur, lui proposer de jouer
//2. Le laisser selectionner une categorie (la selection s'effectue sur l'ecran d'accueil)
//3. Demarrer a la suite les images de cette categorie
//4. Pour chaque image
//	4.1. Afficher le puzzle
//	4.2. Si le puzzle est resolu afficher la description complete et le bouton "suivant"
//5. Si la derniere image est resolue, afficher l'ecran de fin  du jeu

if(typeof puzzle == 'undefined' )
{
	var puzzle = {  
			blockSize:80,
			piecesArray:[],
			hour_regex: new RegExp("^([0-9]+):([0-5][0-9])$")
	};

	puzzle.Rectangle = function(left, top, width, height)  
	{  
	    this.left = left * width;  
	    this.top  = top * height;
	    
	    this.right = this.left + width;  
	    this.bottom = this.top + height;
	    
	    this.width = width;  
	    this.height = height;            
	};

	//Fisher-Yates Algorithm
	puzzle.scramble = function ()
	{
		var	i = puzzle.piecesArray.length,
			j,
			tmp;
		
		if(i == 0)
			return;
		
		while(--i)
		{
			j=Math.floor(Math.random()*(i+1));
			tmp=puzzle.piecesArray[i];
			puzzle.piecesArray[i] = puzzle.piecesArray[j];
			puzzle.piecesArray[j] = tmp;
		}
	};
	
	puzzle.draw = function ()
	{
		var r;
		
		for(var i=0; i<5; i++) 
		{  
			for(var j=0; j<5; j++)
			{
				r = puzzle.piecesArray[i*5+j];
				puzzle.ctx.drawImage(puzzle.img, r.left, r.top, r.width, r.height, 
					i*puzzle.blockSize, j*puzzle.blockSize, puzzle.blockSize, puzzle.blockSize);
			}  
		}  
	};
	
	puzzle.chrono = function ()
	{
		var chrono=document.getElementById("jeu_chrono"),
			result=puzzle.hour_regex.exec(chrono.value),
			minutes=+(result[1]),
			seconds=+(result[2]);
		
		seconds+=(minutes*60);
		seconds++;
		
		minutes=Math.floor(seconds/60);
		seconds%=60;
		
		if(minutes<10)
			minutes="0"+minutes;
		if(seconds<10)
			seconds="0"+seconds;

		chrono.value=minutes+":"+seconds;
	};
	
	puzzle.action = function()
	{
		//Initialiser ce qui doit l'etre
		
		//Le compteur de coups
		if(document.getElementById("jeu_compteur_coups").value === "")
			document.getElementById("jeu_compteur_coups").value=0;
			
		puzzle.counter= +(document.getElementById("jeu_compteur_coups").value);
		
		//Le chronometre
		if(document.getElementById("jeu_chrono").value === "")
			document.getElementById("jeu_chrono").value="00:00";
		
		//Le canvas
		puzzle.can = document.getElementById("jeu_puzzle"); 
			
		puzzle.ctx = puzzle.can.getContext('2d');
		puzzle.ctx.lineWidth = 2;
		puzzle.ctx.strokeStyle = "#ff0000"; 

		//Le resume preliminaire
		puzzle.resume=document.getElementById("AreaDescription");
		//La description
		puzzle.descript=document.getElementById("textegagnant");
		
		//Tester la presence de l'image
		puzzle.img = document.getElementById("jeu_image");
		if (puzzle.img == undefined) 
			return;  
			
		for(var i=0; i<5; i++)
			for(var j=0; j<5; j++)
				puzzle.piecesArray.push(new puzzle.Rectangle(i, j, puzzle.blockSize, puzzle.blockSize));
		
		//Lancer le chrono
		puzzle.timer=setInterval(puzzle.chrono,1000);	
		
		//Le bouton suivant (encore en option)
		document.getElementById("jeu_suivant").className="masquee";
		
		//Le resume preliminaire(encore)
		puzzle.resume.className="AreaDescription";
		//La description(encore)
		puzzle.descript.className="masquee";
		
		puzzle.scramble();
		puzzle.draw();
	};
	
	puzzle.isSolved = function ()
	{
		for(var i=0; i<5; i++)
			for(var j=0; j<5; j++)
				if(	(puzzle.piecesArray[i*5+j].left !== i*puzzle.blockSize)
				||	(puzzle.piecesArray[i*5+j].top !== 	j*puzzle.blockSize))
					return false;
			
		return true;
	};
	
	puzzle.swap = function ()
	{
		var tmp = puzzle.piecesArray[puzzle.selected1];
		
		puzzle.piecesArray[puzzle.selected1]=puzzle.piecesArray[puzzle.selected2];
		puzzle.piecesArray[puzzle.selected2]=tmp;
		
		puzzle.counter++;
		document.getElementById("jeu_compteur_coups").value=puzzle.counter;
	};
	
	puzzle.highlight = function (drawX, drawY)
	{
		puzzle.ctx.strokeRect(drawX, drawY, puzzle.blockSize, puzzle.blockSize);  
	};

	puzzle.slot_clic_jeu_puzzle = function (event)
	{
		if(!event.hasOwnProperty('offsetX'))
		{
			puzzle.clickX = event.layerX - event.currentTarget.offsetLeft;
			puzzle.clickY = event.layerY - event.currentTarget.offsetTop;
		}
		else
		{
			puzzle.clickX = event.offsetX;  
			puzzle.clickY = event.offsetY;  
		}
		
		var	drawX         = Math.floor(puzzle.clickX/puzzle.blockSize),
			drawY         = Math.floor(puzzle.clickY/puzzle.blockSize),
			index         = drawX * 5 + drawY,
			drawHighlight = true;
			
			drawX *= puzzle.blockSize;
			drawY *= puzzle.blockSize;
			
		puzzle.ctx.clearRect(0, 0, 400, 400);
		
		if(puzzle.selected1 != undefined && puzzle.selected2 != undefined)
		{  
        	puzzle.selected1 = puzzle.selected2 = undefined;
        }
        
        if(puzzle.selected1 == undefined)
        {  
        	puzzle.selected1 = index;
        }
        else
		{  
	        puzzle.selected2 = index;  
	        puzzle.swap();
	        drawHighlight = false;
		}
		
		if(puzzle.isSolved())
	    {
	    	clearInterval(puzzle.timer);
	    	//masquer le resume preliminaire
			puzzle.resume.className="masquee";
			//afficher la description
			puzzle.descript.className="textegagnant";
			
			//---------Champou-------------je veux modifier son code ici
				var xhrjeu_chrono = new XMLHttpRequest();
				//premier essai
				document.getElementById('jeu_chrono').innerHTML = xhrjeu_chrono.responseText
				xhrjeu_chrono.open('POST', 'main.php');
				xhrjeu_chrono.send(null);
				// pas fonctionner
				
				//deuxième				
				var variable = chrono.value;
				document.getElementById('jeu_chrono').value = variable;
			//--fin de mon ajout--
		
	    };
   
    	puzzle.draw();  
              
	    if(drawHighlight)     
	        puzzle.highlight(drawX, drawY);

	};
}
else
{
	alert("la variable 'puzzle' existe!");
}