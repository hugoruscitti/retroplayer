import bus from "../bus.js";

export default class Led extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div class="led led-detenido absolute"></div>`;

    bus.conectar("evento-player-comienza-a-reproducir", this.al_reproducir.bind(this));
    bus.conectar("evento-player-se-ha-detenido", this.al_detener.bind(this));
    bus.conectar("evento-player-ha-sido-pausado", this.al_pausar.bind(this));
  }

  al_reproducir() {
    this.activar_clase("led-reproduciendo");
  }

  al_pausar() {
    this.activar_clase("led-pausado");
  }

  al_detener() {
    this.activar_clase("led-detenido");
  }

  activar_clase(clase) {
    let elemento = this.firstChild;

    elemento.classList.remove("led-reproduciendo");
    elemento.classList.remove("led-pausado");
    elemento.classList.remove("led-detenido");

    elemento.classList.add(clase);
  }


}
