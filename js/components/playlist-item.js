import bus from "/js/bus.js";
import datos from "/js/datos.js";

export default class PlaylistItem extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    let nombre = this.getAttribute("nombre");
    this.innerHTML = "<li class='ba pa2 pointer ma1'>" + nombre + "</li>";

    bus.conectar("evento-comienza-a-reproducir-cancion", this.alternar_seleccion.bind(this));
    this.addEventListener("click", this.reproducir.bind(this));
  }

  disconnectedCallback() {
    bus.desconectar("evento-comienza-a-reproducir-cancion", this.alternar_seleccion.bind(this));
    this.removeEventListener("click", this.reproducir.bind(this));
  }

  alternar_seleccion(evento) {
    let id = evento.detail.id;

    // con el ID de la canción que está reproduciendo
    // se intenta destacar o no el elemento actual.
    
    if (id === this.getAttribute("id")) {
      this.classList.add("red");
    } else {
      this.classList.remove("red");
    }
  }

  reproducir() {
    let id = this.getAttribute("id");
    var archivo = datos.obtener_archivo_desde_id(id);

    bus.enviar("evento-reproducir-cancion-desde-archivo", archivo);
  }

}
