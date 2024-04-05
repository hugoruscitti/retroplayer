import bus from "../bus.js";
import { formatear_tiempo } from "../utils.js";

export default class Tiempo extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div class="tiempo absolute" id="tiempo">00:00</div>`;

    bus.conectar("evento-cambia-tiempo", (evento) => {
      this.actualizar_tiempo(evento.detail.actual);
    });
  }

  actualizar_tiempo(actual) {
    let elemento = this.querySelector("#tiempo");

    elemento.innerText = formatear_tiempo(actual);
  }

}
