var template = require("marko/html").c(__filename);

module.exports = template;

function render(data, out) {
  out.w("<div replaced=\"test-replaceWith\"></div>");
}

template._ = render;
