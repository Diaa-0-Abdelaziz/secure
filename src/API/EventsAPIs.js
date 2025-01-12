import $http from "../util/$http";
import {API_URL} from "@/config/config";

export const getEventsOptionsList = async () => (await $http.get('/data/options.json')).data;
export const createEvent = async (data) => (await $http.post(API_URL + 'events', data)).data;
export const updateEvent = async (data) => (await $http.post(API_URL + 'events/' + data.id, data)).data;
export const deleteEvent = async (id) => (await $http.post(API_URL + 'events/' + id+ '/delete')).data;


const formatModel = (model) => {
  model.dateRange = {startDate: model.start, endDate: model.end}
  const mediaOnly = [];
  model.media.map((m) => mediaOnly.push({id: m.id, src: m.src}))
  model.media = mediaOnly;
  return model;
}

export const getEventData = async (id) => {
  let model = (await $http.get(API_URL + 'events/' + id)).data
  formatModel(model);
  return model;
};
export const getEventsList = async (params) => {
  const eventsList = (await $http.get(API_URL + 'events', {params})).data;
  eventsList.data.map((e) => formatModel(e))
  return eventsList;
};
