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
    var fila = 1;//el numero de fila
    var cantLadrillos;//Cantidad de ladrillos que hay
    var ladrillosFila;//el numero maximo de ladrillos que hay por fila
    var aux;//variable auxiliar que guardara el numero de ladrillos que habra por fila
    var maxLadrillos;//Maximo de ladrillos que habra
    var haPulsadoEnter = false;
    //Variables para aumentar la barra
    var pastillaAumentarBarra;
    var intervaloPastillaAumentarBarra;
    var contTopPastillaAumentarBarra=5;
    var existePastillaAumentarBarra=false;
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
    var vidas =3;
    //Construimos los ladrillos
    var ladrillosNivelUno; //Cantidad de ladrillos a construir en el nivel 1
    var ladrillosNivelDos //Cantidad de ladrillos a construir en el nivel 2
    var ladrillosDestruidos; //Con esto sabremos si ese ladrillo estara destruido o no
    var posicionPastilla;
    //Informacion del juego
    var informacion = document.getElementById("informacion");
    var panel=document.getElementById("panel");
  
    niveles();

    caja.onmousemove = manejarRaton// para mover la barra con el raton
    document.onkeydown = manejarTeclado//Diversas teclas que necesitaremos usar 
    function manejarRaton(elEvento) {
      if (cantLadrillosDestruidos < maxLadrillos) {
        var eventoBarra = window.event || elEvento;
        cx = eventoBarra.clientX;
        cy = eventoBarra.clientY;
        //console.log("Cliente X "+cx+" Cliente Y "+cy);
        if(!pausa){
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

    document.onclick=function(){
      var eventoBarra=window.event || elEvento;
       cx=eventoBarra.clientX;
        cy=eventoBarra.clientY;
        console.log("Cliente X "+cx+" Cliente Y "+cy);
    }
    


    function manejarTeclado(elEvento) {
      var evento = window.event || elEvento;

      if (cantLadrillosDestruidos < maxLadrillos) {
        if (!haPulsadoEnter) {
          if (evento.keyCode == 13) { //Si presionamos la tecla Enter/Intro empieza el juego
            //comienzo.currenTime=comienzo.duration;
            comienzo.pause();
            empiezaElJuego.play();
            empiezaElJuego.onended = function () {
          
              parar = true;
              intervalo = setInterval(function () { moverBola() }, 20);
              haPulsadoEnter = true;
              duranteLaPartida.play();
              duranteLaPartida.loop=true;
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
              console.log(contLeftBarra);
              barra.style.left = contLeftBarra + "px";

            }
        } else if (evento.keyCode == 88 || evento.keyCode == 39) { //Si presionamos la tecla X o flecha derecha la barra se mueve hacia a la derecha
            if (contLeftBarra >= 0 && contLeftBarra < parseInt(caja.style.width) - parseInt(barra.style.width)) {
              contLeftBarra += 20;
              if (contLeftBarra > parseInt(caja.style.width) - parseInt(barra.style.width)) {
                contLeftBarra = parseInt(caja.style.width) - parseInt(barra.style.width);

              }
              console.log(contLeftBarra);
              barra.style.left = contLeftBarra + "px";

            }
          }
        }
        
        if (evento.keyCode == 32) {
          window.location.reload();

        }
        informacionDelJuego();
        return false;
      } else {
        if (evento.keyCode == 32) {
          window.location.reload();

        }
        return true;
      }
    }
    function moverBola() {
      if(vidas >0){
          if(contTop == parseInt(caja.style.height) - parseInt(pelota.style.height)) {
            vidas--;
            console.log("Vidas: "+vidas);
            arriba=false;
            pelotaConPared.load();
          pelotaConPared.play();
            console.log("Valor de contTop: " + contTop);
          } 
      
      }else if(vidas ==0){
          perderLaPartida();

      }
      if (!ganarLaPartida()) {

        if (contTop == 0) {
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
        collisionesBarra();
       collisionesLadrillosNivelDos();
        informacionDelJuego();
      }

    }
   

    //Comprobamos en que direccion choca la pelota con la barra
    function collisionesBarra() {
      if (contTop == parseInt(barra.style.top)) {
        if (contLeft >= (contLeftBarra || cx) && contLeft <= (contLeftBarra || cx) + parseInt(barra.style.width)) {

          barraConPelota.play();
          arriba = false;
        }

      }

    }
    // fin del juego
    function ganarLaPartida() {
      if (cantLadrillosDestruidos == maxLadrillos) {
        informacion.innerHTML = "";
        clearInterval(intervalo);
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
        divPuntos.innerHTML = "Has obtenido: " + puntos + " puntos <br> y has destruido " + cantLadrillosDestruidos + " ladrillos";
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
      } else {
        return false;
      }
    }
    function perderLaPartida() {
      clearInterval(intervalo);
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
    
    function niveles(){
        if(nivel==2){
            cantLadrillos=0;
            ladrillosFila=14;
            aux=ladrillosFila;
            maxLadrillos=112;
            ladrillosNivelUno = new Array(maxLadrillos); 
            ladrillosDestruidos = new Array(ladrillosNivelUno.length); 
            posicionPastilla=Math.floor(Math.random()*ladrillosNivelUno.length);
            console.log("Posicion de donde se ha guardado la pastilla: "+posicionPastilla);
            while (fila <= 8) {
                if (fila == 1) {
                  cantLadrillos = 0;
                } else {
                  cantLadrillos = ladrillosFila;
                  ladrillosFila += aux;

                }
                construirLadrillos(ladrillosNivelUno);
                fila++;
             }

        }else if(nivel==1){
            cantLadrillos=0;
            ladrillosFila=0;
            aux=2;
            maxLadrillos=56;
            ladrillosNivelDos = new Array(maxLadrillos); 
            ladrillosDestruidos = new Array(ladrillosNivelDos.length); 
            posicionPastilla=Math.floor(Math.random()*ladrillosNivelDos.length);
            console.log("Posicion de donde se ha guardado la pastilla: "+posicionPastilla);
              while (fila <= 7) {
              cantLadrillos = 0;
              ladrillosFila+=aux;
                console.log("cantLadrillos: " + cantLadrillos);
                console.log("maxLadrillosFila: " + ladrillosFila);
                construirLadrillos(ladrillosNivelDos);
                fila++
          }
          

    }   
        
    }
    //Comprobamos en que direccion choca la pelota con un ladrillo
    function collisionesLadrillosNivelDos() {
        for ( j = 0; j < ladrillosNivelDos.length; j++) {
          if (!ladrillosDestruidos[j]) {
  
            if (contTop == parseInt(ladrillosNivelDos[j].style.top) - parseInt(pelota.style.height)) {
              if (contLeft >= parseInt(ladrillosNivelDos[j].style.left) && contLeft <= parseInt(ladrillosNivelDos[j].style.left) + parseInt(ladrillosDos[j].style.width)) {
                if(j==posicionPastilla){
                  aumentarBarra();
                }
                caja.removeChild(ladrillosNivelDos[j]);
                
                pelotaConLadrillo.load();
                pelotaConLadrillo.play();
                cantLadrillosDestruidos++;
                //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                ladrillosDestruidos[j] = true;
                arriba = false;
                sumarPuntos();
  
              }
  
            } else if (contTop == parseInt(ladrillosNivelDos[j].style.top) + parseInt(ladrillosNivelDos[j].style.height)) {
              if (contLeft >= parseInt(ladrillosNivelDos[j].style.left) && contLeft <= parseInt(ladrillosNivelDos[j].style.left) + parseInt(ladrillosNivelDos[j].style.width)) {
                if(j==posicionPastilla){
                  aumentarBarra();
                }
                caja.removeChild(ladrillosNivelDos[j]);
  
                pelotaConLadrillo.play();
  
                cantLadrillosDestruidos++;
                //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                ladrillosDestruidos[j] = true;
                sumarPuntos();
  
                arriba = true;
              }
            }
             else if (contTop >= parseInt(ladrillosNivelDos[j].style.top) && contTop <= parseInt(ladrillosNivelDos[j].style.top) + parseInt(ladrillosNivelDos[j].style.height)) {
              if (contLeft + parseInt(pelota.style.width) == parseInt(ladrillosNivelDos[j].style.left)) {
                if(j==posicionPastilla){
                  aumentarBarra();
                }
                caja.removeChild(ladrillosNivelDos[j]);
  
                pelotaConLadrillo.play();
                sumarPuntos();
  
                cantLadrillosDestruidos++;
                //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                ladrillosDestruidos[j] = true;
                arriba = true;
                izquierda = false;
              } else if (contLeft == parseInt(ladrillosNivelDos[j].style.left) + parseInt(ladrillosNivelDos[j].style.width) ) {
                if(j==posicionPastilla){
                  aumentarBarra();
                }
                caja.removeChild(ladrillosNivelDos[j]);
                pelotaConLadrillo.play();
                cantLadrillosDestruidos++;
                //console.log("Cantidad de ladrillos destruidos: "+cantLadrillosDestruidos);
                ladrillosDestruidos[j] = true;
                arriba = true;
                izquierda = true;
                sumarPuntos();
  
              }
  
            }
  
          }
          function aumentarBarra(){
              pastillaAumentarBarra=document.createElement("div");
              pastillaAumentarBarra.style.width="20px";
              pastillaAumentarBarra.style.height="10px";
              pastillaAumentarBarra.style.backgroundColor="green";
              pastillaAumentarBarra.style.borderRadius="5px";
              pastillaAumentarBarra.style.position="absolute";
              pastillaAumentarBarra.style.left=parseInt(ladrillosNivelDos[j].style.left)+"px";
              pastillaAumentarBarra.style.top=parseInt(ladrillosNivelDos[j].style.height)+parseInt(ladrillosNivelDos[j].style.top)+"px";
              caja.appendChild(pastillaAumentarBarra);
              existePastillaAumentarBarra=true;
              intervaloPastillaAumentarBarra=setInterval(function(){
                pastillaAumentarBarra.style.top=parseInt(parseInt(pastillaAumentarBarra.style.top)+contTopPastillaAumentarBarra)+"px";
                console.log("Altura de la pastilla: "+parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height)));
                    if(parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height))>=parseInt(barra.style.top)&&parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height))<=parseInt(barra.style.top)+parseInt(barra.style.height)){
                      if ((contLeftBarra || cx)>=pastillaAumentarBarra.style.left|| (contLeftBarra || cx) <= parseInt(pastillaAumentarBarra.style.left) + parseInt(pastillaAumentarBarra.style.width)&&
                      (contLeftBarra || cx)+parseInt(barra.style.width)>=parseInt(pastillaAumentarBarra.style.left) ||(contLeftBarra || cx)+parseInt(barra.style.width) <= parseInt(pastillaAumentarBarra.style.left) + parseInt(pastillaAumentarBarra.style.width) ) {
                            clearInterval(intervaloPastillaAumentarBarra);
                             barra.style.width=parseInt(barra.style.width)+parseInt(pastillaAumentarBarra.style.width)+"px";
                             barraAumentada.play();
                            if(existePastillaAumentarBarra){
                              setTimeout(function(){
                                barra.style.width=parseInt(barra.style.width)-parseInt(pastillaAumentarBarra.style.width)+"px";
                                barraAumentada.play();
  
                              },60000);
                              caja.removeChild(pastillaAumentarBarra);
                              existePastillaAumentarBarra=false;
                            }
                      }
                    }else if(parseInt(parseInt(pastillaAumentarBarra.style.top)+parseInt(pastillaAumentarBarra.style.height))==parseInt(caja.style.height)){
                      clearInterval(intervaloPastillaAumentarBarra);
                      if(existePastillaAumentarBarra){
                        caja.removeChild(pastillaAumentarBarra);
                        existePastillaAumentarBarra=false;
                      }
                    }
              },50)    
                  
          }
        }
    }
   
    function construirLadrillos(ladrillos){
            ladrillos=ladrillosNivelDos;
           
        for (i = cantLadrillos; i < ladrillosFila; i++) {
            ladrillos[i] = document.createElement("div");
            ladrillos[i].style.width = "50px";
    
            ladrillos[i].style.height = "20px";
            ladrillos[i].style.position = "absolute";
            if (i >= cantLadrillos && i < ladrillosFila) {
              if (i > cantLadrillos) { //Si la i es mayor que 0 cada ladrillo tendra una separacion de 5 px
                ladrillos[i].style.left = parseInt(ladrillos[i - 1].style.left) + parseInt(ladrillos[i].style.width) + 5 + "px";
              } else if (i == cantLadrillos) {
                ladrillos[i].style.left = "10px";
              }
              ladrillos[i].style.top = (distancia * fila) + "px";
            }
            caja.appendChild(ladrillos[i]);//añadimos cada uno a caja
            ladrillosDestruidos[i] = false;//Como aqui los estamos construyendo todos pues le decimos que ninguno esta destruido todavia
            if(fila==1){
            ladrillos[i].style.backgroundColor = "red";
    
          }else  if(fila==2){
            ladrillos[i].style.backgroundColor = "aqua";
    
          }else  if(fila==3){
            ladrillos[i].style.backgroundColor = "green";
    
          }else  if(fila==4){
            ladrillos[i].style.backgroundColor = "orange";
    
          }else  if(fila==5){
            ladrillos[i].style.backgroundColor = "white";
    
          }else  if(fila==6){
            ladrillos[i].style.backgroundColor = "blue";
    
          }else  if(fila==7){
            ladrillos[i].style.backgroundColor = "brown";
    
          }else if(fila==8){
            ladrillos[i].style.backgroundColor = "teal";
    
          }
          }
    }
     
  
        
    
    //nos muestra la informacion del juego
    function informacionDelJuego() {
      informacion.style.width="310px";
      informacion.style.height="175px";
      informacion.style.color="#b5ff08";
      informacion.style.backgroundColor="#1707f2";
      informacion.style.padding="10px";

      informacion.innerHTML = "<strong>Informacion del juego:</strong>"
        + "<br>" + "<strong>Posicion X (top) de la pelota:  </strong>" + contTop
        + "<br>" + " <strong>Posicion Y (left) de la pelota: </strong>" + contLeft
        + "<br>" + " <strong>Cantidad de ladrillos destruidos: </strong>" + cantLadrillosDestruidos
        + "<br>" + "<strong>Posicion de la barra con el raton: </strong>" + cx
        + "<br>" + " <strong>Posicion de la barra con las teclas: </strong>" + contLeftBarra
        + "<br>" + " <strong>Puntos: </strong>" + puntos
        + "<br>" + " <strong>Vidas: </strong>" + vidas
        + "<br>" + " <strong>Nivel: </strong>" + nivel;
    }
    function sumarPuntos() {
      if (cantLadrillosDestruidos >= 0 && cantLadrillosDestruidos <= 25) {
        puntos = puntos + sumaDePuntos * aumento;
      } if (cantLadrillosDestruidos > 25 && cantLadrillosDestruidos <= 55) {
        aumento = 2;
        puntos = puntos + (sumaDePuntos * aumento);
      } if (cantLadrillosDestruidos > 55 && cantLadrillosDestruidos <= 85) {
        aumento = 3;
        puntos = puntos + (sumaDePuntos * aumento);

      } if (cantLadrillosDestruidos > 85) {
        aumento = 4;
        puntos = puntos + (sumaDePuntos * aumento);

      }
    }
  }