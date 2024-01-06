import Drop from "./components/drop.js";
import Stats from "./components/stats.js";
import Player from "./components/player.js";
import bus from "/js/bus.js";
import datos from "/js/datos.js";


customElements.define("x-drop", Drop);
customElements.define("x-stats", Stats);
customElements.define("x-player", Player);


window.d = {
  bus: bus,
  datos: datos,
}
