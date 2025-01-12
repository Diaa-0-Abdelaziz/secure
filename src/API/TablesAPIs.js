import $http from "../util/$http";
import {API_URL} from "@/config/config";

export const getTableData = async (params) => (
  await $http.get(`${API_URL}business/${params.businessId}/branches/${params.branchId}/floors/${params.floorId}/tables`)
).data;

export const createTable = async (params) => (
  await $http.post(`${API_URL}business/${params.businessId}/branches/${params.branchId}/floors/${params.floorId}/tables`, params)
).data;

export const updateTable = async (params) => (
  await $http.post(`${API_URL}business/${params.businessId}/branches/${params.branchId}/floors/${params.floorId}/tables/${params.id}`, params)
).data;

export const deleteTable = async (params) => (
  await $http.post(`${API_URL}business/${params.businessId}/branches/${params.branchId}/floors/${params.floorId}/tables/${params.id}` + '/delete')
).data;

export const getTablesList = async (params) => (
  await $http.get(`${API_URL}business/${params.businessId}/branches/${params.branchId}/floors/${params.floorId}/tables`, {params})
).data;
