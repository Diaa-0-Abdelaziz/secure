import $http from "../util/$http";
import {API_URL} from "@/config/config";

export const getHotelData = async (id) => (await $http.get(API_URL + 'hotels/' + id)).data;
export const getHotelsOptionsList = async () => (await $http.get('/data/options.json')).data;
export const createHotel = async (data) => (await $http.post(API_URL + 'hotels', data)).data;
export const updateHotel = async (data) => (await $http.post(API_URL + 'hotels/' + data.id, data)).data;
export const deleteHotel = async (id) => (await $http.post(API_URL + 'hotels/' + id+ '/delete')).data;


const formatModel = (model) => {
  const mediaOnly = [];
  model.media.map((m) => mediaOnly.push({id: m.id, src: m.src}))
  model.media = mediaOnly;
  return model;
}

export const getHotelsList = async (params) => {
  const http = require('@/util/$http');
  let hotelsList = (await http.default.get(API_URL + 'hotels', {params})).data;
  hotelsList.data.map((e) => formatModel(e))
  return hotelsList;
};
