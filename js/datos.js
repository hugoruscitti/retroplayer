import bus from "./bus.js";

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

  obtener_archivo_anterior() {
    this.indice_de_archivo_actual -= 1;

    if (this.indice_de_archivo_actual < 0) {
      this.indice_de_archivo_actual = 0;
    }

    return this.archivos[this.indice_de_archivo_actual];
  }

  obtener_primer_archivo() {
    if (this.archivos.length === 0) {
      console.warn("No hay archivos en la lista");
      return null;
    }

    datos.indice_de_archivo_actual = 0;
    return datos.archivos[0];
  }

  obtener_archivo_desde_id(id) {
    var archivo = this.archivos.filter(e=> e.id === id)[0];

    if (!archivo) {
      throw Error("No existe el archivo buscado: " + id);
    }

    return archivo;
  }


  actualizar_indice(archivo) {
    // Cambia el índice de archivo actual en base al archivo que se
    // quiere reproducir. Esta función se usa dentro del player cuando
    // el usuario selecciona una canción del playlists de forma arbitraria.
    
    this.indice_de_archivo_actual = this.archivos.indexOf(archivo);
  }

}


var datos = new Datos();

export default datos;
