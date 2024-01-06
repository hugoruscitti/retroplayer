import bus from "/js/bus.js";

class Stats extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = "Sin archivos";

    console.log("conectando...");

    bus.conectar("evento-cambia-lista-de-archivos", function() {
      console.log("AAAAAAAAAAAAA");
    }, "stats.js");
  }


  disconnectedCallback() {
    bus.desconectar("evento-cambia-lista-de-archivos", this.on_changed_playlist.bind(this));
  }

  on_changed_playlist(playlist) {
    console.log("cambia-lista-de-archivos", playlist);
  }

}

export default Stats;
