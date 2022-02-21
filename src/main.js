import DibujarGrafo from '../library/DibujarGrafo.js';
import Grafo from '../library/Grafo.js';
/* 
  Todo: generar aristas random (2 o 3 por nodo) excepto el primero.
  Todo: Crear el algoritmo para arbol de expasion minimo en la misma clase grafo. TERMINADO
  Todo: Implementar el arbol de expansio minimo dinamico.
  Todo: Crear dos canvas, uno es el grafo y el otro para mostrar el resultado. TERMINADO
  Todo: Consultar como subir backend y frontend a un server, creo que funcionaria en "Heroku".
  Todo: Realizar en el backend una peticion para obtener los datos de ususraio ingresando el username.
  Todo: Arreglar los estilos para mostrar los 2 canvas y agregar botones para arbol de expansion minimo. 
 */



let dibujoGrafo = new DibujarGrafo('graph');
const nodosParaRutaMasCorta = [];
const grafo = new Grafo();

let misSeguidos = [
  {
    "id": "756982074",
    "name": "🌸Nia Lakshart🌸 KOI 💜",
    "username": "LakshartNia",
    "public_metrics": {
      "followers_count": 536768,
      "following_count": 269,
      "tweet_count": 33752,
      "listed_count": 231
    }
  },
  {
    "id": "1266722595916873729",
    "name": "xTheFocuSx",
    "username": "xTheFocuSx",
    "public_metrics": {
      "followers_count": 738639,
      "following_count": 113,
      "tweet_count": 2036,
      "listed_count": 184
    }
  },
  {
    "id": "459275531",
    "name": "JavaScript Daily",
    "username": "JavaScriptDaily",
    "public_metrics": {
      "followers_count": 506803,
      "following_count": 154,
      "tweet_count": 15537,
      "listed_count": 8021
    }
  },
  {
    "id": "139092348",
    "name": "Sergio Kun Aguero",
    "username": "aguerosergiokun",
    "public_metrics": {
      "followers_count": 14717992,
      "following_count": 142,
      "tweet_count": 4987,
      "listed_count": 18009
    }
  },
  {
    "id": "143183218",
    "name": "LeonidasEsteban.css",
    "username": "LeonidasEsteban",
    "public_metrics": {
      "followers_count": 56967,
      "following_count": 1133,
      "tweet_count": 27768,
      "listed_count": 585
    }
  },
  {
    "id": "1120977827883405313",
    "name": "ぐりこ",
    "username": "mrkms_",
    "public_metrics": {
      "followers_count": 21146,
      "following_count": 257,
      "tweet_count": 237,
      "listed_count": 61
    }
  },
  {
    "id": "1566463268",
    "name": "React",
    "username": "reactjs",
    "public_metrics": {
      "followers_count": 553567,
      "following_count": 270,
      "tweet_count": 2470,
      "listed_count": 6466
    }
  },
  {
    "id": "3167734591",
    "name": "Visual Studio Code",
    "username": "code",
    "public_metrics": {
      "followers_count": 452970,
      "following_count": 134,
      "tweet_count": 6127,
      "listed_count": 5468
    }
  },
  {
    "id": "91985735",
    "name": "Node.js",
    "username": "nodejs",
    "public_metrics": {
      "followers_count": 766876,
      "following_count": 642,
      "tweet_count": 6996,
      "listed_count": 8738
    }
  },
  {
    "id": "13334762",
    "name": "GitHub",
    "username": "github",
    "public_metrics": {
      "followers_count": 2212512,
      "following_count": 332,
      "tweet_count": 6825,
      "listed_count": 17041
    }
  }
];

const owner = {
  username: "KunAguero",
  id: "12345678",
  public_metrics: {
      "followers_count": 1112529,
      "following_count": 429,
      "tweet_count": 7474,
      "listed_count": 60
  },
  name: "Kun Aguero"
}
// misSeguidos.push(owner)
// let misSeguidos = []
document.addEventListener('DOMContentLoaded',  /*async */() => {
  // await getSeguidos();
  initApp()
  llenarNodos(misSeguidos);
  llenarAristasAuto();
})

function initApp() {
  //Añade los eventos en botones necesarios para que funciona la app
  const botonRutaMasCorta = document.querySelector('.ruta-mas-corta');
  botonRutaMasCorta.addEventListener('click', () => {
    if(nodosParaRutaMasCorta.length === 2) {
      const data =   rutaMasCorta(nodosParaRutaMasCorta[0], nodosParaRutaMasCorta[1]);
      nodosParaRutaMasCorta.length = 0
      llenarAristas(data)
    } else {
      console.log('Se deben seleccionar 2 nodos')
    }
  });

  const botonArbolExpMin = document.querySelector('.arbol-minimo-prim');
  botonArbolExpMin.addEventListener('click', () => {
    console.log(grafo.matrizAdyacencia())
    console.log(grafo.prim(owner))
  });

  const dibujarNodosSeleccionados = []
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

async function getSeguidos() {
  //hace fetch para obtener los datos
  const misSeguidosContainer = document.querySelector('.seguidos')
  misSeguidos = await fetch('http://localhost:3100/get')
  .then(response => response.json())
  .then(data => data.body.data)
  .catch(error => console.log(error))
  console.log('localhost',misSeguidos)
  if(!misSeguidos){
    return null;
  }
  misSeguidos.forEach(persona => {
    const p = document.createElement('P');
    p.textContent = persona.name;
    misSeguidosContainer.appendChild(p)
  })
}

function llenarNodos(listaNodos){
  //Añade los nodos al grafo y los dibuja
  dibujoGrafo.dibujarNodo(owner)
  grafo.agregarNodo(owner)
  listaNodos.forEach(user => {
    dibujoGrafo.dibujarNodo(user)
    grafo.agregarNodo(user)
  })
}
function llenarAristasAuto() {
  //genera las aristas no dirigidas
  try {
    misSeguidos.forEach(user => {
        dibujoGrafo.dibujarArista(owner, user)
        grafo.agregarAristaNoDirigida(owner, user, user.public_metrics.followers_count)
      })
  } catch (error) {
    console.log(error)
  }
  dibujoGrafo.dibujarArista(misSeguidos[0], misSeguidos[1])
  dibujoGrafo.dibujarArista(misSeguidos[0], misSeguidos[2])
  dibujoGrafo.dibujarArista(misSeguidos[0], misSeguidos[3])
  dibujoGrafo.dibujarArista(misSeguidos[0], misSeguidos[4])
  dibujoGrafo.dibujarArista(misSeguidos[0], misSeguidos[5])
/* Mis seguidos = 10 Nodos */
  grafo.agregarAristaNoDirigida(misSeguidos[0], misSeguidos[1], misSeguidos[1].public_metrics.followers_count)
  grafo.agregarAristaNoDirigida(misSeguidos[0], misSeguidos[2], misSeguidos[2].public_metrics.followers_count)
  grafo.agregarAristaNoDirigida(misSeguidos[0], misSeguidos[3], misSeguidos[3].public_metrics.followers_count)
  grafo.agregarAristaNoDirigida(misSeguidos[0], misSeguidos[4], misSeguidos[4].public_metrics.followers_count)
  grafo.agregarAristaNoDirigida(misSeguidos[0], misSeguidos[5], misSeguidos[5].public_metrics.followers_count)
  // dibujoGrafo.dibujarArista(misSeguidos[5], misSeguidos[0])
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
    datosAgraficar.push(nodosGrafo.find(node => node.valor.id === nodo.id))
  })

  for(let i = 1; i < datosAgraficar.length; i++) {
    //Añade las aristas para que se dibujen
    dibujoGrafoRMC.dibujarAristaConPeso(datosAgraficar[i-1].valor, datosAgraficar[i].valor, datosAgraficar[i].distancia - datosAgraficar[i-1].distancia)
  }

}
function rutaMasCorta(origen, destino) {
  //Retorna un string con las keys de los nodos y se almacena en data
  const data = grafo.bellmanFordGrafo(origen, destino);
  return data[0].map(user => JSON.parse(user));//transforma las keys a objetos
}