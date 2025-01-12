import $http from "../util/$http";
import {API_URL} from "@/config/config";

const menusLink = (params) => `${API_URL}business/${params.businessId}/menus/`;

export const getMenuData = async (params) => (
  await $http.get(menusLink(params) + params.id)
).data;
export const getMenusOptionsList = async () => (
  await $http.get('/data/options.json')
).data;
export const createMenu = async (params) => (
  await $http.post(menusLink(params), params)
).data;
export const updateMenu = async (params) => (
  await $http.post(menusLink(params) + params.id, params)
).data;
export const deleteMenu = async (params) => (
  await $http.post(menusLink(params) + params.id + '/delete')
).data;

export const getMenusList = async (params) => (
  await $http.get(menusLink(params), {params})
).data;

