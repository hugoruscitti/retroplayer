import bus from "./js/bus.js";

export default class BotonAvanzar extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<button class="boton-avanzar bn bg-inherit pointer absolute"></button>`;

    let elemento = this.firstChild; 
    elemento.addEventListener("click", this.cuando_hace_click.bind(this));
  }

  disconnectedCallback() {
    this.firstChild.removeEventListener("click", this.cuando_hace_click.bind(this));
  }

  cuando_hace_click() {
    bus.enviar("evento-avanzar-cancion", {});
  }

}
