import bus from "../bus.js";
import { crear_id, leer_archivo } from "/js/utils.js";

class Drop extends HTMLElement {

  connectedCallback() {
    var body = document.querySelector("html");

    body.addEventListener("drop", this.drop_handler.bind(this));
    body.addEventListener("dragover", this.on_drag_over.bind(this));
  }

  async drop_handler(ev) {
    // Evita que los archivos se abran directamente en el navegador.
    ev.preventDefault();

    let files = await this.abrir_archivos(ev.dataTransfer.files);

    // informa los archivos a  incorporar.
    if (files.length > 0) {
      bus.enviar("evento-cambia-la-lista-de-archivos", files);
      bus.enviar("evento-reproducir-desde-el-principio", {});
    } else {
      bus.enviar("evento-cambia-la-lista-de-archivos", []);
    }

    // Elimina el efecto de "sombreado" sobre el que se colocan los archivos.
    var drop_zone = this.querySelector("#drop_zone");
    drop_zone.classList.remove("over");
  }

  on_drag_over(ev) {
    // Evita que el archivo se abra directamente.
    ev.preventDefault();
  }

  disconnectedCallback() {
    drop_zone.removeEventListener("drop", this.drop_handler.bind(this));
    drop_zone.removeEventListener("dragover", this.on_drag_over.bind(this));
  }

  async abrir_archivos(archivos_originales) {
    let archivos = [];

    // itera por la lista de archivos y carga el contenido de cada
    // uno de los archivos en una lista.
    if (archivos_originales) {
      let lista = [...archivos_originales];

      for (var i=0; i<lista.length; i++) {
        let archivo = lista[i];

        // Si no es un archivo .mp3 pasa al siguiente archivo.
        if (!archivo.name.toLowerCase().endsWith(".mp3")) {
          continue;
        }

        let contenido = await leer_archivo(archivo);
        let nombre = archivo.name;
        let id = crear_id();

        archivos = [...archivos, {id, contenido, nombre}];
      }
    }

    archivos.sort(function(a, b) {
      return b.nombre > a.nombre;
    });

    return archivos;
  }

}

export default Drop;
