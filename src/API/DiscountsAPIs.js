import $http from "../util/$http";
import {API_URL} from "@/config/config";

const directory = 'discounts/';
export const deleteDiscount = async (id) => (await $http.post(API_URL + directory + id+ '/delete')).data;
