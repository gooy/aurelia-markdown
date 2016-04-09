define(["exports", "./markdown"], function (exports, _markdown) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  Object.defineProperty(exports, "Markdown", {
    enumerable: true,
    get: function get() {
      return _markdown.Markdown;
    }
  });

  function configure(aurelia) {
    aurelia.globalizeResources("./markdown");
  }
});
//# sourceMappingURL=index.js.map
