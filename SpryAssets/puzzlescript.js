/*********************************************************************************************
* Script Original - Papasti - http:\\le-blog-facile.ek.la                                    *
* Veuillez laisser la rï¿½fï¿½rence ï¿½ l'auteur si vous utilisez ce script                        *
*********************************************************************************************/
function GetDomOffset( Obj, Prop ) 
{
    var iVal = 0;
    eval('iVal += Obj.' + Prop + ';');
        return iVal;
}
function GetDom2( Obj, Prop ) {
    var iVal = 0;
    while (Obj && Obj.tagName != 'BODY') {
        eval('iVal += Obj.' + Prop + ';');
        Obj = Obj.offsetParent;
    }
    return iVal;
}
function move(col,lig)
{var lig2;var col2;

var done=0;
if (col!=4){if (grillemod[lig][col+1] == 25){lig2=lig; col2=col+1;done=1;}}
if (col!=0){if (grillemod[lig][col-1] == 25){lig2=lig; col2=col-1;done=1;}}
if (lig!=4){if (grillemod[lig+1][col] == 25){lig2=lig+1; col2=col;done=1;}}
if (lig!=0){if (grillemod[lig-1][col] == 25){lig2=lig-1; col2=col;done=1;}}
if (done == 1){grillemod[lig2][col2]=grillemod[lig][col];grillemod[lig][col]=25;positionnepieces();}

}

function onclick_page(event)
{ set_scroll();
  var x = event.clientX;
  var y = event.clientY;
  var px = GetDom2 (document.getElementById('zonepuzzle'),'offsetLeft');
  var py = GetDom2 (document.getElementById('zonepuzzle'),'offsetTop');
  
  var posx =x-px+sleft;
  var posy = y-py+sdown;
  
  colonne = Math.floor(posx/64);ligne=Math.floor(posy/64);

move(colonne,ligne);
  


}
function set_scroll() {
if (typeof(self.pageYOffset)=="number") {
sdown=self.pageYOffset;
sleft=self.pageXOffset;
}
else if (document.body.scrollTop || document.body.scrollLeft) {
sdown=document.body.scrollTop;
sleft=document.body.scrollLeft;
}
else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
sleft=document.documentElement.scrollLeft;
sdown=document.documentElement.scrollTop;
}
else {
sdown=0;
sleft=0;
}
}
grille= new Array (5);
grille[0]= new Array (5);
grille[1] = new Array (5);
grille[2] = new Array (5);
grille[3] = new Array (5);
grille[4] = new Array (5);
grillemod= new Array (5);grillemod[0]= new Array (5);grillemod[1] = new Array (5);grillemod[2] = new Array (5);grillemod[3] = new Array (5);grillemod[4] = new Array (5);
var tampon;


function creerDIV(monurl){
var im=1;
var absx = GetDomOffset (document.getElementById('zonepuzzle'),'offsetLeft');
var absy = GetDomOffset (document.getElementById('zonepuzzle'),'offsetTop');
for (i=0;i<5;i++){
for (j=0;j<5;j++){
var MonDiv=document.createElement('DIV');
MonDiv.setAttribute('id', 'div'+im); MonDiv.className = 'divpuzzle';MonDiv.innerHTML="" ;
var Myctn=document.getElementById("zonepuzzle");
if (im != 25){
MonDiv.style.backgroundImage="url("+monurl+")";}



MonDiv.onmouseover=function(){this.style.borderColor='yellow';};
MonDiv.onmouseout=function(){this.style.borderColor='darkgrey';};

var px = j*25;
var py= i*25;
MonDiv.style.backgroundPosition=px+'% '+py+'%';
var xmondiv= absx+ j*64;
var ymondiv= absy+ i*64;
MonDiv.style.position ="absolute";
MonDiv.style.left =xmondiv+ 'px';
MonDiv.style.top =ymondiv+ 'px';
Myctn.appendChild(MonDiv);grille[i][j]=im;
 im+=1;
   
}}
creategrillemod();
positionnepieces();
}
document.getElementById("zonepuzzle").innerHTML="";

function creategrillemod()
{
for (j=0;j<5;j++)
 {for (k=0;k<5;k++){grillemod [j][k]=grille [j][k];}}
for (nbr=1;nbr<=35;nbr++)
  { n1=Math.floor(Math.random()*5);
    n2=Math.floor(Math.random()*5);
    for (i=0;i<5;i++)
      {tampon=grillemod[n1][i];grillemod[n1][i]=grillemod [n2][i];grillemod [n2][i]=tampon;}
    for (j=0;j<5;j++)
      {tampon=grillemod[j][n1];grillemod[j][n1]=grillemod [j][n2];grillemod [j][n2]=tampon;}
    }
    
}
function positionnepieces()
{var absx = GetDomOffset (document.getElementById('zonepuzzle'),'offsetLeft');
     var absy = GetDomOffset (document.getElementById('zonepuzzle'),'offsetTop');
for (i=0;i<5;i++)
  {for (j=0;j<5;j++)
  {if (grillemod[i][j] != 0) {monid='div'+grillemod[i][j];
     
var xmondiv= absx+ j*64;
var ymondiv= absy+ i*64;
document.getElementById(monid).style.left =xmondiv+ 'px';
document.getElementById(monid).style.top =ymondiv+ 'px';}
   }
  }
}
function verifier()
{
var cbon=0;
for (i=0;i<5;i++)
  {for (j=0;j<5;j++){if (grille[i][j]==grillemod[i][j]){cbon+=1;}}
  }
if (cbon==25){alert ('Bravo vous avez rï¿½ussi');}
}
