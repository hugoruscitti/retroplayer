function sanitizar(str) {
  return str.replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
};


function crear_id() {
  return Math.random().toString(16).slice(2);
}


function formatear_tiempo(tiempo) {
  let tiempo_como_texto = new Date(tiempo * 1000).toISOString();
  return tiempo_como_texto.substr(14, 8).split(".")[0];
}


async function obtener_file_object(file_entry) {
  return new Promise((success) => {
    file_entry.file((file) => {
      success(file)
    });
  });
}


async function leer_directorio(directory_entry) {
  return new Promise(success => {
    const lector = directory_entry.createReader();

    lector.readEntries(entries => {
      success(entries);
    });
  });
}

function es_archivo_de_audio(item) {
  let nombre = item.name.toLowerCase(); 

  if (nombre.endsWith(".mp4") || nombre.endsWith(".mp3")) {
    return true;
  } else {
    return false;
  }
}



export { 
  sanitizar,
  crear_id,
  formatear_tiempo,
  obtener_file_object,
  leer_directorio,
  es_archivo_de_audio,
};

