import $http from "../util/$http";
import {API_URL} from "@/config/config";
import {BusinessTypes} from "@/config/Constants";

const businessLink = () => `${API_URL}business/`;

export const getBusinessData = async (id) => (await $http.get(businessLink())).data;
export const getBusinessOptionsList = async () => (await $http.get('/data/options.json')).data;
export const createBusiness = async (data) => (await $http.post(businessLink(), data)).data;
export const updateBusiness = async (data) => (await $http.post(businessLink() + data.id, data)).data;
export const deleteBusiness = async (id) => (await $http.post(businessLink() + id + '/delete')).data;


const settingsLink = (id) => `${API_URL}business/${id}/settings/`;

export const listBusinessSetting = async (data) => (await $http.get(settingsLink(data.businessId))).data;
export const setBusinessSetting = async function (businessId, data) {
  return await $http.post(settingsLink(businessId) + 'set', {
    settings : data
  })
}

export const listBusinessTypes = async () => (await $http.get(API_URL + 'business-types/')).data;

const formatModel = (model) => {
  const mediaOnly = [];
  model.media.map((m) => mediaOnly.push({id: m.id, src: m.src}))
  model.media = mediaOnly;
  return model;
}

export const getBusinessList = async (params) => {
  let businessList = (await $http.get(API_URL + 'business', {params})).data;
  businessList.data.map((e) => formatModel(e))
  return businessList;
};

export const getBusinessTypes = async () => [
  {label: 'Restaurant'  , value: BusinessTypes.restaurant, key: BusinessTypes.restaurant},
  {label: 'Salon'  , value: BusinessTypes.salon, key: BusinessTypes.salon},
  {label: 'Hotel'  , value: BusinessTypes.salon, key: BusinessTypes.salon}
]
