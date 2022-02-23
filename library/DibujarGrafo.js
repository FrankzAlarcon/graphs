//@ts-check
//Librería para dibujar grafos
import cytoscape from 'cytoscape';

/**
* Clase que permite dibujar Grafo
* @example
* const dibujarGrafo = new dibujarGrafo({id = 'dateNodo'})
*/
class DibujarGrafo {
  constructor(id) {
    this.graph = cytoscape({
      container: document.getElementById(id),
    
      layout: {
        name: 'grid',
        rows: 2,
        cols: 2
      },

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#11aaff',
            "border-style": 'solid',
            "border-width": '2px',
            "border-color": '#88aaff',
            'label': 'data(id)',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1,
            'line-color': '#000',
            'target-arrow-color': '#e60',
            'target-arrow-shape': 'triangle',
            'label': 'data(label)',
            'font-size': '14px',
            'color': '#000'
          }
        }
      ],

      elements: {
        nodes: [],
        edges: []
      }
    });
  }
  dibujarNodo(nodo) {
  /***Paremetros */
    this.graph.add({group: 'nodes',data: {id: nodo.username, name: nodo.name}, position: {x: Math.random()*600 + 10, y: Math.random()*400}})
  }
  dibujarArista(origen, destino) {
    this.graph.add({group: 'edges', data: {id:`${origen.username}-${destino.username}`, source: origen.username, target: destino.username, label: destino.public_metrics.followers_count}})
  }
  dibujarAristaConPeso(origen, destino, peso) {
    this.graph.add({group: 'edges', data: {id:`${origen.username}-${destino.username}`, source: origen.username, target: destino.username, label: peso}})
  }
}

export default DibujarGrafo;