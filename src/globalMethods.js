const GlobalMethods = {
  install (Vue) {
    Vue.prototype.$localize = (obj, locale) => locale ? obj[locale] : obj.en || obj.ar
  }
}

export default GlobalMethods
