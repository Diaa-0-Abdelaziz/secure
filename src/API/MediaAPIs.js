import $http from "../util/$http";
import Compressor from 'compressorjs';
import {API_URL} from "@/config/config";

export const getMediaData = async (id) => (await $http.get(API_URL + 'media/' + id)).data;
export const getMediaList = async (params) => (await $http.get(API_URL + 'media', {params})).data;
export const getMediaOptionsList = async () => (await $http.get('/data/options.json')).data;
export const createMedia = async (data) => (await $http.post(API_URL + 'media', data)).data;
export const updateMedia = async (data) => (await $http.post(API_URL + 'media/' + data.id, data)).data;
export const deleteMedia = async (id) => (await $http.post(API_URL + 'media/' + id+ '/delete')).data;

export const compressImage = async (file, quality = 0.6, maxWidth = 1200) => {
  return new Promise((resolve, reject) => {
    if (!file?.type?.includes('image/')) {
      resolve(file);
    }
    new Compressor(file, {
      quality,
      maxWidth,
      success(result) {
        resolve(result);
      },
      error(err) {
        console.error(err);
        reject(err);
      },
    });
  });
}
