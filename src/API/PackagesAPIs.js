import $http from "../util/$http";
import {API_URL} from "../config/API";

export const getPackageData = async (id) => (await $http.get(API_URL + 'package/'+id)).data;
export const getPackagesList = async (params) => (await $http.get(API_URL + 'package', {params})).data;
export const getPackagesOptionsList = async () => (await $http.get('/data/options.json')).data;
export const createPackage = async (data) => (await $http.post(API_URL + 'package', data)).data;
export const updatePackage = async (data) => (await $http.put(API_URL + 'package/'+data.id, data)).data;
export const deletePackage = async (id) => (await $http.post(API_URL + 'package/'+id+ '/delete')).data;
