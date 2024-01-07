import Drop from "./components/drop.js";
import Stats from "./components/stats.js";
import Player from "./components/player.js";
import Playlist from "./components/playlist.js";
import PlaylistItem from "./components/playlist-item.js";
import bus from "/js/bus.js";
import datos from "/js/datos.js";


customElements.define("x-drop", Drop);
customElements.define("x-stats", Stats);
customElements.define("x-player", Player);
customElements.define("x-playlist", Playlist);
customElements.define("x-playlist-item", PlaylistItem);


// DEBUG
import fixture from "/js/fixture.js";
bus.enviar("evento-cambia-la-lista-de-archivos", fixture.archivos);
bus.enviar("evento-reproducir-desde-el-principio", {});
// end debug


window.d = {
  bus,
  datos,
  fixture
}
