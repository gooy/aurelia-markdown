System.register(["./markdown"], function (_export) {
  "use strict";

  _export("configure", configure);

  function configure(aurelia) {
    aurelia.globalizeResources("./markdown");
  }

  return {
    setters: [function (_markdown) {
      _export("MarkdownCustomElement", _markdown.MarkdownCustomElement);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=index.js.map