function mover(accion, mapaActual, mapaMinas){
    acciones = ["up", "down", "left", "right"]
    if(acciones.indexOf(accion) == -1){
        return "error: accion no definida"
    }
    CARACTER_FIN = "@"
    if(mapaActual.indexOf(CARACTER_FIN) >= 0){
        return "error: no se puede ejecutar más acciones"
    }
    matrixActual = mapaActual.trim().split("\n")
    matrixMinas = mapaMinas.trim().split("\n")
    if(matrixActual.length == 0){
        return "error: mapa actual no puede ser vacío"
    }
    if(matrixMinas.length == 0){
        return "error: mapa minas no puede ser vacío"
    }
    rowsActual = matrixActual.length
    colsActual = matrixActual[0].length
    for(i = 0; i < matrixActual.length; i++){
        if(matrixActual[i].length != colsActual){
            return "error: dimensiones incorrectas para mapa actual"
        }
        matrixActual[i] = matrixActual[i].split("")
    }    
    rowsMinas = matrixMinas.length
    colsMinas = matrixMinas[0].length
    for(i = 0; i < matrixMinas.length; i++){
        if(matrixMinas[i].length != colsMinas){
            return "error: dimensiones incorrectas para mapa minas"
        }
    }
    if(rowsActual != rowsMinas || colsActual != colsMinas){
        return "error: dimesiones distintas para mapa actual y minas"
    }
    CARACTER_POSICION_ACTUAL = "+"
    x = -1
    y = -1
    for(i = 0; i < matrixActual.length; i++){
        x = matrixActual[i].indexOf(CARACTER_POSICION_ACTUAL)
        if(x >= 0){
            y = i
            break
        }
    }
    x0 = x
    y0 = y
    switch(accion){
        case 'up':
            y--
            break;
        case 'down':
            y++
            break;
        case 'left':
            x--
            break;
        case 'right':
            x++
            break;
    }
    if(x < 0){
        x = 0
    }
    if(x >= colsActual){
        x = colsActual - 1
    }
    if(y < 0){
        y = 0
    }
    if(y >= rowsActual){
        y = rowsActual - 1
    }
    
    CARACTER_MINA = "$"
    CARACTER_META = "#"
    CARACTER_VACIO = "0"
    if(CARACTER_MINA == matrixMinas[y][x]){
        matrixActual[y][x] = CARACTER_MINA
    }else if(CARACTER_META == matrixMinas[y][x]){
        matrixActual[y][x] = CARACTER_FIN
        matrixActual[y0][x0] = CARACTER_VACIO
    }else{
        //avanzar        
        matrixActual[y0][x0] = CARACTER_VACIO
        matrixActual[y][x] = CARACTER_POSICION_ACTUAL
    }
    result = []
    for(i = 0 ; i < matrixActual.length ; i++){
        result.push(matrixActual[i].join(""))
    }
    return result.join("\n")
}
function obtenerResultado(mapaActual, mapaPrevio){
    if(mapaActual == mapaPrevio){
        return "sin cambios"
    }
    if((mapaActual.match(/@/g) || []).length){
        return "fin"
    }
    minasActual = (mapaActual.match(/\$/g) || []).length
    minasPrevio = (mapaPrevio.match(/\$/g) || []).length
    if(minasActual > minasPrevio ){
        return "mina"
    }
    if(minasActual == minasPrevio ){
        return "sin mina"
    }    
}
function obtenerMatrixDeMapa(mapa){
    matrixMapa = mapa.trim().split("\n")
    for(i = 0; i < matrixMapa.length; i++){
        matrixMapa[i] = matrixMapa[i].split("")
    }
    return matrixMapa
}
//ejemplo
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
`
mapaActual = mapaInicial
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
console.log(obtenerMatrixDeMapa(mapaActual))


////////////////////////////////////////////////////////////////////////// A partir de aca es nuestro

var mapas=[`0000#0$$$00$0000$000+$000`];//falta crear más mapas preguntar al profe

var mapaSeleccionado=null;
LineasMapa=null;

var GenerarLineas=function(mapa){
    var auxiliar="";
    for(var i of mapa){
        auxiliar+=i
    }
    return auxiliar;

}

var imprimir=function(lineas){
    var a =document.getElementById("probando").innerHTML=lineas;//imprime las lineas del refran con espaciado y todo //__ __

}

/* var principal=function(evt){
    var caracter = evt.key; //almacena las letras
    console.log(caracter);
} */


var main=(function(){
    $(function(){
        $('#qwe').modal();//Muestra el modal al cargar la pagina
    });

    mapaSeleccionado=mapas[0];
    LineasMapa=GenerarLineas(mapaSeleccionado);
    imprimir(LineasMapa);
    //principal();



    /* 1.Eligir un mapa aleatorio
       2.Ocultar el mapa
       3.Botones arriba abajoa izquierda derecha
	       3.1	Verificar que al apretar no haya mina
	       3.2 Si no hay Avanza normal
		      3.2.1 Si hay ganador mensaje ganaste
	       3.3 Si hay mina  explosión contador aumenta
		      3.3.1Verificar si perdió :Mostrar mesaje
	   3.4 Ir mostrando en mapa */


});

window.addEventListener('load',main);