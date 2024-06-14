import bus from "../bus.js";

export default class BarraDeProgreso extends HTMLElement {

  constructor() {
    super();

    this.mouse_down = false;
  }

  connectedCallback() {
    this.innerHTML = `
      <div id="progreso" class="progreso absolute flex">
        <div id="cursor" class="cursor absolute"></div>
      <div>
    `;

    const progreso = this.querySelector("#progreso");

    // Este componente no almacena el progreso de la canción, simplemente
    // "escucha" si el player cambia la posición de la canción y en ese
    // caso se re-dibuja.
    bus.conectar("evento-cambia-tiempo", this.cuando_cambia_el_tiempo.bind(this));

    // Los siguientes eventos se utilizan para que el usuario pueda
    // solicitar un cambio en la posición de la canción. Notar que acá
    // solo se emite la señal al player de que se quiere cambiar
    // la posición de reproducción.
    progreso.addEventListener("click", this.actualizar.bind(this));
    progreso.addEventListener("mousemove", this.on_mouse_move.bind(this));
    progreso.addEventListener("mousedown", this.on_mouse_down.bind(this));

    // este evento se coloca en el documento para permitir al
    // usuario que suelte el deslizador fuera de la barra.
    document.addEventListener("mouseup", this.on_mouse_up.bind(this));
  }

  actualizar(evento) {
    let cursor = this.querySelector("#cursor");
    let porcentaje = this.obtener_porcentaje(evento.clientX, cursor.element.parentElement);

    bus.enviar("evento-solicita-cambiar-tiempo", { porcentaje });
  }

  posicionar_cursor(porcentaje) {
    const cursor = this.querySelector("#cursor");
    const tamaño = cursor.parentElement.clientWidth - cursor.clientWidth;

    cursor.style.left = `${(porcentaje / 100) * tamaño}px`;
  }

  on_mouse_down() {
    this.mouse_down = true;

    let cursor = this.querySelector("#cursor");
    cursor.classList.add("cursor-pulsado");
  }

  on_mouse_up(evento) {
    const cursor = this.querySelector("#cursor");

    if (this.mouse_down) {
      let porcentaje = this.obtener_porcentaje(evento.clientX, cursor.parentElement);
      this.posicionar_cursor(porcentaje);

      this.actualizar(evento);
    }

    this.mouse_down = false;
    cursor.classList.remove("cursor-pulsado");
  }

  obtener_porcentaje(client_x, contenedor) {
    let borde_izquierdo = contenedor.getBoundingClientRect().left;
    let borde_derecho = contenedor.getBoundingClientRect().right;
    let dx = (client_x - borde_izquierdo) / contenedor.clientWidth;
    return dx * 100;
  }

  on_mouse_move(evento) {
    if (this.mouse_down) {
      let porcentaje = this.obtener_porcentaje(evento.clientX, evento.parent.parentElement);
      this.posicionar_cursor(porcentaje);
    }
  }

  cuando_cambia_el_tiempo(evento) {
    if (!this.mouse_down) {
      let { actual, duracion } = evento.detail;
      this.posicionar_cursor((actual / duracion) * 100);
    }
  }

}
