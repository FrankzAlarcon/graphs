import DibujarGrafo from './library/DibujarGrafo.js';
import Grafo from './library/Grafo.js';

let dibujoGrafo = new DibujarGrafo();
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
// let misSeguidos = []
document.addEventListener('DOMContentLoaded',  /*async */() => {
  // await getSeguidos();
  initApp()
  fillNodes(misSeguidos);
  fillEdgesAuto();
})

function initApp() {
  const botonRutaMasCorta = document.querySelector('.ruta-mas-corta');
  botonRutaMasCorta.addEventListener('click', () => {
    const data =   rutaMasCorta(owner, misSeguidos[0])
    console.log(data)
    fillEdges(data)
  })
}

async function getSeguidos() {
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

function fillNodes(listaNodos){
  dibujoGrafo.addNode(owner)
  grafo.agregarNodo(owner)
  listaNodos.forEach(user => {
    dibujoGrafo.addNode(user)
    grafo.agregarNodo(user)
  })
}
function fillEdgesAuto() {
  misSeguidos.forEach(user => {
    try {
      dibujoGrafo.addEdge(owner, user)
      grafo.agregarAristaNoDirigida(owner, user, user.public_metrics.followers_count)
    } catch (error) {
      console.log(error)
    }
  })
  dibujoGrafo.addEdge(misSeguidos[0], misSeguidos[1])
  dibujoGrafo.addEdge(misSeguidos[0], misSeguidos[2])
  dibujoGrafo.addEdge(misSeguidos[0], misSeguidos[3])
  dibujoGrafo.addEdge(misSeguidos[0], misSeguidos[4])
  dibujoGrafo.addEdge(misSeguidos[0], misSeguidos[5])

  grafo.agregarAristaNoDirigida(misSeguidos[0], misSeguidos[1], misSeguidos[1].public_metrics.followers_count)
  grafo.agregarAristaNoDirigida(misSeguidos[0], misSeguidos[2], misSeguidos[2].public_metrics.followers_count)
  grafo.agregarAristaNoDirigida(misSeguidos[0], misSeguidos[3], misSeguidos[3].public_metrics.followers_count)
  grafo.agregarAristaNoDirigida(misSeguidos[0], misSeguidos[4], misSeguidos[4].public_metrics.followers_count)
  grafo.agregarAristaNoDirigida(misSeguidos[0], misSeguidos[5], misSeguidos[5].public_metrics.followers_count)
  console.log(grafo)
  // dibujoGrafo.addEdge(misSeguidos[5], misSeguidos[0])
}
function fillEdges(lista_edges) {
  dibujoGrafo =  new DibujarGrafo();
  const lista = lista_edges.map(user => JSON.parse(user))
  console.log(lista)
  lista.forEach(user => {
    dibujoGrafo.addNode(user)//todo: devolver como obj en ruta mas corta
  });
  for(let i = 1; i < lista.length; i++) {
    dibujoGrafo.addEdge(lista[i-1], lista[i])
  }

}
function rutaMasCorta(origen, destino) {
  const data = grafo.bellmanFordGrafo(origen, destino)
  // console.log(data)
  return data[0];
}