import axios from "axios";
import {getAccessToken} from './authentication';
import {API_URL} from "@/config/config";

const token = getAccessToken();
export const commonHeaders = {
  'Accept': 'application/json',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
  'Authorization': token ? `Bearer ${token}` : '',
  'X-Requested-With': 'XMLHttpRequest',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Origin': '*',
  'app-name': 'dashboard',
  'system': 'web',
  'locale': 'en',
  'dashboard': true
}
const $http = axios.create({
  baseURL: API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
      ...commonHeaders
    }
  }
});

$http.interceptors.request.use(function (config) {
  return config;
});

export default $http;
