import $http from "../util/$http";
import {API_URL} from "@/config/config";

const directory = 'items/';
export const getItemData = async (id) => (await $http.get(API_URL + directory + id)).data;
export const getItemsList = async (params) => (await $http.get(API_URL + directory, {params})).data;
export const getItemOptionsList = async () => (await $http.get('/data/options.json')).data;
export const createItem = async (data) => (await $http.post(API_URL + directory, data)).data;
export const updateItem = async (data) => (await $http.post(API_URL + directory + data.id, data)).data;
export const deleteItem = async (id) => (await $http.post(API_URL + directory + id+ '/delete')).data;
export const sortItems = async (data) => (await $http.post(API_URL+ directory + 'sort', data)).data;
