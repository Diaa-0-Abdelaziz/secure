import moment from "moment";
import {GetLocaleData} from "@/util/locales";
import * as _ from 'lodash';

export const formatOptions = (data) => {
  const nd = data.map(d => {
    var locale = GetLocaleData(d.locales);
    return {label: locale.name , value: d.id, key: d.id}
  });
  return JSON.parse(JSON.stringify(nd));
}

export const fixType = (data, prop) => {
  data.map((row) => row['prop'] = row[prop].replace("App\\Models\\", ""));
  return data;
}

export const zTime2BEFormat = (zTime) => {
  // moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Monday, August 12th 2019, 5:52:00 pm"
  return moment(zTime).format("YYYY-MM-DD HH:mm:ss")
}

export const cloneObj = ($obj) => JSON.parse(JSON.stringify($obj));



/**
 *
 * @param colorOptions
 * @param id
 * @returns {*}
 */
export const colorIdToColorObj = (colorOptions, id) => {
  const c_options = JSON.parse(JSON.stringify(colorOptions))
  return _.filter(c_options, {'id': parseInt(id)})[0];
}
/**
 *
 * @param colorOptions
 * @param hex
 * @returns {*}
 */
export const colorHexToColorObj = (colorOptions, hex) => {
  const c_options = JSON.parse(JSON.stringify(colorOptions))
  return _.filter(c_options, {'hex': hex})[0];
}
/**
 * Serialize object to query params
 * @param obj
 * @param prefix
 * @returns {string}
 */
export const serialize = function (obj, prefix) {
  let str = [], p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}
/**
 *
 * @param num
 * @param currency
 * @returns {string}
 */
export const showPriceWithDecimals = (num, currency) => {
  let digits = 2;
  if (!currency) currency = 'KWD';
  switch (currency) {
    case 'KWD':
      digits = 3;
      break;
  }
  return (Math.round(num * 100) / 100).toFixed(digits);
}


/**
 *  To check if logged user has permission to "do" "something" || ex: to create store
 * @param action ['create','update','delete','read']
 * @param entity  normalized name must not be changed   || ex: 'stores' , 'pos-login'
 *
 * usage example : hasPermission(user.permissions, 'create', 'stores')
 */
export const hasPermission = (action, entity) => {
  const permissions = JSON.parse(localStorage.getItem('permissions'));
  let permission = _.filter(permissions, {routeName: entity})[0];
  return permission ? permission[action] : false;
}
