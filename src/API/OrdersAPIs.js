import $http from "../util/$http";
import {API_URL} from "@/config/config";
import {StatusOptions} from "@/config/Constants";


const ordersLink = (params) => `${API_URL}business/${params.businessId}/branches/${params.branchId}/orders/`;

export const getOrderData = async (params) => (await $http.get(ordersLink(params))).data;
export const getBusinessOrdersList = async (params) => (await $http.get(ordersLink(params), {params})).data;
export const updateOrder = async (params) => (await $http.post(ordersLink(params) + params.id, params)).data;

export const getStatusOptions = async () => [
  {label: 'Pending', value: StatusOptions.pending, key: StatusOptions.pending},
  {label: 'Accepted', value: StatusOptions.accepted, key: StatusOptions.accepted},
  {label: 'Rejected', value: StatusOptions.rejected, key: StatusOptions.rejected},
  {label: 'Ready', value: StatusOptions.ready, key: StatusOptions.ready},
  {label: 'Delivered', value: StatusOptions.delivered, key: StatusOptions.delivered}
]
