import {FaceBook} from "./FB";
import {Configuration} from "./Configuration";
import {I18N} from 'aurelia-i18next';
import {routes} from 'routes';
import {EventAggregator} from 'aurelia-event-aggregator';
import {JzooAuthorizeStep} from 'JzooAuthorizeStep';

/**
 * Main application VM
 *
 * @class App
 * @constructor
 * @param {Configuration}
 * @param {FaceBook}
 * @param {EventAggregator}
 * @param {I18N}
 */
export class App {

  static inject = [Configuration,FaceBook,EventAggregator,I18N];
  constructor(config,fb,ea,i18n){
    this.fb = fb;
    this.ea = ea;
    this.config = config;
    this.i18n = i18n;
  }

  /**
   * Configure the main router.
   *
   * @param config
   * @param router
   */
  configureRouter(config, router){

    config.title = 'jzoo';
    config.options.pushState = true;
    config.mapUnknownRoutes(instruction=>{
      instruction.config.moduleId = null;
      var parts = instruction.fragment.split("/");
      if(parts[0]=="error"){
        instruction.fragment = "error/" + parts[1];
        instruction.config.route = "error/" + parts[1];
        instruction.lifecycleArgs[0].errorId = parseInt(parts[1]);
        instruction.config.moduleId = "error/generic";
      }else if(parts[0]=="forbidden"){ //alias for 403 forbidden error
        instruction.lifecycleArgs[0].errorId = 403;
        instruction.config.moduleId = "error/403";
      }else{ //treat unknown urls as "error/404"
        instruction.lifecycleArgs[0].errorId = 404;
        instruction.config.moduleId = "error/404";
      }
    });
    //config.addPipelineStep('authorize', JzooAuthorizeStep);

    //make the above routes work for all locales defined in the i18n plugin.
    var i18n_routes = [];
    for(let route of routes){
      //specify extra options for each route
      route.options = {language:"my"};
      i18n_routes.push(route);

      for(let locale of this.i18n.i18next.options.locales){
        //do not generate routes for the default language
        if(locale===this.i18n.i18next.options.defaultLng) continue;
        //generate routes for other languages
        i18n_routes.push({
          route:locale+"/"+route.route,
          moduleId:route.moduleId,
          options:Object.assign({},route.options,{locale:locale})
        });
      }
    }
    config.map(i18n_routes);

    this.router = router;
    this.initFacebook();
  }

  /**
   * Called when the element for this VM is attached
   */
  attached(){
    //this.dialogService.appReady();
    /*$("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function(e) {
      if (e.target == e.currentTarget && $(this).data("transitioning") === true) {
        $(this).removeAttr("style").data("transitioning", false);
        $("html, body").scrollTop(scroll);
        return;
      }
    });*/
  }

  /**
   * Initialize the facebook SDK
   */
  initFacebook(){
    this.fb.init(this.config.getLangCode());
  }

}
