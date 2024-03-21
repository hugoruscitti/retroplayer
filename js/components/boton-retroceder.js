import bus from "/js/bus.js";

export default class BotonRetroceder extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<button class="boton-retroceder bn bg-inherit pointer absolute"></button>`;

    let elemento = this.firstChild; 
    elemento.addEventListener("click", this.cuando_hace_click.bind(this));
  }

  disconnectedCallback() {
    this.firstChild.removeEventListener("click", this.cuando_hace_click.bind(this));
  }

  cuando_hace_click() {
    bus.enviar("evento-retroceder-cancion", {});
  }

}
