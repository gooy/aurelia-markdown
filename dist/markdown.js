System.register(['aurelia-framework', 'showdown', 'prism'], function (_export) {
  var bindable, noView, useView, useShadowDOM, skipContentProcessing, showdown, prism, _classCallCheck, _createClass, MarkdownCustomElement;

  function dedent(str) {
    var match = str.match(/^[ \t]*(?=\S)/gm);
    if (!match) {
      return str;
    }var indent = Math.min.apply(Math, match.map(function (el) {
      return el.length;
    }));

    var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    return indent > 0 ? str.replace(re, '') : str;
  }
  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      noView = _aureliaFramework.noView;
      useView = _aureliaFramework.useView;
      useShadowDOM = _aureliaFramework.useShadowDOM;
      skipContentProcessing = _aureliaFramework.skipContentProcessing;
    }, function (_showdown) {
      showdown = _showdown['default'];
    }, function (_prism) {
      prism = _prism['default'];
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      MarkdownCustomElement = (function () {
        function MarkdownCustomElement(element) {
          _classCallCheck(this, _MarkdownCustomElement);

          this.element = element;
          this.converter = new showdown.converter();
        }

        _createClass(MarkdownCustomElement, [{
          key: 'attached',
          value: function attached() {
            this.root = this.element.shadowRoot || this.element;
            this.valueChanged(this.element.innerHTML);
          }
        }, {
          key: 'valueChanged',
          value: function valueChanged(newValue) {
            this.root.innerHTML = this.converter.makeHtml(dedent(newValue));
            var codes = this.root.querySelectorAll('pre code');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = codes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var node = _step.value;
                prism.highlightElement(node);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                  _iterator['return']();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        }], [{
          key: 'inject',
          enumerable: true,
          value: [Element]
        }]);

        var _MarkdownCustomElement = MarkdownCustomElement;
        MarkdownCustomElement = skipContentProcessing(MarkdownCustomElement) || MarkdownCustomElement;
        MarkdownCustomElement = noView(MarkdownCustomElement) || MarkdownCustomElement;
        return MarkdownCustomElement;
      })();

      _export('MarkdownCustomElement', MarkdownCustomElement);
    }
  };
});
//# sourceMappingURL=markdown.js.map