import Grafo from './Grafo.js';

function grafo() {
  let g = new Grafo()
  let nodos = ['A', 'B', 'C', 'D', 'E','F', 'G','H', 'I','O', 'T']
  for(let nodo of nodos){
    g.agregarNodo(nodo)
  }
  g.agregarAristaNoDirigida('O','A',4)
  g.agregarAristaNoDirigida('O','C',6)
  g.agregarAristaNoDirigida('O','B',3)
  g.agregarAristaNoDirigida('A','D',3)
  g.agregarAristaNoDirigida('A','C',5)
  g.agregarAristaNoDirigida('C','D',2)
  g.agregarAristaNoDirigida('C','B',4)
  g.agregarAristaNoDirigida('C','E',5)
  g.agregarAristaNoDirigida('C','F',2)
  g.agregarAristaNoDirigida('B','E',6)
  g.agregarAristaNoDirigida('D','G',4)
  g.agregarAristaNoDirigida('D','F',2)
  g.agregarAristaNoDirigida('F','G',2)
  g.agregarAristaNoDirigida('F','H',5)
  g.agregarAristaNoDirigida('F','E',1)
  g.agregarAristaNoDirigida('E','I',5)
  g.agregarAristaNoDirigida('E','H',2)
  g.agregarAristaNoDirigida('G','T',7)
  g.agregarAristaNoDirigida('G','H',2)
  g.agregarAristaNoDirigida('H','T',8)
  g.agregarAristaNoDirigida('H','I',3)
  g.agregarAristaNoDirigida('I','T',4)
  console.log(g.bellmanFordGrafo('O', 'T'))
}
grafo()