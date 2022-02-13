class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.vecinos = [];
    this.visitado = false;
    this.padre = null;
    this.distancia = Number.POSITIVE_INFINITY;
  }
  /**Agrega un nodo a la lista de adyacencia */
  agregarVecino(destino, peso) {
    //Si el destino no está en la lista de adyacencia
    if (!this.vecinos.includes(destino)) {
      this.vecinos.push([destino, peso])
    }
  }
}
export default Nodo;