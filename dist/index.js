System.register(["./markdown"], function (_export) {
  _export("configure", configure);

  function configure(aurelia) {
    aurelia.globalizeResources("./markdown");
  }

  return {
    setters: [function (_markdown) {
      _export("MarkdownCustomElement", _markdown.MarkdownCustomElement);
    }],
    execute: function () {
      "use strict";
    }
  };
});
//# sourceMappingURL=index.js.map