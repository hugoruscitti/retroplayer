import bus from "../bus.js";

export default class Grafico extends HTMLElement {

  constructor() {
    super();
    this.analyser = null;
    this.audio_context = null;
  }

  connectedCallback() {
    this.innerHTML = `
      <canvas 
        id='canvas'
        class="grafico absolute"
        width=164
        height=30></canvas>
    `;

    bus.conectar("evento-reproducir", this.al_reproducir.bind(this));
    bus.conectar("evento-reproducir-cancion-desde-archivo", this.al_reproducir.bind(this));

    // esta función entra en un loop para redibujar constántemente.
    this.dibujar();
  }

  al_reproducir() {
    // TODO: referencia cruzada a otro componente, ver si hay forma
    // de hacer esto más explícito.
    let audio = document.querySelector("audio");
    this.crear_o_reutilizar_manejador_de_audio(audio);
  }

  dibujar() {
    requestAnimationFrame(this.dibujar.bind(this));

    if (!this.analyser) {
      return;
    }

    let ancho = 167;
    let alto = 30;

    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");

    this.analyser.fftSize = 64;
    const pasos = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(pasos);
    this.analyser.getByteFrequencyData(dataArray);


    // Gradiente de colores 
    const lingrad = contexto.createLinearGradient(0, 0, 0, alto);
    lingrad.addColorStop(0, "orange");
    lingrad.addColorStop(1, "limegreen");

    contexto.clearRect(0, 0, canvas.width, canvas.height);

    // nota, el bucle debería ser hasta i<pasos, pero quise omitir la
    // última barra del ecualizador para mantener el tamaño del
    // display.
    for (let i=0; i<pasos -1; i++) {
      let valor = dataArray[i];

      contexto.fillStyle = lingrad;
      contexto.fillRect(i*6, alto - (valor/256)*alto, 4, (valor/256)*alto);
    }
  }

  crear_o_reutilizar_manejador_de_audio(audio) {
    if (!this.analyser && !this.audio_context) {
      let audioctx = new AudioContext();
      let analyser = audioctx.createAnalyser();
      analyser.fftSize = 256;

      let source = audioctx.createMediaElementSource(audio);    
      source.connect(analyser);
      
      let oscillator = audioctx.createOscillator();
      oscillator.connect(audioctx.destination);
      source.connect(audioctx.destination);

      // se utilizar en la función dibujar.
      this.analyser = analyser;
      this.audio_context = audioctx;
    }
  }

}
