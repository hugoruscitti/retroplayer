import bus from "../bus.js";

export default class BotonReproducir extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<button class="boton-reproducir bn bg-inherit pointer absolute"></button>`;

    let elemento = this.firstChild; 
    elemento.addEventListener("click", this.cuando_hace_click.bind(this));
  }

  disconnectedCallback() {
    this.firstChild.removeEventListener("click", this.cuando_hace_click.bind(this));
  }

  cuando_hace_click() {
    // TODO: en winamp, cuando pulsas el botón reproducir comienza la
    // canción desde cero, pero si justo está en pausa continúa desde donde
    // está. Esta lógica me parece que va en el player, pero debería estar.
    bus.enviar("evento-reproducir", {});
  }

}
