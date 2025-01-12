import $http from "../util/$http";

export const getStatusOptionsList = async () => (await $http.get('/data/status_options.json')).data;
