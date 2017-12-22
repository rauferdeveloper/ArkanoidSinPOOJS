window.onload = function () {
    var pelota = document.getElementById("pelota");
    var barra = document.getElementById("barra");
    var caja = document.getElementById("caja");
    //Damos estilo a la caja
    caja.style.width = "800px";
    caja.style.height = "600px";
    caja.style.backgroundColor = "rgb(0, 0, 0)";
    //Damos estilo a la barra
    barra.style.height = "20px";
    barra.style.width = "100px";
    barra.style.backgroundColor = "#9a0827";
    barra.style.position = "relative";
    barra.style.left = "380px";
    barra.style.top = "520px";
    barra.style.borderRadius = "1em";
    //Damos estilo a la pelota
    pelota.style.height = "10px";
    pelota.style.width = "10px";
    pelota.style.backgroundColor = "#def70e";
    pelota.style.position = "relative";
    pelota.style.left = "420px"
    pelota.style.top = "500px";
    pelota.style.borderRadius="1em";
    var contLeftBarra = parseInt(barra.style.left);//X de la barra      
    var contTop = parseInt(pelota.style.top);//Y de la pelota
    var contLeft = parseInt(pelota.style.left); //X de la pelota
    var parar = false; // Para saber si la pelota la paramos o no
    var izquierdaBarra = false; //Con esto sabremos si la barra esta a la izquierda o no
    var hasGanado = ""; //Texto a mostrar si has ganado
    var hasPerdido = ""; //Texto a mostrar si has perdido
    var ganar;//Caja que vamos a crear si has ganado la partida
    var pausa=false;
    var perder; //Caja que vamos a crear si has perdido la partida
    var intervalo;//Velocidad de la pelota
    var izquierda = false;//Con esto sabremos si la pelota esta a la izquierda o no
    var arriba = false;//Con esto sabremos si la pelota esta arriba o no
    var cantLadrillosDestruidos = 0;//Nos dira la cantidad de ladrillos que vamos destruyendo
    //Para saber si ha terminado el juego o no
    var cx=0;//Cliente x del Raton que usaremos para la controlar la barra
    var distancia = 25;//la distancia de altura que hay entre filas
    var fila ;//el numero de fila
    var cantLadrillos;//Cantidad de ladrillos que hay
    var ladrillosFila;//el numero maximo de ladrillos que hay por fila
    var aux;//variable auxiliar que guardara el numero de ladrillos que habra por fila
    var maxLadrillos;//Maximo de ladrillos que habra por nivel
    var maxLadrillosDelJuego=0// Maximo de ladrillos del juego
    var haPulsadoEnter = false;
    //Variables para aumentar la barra
    var pastillaAumentarBarra;// la pastilla que vamos a crear
    var intervaloPastillaAumentarBarra;//el intervalo que tendra la pastilla
    var contTopPastillaAumentarBarra=5;//para aumentar el top de la pastilla
    var existePastillaAumentarBarra=false;//para saber si se ha creado la pastilla en el juego
    //LLamamos a la musica
    var comienzo = document.getElementById("comienzo");
    var empiezaElJuego = document.getElementById("empiezaElJuego");
    var pelotaConLadrillo = document.getElementById("pelotaConLadrillo");
    var pelotaConPared = document.getElementById("pelotaConPared");
    var barraConPelota = document.getElementById("barraConPelota");
    var partidaGanada = document.getElementById("partidaGanada");
    var partidaPerdida = document.getElementById("partidaPerdida");
    var barraAumentada=document.getElementById("barraAumentada");
    var duranteLaPartida = document.getElementById("duranteLaPartida");
    comienzo.play();
    comienzo.loop=true;//La musica pasa a estar en bucle
    comienzo.duration = 3;
    var nivel=1;
    //Variables para los puntos
    var puntos = 0;//puntos que tiene
    var sumaDePuntos = 10;//Cantidad de puntos que ira sumando
    var aumento = 1;// Cuanto aumenta los puntos
    var cambiarColor = false;
    var intervaloColor;//Intervalo para los colores de fondo para el texto si ha ganado o perdido la partida
    var titulo;//titulo del texto has perdido
    var divPuntos;//Caja que nos muestra los datos de la partida que ha ganado
    var vidas =5;
    //Construimos los ladrillos
    var ladrillosNivelUno; //Cantidad de ladrillos a construir en el nivel 1
    var ladrillosNivelDos;//Cantidad de ladrillos a construir en el nivel 2
    var ladrillosDestruidosNivelUno; //Con esto sabremos si ese ladrillo estara destruido o no
    var ladrillosDestruidosNivelDos; //Con esto sabremos si ese ladrillo estara destruido o no

    var ladrillosDobles=new Array();
    var ladrillosDoblesDestruidos;//Ladrillos que estan por encima de los otros ladrillos  en el nivel 2
    var posicionPastilla; // posiccion donde se guardarla la pastilla de la barra aumentada
    //Informacion del juego
    var informacion = document.getElementById("informacion");
    var panel=document.getElementById("panel");
    var cuentaAtrasBarra;//el tiempo que durara la barra aumentada
    

    nivelUno();
    caja.onmousemove = manejarRaton// para mover la barra con el raton
    document.onkeydown = manejarTeclado//Diversas teclas que necesitaremos usar 
    //para manejar la barra con el raton
    function manejarRaton(elEvento) {
      if (cantLadrillosDestruidos < maxLadrillosDelJuego) {
        var eventoBarra = window.event || elEvento;
        cx = eventoBarra.clientX;
        cy = eventoBarra.clientY;
        //console.log("Cliente X "+cx+" Cliente Y "+cy);
        if(!pausa){ // si la partida no esta en pausa se movera sino se queda donde esta
            if (cx >= 0 && cx <= parseInt(caja.style.width) - parseInt(barra.style.width)) {
            barra.style.left = cx + "px";
            contLeftBarra = cx;
            informacionDelJuego();
          }
        }
        return false;
      } else {
        return true;
      }

    }
    //para controlar las posiciones es solo para depurar
    document.onclick=function(elEvento){
      var evento=window.event || elEvento;
       cx=evento.clientX;
        cy=evento.clientY;
        //console.log("Cliente X "+cx+" Cliente Y "+cy);
    }
    

    //Ls teclas que vamos a usar 
    function manejarTeclado(elEvento) {
      var evento = window.event || elEvento;
      if (cantLadrillosDestruidos < maxLadrillosDelJuego) {
        if (!haPulsadoEnter) { //si no se ha pulsado la tecla enter haz su funcion si ya se ha pulsado se queda "deshablitado" para el resto del juego
          if (evento.keyCode == 13) { //Si presionamos la tecla Enter/Intro empieza el juego
            comienzo.pause();//paramos la musica del comienzo
            empiezaElJuego.play();//empieza la cancion que indica que la partida comienza
            empiezaElJuego.onended = function () { // si la cancion ha terminado ejecutamos todas las funciones necesarias

              parar = true;//para parar la pelota
              intervalo = setInterval(function () { moverBola() }, 20);
              haPulsadoEnter = true;
              duranteLaPartida.play();//comienza la musica que se escuchara durante el juego
              duranteLaPartida.loop=true;// la musica estara en bucle
            }
          }
        }
        if (!parar) {
          if (evento.keyCode == 82) { //Si presionamos la tecla R se renauda el juego
            intervalo = setInterval(function () { moverBola() }, 20);
            parar = true;
            pausa=false;
            duranteLaPartida.play();
              duranteLaPartida.loop=true;
          }
        }
        if (parar) {
          if (evento.keyCode == 80) { //Si presionamos la tecla P se pausa el juego
            clearInterval(intervalo);
            parar = false;
            pausa=true;
            duranteLaPartida.pause();
          }
        }
        if(!pausa){
          if (evento.keyCode == 90 || evento.keyCode == 37) { //Si presionamos la tecla Z o flecha izquierda la barra se mueve hacia a la izquierda
            if (contLeftBarra <= parseInt(caja.style.width) - parseInt(barra.style.width) && contLeftBarra > 0) {
              contLeftBarra -= 20;
              if (contLeftBarra < 0) {
                contLeftBarra = 0;
              }
              //console.log(contLeftBarra);
              barra.style.left = contLeftBarra + "px";

            }
        } else if (evento.keyCode == 88 || evento.keyCode == 39) { //Si presionamos la tecla X o flecha derecha la barra se mueve hacia a la derecha
            if (contLeftBarra >= 0 && contLeftBarra < parseInt(caja.style.width) - parseInt(barra.style.width)) {
              contLeftBarra += 20;
              if (contLeftBarra > parseInt(caja.style.width) - parseInt(barra.style.width)) {
                contLeftBarra = parseInt(caja.style.width) - parseInt(barra.style.width);

              }
              //console.log(contLeftBarra);
              barra.style.left = contLeftBarra + "px";

            }
          }
        }
        
        if (evento.keyCode == 32) {//si pulsamos espacio refrescamos la pagina
          window.location.reload();

        }
        informacionDelJuego();
        return false;
      }
      else {
        if (evento.keyCode == 32) {
          window.location.reload();

        }
        return true;
      }
    }
    function moverBola() {
      if(vidas >0){
        /*
        si la pelota llega al suelo se resta una vida y si llega a 0 se acabo el juego y pierde
        */
          if(contTop == parseInt(caja.style.height) - parseInt(pelota.style.height)) {
            vidas--;
            //console.log("Vidas: "+vidas);
            arriba=false;
            pelotaConPared.load();
            pelotaConPared.play();
            //console.log("Valor de contTop: " + contTop);
          }
      }else if(vidas ==0){
          perderLaPartida();
      }
        if(!ganarLaPartida()){

            if (contTop == 0) { //si la pelota llega al techo la hacemos bajar si toca la barra o toca el suelo la hacemos subir 
              pelotaConPared.load();
              pelotaConPared.play();
              arriba = true;
            }
            if (!arriba) {
              contTop -= 5;
              pelota.style.top = contTop + "px";
            } else if (arriba) {
              contTop += 5;
              pelota.style.top = contTop + "px";
            }
            //si llega al final del ancho de la caja la movemos hacia la izquierda sino hacia la derecha
            if (pelota.style.left == parseInt(caja.style.width) - parseInt(pelota.style.width) + "px") {
              pelotaConPared.load();
              pelotaConPared.play();
              izquierda = false;
    
            } else if (contLeft == 0) {
              pelotaConPared.load();
              pelotaConPared.play();
              izquierda = true;
            }
            if (!izquierda) {
              contLeft -= 5;
              pelota.style.left = contLeft + "px";
    
            } else if (izquierda) {
              contLeft += 5;
              pelota.style.left = contLeft + "px";
    
            }
            
            colisionesBarra();//Los choques de la pelota con la barra
            informacionDelJuego();
            if(nivel==1){
              if(cantLadrillosDestruidos==ladrillosNivelUno.length){
                nivel=2;
                if(existePastillaAumentarBarra){
                  clearInterval(intervaloPastillaAumentarBarra);
                  caja.removeChild(pastillaAumentarBarra);
                  existePastillaAumentarBarra=false;
                }
                barraAumentada.pause();
                nivelDos();
              }
              colisionesLadrillosNivelUno();

            }else if(nivel==2){
              colisionesLadrillosNivelDos();
            }
          
          }
         
    }
    
   

    //Comprobamos en que direccion choca la pelota con la barra
    function colisionesBarra() {
      if (contTop == parseInt(barra.style.top)) {
        if (contLeft >= (contLeftBarra || cx) && contLeft <= (contLeftBarra || cx) + parseInt(barra.style.width)) {
          barraConPelota.play();
          arriba = false;
        }

      }

    }
    // fin del juego
    function ganarLaPartida() {
      if(nivel==2){
          if(cantLadrillosDestruidos==maxLadrillosDelJuego){
            //eliminamos todos los datos y creamos una caja con un texto de has ganado
          informacion.innerHTML = "";
          clearInterval(intervalo);
          clearTimeout(cuentaAtrasBarra);

          ganar = document.createElement("div");
          titulo = document.createElement("h1");

          hasGanado = document.createTextNode("Has ganado");
          titulo.appendChild(hasGanado);
          ganar.style.top = "100px";
          ganar.style.left = "200px";
          ganar.style.width = "300px";
          ganar.style.height = "200px";
          ganar.style.textAlign = "center";
          ganar.style.display = "table-cell";
          ganar.style.verticalAlign = "middle";
          ganar.style.backgroundColor = "aqua";
          ganar.style.position = "relative";
          intervaloColor = setInterval(function () {
            if (!cambiarColor) {
              ganar.style.backgroundColor = "#bce409";
              cambiarColor = true;

            } else {
              ganar.style.backgroundColor = "aqua";
              cambiarColor = false;

            }
          }, 400);
          ganar.appendChild(titulo);
          caja.appendChild(ganar);
          divPuntos = document.createElement("div");
          divPuntos.style.top = "310px";
          divPuntos.style.width = "200px";
          divPuntos.style.height = "200px";
          divPuntos.style.left = ganar.style.left;
          divPuntos.style.color = "white";

          divPuntos.style.position = "absolute";
          divPuntos.innerHTML = "Has obtenido " + puntos + " puntos <br> y has destruido " + cantLadrillosDestruidos + " ladrillos";
          caja.appendChild(divPuntos);
          caja.removeChild(pelota);
          caja.removeChild(barra);
          if(existePastillaAumentarBarra){
          clearInterval(intervaloPastillaAumentarBarra);
          caja.removeChild(pastillaAumentarBarra);
          existePastillaAumentarBarra=false;
        }
          panel.removeChild(informacion);
          duranteLaPartida.currentTime=duranteLaPartida.duration;
          duranteLaPartida.loop=false;
          barraAumentada.pause();
          partidaGanada.play();
          return true;
      }
      } else {
        
        return false;
      }
    }
    //si pierdes el juego
    function perderLaPartida() {
      clearInterval(intervalo);
      clearTimeout(cuentaAtrasBarra);
      
      perder = document.createElement("div");
      hasPerdido = document.createTextNode("Has perdido");
      titulo = document.createElement("h2");

      perder.style.top = "300px";
      perder.style.left = "300px";
      perder.style.width = "200px";
      perder.style.height = "60px";
      perder.style.textAlign = "center";
      perder.style.display = "table-cell";
      perder.style.verticalAlign = "middle";
      perder.style.backgroundColor = "aqua";
      perder.style.position = "relative";
      intervaloColor = setInterval(function () {
        if (!cambiarColor) {
          perder.style.backgroundColor = "red";
          cambiarColor = true;

        } else {
          perder.style.backgroundColor = "aqua";
          cambiarColor = false;

        }
      }, 400);
      titulo.appendChild(hasPerdido);
      pausa=true;
      perder.appendChild(titulo);
      caja.appendChild(perder);
      if(existePastillaAumentarBarra){
        clearInterval(intervaloPastillaAumentarBarra);
        caja.removeChild(pastillaAumentarBarra);
        existePastillaAumentarBarra=false;
      }
      duranteLaPartida.currentTime=duranteLaPartida.duration;
      duranteLaPartida.loop=false;
      barraAumentada.pause();
      partidaPerdida.play();
    }
    //la funcion para crear el nivel uno
    function nivelUno(){
          cantLadrillos=0;
          ladrillosFila=14;
          aux=ladrillosFila;
          fila=1;
          maxLadrillos=112;
          ladrillosNivelUno = new Array(maxLadrillos); 
          ladrillosDestruidosNivelUno=new Array(ladrillosNivelUno.length);
          posicionPastilla=Math.floor(Math.random()*ladrillosNivelUno.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
          maxLadrillosDelJuego+=ladrillosNivelUno.length;

          //console.log("Posicion de donde se ha guardado la pastilla: "+posicionPastilla);

          construirLadrillos();//construimos los ladrillos

          
      }
      //la funcion para crear el nivel dos

      function nivelDos(){
        duranteLaPartida.pause();
        duranteLaPartida.currentTime=duranteLaPartida.duration;
          ladrillosFila=14;
          cantLadrillos=0;
          aux=ladrillosFila;
          maxLadrillos=112;
          fila=1;
          //al empezar un nivel nuevo ponemos la pelota y la barra como al principio
          clearInterval(intervalo);
          pelota.style.left = "420px"
          pelota.style.top = "500px";
          barra.style.left = "380px";
          barra.style.top = "520px";
          contTop=parseInt(pelota.style.top);
          contLeft=parseInt(pelota.style.left);
          arriba=false;
          izquierda=false;
          empiezaElJuego.play();
          empiezaElJuego.onended = function () {
            intervalo = setInterval(function () { moverBola() }, 20);
            duranteLaPartida.play();
            duranteLaPartida.loop=true;
          }
          ladrillosNivelDos = new Array(maxLadrillos); 
          ladrillosDestruidosNivelDos = new Array(ladrillosNivelDos.length); 
          ladrillosDobles=new Array(ladrillosNivelDos.length);
          ladrillosDoblesDestruidos=new Array(ladrillosNivelDos.length);
          posicionPastilla=Math.floor(Math.random()*ladrillosNivelDos.length);// guardo la pastilla en una posicion al azar dentro del tamaño del array
          maxLadrillosDelJuego=maxLadrillosDelJuego+ ladrillosNivelDos.length+ladrillosDobles.length;
          
          //console.log("Posicion de donde se ha guardado la pastilla: "+posicionPastilla);
          construirLadrillosNivelDos();//construimos los ladrillos del nivel 2
         
      }
        
    
   //Comprobamos en que direccion choca la pelota con un ladrillo
   function colisionesLadrillosNivelDos() {
    for ( j = 0; j < ladrillosDobles.length; j++) {
      //colisiones de los ladrillos que estan por encima
        if (!ladrillosDoblesDestruidos[j]) {
          //si colisiona entre en el top del ladrillo y entre la posicion left y el ancho de este
          if (contTop == parseInt(ladrillosDobles[j].style.top) - parseInt(pelota.style.height)) {
            if (contLeft >= parseInt(ladrillosDobles[j].style.left) && contLeft <= parseInt(ladrillosDobles[j].style.left) + parseInt(ladrillosDobles[j].style.width)) {
           
              caja.removeChild(ladrillosDobles[j]);
              
              pelotaConLadrillo.load();
              pelotaConLadrillo.play();
              cantLadrillosDestruidos++;
              //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
              ladrillosDoblesDestruidos[j] = true;// confirmamos que el ladrillo estara destruido 
              arriba = false;
              sumarPuntos();
  
            }
            //si colisiona entre en el top mas la altura   del ladrillo y entre la posicion left y el ancho de este

          } else if (contTop == parseInt(ladrillosDobles[j].style.top) + parseInt(ladrillosDobles[j].style.height)) {
            if (contLeft >= parseInt(ladrillosDobles[j].style.left) && contLeft <= parseInt(ladrillosDobles[j].style.left) + parseInt(ladrillosDobles[j].style.width)) {
            
              caja.removeChild(ladrillosDobles[j]);
  
              pelotaConLadrillo.play();
  
              cantLadrillosDestruidos++;
              //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
              ladrillosDoblesDestruidos[j] = true;
              sumarPuntos();
  
              arriba = true;
            }
          }           
          //si colisiona entre en el top del ladrillo y el top mas la altura  y el left de este

           else if (contTop >= parseInt(ladrillosDobles[j].style.top) && contTop <= parseInt(ladrillosDobles[j].style.top) + parseInt(ladrillosDobles[j].style.height)) {
            if (contLeft + parseInt(pelota.style.width) == parseInt(ladrillosDobles[j].style.left)) {
              
              caja.removeChild(ladrillosDobles[j]);
  
              pelotaConLadrillo.play();
              sumarPuntos();
  
              cantLadrillosDestruidos++;
              //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
              ladrillosDoblesDestruidos[j] = true;
              arriba = true;
              izquierda = false;
              //si colisiona entre en el top del ladrillo y el top mas la altura  y el left mas ancho de este

            } else if (contLeft == parseInt(ladrillosDobles[j].style.left) + parseInt(ladrillosDobles[j].style.width) ) {
  
              caja.removeChild(ladrillosDobles[j]);
              pelotaConLadrillo.play();
              cantLadrillosDestruidos++;
              ladrillosDoblesDestruidos[j] = true;
  
              //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
              arriba = true;
              izquierda = true;
              sumarPuntos();
  
            }
  
          }
  
        }
        else if(ladrillosDoblesDestruidos[j]){
          if (!ladrillosDestruidosNivelDos[j]) {
            //colisiones de los ladrillos de abajo

            if (contTop == parseInt(ladrillosNivelDos[j].style.top) - parseInt(pelota.style.height)) {
              if (contLeft >= parseInt(ladrillosNivelDos[j].style.left) && contLeft <= parseInt(ladrillosNivelDos[j].style.left) + parseInt(ladrillosNivelDos[j].style.width)) {
                if(j==posicionPastilla){
                  //para aumentar la barra
                  aumentarBarra(ladrillosNivelDos,j);
                }
                caja.removeChild(ladrillosNivelDos[j]);
                
                pelotaConLadrillo.load();
                pelotaConLadrillo.play();
                cantLadrillosDestruidos++;
                //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                ladrillosDestruidosNivelDos[j] = true;
                arriba = false;
                sumarPuntos();
    
              }
    
            } else if (contTop == parseInt(ladrillosNivelDos[j].style.top) + parseInt(ladrillosNivelDos[j].style.height)) {
              if (contLeft >= parseInt(ladrillosNivelDos[j].style.left) && contLeft <= parseInt(ladrillosNivelDos[j].style.left) + parseInt(ladrillosNivelDos[j].style.width)) {
                if(j==posicionPastilla){
                  aumentarBarra(ladrillosNivelDos,j);
                }
                caja.removeChild(ladrillosNivelDos[j]);
    
                pelotaConLadrillo.play();
    
                cantLadrillosDestruidos++;
                //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                ladrillosDestruidosNivelDos[j] = true;
                sumarPuntos();
    
                arriba = true;
              }
            }
             else if (contTop >= parseInt(ladrillosNivelDos[j].style.top) && contTop <= parseInt(ladrillosNivelDos[j].style.top) + parseInt(ladrillosNivelDos[j].style.height)) {
              if (contLeft + parseInt(pelota.style.width) == parseInt(ladrillosNivelDos[j].style.left)) {
                if(j==posicionPastilla){
                  aumentarBarra(ladrillosNivelDos,j);
                }
                caja.removeChild(ladrillosNivelDos[j]);
    
                pelotaConLadrillo.play();
                sumarPuntos();
    
                cantLadrillosDestruidos++;
                //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                ladrillosDestruidosNivelDos[j] = true;
                arriba = true;
                izquierda = false;
              } else if (contLeft == parseInt(ladrillosNivelDos[j].style.left) + parseInt(ladrillosNivelDos[j].style.width) ) {
                if(j==posicionPastilla){
                  aumentarBarra(ladrillosNivelDos,j);
                }
                caja.removeChild(ladrillosNivelDos[j]);
                pelotaConLadrillo.play();
                cantLadrillosDestruidos++;
                //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                ladrillosDestruidosNivelDos[j] = true;
                arriba = true;
                izquierda = true;
                sumarPuntos();
    
              }
    
            }
    
          }          
        }
    } 
   
    
     
  }
 
   //Comprobamos en que direccion choca la pelota con un ladrillo
   function colisionesLadrillosNivelUno() {
    for ( j = 0; j < ladrillosNivelUno.length; j++) {
      //lo mismo que en las colisiones del nivel 2
      if (!ladrillosDestruidosNivelUno[j]) {

        if (contTop == parseInt(ladrillosNivelUno[j].style.top) - parseInt(pelota.style.height)) {
          if (contLeft >= parseInt(ladrillosNivelUno[j].style.left) && contLeft <= parseInt(ladrillosNivelUno[j].style.left) + parseInt(ladrillosNivelUno[j].style.width)) {
            if(j==posicionPastilla){
              aumentarBarra(ladrillosNivelUno,j);
            }
            caja.removeChild(ladrillosNivelUno[j]);
            
            pelotaConLadrillo.load();
            pelotaConLadrillo.play();
            cantLadrillosDestruidos++;
            //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
            ladrillosDestruidosNivelUno[j] = true;
            arriba = false;

          }

        } else if (contTop == parseInt(ladrillosNivelUno[j].style.top) + parseInt(ladrillosNivelUno[j].style.height)) {
          if (contLeft >= parseInt(ladrillosNivelUno[j].style.left) && contLeft <= parseInt(ladrillosNivelUno[j].style.left) + parseInt(ladrillosNivelUno[j].style.width)) {
            if(j==posicionPastilla){
              aumentarBarra(ladrillosNivelUno,j);
            }
            caja.removeChild(ladrillosNivelUno[j]);

            pelotaConLadrillo.play();

            cantLadrillosDestruidos++;
            //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
            ladrillosDestruidosNivelUno[j] = true;
            sumarPuntos();

            arriba = true;
          }
        }
          else if (contTop >= parseInt(ladrillosNivelUno[j].style.top) && contTop <= parseInt(ladrillosNivelUno[j].style.top) + parseInt(ladrillosNivelUno[j].style.height)) {
            if (contLeft + parseInt(pelota.style.width) == parseInt(ladrillosNivelUno[j].style.left)) {
              if(j==posicionPastilla){
                aumentarBarra(ladrillosNivelUno,j);
              }
              caja.removeChild(ladrillosNivelUno[j]);

              pelotaConLadrillo.play();
              sumarPuntos();

              cantLadrillosDestruidos++;
              //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
              ladrillosDestruidosNivelUno[j] = true;
              arriba = true;
              izquierda = false;
            } else if (contLeft == parseInt(ladrillosNivelUno[j].style.left) + parseInt(ladrillosNivelUno[j].style.width) ) {
              if(j==posicionPastilla){
                aumentarBarra(ladrillosNivelUno,j);
              }
              caja.removeChild(ladrillosNivelUno[j]);
              pelotaConLadrillo.play();
              cantLadrillosDestruidos++;
              //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
              ladrillosDestruidosNivelUno[j] = true;
              arriba = true;
              izquierda = true;
              sumarPuntos();

            }

          }

      }
      
    }
  }
    //para construir los ladrillos del nivel uno
    function construirLadrillos(){
      while (fila <= 8) {//seran 8 filas
          if(fila==1){
            cantLadrillos=0;//si la fila es 1 su posicion en el for sera de 0-14
          }else{
            cantLadrillos = ladrillosFila;//si antes por ejemplo era 0 pues sera ahora 14
            ladrillosFila += aux;//el maximo de ladrillos sera 14 pero aumentara para las posiciones del array
          }
         

        
        for (i = cantLadrillos; i< ladrillosFila; i++) {
         
          ladrillosNivelUno[i] = document.createElement("div");
          ladrillosNivelUno[i].style.width = "50px";
  
          ladrillosNivelUno[i].style.height = "20px";
          ladrillosNivelUno[i].style.position = "absolute";
          if (i >= cantLadrillos && i < ladrillosFila) {
            if (i > cantLadrillos) { //Si la i es mayor que 0 cada ladrillo tendra una separacion de 5 px
              ladrillosNivelUno[i].style.left = parseInt(ladrillosNivelUno[i - 1].style.left) + parseInt(ladrillosNivelUno[i].style.width) + 5 + "px";
            } else if (i == cantLadrillos) {//para que el primero que se pondra
              ladrillosNivelUno[i].style.left = "10px";
            }
            ladrillosNivelUno[i].style.top = (distancia * fila) + "px";//ira aumentando la distancia segun el numero de fila
          }
          //cada fila tendra un color distinto
          if(fila==1){
            ladrillosNivelUno[i].style.backgroundColor = "red";
    
          }else  if(fila==2){
            ladrillosNivelUno[i].style.backgroundColor = "aqua";
    
          }else  if(fila==3){
            ladrillosNivelUno[i].style.backgroundColor = "green";
    
          }else  if(fila==4){
            ladrillosNivelUno[i].style.backgroundColor = "orange";
    
          }else  if(fila==5){
            ladrillosNivelUno[i].style.backgroundColor = "white";
    
          }else  if(fila==6){
            ladrillosNivelUno[i].style.backgroundColor = "blue";
    
          }else  if(fila==7){
            ladrillosNivelUno[i].style.backgroundColor = "brown";
    
          }else if(fila==8){
            ladrillosNivelUno[i].style.backgroundColor = "teal";
    
          }
            caja.appendChild(ladrillosNivelUno[i]);//añadimos cada uno a caja
            ladrillosDestruidosNivelUno[i] = false;//Como aqui los estamos construyendo todos pues le decimos que ninguno esta destruido todavia
        }
        fila++;
     }
       
    }//fin de construirLadrillos()
    //la misma logica que construirLadrillos() solo que con el doble de ladrillos
    function construirLadrillosNivelDos(){
      while (fila <=8 ) {
        if(fila==1){
          cantLadrillos=0;
        }else{
          cantLadrillos = ladrillosFila;
          ladrillosFila += aux;
        }

        for (i = cantLadrillos; i < ladrillosFila; i++) {

          
            ladrillosNivelDos[i] = document.createElement("div");
            ladrillosNivelDos[i].style.width = "50px";
            
            ladrillosDobles[i] = document.createElement("div");
            ladrillosDobles[i].style.width = "50px";
           
            ladrillosNivelDos[i].style.height = "20px";
            ladrillosNivelDos[i].style.position = "absolute";
            ladrillosDobles[i].style.height = "20px";
            ladrillosDobles[i].style.position = "absolute";
            if (i >= cantLadrillos && i < ladrillosFila) {
              if (i > cantLadrillos) { //Si la i es mayor que 0 cada ladrillo tendra una separacion de 5 px
                ladrillosNivelDos[i].style.left = parseInt(ladrillosNivelDos[i - 1].style.left) + parseInt(ladrillosNivelDos[i].style.width) + 5 + "px";
                ladrillosDobles[i].style.left = parseInt(ladrillosDobles[i - 1].style.left) + parseInt(ladrillosDobles[i].style.width) + 5 + "px";
              } else if (i == cantLadrillos) {
                ladrillosNivelDos[i].style.left = "10px";
                ladrillosDobles[i].style.left = "10px";

              }
              ladrillosNivelDos[i].style.top = (distancia * fila) + "px";

              ladrillosDobles[i].style.top = (distancia * fila) + "px";
            }
            if(fila==1){
              ladrillosNivelDos[i].style.backgroundColor = "red";
              ladrillosDobles[i].style.backgroundColor = "aqua";
      
            }else  if(fila==2){
              ladrillosNivelDos[i].style.backgroundColor = "aqua";
              ladrillosDobles[i].style.backgroundColor = "green";

            }else  if(fila==3){
              ladrillosNivelDos[i].style.backgroundColor = "green";
              ladrillosDobles[i].style.backgroundColor = "red";

            }else  if(fila==4){
              ladrillosNivelDos[i].style.backgroundColor = "orange";
              ladrillosDobles[i].style.backgroundColor = "teal";

            }else  if(fila==5){
              ladrillosNivelDos[i].style.backgroundColor = "white";
              ladrillosDobles[i].style.backgroundColor = "blue";

            }else  if(fila==6){
              ladrillosNivelDos[i].style.backgroundColor = "blue";
              ladrillosDobles[i].style.backgroundColor = "brown";

            }else  if(fila==7){
              ladrillosNivelDos[i].style.backgroundColor = "brown";
              ladrillosDobles[i].style.backgroundColor = "white";

            }else if(fila==8){
              ladrillosNivelDos[i].style.backgroundColor = "teal";
              ladrillosDobles[i].style.backgroundColor = "orange";

            }
            caja.appendChild(ladrillosNivelDos[i]);//añadimos cada uno a caja
            caja.appendChild(ladrillosDobles[i])
            ladrillosDestruidosNivelDos[i]= false;//Como aqui los estamos construyendo todos pues le decimos que ninguno esta destruido todavia
            ladrillosDoblesDestruidos[i]=false;
          }
   
        fila++;
      }
  }// fin construirladrillosniveldos()
  
    
   function aumentarBarra(ladrillos,posicion){
          pastillaAumentarBarra=document.createElement("div");
          pastillaAumentarBarra.style.width="20px";
          pastillaAumentarBarra.style.height="10px";
          pastillaAumentarBarra.style.backgroundColor="green";
          pastillaAumentarBarra.style.borderRadius="5px";
          pastillaAumentarBarra.style.position="absolute";
          pastillaAumentarBarra.style.left=parseInt(ladrillos[posicion].style.left)+"px";
          pastillaAumentarBarra.style.top=parseInt(ladrillos[posicion].style.height)+parseInt(ladrillos[posicion].style.top)+"px";
          caja.appendChild(pastillaAumentarBarra);//creo la pastilla en la caja
          existePastillaAumentarBarra=true;
          intervaloPastillaAumentarBarra=setInterval(function(){// el movimiento de la pastilla
            pastillaAumentarBarra.style.top=parseInt(parseInt(pastillaAumentarBarra.style.top)+contTopPastillaAumentarBarra)+"px";//aqui va bajando poco a poco
            //console.log("Altura de la pastilla: "+parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height)));
            //si la pastilla se encuentra en la misma altura que la barra entra en la siguiente condicion    
            if(parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height))>=parseInt(barra.style.top)&&parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height))<=parseInt(barra.style.top)+parseInt(barra.style.height)){
                 //aqui evaluo todas las posibilidades para que la barra coja la pastilla
              if ((contLeftBarra || cx)>=pastillaAumentarBarra.style.left|| (contLeftBarra || cx) <= parseInt(pastillaAumentarBarra.style.left) + parseInt(pastillaAumentarBarra.style.width)&&
                  (contLeftBarra || cx)+parseInt(barra.style.width)>=parseInt(pastillaAumentarBarra.style.left) ||(contLeftBarra || cx)+parseInt(barra.style.width) <= parseInt(pastillaAumentarBarra.style.left) + parseInt(pastillaAumentarBarra.style.width) ) {
                        clearInterval(intervaloPastillaAumentarBarra);
                         barra.style.width=parseInt(barra.style.width)+parseInt(pastillaAumentarBarra.style.width)+"px";
                         barraAumentada.play();
                        if(existePastillaAumentarBarra){
                          cuentaAtrasBarra=setTimeout(function(){
                            barra.style.width=parseInt(barra.style.width)-parseInt(pastillaAumentarBarra.style.width)+"px";
                            barraAumentada.play();

                          },60000);
                          caja.removeChild(pastillaAumentarBarra);
                          existePastillaAumentarBarra=false;
                        }
                  }
                }else if(parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height))==parseInt(caja.style.height)){//si llega al tocar el suelo y no llega darle la barra desaparece
                  clearInterval(intervaloPastillaAumentarBarra);
                  if(existePastillaAumentarBarra){
                    caja.removeChild(pastillaAumentarBarra);
                    existePastillaAumentarBarra=false;
                  }
                }
          },50)    
              
      
    }
        
    
    //nos muestra la informacion del juego
    function informacionDelJuego() {
      informacion.style.width="310px";
      informacion.style.height="175px";
      informacion.style.color="#b5ff08";
      informacion.style.backgroundColor="#1707f2";
      informacion.style.padding="10px";

      informacion.innerHTML = "<strong>Informacion del juego:</strong>"
        + "<br>" + "<strong>Posicion X (left) de la pelota:  </strong>" + contLeft
        + "<br>" + " <strong>Posicion Y (top) de la pelota: </strong>" + contTop
        + "<br>" + " <strong>Cantidad de ladrillos destruidos: </strong>" + cantLadrillosDestruidos
        + "<br>" + "<strong>Posicion de la barra con el raton: </strong>" + cx
        + "<br>" + " <strong>Posicion de la barra con las teclas: </strong>" + contLeftBarra
        + "<br>" + " <strong>Puntos: </strong>" + puntos
        + "<br>" + " <strong>Vidas: </strong>" + vidas
        + "<br>" + " <strong>Nivel: </strong>" + nivel;
    }
    function sumarPuntos() {
      if (cantLadrillosDestruidos >= 0 && cantLadrillosDestruidos <= 80) {
        puntos = puntos + sumaDePuntos * aumento;//puntos +10
      } if (cantLadrillosDestruidos > 80 && cantLadrillosDestruidos <= 150) {
        aumento = 2;
        puntos = puntos + (sumaDePuntos * aumento);//puntos +20
      } if (cantLadrillosDestruidos > 150 && cantLadrillosDestruidos <= 210) {
        aumento = 3;
        puntos = puntos + (sumaDePuntos * aumento);//puntos +30

      } if (cantLadrillosDestruidos > 210&& cantLadrillosDestruidos<=260) {
        aumento = 4;
        puntos = puntos + (sumaDePuntos * aumento);//puntos +40

      }if (cantLadrillosDestruidos > 260&& cantLadrillosDestruidos<=290) {
        aumento = 5;
        puntos = puntos + (sumaDePuntos * aumento);//puntos +50

      }
      if (cantLadrillosDestruidos > 290&& cantLadrillosDestruidos<=300) {
        aumento = 6;
        puntos = puntos + (sumaDePuntos * aumento);//puntos +60

      }    
      if (cantLadrillosDestruidos > 300&& cantLadrillosDestruidos<=310) {
        aumento = 7;
        puntos = puntos + (sumaDePuntos * aumento);//puntos +70

      }
      if(cantLadrillosDestruidos > 310) {
        aumento = 10;
        puntos = puntos + (sumaDePuntos * aumento);//puntos +80

      }
    }//cierre de la funcion sumarPuntos
   
  }//cierre del window.onload
 //Nota para la siguiente controlare las esquinas de los ladrillos y controlare mejor el rebote de la pelota con la barra