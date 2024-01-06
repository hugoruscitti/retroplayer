class Bus {

  constructor() {
    this.eventos = [
      "evento-cambia-la-lista-de-archivos",
      "evento-reproducir-desde-el-principio",
      "evento-reproducir",
      "evento-pausar",
      "evento-finaliza-cancion",
      "evento-finaliza-lista-de-archivos",
    ];
  }

  enviar(nombre, datos) {
    this.validar_evento(nombre, datos);

    let evento = new CustomEvent(nombre, {detail: datos});
    document.dispatchEvent(evento);
  }

  validar_evento(nombre, datos) {
    console.assert(typeof nombre === "string", "Nombre inválido");
    console.assert(typeof datos === "object", "Datos inválidos");
    console.assert(this.eventos.includes(nombre), "Evento no declarado");
  }

  conectar(nombre, funcion) {
    document.addEventListener(nombre, funcion);
  }

  desconectar(nombre, funcion) {
    document.removeEventListener(nombre, funcion);
  }

}

var bus = new Bus();

export default bus;
