System.register(["./markdown"], function (_export) {
  "use strict";

  _export("configure", configure);

  function configure(aurelia) {
    aurelia.globalizeResources("./markdown");
  }

  return {
    setters: [function (_markdown) {
      _export("Markdown", _markdown.Markdown);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=index.js.map
