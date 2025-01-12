import $http from "../util/$http";
import {resetUser} from "@/util/authentication";
import store from "@/store"
import {API_URL} from "@/config/config";
import {formatUsersOptions} from "@/util/formatters";
import {MenuTypes} from "@/config/Constants";

const directory = 'users/';

export const getUserData = async (id) => (await $http.get(API_URL + directory + id)).data;
export const createUser = async (data) => (await $http.post(API_URL + directory, data)).data;
export const getAdminTypesOptions = async () => (await axios.get('/data/admin-options.json')).data;

export const getUsersList = async (params) => (await $http.get(API_URL + directory, {params})).data;
export const getUsersOptionsList = async () => formatUsersOptions((await getUsersList()).data);
export const getMenuTypes = async () => [
  {label: 'Subscription Menu'  , value: MenuTypes.subscription, key: MenuTypes.subscription},
  {label: 'Normal Menu'  , value: MenuTypes.normal, key: MenuTypes.normal},
]

export const updateUser = async (data) => (await $http.post(API_URL + directory + data.id, data)).data;
export const deleteUser = async (id) => (await $http.post(API_URL + directory + id + '/delete')).data;


export const getCurrentUser = async () => (await $http.get(API_URL + directory + 'info')).data;
export const loginUser = async (data) => (await $http.post(API_URL + 'auth/login', data)).data;
export const registerUser = async (data) => (await $http.post(API_URL + 'auth/register', data)).data;
export const sendCode = async (data) => (await $http.post(API_URL + 'auth/send-code', data)).data;
export const validateEmail = async (data) => (await $http.post(API_URL + 'auth/validate-code', data)).data;
export const logoutUser = async () => await resetUser(store);


const settingsLink = (data) => `${API_URL}users/${data.userId}/settings/`;
export const getUserSetting = async (data) => (await $http.get(settingsLink(data))).data;
export const setUserSetting = async function (data) {
  console.log(data);
  return await $http.post(settingsLink(data) + 'set', {
    settings : data.data
  })
}
