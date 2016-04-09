define(['exports', 'aurelia-framework', 'showdown', 'prism'], function (exports, _aureliaFramework, _showdown, _prism) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  var _showdown2 = _interopRequireDefault(_showdown);

  var _prism2 = _interopRequireDefault(_prism);

  var Markdown = (function () {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _createDecoratedClass(Markdown, [{
      key: 'model',
      decorators: [_aureliaFramework.bindable],
      initializer: function initializer() {
        return null;
      },
      enumerable: true
    }], [{
      key: 'inject',
      value: [Element],
      enumerable: true
    }], _instanceInitializers);

    function Markdown(element) {
      _classCallCheck(this, _Markdown);

      _defineDecoratedPropertyDescriptor(this, 'model', _instanceInitializers);

      this.element = element;
      this.converter = new _showdown2['default'].Converter();
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

            _prism2['default'].highlightElement(node);
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
    Markdown = (0, _aureliaFramework.noView)(Markdown) || Markdown;
    Markdown = (0, _aureliaFramework.customElement)("markdown")(Markdown) || Markdown;
    Markdown = (0, _aureliaFramework.skipContentProcessing)(Markdown) || Markdown;
    return Markdown;
  })();

  exports.Markdown = Markdown;

  function dedent(str) {
    var match = str.match(/^[ \t]*(?=\S)/gm);
    if (!match) return str;

    var indent = Math.min.apply(Math, match.map(function (el) {
      return el.length;
    }));

    var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    return indent > 0 ? str.replace(re, '') : str;
  }
});
//# sourceMappingURL=markdown.js.map
