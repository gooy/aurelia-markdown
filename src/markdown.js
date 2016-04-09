import {
  bindable,
  noView,
  customElement,
  processContent,
  inject
} from 'aurelia-framework';
import showdown from 'showdown';
import prism from 'prism';

@processContent(false)
@customElement("markdown")
@noView()
@inject(Element)
export class Markdown {

  @bindable model = null;

  constructor(element){
    this.element = element;
    this.converter = new showdown.Converter();
  }

  attached(){
    this.root = this.element.shadowRoot || this.element;
    if(!this.model) {
      this.valueChanged(this.element.innerHTML);
    }else{
      this.valueChanged(this.model);
    }
  }

  modelChanged(){
    this.valueChanged(this.model);
  }

  valueChanged(newValue){
    if(!this.root) return;
    this.root.innerHTML = this.converter.makeHtml(dedent(newValue));
    var codes = this.root.querySelectorAll('pre code');
    for(var node of codes) {
      var c = node.className;
      //node.classList.remove(c);
      node.className = "language-"+c;

      var pre = node.parentNode;
      //pre.classList.remove(c);
      pre.className = "language-"+c;

      prism.highlightElement(node);
    }
  }
}

function dedent(str){
  var match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) return str;

  var indent = Math.min.apply(Math, match.map(function (el) {
    return el.length;
  }));

  var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
  return indent > 0 ? str.replace(re, '') : str;
}
