# Aurelia Markdown

A custom element that renders markdown and highlights code blocks with prism.

## Installation

    jspm install gooy/aurelia-markdown-element

## Usage
   
Globalize the resource

    aurelia.globalizeResources("gooy/aurelia-markdown-element");
    
OR require it in the view where you need it

    <require from="gooy/aurelia-markdown-element"></require>;

Use it in your template

    <markdown>
      # Header
      
      This is rendered **markdown**.
    </markdown>
