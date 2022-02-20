/**
* Representa un Nodo
@Atributos {
  valor, vecinos, visitado, padre, distancia}
*/
class Nodo {
  /**@Parametros {El valor o etiqueta del nodo} */
  constructor(valor) {
    
    this.valor = valor;
    /**
    *Propiedad que almacena los nodos vecinos del nodo.
    * @Tipo {arrays}*/
    this.vecinos = [];
    /**
    *Propiedad que determina si un nodo fue o no visitado.
    * @Tipo {boolean} @PorDefecto {false} */
    this.visitado = false;
    /**
    *Propiedad que almacena el nodo padre
    * @Tipo @PorDefecto {null} */
    this.padre = null;
    /**
    *Propiedad que almacena la distancia del nodo.
    * @Tipo {array} @PorDefecto {Number.POSITIVE_INFINITY}*/
    this.distancia = Number.POSITIVE_INFINITY;
  }
  /**Agrega un nodo a la lista de adyacencia 
   * @param destino Nodo a conectar
   * @param peso Peso de la arista
   * @returns None
  */
  agregarVecino(destino, peso) {
    //Si el destino no está en la lista de adyacencia
    if (!this.vecinos.includes(destino)) {
      this.vecinos.push([destino, peso])
    }
  }
}
export default Nodo;