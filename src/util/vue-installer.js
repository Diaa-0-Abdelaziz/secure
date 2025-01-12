import {GetLocaleData} from "./locales";

export default {
  install(Vue, options) {
    Vue.prototype.GetLocaleData = GetLocaleData
  }
};
