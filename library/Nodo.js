//@ts-check

/**
* Clase que representa un Nodo
@Atributos {
  valor, vecinos, visitado, padre, distancia}
*/
class Nodo {

  /**
   * @param {Object} valor Identificador o Dato del nodo
   */
  constructor(valor) {
    this.valor = valor;
    this.vecinos = [];
    this.visitado = false;
    this.padre = null;
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