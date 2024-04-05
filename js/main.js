import Drop from "./components/drop.js";
import Player from "./components/player.js";
import Playlist from "./components/playlist.js";
import PlaylistItem from "./components/playlist-item.js";
import Tiempo from "./components/tiempo.js";
import BarraDeProgreso from "./components/barra-de-progreso.js";
import TituloDeArchivo from "./components/titulo-de-archivo.js";
import Display from "./components/display.js";
import Grafico from "./components/grafico.js";
import BotonReproducir from "./components/boton-reproducir.js";
import BotonDetener from "./components/boton-detener.js";
import BotonPausar from "./components/boton-pausar.js";
import BotonRetroceder from "./components/boton-retroceder.js";
import BotonAvanzar from "./components/boton-avanzar.js";
import Led from "./components/led.js";
import Volumen from "./components/volumen.js";

import bus from "./js/bus.js";
import datos from "./js/datos.js";

customElements.define("x-drop", Drop);
customElements.define("x-player", Player);
customElements.define("x-playlist", Playlist);
customElements.define("x-playlist-item", PlaylistItem);
customElements.define("x-tiempo", Tiempo);
customElements.define("x-barra-de-progreso", BarraDeProgreso);
customElements.define("x-titulo-de-archivo", TituloDeArchivo);
customElements.define("x-display", Display);
customElements.define("x-grafico", Grafico);
customElements.define("x-boton-reproducir", BotonReproducir);
customElements.define("x-boton-detener", BotonDetener);
customElements.define("x-boton-pausar", BotonPausar);
customElements.define("x-boton-retroceder", BotonRetroceder);
customElements.define("x-boton-avanzar", BotonAvanzar);
customElements.define("x-led", Led);
customElements.define("x-volumen", Volumen);

// DEBUG
import fixture from "/js/fixture.js";
bus.enviar("evento-cambia-la-lista-de-archivos", fixture.archivos);

//
// bus.enviar("evento-reproducir-desde-el-principio", {});
// end debug


window.resizeTo(548, 243);

window.d = {
  bus,
  datos,
  fixture
}
