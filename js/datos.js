import bus from "/js/bus.js";

class Datos {

  constructor() {
    this.archivos = [];
    this.indice_de_archivo_actual = 0;

    bus.conectar("evento-cambia-la-lista-de-archivos", this.cambiar_archivos.bind(this));
  }

  cambiar_archivos(datos) {
    this.archivos = datos.detail;
  }

  obtener_siguiente_archivo() {
    this.indice_de_archivo_actual += 1;

    if (this.indice_de_archivo_actual >= this.archivos.length) {
      console.warn("Ya no hay más archivos, regresando a la posición 0");
      this.indice_de_archivo_actual = 0;
      return null;
    }

    return this.archivos[this.indice_de_archivo_actual];
  }

  obtener_primer_archivo() {
    if (this.archivos.length === 0) {
      throw Error("No hay archivos en la lista");
    }

    datos.indice_de_archivo_actual = 0;
    return datos.archivos[0];
  }

}


var datos = new Datos();

export default datos;
