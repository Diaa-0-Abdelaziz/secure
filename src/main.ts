import dotenv from 'dotenv'
// Start vue
import Vue from 'vue'
import './pollyfills'

import ElementUI from 'element-ui';
Vue.use(ElementUI);
Vue.use(VueInstaller);

// Style sheets
import './bootsrtap';
import './assets/sass/paper-dashboard.scss'
import './assets/sass/demo.scss'
import './assets/scss/style.scss';


// library imports
import VueI18n from 'vue-i18n';
import Translations from './i18n';
import Vuex from 'vuex'
// import Echo from "laravel-echo"
import {___t, __asset} from './helpers/helpers';
import store from './store/index';
// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import GlobalMethods from './globalMethods'

import initProgress from './progressbar';


import SideBar from './components/UIComponents/SidebarPlugin'
// Routing
import VueRouter from 'vue-router'
import VueRouterPrefetch from 'vue-router-prefetch'
import router from './routes/routes'

import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import VueSweetalert2 from 'vue-sweetalert2';
import Alerts from "./util/alerts";
import VueInstaller from './util/vue-installer';
// import {APP_HOST, ENABLE_WS, PUSHER_KEY} from "@/config/config";
import App from './App.vue'
dotenv.config()


// Vuex
Vue.use(Vuex)

const VueNotify = require('vue-notifyjs')
const lang = require('element-ui/lib/locale/lang/en')
const locale = require('element-ui/lib/locale')

// Translate localized object
Vue.prototype.__t = (data: any) => ___t(data, i18n.locale);
Vue.use(VueI18n)
const i18n = new VueI18n({locale: 'en', messages: Translations});

Vue.prototype.__asset = (p: string, w: number, h: number) => __asset(p, w, h);

Vue.prototype.$store = store;
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueRouterPrefetch)

// import './registerServiceWorker'
// plugin setup
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(GlobalMethods)
Vue.use(VueNotify)
Vue.use(SideBar, {sidebarLinks: []})
locale.use(lang)

Vue.use(Loading);

import ValidationCustomRules from "@/validator";
Vue.use(ValidationCustomRules);
require('./validators-js');



initProgress(router);

//vue-moment
Vue.use(require('vue-moment'));

function redirectToFirstSidebarLink(sideBarLinks: any) {
  if (router.currentRoute.path !== '/overview') return;
  let redirect = true;
  sideBarLinks.map((link: any) => {
    if (link.path === router.currentRoute.path)
      redirect = false;
  })
  if (redirect)
    router.push({path: sideBarLinks[0].path});
}


// Date Rage Picker
Vue.use(require('vue2-daterange-picker'));

// SweetAlert
Vue.use(VueSweetalert2);
let defineGlobalAlerts = (vue: any) => Vue.use(Alerts, vue);


let vue = new Vue({
  i18n,
  el: '#app',
  render: h => h(App),
  router
})


defineGlobalAlerts(vue);

