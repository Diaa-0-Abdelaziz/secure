export const __supportedLocales = ['en', 'ar'];

export const __localeNames = {
  en:"En",
  ar:"ع"
}

export const __localesModel = (()=>{
  const opts = [];
  __supportedLocales.map((locale)=>{
    opts.push({
      name: '',
      description: '',
      locale
    })
  })
  return opts;
})()

export const __localizedField = {
  label: '',
  name: 'locales',
  placeholder: 'Enter the name',
  type: 'localized',
  value: '',
  rules: 'required'
}

export const GetLocaleData = (data)=>{
  let localeData = _.filter(data,{locale:'en'});
  return localeData[0] ? localeData[0] : __localesModel;
}
