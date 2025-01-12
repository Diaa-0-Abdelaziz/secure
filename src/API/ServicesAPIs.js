import $http from "../util/$http";
import {API_URL} from "@/config/config";
import {fixType} from "@/util/helpers";

export const getServiceData = async (id) => (await $http.get(API_URL + 'services/' + id)).data;
export const getServicesOptionsList = async () => (await $http.get('/data/options.json')).data;
export const createService = async (data) => (await $http.post(API_URL + 'services', data)).data;
export const updateService = async (data) => (await $http.post(API_URL + 'services/' + data.id, data)).data;
export const deleteService = async (id) => (await $http.post(API_URL + 'services/' + id + '/delete')).data;

const formatModel = (model) => {
  const mediaOnly = [];
  model.media.map((m) => mediaOnly.push({id: m.id, src: m.src}))
  model.media = mediaOnly;
  return model;
}

export const getServicesList = async (params) => {
  const list = (await $http.get(API_URL + 'services', {params})).data;
  list.data.map((e) => formatModel(e));
  list.data = fixType(list.data, 'serviceable_type');
  return list;
};
