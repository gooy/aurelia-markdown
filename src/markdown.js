import {bindable,noView,useView,useShadowDOM,skipContentProcessing} from 'aurelia-framework';
import showdown from 'showdown';
import prism from 'prism';

@skipContentProcessing
@noView
export class MarkdownCustomElement {

  static inject = [Element];
  constructor(element){
    this.element = element;
    this.converter = new showdown.converter();
  }

  attached(){
    this.root = this.element.shadowRoot || this.element;
    this.valueChanged(this.element.innerHTML);
  }

  valueChanged(newValue){
    this.root.innerHTML = this.converter.makeHtml(dedent(newValue));
    let codes = this.root.querySelectorAll('pre code');
    for(let node of codes) prism.highlightElement(node);
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
