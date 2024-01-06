function sanitize(str) {
  return str.replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
};

export { sanitize };
