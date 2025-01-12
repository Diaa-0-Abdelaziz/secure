import $http from "@/util/$http";
import {API_URL} from "@/config/config";


export default class {
  // not used but example
  public static async getMenu(businessId:number){
    return (await $http.get(API_URL + 'menu/'+ businessId)).data;
  }
}
