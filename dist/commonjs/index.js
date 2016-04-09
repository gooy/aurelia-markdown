"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _markdown = require("./markdown");

Object.defineProperty(exports, "Markdown", {
  enumerable: true,
  get: function get() {
    return _markdown.Markdown;
  }
});

function configure(aurelia) {
  aurelia.use.globalResources("./markdown");
}
//# sourceMappingURL=index.js.map
