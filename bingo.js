var lastZid = 0;
var newGameTimer;
var flashTimer;
var bingierenTimer;
var flashCount = 0;
var used = new Array(76);
var noNextziff;
var lastNewZiffTime = new Date();
var state;
var ledOn = "#0080c9"
//var ledlow = "#4cb9ea"
var ledlowr = "4c"
var ledlowg = "b9"
var ledlowb = "ea"
var ledlow = "#"+ledlowr+ledlowg+ledlowb
var ledlowcompare = "rgb("+parseInt("0x"+ledlowr)+", "+parseInt("0x"+ledlowg)+", "+parseInt("0x"+ledlowb)+")"
// rgb(0, 128, 201) none repeat scroll 0% 0%

function FillTable() {
 var out = "";
 var i;
 var j;
 var u;
 var px = 16;
 var w=window.innerWidth;
 var h=window.innerHeight;
 var minWidth = 586;
 var minHeigth= 906;
 var retw=115;
 var reth=32;
 var css;
// if (h<w){
//   h=window.innerWidth;
//   w=window.innerHeight;
// }

 if (w < minWidth){
   if (w-32 > 30){
      retw = (w-32)/5;
   }
 }

   if (h-104 > 30){
      reth = ((h-104-((6+2)*16))/16)-1;
   }

 px = reth * 0.7;
 out = "<tr>";
 out = out + "<td id=\"header\" style=\"height:"+reth+"px; width:" + retw+ "px;\">B</td>";
 out = out + "<td id=\"header\" style=\"height:"+reth+"px; width:" + retw+ "px;\">I</td>";
 out = out + "<td id=\"header\" style=\"height:"+reth+"px; width:" + retw+ "px;\">N</td>";
 out = out + "<td id=\"header\" style=\"height:"+reth+"px; width:" + retw+ "px;\">G</td>";
 out = out + "<td id=\"header\" style=\"height:"+reth+"px; width:" + retw+ "px;\">O</td>";
 out = out + "</tr>";
 for (i = 0; i < 15; i++){
    out = out + "<tr>";
    for (j = 0; j < 5; j++){
      u = ((j*15)+i+1);
      used[u] = 0;
      out = out + "<td id=\"Z"+ u +"\" style=\"height:"+reth+"px; width:" + retw+ "px;\">"+ u +"</td>"
    }
    out = out + "</tr>";
  }
//  out = out + "<tr><td>"+reth+"</td><td>" + retw+ "</td><td>" + window.innerHeight+ "</td><td>" + window.innerWidth+ "</td></tr>"
  document.styleSheets[1].cssRules[0].style["font-size"]=px+"px"
  document.getElementById("AnzeigeTabelle").innerHTML = out;
  state="OFF";
  Bingieren();
}

function RestartGame(){
 var i = 0;
 var Zid = 0;
 for (i = 1; i<= 75; i++) {
  used[i] = 0;
 }
 lastZid = 0;
 state="OFF";
 lastNewZiffTime = new Date();
 Bingieren();
}

function suspendGame(){
 var i = 0;
 var Zid = 0;
 for (i = 1; i<= 75; i++) {
  Zid = "Z" + i;
  document.getElementById(Zid).style.background = "";
  document.getElementById(Zid).style.color = "";
 }
 state="suspend";
}

function resumeGame(){
 var i = 0;
 var Zid = 0;
 for (i = 1; i<= 75; i++) {
  if (used[i] == 1){
   Zid = "Z" + i;
   document.getElementById(Zid).style.background = ledOn;
   document.getElementById(Zid).style.color = "#000000";
  }
 }
 flashTimer = setInterval (FlashLastZid, 300);
 lastNewZiffTime = new Date();
 flashCount=0;
 state="play";
}

function FlashLastZid() {
  if (lastZid != 0){
   var last = document.getElementById(lastZid);
   if (last.style.backgroundColor === ledlowcompare){
    flashCount++;
    last.style.background = ledOn;
    if (100 == flashCount){
     suspendGame();
     clearInterval (flashTimer);
    }
   }
   else
    last.style.background = ledlow;
  }
  else
   clearInterval(flashTimer);
}

function Nextziff() {
 var Z = Math.floor((Math.random() * 75) + 1);
 var Zid = "Z" + Z;
 var Zaehler = 0;
 while ( (used[Z] == 1) && (Zaehler < 300) || (Zid == lastZid)) {
      Z   =  Math.floor((Math.random() * 75) + 1);
      Zid = "Z" + Z;
      Zaehler++;
 }
 if (Zaehler < 300){
  clearInterval (flashTimer);
  used[Z]=1;
  document.getElementById(Zid).style.background = ledOn;
  document.getElementById(Zid).style.color = "#000000";
  if (lastZid != 0){
   document.getElementById(lastZid).style.background = ledOn;
   document.getElementById(lastZid).style.color = "#000000";
  }
  lastZid=Zid;
  lastNewZiffTime = new Date();
  flashTimer = setInterval (FlashLastZid, 300);
  flashCount=0;
 }
}

function Do() {
 newGameTimer = setInterval (function () {
  noNextziff=true;
  RestartGame();
  clearInterval (newGameTimer);
 }, 3000);
 noNextziff=false;
}

function Done() {
 var jetzt = new Date();
 switch (state) {
  case "suspend":
   resumeGame();
   console.log("suspend");
   break;
  case "play":
   if (noNextziff == false){
    var jetztms = jetzt.getMinutes() * 60000 + jetzt.getSeconds() * 1000 + jetzt.getMilliseconds();
    var lastms  = lastNewZiffTime.getMinutes() * 60000 + lastNewZiffTime.getSeconds() * 1000 + lastNewZiffTime.getMilliseconds();
    if ((jetztms - lastms)<500){
     document.getElementById("NotSoFast").style.display="block";
     document.getElementById("NotSoFastBackGround").style.display="block";
    } else {
     Nextziff();
    }
   }
  break;
  default:
    console.log("Sorry, we are out of " + state + " at Done().");
 }
 clearInterval(newGameTimer);
}

function NotSoFastbuttom(){
   document.getElementById("NotSoFast").style.display="none";
   document.getElementById("NotSoFastBackGround").style.display="none";
}

function setmuster(muster){
 var i = 0;
 var Zid = 0;
 for (i = 1; i<= 75; i++) {
  var src  = muster[(i-1)%15];
  var mask = (16 >> ((i-1)/15));
  Zid = "Z" + i;
  if ((src & mask) == mask){
   document.getElementById(Zid).style.background = ledOn;
   document.getElementById(Zid).style.color = "#000000";
  }
  else{
   document.getElementById(Zid).style.background = "";
   document.getElementById(Zid).style.color = "";
  }
 }
}

function Bingieren(){
 var LetterB = [
        00  , //0b00000   , // 1
        00  , //0b00000   , // 2
        00  , //0b00000   , // 3
        30  , //0b11110   , // 4
        17  , //0b10001   , // 5
        17  , //0b10001   , // 6
        30  , //0b11110   , // 7
        17  , //0b10001   , // 8
        17  , //0b10001   , // 9
        30  , //0b11110   , //10
        00  , //0b00000   , //11
        00  , //0b00000   , //12
        00  , //0b00000   , //13
        00  , //0b00000   , //14
        00  ];//0b00000   ];//15
 var LetterI = [
        00  , //0b00000   , // 1
        00  , //0b00000   , // 2
        00  , //0b00000   , // 3
        04  , //0b00100   , // 4
        00  , //0b00000   , // 5
        04  , //0b00100   , // 6
        04  , //0b00100   , // 7
        04  , //0b00100   , // 8
        04  , //0b00100   , // 9
        04  , //0b00100   , //10
        00  , //0b00000   , //11
        00  , //0b00000   , //12
        00  , //0b00000   , //13
        00  , //0b00000   , //14
        00  ];//0b00000   ];//15
 var LetterN = [
        00  , //0b00000   , // 1
        00  , //0b00000   , // 2
        00  , //0b00000   , // 3
        25  , //0b11001   , // 4
        25  , //0b11001   , // 5
        21  , //0b10101   , // 6
        21  , //0b10101   , // 7
        21  , //0b10101   , // 8
        19  , //0b10011   , // 9
        19  , //0b10011   , //10
        00  , //0b00000   , //11
        00  , //0b00000   , //12
        00  , //0b00000   , //13
        00  , //0b00000   , //14
        00  ];//0b00000   ];//15
 var LetterG = [
        00  , //0b00000   , // 1
        00  , //0b00000   , // 2
        00  , //0b00000   , // 3
        14  , //0b01110   , // 4
        17  , //0b10001   , // 5
        16  , //0b10000   , // 6
        19  , //0b10011   , // 7
        17  , //0b10001   , // 8
        17  , //0b10001   , // 9
        14  , //0b01110   , //10
        00  , //0b00000   , //11
        00  , //0b00000   , //12
        00  , //0b00000   , //13
        00  , //0b00000   , //14
        00  ];//0b00000   ];//15
 var LetterO = [
        00  , //0b00000   , // 1
        00  , //0b00000   , // 2
        00  , //0b00000   , // 3
        14  , //0b01110   , // 4
        17  , //0b10001   , // 5
        17  , //0b10001   , // 6
        17  , //0b10001   , // 7
        17  , //0b10001   , // 8
        17  , //0b10001   , // 9
        14  , //0b01110   , //10
        00  , //0b00000   , //11
        00  , //0b00000   , //12
        00  , //0b00000   , //13
        00  , //0b00000   , //14
        00  ];//0b00000   ];//15
 var Letter = [
        00  , //0b00000   , // 1
        00  , //0b00000   , // 2
        00  , //0b00000   , // 3
        00  , //0b00000   , // 4
        00  , //0b00000   , // 5
        00  , //0b00000   , // 6
        00  , //0b00000   , // 7
        00  , //0b00000   , // 8
        00  , //0b00000   , // 9
        00  , //0b00000   , //10
        00  , //0b00000   , //11
        00  , //0b00000   , //12
        00  , //0b00000   , //13
        00  , //0b00000   , //14
        00  ];//0b00000   ];//15
 clearTimeout(bingierenTimer);
 bingierenTimer = setTimeout(Bingieren, 1000);
 switch (state) {
  case "OFF":
   console.log("OFF");
   setmuster(LetterB);
   state="LetterB";
   break;
  case "LetterB":
   console.log("LetterB");
   setmuster(LetterI);
   state="LetterI";
   break;
  case "LetterI":
   console.log("LetterI");
   setmuster(LetterN);
   state="LetterN";
  break;
  case "LetterN":
   console.log("LetterN");
   setmuster(LetterG);
   state="LetterG";
  break;
  case "LetterG":
   console.log("LetterG");
   setmuster(LetterO);
   state="LetterO";
  break;
  case "LetterO":
   console.log("LetterO");
   setmuster(Letter);
   state="play";
   clearTimeout(bingierenTimer);
  break;
  default:
   clearTimeout(bingierenTimer);
   console.log("Sorry, we are out of " + state + " at Bingieren().");
 }
}
