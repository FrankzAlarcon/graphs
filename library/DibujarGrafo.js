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
    this.x= 0;
    this.y = 20;
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
  if(this.x >= 650){
    this.x = 20
    this.y =  this.y + 150 + Math.random()*10
  }
    this.x = this.x + 200;
    this.graph.add({group: 'nodes',data: {id: nodo.username, name: nodo.name}, position: {x: this.x, y: this.y}})
  }
  dibujarArista(origen, destino) {
    this.graph.add({group: 'edges', data: {id:`${origen.username}-${destino.username}`, source: origen.username, target: destino.username, label: destino.public_metrics.followers_count}})
  }
  dibujarAristaConPeso(origen, destino, peso) {
    this.graph.add({group: 'edges', data: {id:`${origen.username}-${destino.username}`, source: origen.username, target: destino.username, label: peso}})
  }

}

export default DibujarGrafo;