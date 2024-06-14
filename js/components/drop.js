import bus from "../bus.js";
import { crear_id, obtener_file_object, leer_directorio, es_archivo_de_audio } from "../utils.js";

class Drop extends HTMLElement {

  connectedCallback() {
    var body = document.querySelector("html");

    body.addEventListener("drop", this.drop_handler.bind(this));
    body.addEventListener("dragover", this.on_drag_over.bind(this));
  }

  async drop_handler(ev) {
    // Evita que los archivos se abran directamente en el navegador.
    ev.preventDefault();

    let files = await this.abrir_archivos(ev.dataTransfer.items);

    // informa los archivos a  incorporar.
    if (files.length > 0) {
      bus.enviar("evento-cambia-la-lista-de-archivos", files);
      bus.enviar("evento-reproducir-desde-el-principio", {});
    } else {
      bus.enviar("evento-cambia-la-lista-de-archivos", []);
    }
  }

  on_drag_over(ev) {
    // Evita que el archivo se abra directamente.
    ev.preventDefault();
  }

  async abrir_archivos(archivos_originales) {
    let archivos = [];
    let entries = Array.from(archivos_originales).map(e => e.webkitGetAsEntry());

    for (let i=0; i<entries.length; i++) {
      if (entries[i].isDirectory) {

        let file_entries = await leer_directorio(entries[i]);

        file_entries = file_entries.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });

        file_entries = file_entries.filter(es_archivo_de_audio);

        for (let j=0; j<file_entries.length; j++) {
          let archivo = await obtener_file_object(file_entries[j]);
          let contenido = URL.createObjectURL(archivo)
          let nombre = archivo.name;
          let id = crear_id();

          archivos = [...archivos, {id, contenido, nombre}];
        }


      } else {
        let archivo = await obtener_file_object(entries[i]);
        let contenido = URL.createObjectURL(archivo)
        let nombre = archivo.name;
        let id = crear_id();

        archivos = [...archivos, {id, contenido, nombre}];
      }
    }

    return archivos;
  }



}

export default Drop;
