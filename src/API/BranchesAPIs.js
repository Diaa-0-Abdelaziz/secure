import $http from "../util/$http";
import {API_URL} from "@/config/config";

const branchesLink = (params) => `${API_URL}business/${params.businessId}/branches`;

export const getBranchData = async (params) => (
  await $http.get(`${branchesLink(params)}/${params.id}`)
).data;
export const getBranchesOptionsList = async () => (
  await $http.get('/data/options.json')
).data;
export const createBranch = async (params) => (
  await $http.post(branchesLink(params), params)
).data;
export const updateBranch = async (params) => (
  await $http.post(`${branchesLink(params)}/${params.id}`, params)
).data;
export const deleteBranch = async (params) => (
  await $http.post(`${branchesLink(params)}/${params.id}/delete`)
).data;
export const getBranchesList = async (params) => {
  return (await $http.get(branchesLink(params), {params})).data;
};

export const getBranchPreviewQr = async (params) => {
  return (await $http.get(`${branchesLink(params)}/${params.id}/reference-qr`, {params})).data;
};

export const createLoginQr = async (params) => {
  return (await $http.get(`${branchesLink(params)}/${params.id}/create-login-qr`, {params})).data;
};

const settingsLink = (data) => `${API_URL}business/${data.businessId}/branches/${data.branchId}/settings/`;

export const listBranchSetting = async (data) => (await $http.get(settingsLink(data))).data;
export const setBranchSetting = async function (businessId, branchId, data) {
  return await $http.post(settingsLink({businessId, branchId}) + 'set', {
    settings : data
  })
}
