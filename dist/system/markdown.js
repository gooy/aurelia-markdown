System.register(['aurelia-framework', 'showdown', 'prism'], function (_export) {
  'use strict';

  var bindable, noView, customElement, processContent, inject, showdown, prism, Markdown;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  function dedent(str) {
    var match = str.match(/^[ \t]*(?=\S)/gm);
    if (!match) return str;

    var indent = Math.min.apply(Math, match.map(function (el) {
      return el.length;
    }));

    var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    return indent > 0 ? str.replace(re, '') : str;
  }
  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      inject = _aureliaFramework.inject;
    }, function (_showdown) {
      showdown = _showdown['default'];
    }, function (_prism) {
      prism = _prism['default'];
    }],
    execute: function () {
      Markdown = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Markdown, [{
          key: 'model',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }], null, _instanceInitializers);

        function Markdown(element) {
          _classCallCheck(this, _Markdown);

          _defineDecoratedPropertyDescriptor(this, 'model', _instanceInitializers);

          this.element = element;
          this.converter = new showdown.Converter();
        }

        _createDecoratedClass(Markdown, [{
          key: 'attached',
          value: function attached() {
            this.root = this.element.shadowRoot || this.element;
            if (!this.model) {
              this.valueChanged(this.element.innerHTML);
            } else {
              this.valueChanged(this.model);
            }
          }
        }, {
          key: 'modelChanged',
          value: function modelChanged() {
            this.valueChanged(this.model);
          }
        }, {
          key: 'valueChanged',
          value: function valueChanged(newValue) {
            if (!this.root) return;
            this.root.innerHTML = this.converter.makeHtml(dedent(newValue));
            var codes = this.root.querySelectorAll('pre code');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = codes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var node = _step.value;

                var c = node.className;

                node.className = "language-" + c;

                var pre = node.parentNode;

                pre.className = "language-" + c;

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
        }], null, _instanceInitializers);

        var _Markdown = Markdown;
        Markdown = inject(Element)(Markdown) || Markdown;
        Markdown = noView()(Markdown) || Markdown;
        Markdown = customElement("markdown")(Markdown) || Markdown;
        Markdown = processContent(false)(Markdown) || Markdown;
        return Markdown;
      })();

      _export('Markdown', Markdown);
    }
  };
});
//# sourceMappingURL=markdown.js.map
