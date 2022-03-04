import Nodo from './Nodo.js';
/**
* Clase para crear un Grafo
* @property {Object} nodos Objecto que almcena los Nodos del Grafo
* @example
* const nuevoGrafo = new Grafo()
*/

class Grafo {
  //Para metodos privados colocar # antes del nombre
  #nodos
  constructor() {
    this.#nodos = { };
  }

  /**Obtener la propiedad que almacena los Nodos del grafo 
  * @returns {Object} Objeto donde se almacenan los Nodos del Grafo
  */
  get getNodos() {
    return this.#nodos
  }
  /**Obtener un nodo por su Clave
  * @param {object} Identificador\Clave de un nodo
  * @returns {Nodo} Retorna el Nodo
  */
  getNodoPorKey(keyNodo) {
    return Object.entries(this.#nodos).find(([key, value]) => key === JSON.stringify(keyNodo) ? value:null);
  }

  /**Agregar un Nodo al Grafo 
  * @param {Object} Dato/clave del Nodo a ingresar  
  * @returns {void} 
  */
  agregarNodo(valor){
    this.#nodos[JSON.stringify(valor)] = new Nodo(valor);
  }

  /**Agregar una arista no dirigida 
  * @param {Nodo} origen Nodo Origen
  * @param {Nodo} destino Nodo Destino
  * @param {number} peso Tamaño-Peso de la arista 
  * @returns {boolean} Retorna True si se ingreso la arista correctamente, Retorna False si ya existe la arista 
  */
  agregarAristaNoDirigida(origen, destino, peso) {
    //Si el origen y el destino existen en el grafo
    if(!Object.keys(this.#nodos).includes(JSON.stringify(origen))) {
      console.log('no hay origen')
      return new Error('No existe el nodo' + origen);
    }
    if(!Object.keys(this.#nodos).includes(JSON.stringify(destino))){
      return new Error('No existe el nodo' + destino);
    }
    // Del Nodo Origen -> Nodo Destino  && Nodo Destino -> Nodo Origen
    if(this.#nodos[JSON.stringify(origen)].agregarVecino(this.#nodos[JSON.stringify(destino)], peso)
    && this.#nodos[JSON.stringify(destino)].agregarVecino(this.#nodos[JSON.stringify(origen)],peso)){
      //Si se ingreso correctamente y no Existe el vertice retorna True
        return true;
    }else{
      //Si ya existe el vertice retorna False
        return false;
      }
  }
  
  /**Agregar una arista Dirigida 
  * @param {Nodo} Nodo Origen
  * @param {Nodo} Nodo Destino
  * @param {number} Peso de la arista 
  * @returns {void}
  */
  agregarAristaDirigida(origen, destino, peso) {
    //Si el origen y destino existen en el grafo
    if(!Object.keys(this.#nodos).includes(JSON.stringify(origen))) {
      return new Error('No existe el nodo' + origen);
    }
    if(!Object.keys(this.#nodos).includes(JSON.stringify(destino))){
      return new Error('No existe el nodo' + destino);
    }
    // Del Nodo Origen -> Nodo Destino 
    this.#nodos[JSON.stringify(origen)].agregarVecino(destino, peso);
  }

  /**Obtener la matriz de adyacencia del Grafo
  * @returns {Array} Matriz de adyacencia
  */
  matrizAdyacencia() {
    const matriz = [];
    let filas = [];
    if(Object.keys(this.#nodos).length !== 0) {
      let valoresNodos = Object.values(this.#nodos);
      console.table(valoresNodos);
      for(let fila of valoresNodos) {
        for(let columna of valoresNodos) {
          // let ids = fila.vecinos.map(function callback(vecino){
          //   return vecino[0]});

          let ids = fila.vecinos.map(vecino => JSON.stringify(vecino[0].valor))
          if(ids.includes(JSON.stringify(columna.valor))) {
            let index = ids.findIndex(id => columna.valor.id === JSON.parse(id).id);
      
            
            filas.push(fila.vecinos[index][1]);
          } else {
            filas.push(Number.POSITIVE_INFINITY);
          }
        }
        matriz.push(filas)
        filas = []
      }
    }
    return matriz;
  }
  /**Calcular el nodo con distancia mínima de una lista 
  * @param {Array} lista Lista con los nodos a recorrer 
  * @returns {Nodo} Retorna el nodo con la distancia mínima
  */
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
  /**Calcular la ruta mas corta entre dos nodos
  * @param {Nodo} origen Nodo Origen  
  * @param {Nodo} lista Nodo Destino  
  * @returns {Array} Retorna una lista que contiene un array que representa el camino de nodos y un valor qu representa la distancia recorrida
  */
  #camino(origen, destino) {
    let camino = [];
    let actual = destino;
    actual = JSON.stringify(actual)
    while(actual !== null) {
      camino.unshift(actual);
      // console.log('camino',actual)
      actual = this.#nodos[actual].padre;
    }
    return [camino, this.#nodos[JSON.stringify(destino)].distancia];
  }
  /**Calcular la ruta mas corta entre dos nodos
  * @param {Nodo} origen Nodo Origen  
  * @param {Nodo} lista Nodo Destino  
  * @returns {Array} Retorna una lista que contiene un array que representa el camino de nodos y un valor qu representa la distancia recorrida
  */
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
        this.#nodos[nodo].visitado = false;
        noVisitados.push(this.#nodos[nodo])//Poner todos los vertices no visitados
      }
      actual = JSON.stringify(actual)
      while(noVisitados.length > 0) {
        //Mientras existan nodos no visitados
        let NodoAux = this.#nodos[actual];
        this.#nodos[actual].vecinos.some(function(vecino){
          //Por cada vecino en el nodo origen
          if(vecino[0].visitado === false) {
            //por cada vecino no visitado [vecino, peso]
            let aux2 = NodoAux.distancia + vecino[1] 
            if(aux2< vecino[0].distancia) {
              //Si la distancia actual + distancia del vecino es menor que la distancia del vecino
              //Se actualiza la distancia a la suma
              (vecino[0].distancia) = NodoAux.distancia + vecino[1];
              //Establecer como padre del nodo vecino al nodo actual
              vecino[0].padre = actual;
            }
          }
        });
        //Establecer el vertice actual como visitado y removerlo de la lista de no visitados
        this.#nodos[actual].visitado = true;
        noVisitados = noVisitados.filter(nodo => JSON.stringify(nodo.valor) !== actual);
        actual = this.#minimo(noVisitados);
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
      console.log(error);
    }
  }

  /**Calcular el arbol de expansion minimo desde un nodo a través del algortimo de Prim 
  * @param {Nodo} Nodo Inicial desde donde partir
  * @returns {Array} Aristas del arbol de expansión mínima
  */
  prim(nodoInicial) {
    const matriz = this.matrizAdyacencia();
    const numNodos = Object.keys(this.#nodos).length;
    const posicionNodoInicial = Object.keys(this.#nodos).findIndex(key => key === JSON.stringify(nodoInicial));
    let visitados = [];//Almacena nodos visitados o no (0 y 1)
    while(visitados.length !== numNodos) {
      visitados.push(0);
    }
    visitados[posicionNodoInicial] = 1;
    const aristasArbol = []; //Almacena aristas del arbol
    
    for(let i = 0; i < numNodos - 1; i++) {
      let minimo = Number.POSITIVE_INFINITY;
      let agregarVertice = 0;
      let arista =[];
      for(let j = 0; j < numNodos; j++) {
        if(visitados[j] === 1) {
          for(let k = 0; k < numNodos; k++) {
            if(visitados[k] === 0 && matriz[j][k] < minimo) {
              agregarVertice = k;
              let inicio = Object.keys(this.#nodos)[j];
              let destino = Object.keys(this.#nodos)[k];
              arista = [inicio, destino];
              minimo = matriz[j][k]
            }
          }
        }
      }
      visitados[agregarVertice] = 1;
      aristasArbol.push(arista)
    }
    return aristasArbol;
  }
}
export default Grafo;