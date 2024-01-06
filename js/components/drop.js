import { sanitize } from "/js/utils.js";
import bus from "/js/bus.js";

class Drop extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.initial_render();
    var drop_zone = this.querySelector("#drop_zone");

    drop_zone.addEventListener("drop", this.drop_handler.bind(this));
    drop_zone.addEventListener("dragover", this.on_drag_over.bind(this));
    drop_zone.addEventListener("dragleave", this.on_drag_leave.bind(this));
    drop_zone.addEventListener("dragenter", this.on_drag_enter.bind(this));
  }

  initial_render() {
    this.innerHTML = `
      <div id="drop_zone">
        Pon tus archivos aquí
      </div>


      <ul id="list">
      </ul>
    `;
  }

  on_drag_enter(event) {
    var drop_zone = this.querySelector("#drop_zone");
    drop_zone.classList.add("over");
  }

  on_drag_leave(event) {
    var drop_zone = this.querySelector("#drop_zone");
    drop_zone.classList.remove("over");
  }

  on_drag_over(event) {
    var drop_zone = this.querySelector("#drop_zone");
    drop_zone.classList.remove("over");
  }

  async drop_handler(ev) {
    var files = [];

    // Evita que los archivos se abran.
    ev.preventDefault();

    async function leer_archivo(archivo) {
      return new Promise((success, fail) => {
        var freader = new FileReader();

        freader.onload = function(e) {
          success(e.target.result);
        }

        freader.readAsDataURL(archivo);
      });
    }

    if (ev.dataTransfer.files) {
      let lista = [...ev.dataTransfer.files];

      for (var i=0; i<lista.length; i++) {
        let file = lista[i];

        let contenido = await leer_archivo(file);
        let nombre = file.name;

        files = [...files, {contenido, nombre}];
      }
    }



    if (files.length > 0) {
      bus.enviar("evento-cambia-la-lista-de-archivos", files);
      bus.enviar("evento-reproducir-desde-el-principio", {});

      this.draw_list(files);
    } else {
      // si ningún archivo es .mp3 muestra un error.
      this.draw_no_files();
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
    drop_zone.removeEventListener("dragleave", this.on_drag_leave.bind(this));
    drop_zone.removeEventListener("dragenter", this.on_drag_enter.bind(this));
  }


  draw_list(files) {
    var list = this.querySelector("#list");
    list.innerHTML = files.map(e => `<li>${sanitize(e.nombre)}</li>`).join("\n");
  }

  draw_no_files(files) {
    var list = this.querySelector("#list");
    list.innerHTML = "Solo se permiten archivos .mp3";
  }

}

export default Drop;
