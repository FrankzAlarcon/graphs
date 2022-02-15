import Nodo from './Nodo.js';

class Grafo {
  //Para metodos privados colocar # antes del nombre
  #nodos
  constructor() {
    this.#nodos = { };
  }
  get getNodos() {
    return this.#nodos
  }
  agregarNodo(valor){
    this.#nodos[JSON.stringify(valor)] = new Nodo(valor);
  }
  /**Agrega una arista no dirigida */
  agregarAristaNoDirigida(origen, destino, peso) {
    //Si el origen y el destino existen en el grafo
    if(!Object.keys(this.#nodos).includes(JSON.stringify(origen))) {
      console.log('no hay origen')
      return new Error('No existe el nodo' + origen);
    }
    if(!Object.keys(this.#nodos).includes(JSON.stringify(destino))){
      return new Error('No existe el nodo' + destino);
    }
    this.#nodos[JSON.stringify(origen)].agregarVecino(destino, peso);
    this.#nodos[JSON.stringify(destino)].agregarVecino(origen, peso);
  }

  agregarAristaDirigida(origen, destino, peso) {
    //Si el origen y destino existen en el grafo
    if(!Object.keys(this.#nodos).includes(JSON.stringify(origen))) {
      return new Error('No existe el nodo' + origen);
    }
    if(!Object.keys(this.#nodos).includes(JSON.stringify(destino))){
      return new Error('No existe el nodo' + destino);
    }
    this.#nodos[JSON.stringify(origen)].agregarVecino(destino, peso);
  }

  #minimo(lista) {
    if(lista.length > 0) {
      let distancia = this.#nodos[JSON.stringify(lista[0].valor)].distancia;
      let v = JSON.stringify(lista[0].valor);
      const keys = lista.map((nodo) => JSON.stringify(nodo.valor))
      for (let elemento of keys) {
        if(distancia > this.#nodos[elemento].distancia) {
          distancia = this.#nodos[elemento]. distancia;
          v = elemento;
        }
      }
      return v;
    }
  }
  /**ruta mas corta entre dos nodos */
  #camino(origen, destino) {
    let camino = [];
    let actual = destino;
    actual = JSON.stringify(actual)
    while(actual !== null) {
      camino.unshift(actual);
      actual = this.#nodos[actual].padre;
    }
    return [camino, this.#nodos[JSON.stringify(destino)].distancia];
  }
  #bellmanFord(origen) {
    //Verificar que el vertice existe en el grafo
    if(Object.keys(this.#nodos).includes(JSON.stringify(origen))) {
      //Asignar 0 a nodo inicial
      this.#nodos[JSON.stringify(origen)].distancia = 0;
      //Se crea una copia del origen
      let actual = origen;
      let noVisitados = []
      for(let nodo of Object.keys(this.#nodos)) {
        if(nodo !== JSON.stringify(origen)) {
          //Poner inf a todos lo vertices excepto el inicial
          this.#nodos[nodo].distancia = Number.POSITIVE_INFINITY;
        }
        this.#nodos[nodo].padre = null; //Asigna un predecesor nulo
        noVisitados.push(this.#nodos[nodo])//Poner todos los vertices no visitados
      }
      actual = JSON.stringify(actual)
      while(noVisitados.length > 0) {
        //Mientras existan nodos no visitados
        for(let vecino of this.#nodos[actual].vecinos) {
          //Por cada vecino en el nodo origen
          if(this.#nodos[JSON.stringify(vecino[0])].visitado === false) {
            //por cada vecino no visitado [vecino, peso]
            if(this.#nodos[actual].distancia + vecino[1] < this.#nodos[JSON.stringify(vecino[0])].distancia) {
              //Si la distancia actual + distancia del vecino es menor que la distancia del vecino
              //Se actualiza la distancia a la suma
              this.#nodos[JSON.stringify(vecino[0])].distancia = this.#nodos[actual].distancia + vecino[1];
              //Establecer como padre del nodo vecino al nodo actual
              this.#nodos[JSON.stringify(vecino[0])].padre = actual;
            }
          }
        }
        //Establecer el vertice actual como visitado y removerlo de la lista de no visitados
        this.#nodos[actual].visitado = true;
        noVisitados = noVisitados.filter(nodo => JSON.stringify(nodo.valor) !== actual);
        // console.log(noVisitados.length)
        actual = this.#minimo(noVisitados);
        // console.log(actual)
      }
    } else {
      //Si no existe en el grafo
      return new Error('No existe el nodo en el grafo')
    }
  }
  bellmanFordGrafo(origen, destino){
    try {
      this.#bellmanFord(origen);
      return this.#camino(origen, destino);
    } catch (error) {
      console.log(error)
    }
  }
}
export default Grafo;