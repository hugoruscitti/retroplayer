function sanitizar(str) {
  return str.replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
};


function crear_id() {
  return Math.random().toString(16).slice(2);
}


// Carga el contenido del archivo y lo retorna
// en formato string con todo el contenido.
async function leer_archivo(archivo) {
  return new Promise((success, fail) => {
    var freader = new FileReader();

    freader.onload = function(e) {
      success(e.target.result);
    }

    freader.readAsDataURL(archivo);
  });
}

function formatear_tiempo(tiempo) {
  let tiempo_como_texto = new Date(tiempo * 1000).toISOString();
  return tiempo_como_texto.substr(14, 8).split(".")[0];
}

export { 
  sanitizar,
  crear_id,
  formatear_tiempo,
  leer_archivo,
};
