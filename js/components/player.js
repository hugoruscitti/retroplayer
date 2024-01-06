import bus from "/js/bus.js";
import datos from "/js/datos.js";

class Player extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = "<audio id='player' controls></audio>";

    this.player = this.querySelector("#player");

    bus.conectar("evento-reproducir-desde-el-principio", this.reproducir_primer_archivo.bind(this));
    bus.conectar("evento-reproducir", this.reproducir.bind(this));
    bus.conectar("evento-pausar", this.pausar.bind(this));
    bus.conectar("evento-finaliza-cancion", this.siguiente.bind(this));

    this.player.addEventListener("ended", function() {
      bus.enviar("evento-finaliza-cancion", {});
    });
  }

  reproducir_primer_archivo(evento) {
    var archivo = datos.obtener_primer_archivo();
    this.player.src = archivo.contenido;
    this.reproducir();
  }

  reproducir() {
    this.player.play();
  }

  pausar() {
    this.player.pause();
  }

  detener() {
    this.player.pause();
    this.player.currentTime = 0;
  }

  siguiente() {
    var archivo = datos.obtener_siguiente_archivo();

    if (archivo) {
      this.player.src = archivo.contenido;
      this.reproducir();
    } else {
      console.log("Ha finalizado de reproducir todo el playlist");
      bus.enviar("evento-finaliza-lista-de-archivos", {});
      this.detener();
    }

  }
}

export default Player;