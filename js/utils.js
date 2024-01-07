function sanitizar(str) {
  return str.replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
};


function crear_id() {
  return Math.random().toString(16).slice(2);
}


export { sanitizar, crear_id };
