import $http from "../util/$http";
import {API_URL} from "@/config/config";
import {formatOptions} from "@/util/helpers";

const directory = 'categories/'
export const getCategoryData = async (id) => (await $http.get(API_URL + directory + id)).data;
export const getCategoriesList = async (params) => (await $http.get(API_URL + directory, {params})).data;

export const getCategoryOptionsList = async () => formatOptions((await getCategoriesList()).data);

export const createCategory = async (data) => (await $http.post(API_URL + directory, data)).data;
export const updateCategory = async (data) => (await $http.post(API_URL + directory + data.id, data)).data;
export const deleteCategory = async (id) => (await $http.post(API_URL + directory + id+ '/delete')).data;
export const sortCategories = async (data) => (await $http.post(API_URL+ directory + 'sort', data)).data;



const settingsLink = (id) => `${API_URL + directory + id }/settings/`;

export const setCategorySetting = async function (id, data) {
  return await $http.post(settingsLink(id) + 'set', {
    settings : data
  })
}
