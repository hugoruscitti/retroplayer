import bus from "../bus.js";

export default class TituloDeArchivo extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div id="titulo-de-archivo" class="titulo-de-archivo truncate">
        Un nombre
      <div>
    `;

    bus.conectar("evento-comienza-a-reproducir-cancion", this.actualizar.bind(this));
  }

  actualizar(evento) {
    let { nombre } = evento.detail;
    let elemento = this.querySelector("#titulo-de-archivo");
    elemento.innerText = nombre;
  }

}
