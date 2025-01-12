import $http from "../util/$http";
import {API_URL} from "@/config/config";

const directory = 'addons/';
export const deleteAddon = async (id) => (await $http.post(API_URL + directory + id+ '/delete')).data;
