import bus from "../bus.js";

export default class Playlist extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = "<ul class='list pa0 ma0 playlist' id='playlist'></ul>";

    bus.conectar("evento-cambia-la-lista-de-archivos", (evento) => {
      this.draw_list(evento.detail);
    }, "playlist.js");
  }

  draw_list(archivos) {
    var list = this.querySelector("#playlist");

    list.innerHTML = archivos.map(e => `
      <x-playlist-item id="${e.id}" nombre="${e.nombre}"></x-playlist-item>
    `).join("\n");

  }

  draw_no_files(files) {
    var list = this.querySelector("#playlist");
    list.innerHTML = "Solo se permiten archivos .mp3";
  }


}
