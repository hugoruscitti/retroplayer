import bus from "/js/bus.js";

export default class Volumen extends HTMLElement {

  connectedCallback() {
    this.pulsado = false;

    this.innerHTML = `<div class="volumen-fondo volumen absolute">
        <div id="volumen" style="" class="volumen-fondo-del-deslizador"></div>
        <div id="cursor-del-volumen" style="pointer-events:none" class="cursor-del-volumen absolute"></div>
      </div>`;

    let volumen = this.firstChild;

    volumen.addEventListener("click", this.actualizar.bind(this));
    volumen.addEventListener("mousemove", this.on_mouse_move.bind(this));
    volumen.addEventListener("mousedown", this.on_mouse_down.bind(this));
    document.addEventListener("mouseup", this.on_mouse_up.bind(this));

    this.actualizar_grafico(0);
  }

  actualizar(evento) {
  }

  actualizar_grafico(volumen) {
    let elemento = this.querySelector("#volumen");

    // cambia el fondo para que muestre un color cálido cuando
    // el volumen está muy alto.
    elemento.style.background = `url("/img/volumen.png") 0px ${-volumen*8}px`;
  }

  mover_cursor(progreso) {
    let cursor = this.querySelector("#cursor-del-volumen");
    let contenedor = cursor.parentElement.clientWidth;
    cursor.style.left = `${progreso*contenedor}px`;

  }

  on_mouse_down(evento) {
    this.pulsado = true;

    // TODO: cambiar el gráfico del cursor para que aparezca pulsado.
    console.log("mouse down");
  }

  saludar(nombre) {
    console.log(`hola mundo 🔥🔥🔥🔥🔥 ${nombre} 123123`);
  }

  on_mouse_up(evento) {
    console.log("mouse up");
    this.saludar("Hugo 123");
    
    this.pulsado = false;
  }

  on_mouse_move(evento) {
    if (this.pulsado && evento.target.id === "volumen") {
      // progreso es un valor entre 0 y 1
      let progreso = (evento.offsetX-10)/(this.firstChild.clientWidth+20);
      this.actualizar_grafico(parseInt(progreso, 10) * 27);
      this.mover_cursor(progreso);
    }
  }

}
