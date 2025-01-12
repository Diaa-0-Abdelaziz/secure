import $http from "../util/$http";
import {API_URL} from "@/config/config";
import {formatOptions} from "@/util/helpers";

const floorsLink = (params)=>`${API_URL}business/${params.businessId}/branches/${params.branchId}/floors`;

export const getFloorData = async (params) => (
  await $http.get(`${floorsLink(params)}/${params.id}`)
).data;

export const createFloor = async (params) => (
  await $http.post( floorsLink(params), params)
).data;

export const updateFloor = async (params) => (
  await $http.post(`${floorsLink(params)}/${params.id}`, params)
).data;

export const deleteFloor = async (params) => (
  await $http.post(`${floorsLink(params)}/${params.id}` + '/delete')
).data;

export const getFloorsList = async (params) => (
  await $http.get(floorsLink(params), {params})
).data;
