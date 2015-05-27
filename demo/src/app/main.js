import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';

//import $ from "jquery";
import 'bootstrap-less/js/dropdown';
import 'bootstrap-less/js/button';
import 'bootstrap-less/js/transition';
import 'affix';

import 'ie10-viewport-workaround';
import 'retinajs';
import 'nprogress';
import 'i18next';

export function configure(aurelia) {

  var locales = ['my','en'];
  var locale = "my";
  var path = window.location.pathname;

  //detect language from url
  var urlLang = path.substr(1,2);
  var p = locales.indexOf(urlLang);
  if(p!==-1) locale = locales[p];

  aurelia.use
  .standardConfiguration()
  //.developmentLogging()
  .plugin('aurelia-animator-css')
  //.plugin('aurelia-computed')
  //.plugin('aurelia-bs-modal')
  /*.plugin('aurelia-dialogs',instance=>{
      instance.setup({
        template: ""
      });
    })*/
  .plugin('aurelia-i18next', instance=>{
      instance.setup({
        resGetPath : '/locales/__lng__/__ns__.json',
        lng : locale, // language that will be used (autodetect language if not specified)
        defaultLng: locale, // specify the default language
                          // the routes for this language will not be prefixed and
                          // will be used if a language couldn't be detected
        locales: locales,
        attributes: ["t","i18n"],
        getAsync : true,
        setJqueryExt: true,
        sendMissing : false,
        fallbackLng : 'en',
        debug : false
      });
    });
  /*.plugin('aurelia-validation', instance=>{
      instance
      //.useLocale('nl-NL')
      .useViewStrategy(ValidateCustomAttributeViewStrategy.TWBootstrapAppendTo);
    })
  ;*/

  aurelia.globalizeResources("components/composer");
  aurelia.globalizeResources("components/nav-bar");
  aurelia.globalizeResources("components/app-footer");
  aurelia.globalizeResources("components/breadcrumb");
  aurelia.globalizeResources("components/locale-switcher");
  aurelia.globalizeResources("components/loading-indicator");

  aurelia.globalizeResources("converters/json");

  aurelia.start().then(a => {a.setRoot("app", document.getElementById("app"))});
}

