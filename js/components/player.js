import bus from "../bus.js";
import datos from "../datos.js";

class Player extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = "<audio id='player' class='' controls></audio>";

    this.player = this.querySelector("#player");

    bus.conectar("evento-reproducir-desde-el-principio", this.reproducir_primer_archivo.bind(this));
    bus.conectar("evento-reproducir", this.reproducir.bind(this));
    bus.conectar("evento-pausar", this.pausar.bind(this));
    bus.conectar("evento-detener", this.detener.bind(this));
    bus.conectar("evento-finaliza-cancion", this.siguiente.bind(this));

    bus.conectar("evento-avanzar-cancion", this.siguiente.bind(this));
    bus.conectar("evento-retroceder-cancion", this.retroceder.bind(this));

    bus.conectar("evento-reproducir-cancion-desde-archivo", this.reproducir_desde_archivo.bind(this));

    bus.conectar("evento-solicita-cambiar-tiempo", this.cuando_solicitan_cambiar_el_tiempo.bind(this));

    this.player.addEventListener("ended", function() {
      bus.enviar("evento-finaliza-cancion", {});
      bus.enviar("evento-player-se-ha-detenido", {});
    });


    this.player.addEventListener("play", function() {
      bus.enviar("evento-player-comienza-a-reproducir", {});
    });

    this.player.addEventListener("timeupdate", (event) => {
      if (this.player.duration) {
        let actual = this.player.currentTime;
        let duracion = this.player.duration;
        bus.enviar("evento-cambia-tiempo", {actual, duracion});
      }
    });
  }

  reproducir_primer_archivo(evento) {
    var archivo = datos.obtener_primer_archivo();

    if (archivo) {
      this.player.src = archivo.contenido;
      this.reproducir();
      bus.enviar("evento-comienza-a-reproducir-cancion", archivo);
    }
  }

  reproducir() {
    if (this.player.paused) {
      this.player.play();
    } else {
      this.player.currentTime = 0;
      this.player.play();
    }
  }

  pausar() {
    this.player.pause();
    bus.enviar("evento-player-ha-sido-pausado", {});
  }

  detener() {
    this.player.pause();
    this.player.currentTime = 0;
    bus.enviar("evento-player-se-ha-detenido", {});
  }

  retroceder() {
    var archivo = datos.obtener_archivo_anterior();

    if (archivo) {
      this.player.src = archivo.contenido;
      this.reproducir();
      bus.enviar("evento-comienza-a-reproducir-cancion", archivo);
    } else {
      // reproduce la misma canción desde el principio.
      this.reproducir();
    }
  }

  siguiente() {
    var archivo = datos.obtener_siguiente_archivo();

    if (archivo) {
      this.player.src = archivo.contenido;
      this.reproducir();
      bus.enviar("evento-comienza-a-reproducir-cancion", archivo);
    } else {
      console.log("Ha finalizado de reproducir todo el playlist");
      bus.enviar("evento-finaliza-lista-de-archivos", {});
      this.detener();
    }
  }

  reproducir_desde_archivo(evento) {
    var archivo = evento.detail;

    this.player.src = archivo.contenido;
    this.reproducir();
    bus.enviar("evento-comienza-a-reproducir-cancion", archivo);
    datos.actualizar_indice(archivo);
  }

  cuando_solicitan_cambiar_el_tiempo(evento) {
    let porcentaje = evento.detail.porcentaje;
    this.player.currentTime = (porcentaje/100) * this.player.duration
  }


}

export default Player;
