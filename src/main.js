import DibujarGrafo from '../library/DibujarGrafo.js';
import Grafo from '../library/Grafo.js';
/* 
  Todo: Consultar como subir backend y frontend a un server, creo que funcionaria en "Heroku".
  -Todo: Mostrar la complejidad (terminado)
  -TOdo: Mejorar la interfaz y añadir controles para cuando se hace RMC o PRIM, puede ser mostrar un mensaje Terminado
  -Todo: generar aristas random (2 o 3 por nodo) excepto el primero. Terminado
  -Todo: crear las peticiciones desde el frontend. Terminado
  -Todo: Crear el algoritmo para arbol de expasion minimo en la misma clase grafo. TERMINADO
  -Todo: Implementar el arbol de expansio minimo dinamico. TERMINADO (probar para ver si hay bugs)
  -Todo: Crear dos canvas, uno es el grafo y el otro para mostrar el resultado. TERMINADO
  -Todo: Realizar en el backend una peticion para obtener los datos de usuario ingresando el username.  TERMINADO
  -Todo: Arreglar los estilos para mostrar los 2 canvas y agregar botones para arbol de expansion minimo.TERMINADO
 */


//Variables globales
let dibujoGrafo = new DibujarGrafo('graph');
const nodosParaRutaMasCorta = [];
const dibujarNodosSeleccionados = [];
let grafo = new Grafo();
let seguidoresOwner = [];
let owner = {};
let aristas = 0;

document.addEventListener('DOMContentLoaded',  () => {
  initApp()
})

function initApp() {
  //Añade los eventos en botones necesarios para que funciona la app
  const botonRutaMasCorta = document.querySelector('.ruta-mas-corta');
  botonRutaMasCorta.addEventListener('click', () => {
    // botonRutaMasCorta.style.backgroundColor = 'yellow';
    if(nodosParaRutaMasCorta.length === 2) {
      const data =   rutaMasCorta(nodosParaRutaMasCorta[0], nodosParaRutaMasCorta[1]);
      nodosParaRutaMasCorta.length = 0;
      dibujarNodosSeleccionados.length = 0;
      const complejidadTextoRmc = document.querySelector('.rmc-complejidad');
      complejidadTextoRmc.textContent = (seguidoresOwner.length + 1) * aristas;
      const complejidadTextoPrim = document.querySelector('.prim-complejidad');
      complejidadTextoPrim.textContent = 'Aristas * log(Vertices)';
      pintarAzul();
      llenarAristas(data);
    } else {
      const mensajeError =  document.querySelector('.rmc-error');
      if(mensajeError.style.display === 'none' || mensajeError.style.display === '') {
        mensajeError.style.display = 'block';
        setTimeout(() => {
          mensajeError.style.display = 'none';
        }, 3000);        
      }
    }
  });

  const botonArbolExpMin = document.querySelector('.arbol-minimo-prim');
  botonArbolExpMin.addEventListener('click', () => {
    // botonArbolExpMin.style.backgroundColor = 'yellow';
    if(nodosParaRutaMasCorta.length === 1){
      const resultados = arbolExpMin(nodosParaRutaMasCorta[0]);
      nodosParaRutaMasCorta.length = 0;
      dibujarNodosSeleccionados.length = 0;
      const complejidadTextoPrim = document.querySelector('.prim-complejidad');
      complejidadTextoPrim.textContent = Math.round(aristas * Math.log10(seguidoresOwner.length + 1) * 100) /100;
      const complejidadTextoRmc = document.querySelector('.rmc-complejidad');
      complejidadTextoRmc.textContent = 'Vertices * Aristas';
      pintarAzul();
      llenarAristasPrim(resultados);
    } else {
      const mensajeError =  document.querySelector('.prim-error');
      if(mensajeError.style.display === 'none' || mensajeError.style.display === '') {
        mensajeError.style.display = 'block';
        setTimeout(() => {
          mensajeError.style.display = 'none';
        }, 3000);        
      }
    }
  });
  const botonCrearGrafo = document.querySelector('.obtener-data');
  botonCrearGrafo.addEventListener('click', async () => {
    const resultado = new DibujarGrafo('result');
    const inputUsername = document.getElementById('username');
    if(inputUsername.value !== ''){
      const datos = await getSeguidos(inputUsername.value);
      if(datos === null){
        //Mostrar mensaje no se han obtenido datos
        const mensajeError =  document.querySelector('.fetch-error');
        if(mensajeError.style.display === 'none' || mensajeError.style.display === '') {
          mensajeError.style.display = 'block';
          setTimeout(() => {
            mensajeError.style.display = 'none';
          }, 3000);        
        }
        return 
      }
      owner = datos.owner;
      seguidoresOwner = datos.seguidores;
      llenarNodos(seguidoresOwner);
      llenarAristasAuto();
      const textoGrafo = document.querySelector('.grafo-inicial-text');
      textoGrafo.textContent = 'Grafo Inicial: Seguidos de ' + owner.username;
      //Reiniciar los textos de las complejidades
      const complejidadTextoPrim = document.querySelector('.prim-complejidad');
      complejidadTextoPrim.textContent = 'Aristas * log(Vertices)';
      const complejidadTextoRmc = document.querySelector('.rmc-complejidad');
      complejidadTextoRmc.textContent = 'Vertices * Aristas';
    }
  });
  listenerDibujarGrafo()
}
function listenerDibujarGrafo() {
  dibujoGrafo.graph.on('tap','node', (event) => {
    const target =event.target;
    const nodos = Object.values(grafo.getNodos)
    if(dibujarNodosSeleccionados.length === 0) {
      dibujarNodosSeleccionados.push(target);
      nodosParaRutaMasCorta.push(nodos.find(user => user.valor.username === target.data().id).valor);
      target.style({'background-color': '#ff6d53', 'border-color': 'black'});
    } else {
      if(dibujarNodosSeleccionados[0].data().id === target.data().id) {
        dibujarNodosSeleccionados[0].style({'background-color': '#11aaff', 'border-color': '#88aaff'});
        dibujarNodosSeleccionados.shift();
        nodosParaRutaMasCorta.shift();
        return;    
      } 
      if( dibujarNodosSeleccionados[1]?.data().id === target.data().id) {
        dibujarNodosSeleccionados[1].style({'background-color': '#11aaff', 'border-color': '#88aaff'});
        dibujarNodosSeleccionados.pop();
        nodosParaRutaMasCorta.pop();
        return; 
      } else {
        dibujarNodosSeleccionados.push(target);
        nodosParaRutaMasCorta.push(nodos.find(user => user.valor.username === target.data().id).valor);
        if(dibujarNodosSeleccionados.length > 2){
          dibujarNodosSeleccionados[0].style({'background-color': '#11aaff', 'border-color': '#88aaff'});
          dibujarNodosSeleccionados.shift();
          nodosParaRutaMasCorta.shift();
        }
        target.style({'background-color': '#ff6d53', 'border-color': 'black'});        
      }
    }
  });
}
function pintarAzul() {
  dibujoGrafo.graph.elements().forEach(element => {
    element.style({'background-color': '#11aaff', 'border-color': '#88aaff'});
  })
}

async function getSeguidos(username) {
  //hace fetch para obtener los datos
  const owner = await fetch(`https://grafos-backend-epn.herokuapp.com/get-owner/${username}`)
  .then(response => response.json())
  .then(responseJson => responseJson.body.data);
  const seguidores = await fetch(`https://grafos-backend-epn.herokuapp.com/get/${username}`)
  .then(response => response.json())
  .then(responseJson => responseJson.body.data);
  if(!seguidores || !owner){
    return null;
  }
  return {owner, seguidores};
}

function llenarNodos(listaNodos){
  dibujoGrafo = new DibujarGrafo('graph');
  grafo = new Grafo();
  listenerDibujarGrafo()
  //Añade los nodos al grafo y los dibuja
  dibujoGrafo.dibujarNodo(owner)
  grafo.agregarNodo(owner)
  listaNodos.forEach(user => {
    dibujoGrafo.dibujarNodo(user)
    grafo.agregarNodo(user)
  })
}

//Generar un numero aleatorio entre un rango [x, y]
function generarNumeroRandom(x,y) {
  return Math.floor(Math.random()*(y-x))+x;
}


function llenarAristasAuto() {
  //genera las aristas no dirigidas
  try {

  } catch (error) {
    console.log(error)
  }
  let numerosRandom = [];
  //Generar un array de minimo 6 elementos maximo 20 elementos
  let contador;
  //generar Conexxiones Random
  for(contador = 1; contador <= generarNumeroRandom(40,60); contador++){
    //Generar array con numeros randoms entre el 0 y 10
    numerosRandom.push(generarNumeroRandom(0 , 11)); //Al Final
  }
  if(numerosRandom.length%2 != 0){
      //Si el numeros de elementos es impar, eliminamos el último 
      numerosRandom.pop();
  } 
  //Se agrega el owner  a los seguidores
  seguidoresOwner.push(owner);
  for( contador = 0; contador <= numerosRandom.length-1; contador = contador + 2){
    if(grafo.agregarAristaNoDirigida(seguidoresOwner[numerosRandom[contador]], seguidoresOwner[numerosRandom[contador+1]], seguidoresOwner[numerosRandom[contador+1]].public_metrics.followers_count)){
      //Si no existe el vertice y se pudo ingresar correctamente
      aristas++;
      dibujoGrafo.dibujarArista(seguidoresOwner[numerosRandom[contador]], seguidoresOwner[numerosRandom[contador+1]]);
    }
  }
  //Quito el último
  seguidoresOwner.pop();
}
function llenarAristas(keysRutaCorta) {
  const dibujoGrafoRMC =  new DibujarGrafo('result');

  keysRutaCorta.forEach(user => {
    /**Añade la info de los nodos de la ruta mas corta para que se grafique */
    dibujoGrafoRMC.dibujarNodo(user);
  });
  /**Obtiene los nodos desde el grafo general */
  const nodosGrafo = Object.values(grafo.getNodos);

  const datosAgraficar = [];
  keysRutaCorta.forEach(nodo => {
    //obtiene los datos necesarios para la graficación correcta de aristas (username, peso)
    datosAgraficar.push(nodosGrafo.find(node => node.valor.id === nodo.id));
  })

  for(let i = 1; i < datosAgraficar.length; i++) {
    //Añade las aristas para que se dibujen
    dibujoGrafoRMC.dibujarAristaConPeso(datosAgraficar[i-1].valor, datosAgraficar[i].valor, datosAgraficar[i].distancia - datosAgraficar[i-1].distancia);
  }

}
function llenarAristasPrim(keysPrim) {
  const dibujoGrafoPrim =  new DibujarGrafo('result');
  const keys = Object.keys(keysPrim);

  keys.forEach(key => {
    dibujoGrafoPrim.dibujarNodo(JSON.parse(key));
  });

  const datosAgraficar = {};
  const nodosGrafo = Object.values(grafo.getNodos);
  
  keys.forEach(key => {

    
    const dato = nodosGrafo.find(nodo => nodo.valor.id === JSON.parse(key).id);

    datosAgraficar[JSON.stringify(dato.valor)] = [];
    keysPrim[key].forEach(nodo => {
      
      if(dato.vecinos.map(vecino => vecino[0].valor.id).includes(nodo.id)){
        
        datosAgraficar[JSON.stringify(dato.valor)].push(dato.vecinos.find(vecino => vecino[0].valor.id === nodo.id));
      }
    })
  });

  Object.keys(datosAgraficar).forEach(key => {
    datosAgraficar[key].forEach(nodo => {
      dibujoGrafoPrim.dibujarAristaConPeso(JSON.parse(key), nodo[0].valor, nodo[1]);
    })
  });
}
function rutaMasCorta(origen, destino) {
  //Retorna un string con las keys de los nodos y se almacena en data
  const data = grafo.bellmanFordGrafo(origen, destino);

  return data[0].map(user => JSON.parse(user));//transforma las keys a objetos
}
function arbolExpMin(origen) {
  const resultados = grafo.prim(origen);
  const resultadosJS = resultados.map(resultado => resultado.map(item => JSON.parse(item)));
  const keysUnicas = {};
  resultadosJS.forEach(resultado => {
    //obtengo los nodos diferentes
    if(!Object.keys(keysUnicas).find(key => resultado[0].username === JSON.parse(key)?.username)) {
      keysUnicas[JSON.stringify(resultado[0])] = [];
    }
    if(!Object.keys(keysUnicas).find(key => resultado[1].username === JSON.parse(key)?.username)) {
      keysUnicas[JSON.stringify(resultado[1])] = [];
    }
  });
  Object.keys(keysUnicas).forEach(key => {
    resultadosJS.forEach(resultado => {
      if(resultado[0].username === JSON.parse(key)?.username){
        keysUnicas[key].push(resultado[1]);
      }
    })
  })
  return keysUnicas;
}