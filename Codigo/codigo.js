var contador = 0;
var contadorVidas = 4;
var nivelAPasar = 1;
var estado_botones = 1; //1 es presente y 0 es oculto
var contadorGanadas=0;

function mover(accion, mapaActual, mapaMinas) {
  acciones = ["up", "down", "left", "right"];

  if (acciones.indexOf(accion) == -1) {
    return "error: accion no definida";
  }
  CARACTER_FIN = "@";
  if (mapaActual.indexOf(CARACTER_FIN) >= 0) {
    return "error: no se puede ejecutar más acciones";
  }
  matrixActual = mapaActual.trim().split("\n");
  matrixMinas = mapaMinas.trim().split("\n");
  if (matrixActual.length == 0) {
    return "error: mapa actual no puede ser vacío";
  }
  if (matrixMinas.length == 0) {
    return "error: mapa minas no puede ser vacío";
  }
  rowsActual = matrixActual.length;
  colsActual = matrixActual[0].length;
  for (i = 0; i < matrixActual.length; i++) {
    if (matrixActual[i].length != colsActual) {
      return "error: dimensiones incorrectas para mapa actual";
    }
    matrixActual[i] = matrixActual[i].split("");
  }
  rowsMinas = matrixMinas.length;
  colsMinas = matrixMinas[0].length;
  for (i = 0; i < matrixMinas.length; i++) {
    if (matrixMinas[i].length != colsMinas) {
      return "error: dimensiones incorrectas para mapa minas";
    }
  }
  if (rowsActual != rowsMinas || colsActual != colsMinas) {
    return "error: dimesiones distintas para mapa actual y minas";
  }
  CARACTER_POSICION_ACTUAL = "+";
  x = -1;
  y = -1;
  for (i = 0; i < matrixActual.length; i++) {
    x = matrixActual[i].indexOf(CARACTER_POSICION_ACTUAL);
    if (x >= 0) {
      y = i;
      break;
    }
  }
  x0 = x;
  y0 = y;
  switch (accion) {
    case "up":
      y--;
      break;
    case "down":
      y++;
      break;
    case "left":
      x--;
      break;
    case "right":
      x++;
      break;
  }
  if (x < 0) {
    x = 0;
  }
  if (x >= colsActual) {
    x = colsActual - 1;
  }
  if (y < 0) {
    y = 0;
  }
  if (y >= rowsActual) {
    y = rowsActual - 1;
  }

  CARACTER_MINA = "$";
  CARACTER_META = "#";
  CARACTER_VACIO = "0";
  if (CARACTER_MINA == matrixMinas[y][x]) {
    matrixActual[y][x] = CARACTER_MINA;
  } else if (CARACTER_META == matrixMinas[y][x]) {
    matrixActual[y][x] = CARACTER_FIN;
    matrixActual[y0][x0] = CARACTER_VACIO;
  } else {
    //avanzar
    matrixActual[y0][x0] = CARACTER_VACIO;
    matrixActual[y][x] = CARACTER_POSICION_ACTUAL;
  }
  result = [];
  for (i = 0; i < matrixActual.length; i++) {
    result.push(matrixActual[i].join(""));
  }
  return result.join("\n");
}
function obtenerResultado(mapaActual, mapaPrevio) {
  if (mapaActual == mapaPrevio) {
    return "sin cambios";
  }
  if ((mapaActual.match(/@/g) || []).length) {
    nivelAPasar++;
    var nivelActual = document.getElementById("nivel");
    var Mapa = document.getElementById("mapa");
    nivelActual.innerHTML = nivelAPasar;
    Mapa.innerHTML = nivelAPasar;
    main();
    contadorGanadas=contadorGanadas+1;
    if(contadorGanadas==3){
      estado_botones = 0;
      Estado_botones();
      finDelJuego();
    }

    return "FIN";
  }
  minasActual = (mapaActual.match(/\$/g) || []).length;
  minasPrevio = (mapaPrevio.match(/\$/g) || []).length;
  if (minasActual > minasPrevio) {
    contador++;
    contadorVidas--;
    var a = document.getElementById("cantidad_vidas");
    a.innerHTML = contadorVidas;
    if (contador > 3) {
      mostrarImagenalPerder();
      return "robot destruido";
    } else {
      return "mina";
    }
  }
  if (minasActual == minasPrevio) {
    return "sin mina";
  }
}
function obtenerMatrixDeMapa(mapa) {
  matrixMapa = mapa.trim().split("\n");
  for (i = 0; i < matrixMapa.length; i++) {
    matrixMapa[i] = matrixMapa[i].split("");
  }
  return matrixMapa;
}
//ejemplo
mapaInicial = `
0000#
00000
00000
00000
+0000
`;
mapaMinas = `
0000#
0$$$0
0$000
0$000
+$000
`;

////////////////////////////////////////////////////////////////////////// A partir de aca es nuestro
resultado = document.getElementById("resultado");
cuadro = document.getElementById("cuadro1");

var Estado_botones = function () {
  if (estado_botones == 0) {
    document.querySelector("#arriba").style.display = "none";
    document.querySelector("#abajo").style.display = "none";
    document.querySelector("#izquierda").style.display = "none";
    document.querySelector("#derecha").style.display = "none";

    /*
    =======NO BORRES LO COMENTADO ES PA PREGUNTAR AL PROFE===============
    document.querySelector("#nivel").style.display = "none";
    document.querySelector("#cantidad_vidas").style.display = "none";
    document.querySelector("#mapa").style.display = "none";
    document.querySelector("#resultado").style.display = "none";*/
  } else {
    /*document.querySelector("#arriba").setAttribute("class","btn btn-primary");
    document.getElementById("nivel").setAttribute("class","col-4 py-4 px-lg-5");*/

    document.querySelector("#arriba").style.display = "block";
    document.querySelector("#abajo").style.display = "block";
    document.querySelector("#izquierda").style.display = "block";
    document.querySelector("#derecha").style.display = "block";
    /*  document.querySelector("#nivel").style.display = "block";
    document.querySelector("#cantidad_vidas").style.display = "block";
    document.querySelector("#mapa").style.display = "block";
    document.querySelector("#resultado").style.display = "block";*/
  }
};

var flecha_movimiento;

var tecla_presionada = function (evt) {
  if (evt.keyCode == 37) {
    botonIzquierdaPressed();
  } else if (evt.keyCode == 38) {
    botonArribaPressed();
  } else if (evt.keyCode == 39) {
    botonDerechaPressed();
  } else if(evt.keyCode == 40) {
    botonAbajoPressed();
  }
};

var arriba = function () {
  mapaActual = mover("up", mapaActual, mapaMinas); //usar estas funciones
  console.log(mapaActual);
  matrix = obtenerMatrixDeMapa(mapaActual);
  pintar_grafico(matrix);
  resultado.innerHTML = 3;
  estado_botones = 1;
  resultado.innerHTML = obtenerResultado(mapaActual, mapaPrevio);

  mapaPrevio = mapaActual;
  if (contador > 3) {
    estado_botones = 0;
    Estado_botones();
  } else {
    Estado_botones();
  }
};

var abajo = function () {
  mapaActual = mover("down", mapaActual, mapaMinas); //usar estas funciones
  console.log(mapaActual);
  matrix = obtenerMatrixDeMapa(mapaActual);
  pintar_grafico(matrix);
  estado_botones = 1;
  resultado.innerHTML = obtenerResultado(mapaActual, mapaPrevio);

  mapaPrevio = mapaActual;
  if (contador > 3) {
    estado_botones = 0;
    Estado_botones();
  } else {
    Estado_botones();
  }
};

var izquierda = function () {
  mapaActual = mover("left", mapaActual, mapaMinas); //usar estas funciones
  console.log(mapaActual);
  matrix = obtenerMatrixDeMapa(mapaActual);
  pintar_grafico(matrix);
  estado_botones = 1;
  resultado.innerHTML = obtenerResultado(mapaActual, mapaPrevio);
  mapaPrevio = mapaActual;
  if (contador > 3) {
    estado_botones = 0;
    Estado_botones();
  } else {
    Estado_botones();
  }
};

var derecha = function () {
  mapaActual = mover("right", mapaActual, mapaMinas); //usar estas funciones
  console.log(mapaActual);
  matrix = obtenerMatrixDeMapa(mapaActual);
  pintar_grafico(matrix);
  estado_botones = 1;
  resultado.innerHTML = obtenerResultado(mapaActual, mapaPrevio);

  mapaPrevio = mapaActual;
  if (contador > 3) {
    estado_botones = 0;
    Estado_botones();
  } else {
    Estado_botones();
  }
};

var botonArribaPressed = function () {
  mostrarReloj();
  estado_botones = 0;
  Estado_botones();
  matriz = obtenerMatrixDeMapa(mapaActual);
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (matriz[j][i] == "+") {
        document.getElementById("cuadro" + j + "_" + i).innerHTML = '+';
      }
    }
  }
  setTimeout(arriba, 3000);
};

var botonAbajoPressed = function () {
  mostrarReloj();

  estado_botones = 0;
  Estado_botones();
  matriz = obtenerMatrixDeMapa(mapaActual);
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (matriz[j][i] == "+") {
        document.getElementById("cuadro" + j + "_" + i).innerHTML = "↓";
      }
    }
  }
  setTimeout(abajo, 3000);
};

var botonIzquierdaPressed = function () {
  mostrarReloj();
 
  estado_botones = 0;
  Estado_botones();
  matriz = obtenerMatrixDeMapa(mapaActual);
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (matriz[j][i] == "+") {
        document.getElementById("cuadro" + j + "_" + i).innerHTML = "←";
      }
    }
  }
  setTimeout(izquierda, 3000);
};

var botonDerechaPressed = function () {
  mostrarReloj();
 
  estado_botones = 0;
  Estado_botones();
  matriz = obtenerMatrixDeMapa(mapaActual);
  for (var i = 0; i < matriz.length; i++) {
    for (var j = 0; j < matriz[i].length; j++) {
      if (matriz[j][i] == "+") {
        document.getElementById("cuadro" + j + "_" + i).innerHTML = "→";
      }
    }
  }
  setTimeout(derecha, 3000);
};

var pintar_grafico = function (matrix) {
 for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      document.getElementById("cuadro" + j + "_" + i).innerHTML = matrix[j][i];
    }
  }
   for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < 5; j++) {
      if (matrix[j][i] == "+") {
        document.getElementById("cuadro" + j + "_" + i).innerHTML = '<img  src="../Imagenes/robop.png"  ; />';
      }
    }
  } 
  /*
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (matrix[j][i] == "0") {
        document.getElementById("cuadro" + j + "_" + i).innerHTML = '<img width="50px" height="50px" src="../Imagenes/escanor.png" />';
      }
    }
  }
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (matrix[j][i] == "$") {
        document.getElementById("cuadro" + j + "_" + i).innerHTML = '< width="50px" height="50px" img src="../Imagenes/robot.jpg" />';
      }
    }
  }*/
};


var ocultarReloj = function () {

  var a = document.getElementById("reloj");
  a.style.display="none"; 
  
  

};

 var mostrarReloj = function () {
  var qwe=document.createElement("lottie-player");
  qwe.setAttribute("id","reloj");
  qwe.setAttribute("src","https://assets8.lottiefiles.com/packages/lf20_oR5Wcu.json");
  qwe.setAttribute("speed","1.3");
  qwe.setAttribute("autoplay","");
  qwe.setAttribute("style","width:100px");
  qwe.setAttribute("style","height:100px");

  var asd=document.getElementById("resultado");
  asd.appendChild(qwe);
  var princi=document.getElementById("tmr");
  princi.appendChild(asd);
  document.getElementById("reloj").style.display = "block";
  

}; 



var finDelJuego=function(){
  $("#alperder").modal("show"); // abrir
}

var mostrarImagenalPerder = function () {
  $("#perder").modal({ backdrop: "static", keyboard: false }); //bloquea la pagina
  $("#perder").modal("show"); // abrir
};

var main = function () {
  $(function () {
    $("#qwe").modal(); //Muestra el modal al cargar la pagina
  });
  mapaActual = mapaInicial;
  console.log(mapaActual);
  mapaPrevio = mapaActual;
  matrixActual = obtenerMatrixDeMapa(mapaActual);
  matrixMinas = obtenerMatrixDeMapa(mapaMinas);

  /*  document.getElementById("arriba").addEventListener("click",botonArribaPressed);
  document.getElementById("derecha").addEventListener("click", botonDerechaPressed);
  document.getElementById("izquierda").addEventListener("click", botonIzquierdaPressed);
  document.getElementById("abajo").addEventListener("click", botonAbajoPressed); */

  document.getElementById("arriba").addEventListener("click", arriba);

  document.getElementById("derecha").addEventListener("click", derecha);
  document.getElementById("izquierda").addEventListener("click", izquierda);
  document.getElementById("abajo").addEventListener("click", abajo);

  document.addEventListener("keydown", tecla_presionada);
  pintar_grafico(matrixActual);
};

window.addEventListener("load", main);

/* //ejemplo
mapaInicial = `
0000#
00000
00000
00000
+0000
`
mapaMinas = `
0000#
0$$$0
0$000
0$000
+$000
` */

/* mapaActual = mapaInicial
console.log(mapaActual)
mapaPrevio = mapaActual
mapaActual = mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual
mapaActual = mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))

console.log(obtenerMatrixDeMapa(mapaActual)) */
