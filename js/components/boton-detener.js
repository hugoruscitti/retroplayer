import bus from "../bus.js";

export default class BotonPausar extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<button class="boton-detener bn bg-inherit pointer absolute"></button>`;

    let elemento = this.firstChild; 
    elemento.addEventListener("click", this.cuando_hace_click.bind(this));
  }

  disconnectedCallback() {
    this.firstChild.removeEventListener("click", this.cuando_hace_click.bind(this));
  }

  cuando_hace_click() {
    bus.enviar("evento-detener", {});
  }

}
