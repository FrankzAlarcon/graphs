//@ts-check

/**
* Clase que representa un Nodo
* @example
* const nuevoNodo = new Nodo({valor = 'dateNodo'})
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
   * @param {Object} destino Nodo siguiente a conectar
   * @param {number} peso Peso de la arista
   * @returns {boolean} Retorna True si se ingresa correctamente, Retorna False si no se ingresa correctamente.
  */
  agregarVecino(destino, peso) {
    //Si el destino no está en la lista de adyacencia
    let aux = [destino,peso]
    
    const resultado = this.vecinos.some(function(vecino){
    return vecino[0].valor.username == destino.valor.username
    });
    if(resultado) {
      //Si ya existe el vertice
      return false  
    }else {
      //Caso contrario se agrega
      this.vecinos.push([destino, peso]);
      const resultado = this.valor.username + " --> " + destino.valor.username;
      console.log(resultado);     
      return true
    }
  }
}
export default Nodo;