import * as _ from 'lodash';

import {ALTERENATE_URL, BASE_URL, BASE_URL_SSL, ENABLE_THUMBOR, IMG_URL, NODE_ENV} from "@/config/config";
import {ImagePreview} from "@/config/AppConfig";

export const ___t = (data: any, locale: string) => {
  const translation = _.filter(data, {"locale": locale});
  return translation.length ? translation[0] : data[0] || {locale: 'en', name: '', description: ''};
}

export const __asset = (path: string, width: number, height: number) => {
  if (ENABLE_THUMBOR === 'true') {
    path = path.replace(BASE_URL + '/storage/', '');
    path = path.replace(BASE_URL_SSL + '/storage/', '');
    path = path.replace('https://localhost:8000/storage/', '');
    return IMG_URL + `/unsafe/${width}x${height}/` + path;
  } else
    return path;
}

export const __assetFilledBlur = (path: string, width: number, height: number) => {
  if (ENABLE_THUMBOR === 'true') {
    path = path.replace(BASE_URL + '/storage/', '');
    path = path.replace(BASE_URL_SSL + '/storage/', '');
    path = path.replace('https://localhost:8000/storage/', '');
    return IMG_URL + `/unsafe/fit-in/${width}x${height}/filters:fill(blur)/` + path;
  } else
    return path;
}

export const __assetDimensioned = (path: string,
                                   width: number,
                                   preview: string = ImagePreview.Squared,
                                   fitting: string = ImagePreview.Cropped) => {
  if (ENABLE_THUMBOR === 'true') {
    path = path.replace(BASE_URL + '/storage/', '');
    path = path.replace(BASE_URL_SSL + '/storage/', '');
    path = path.replace('https://localhost:8000/storage/', '');
    let height = width;
    switch (preview) {
      case ImagePreview.Landscape:
        height = Math.round(width * 9 / 16);
        break
      case ImagePreview.Portrait:
        height = Math.round(width * 16 / 9);
        break;
    }
    return fitting === ImagePreview.Cropped ?
      IMG_URL + `/unsafe/${width}x${height}/` + path :
      IMG_URL + `/unsafe/fit-in/${width}x${height}/filters:fill(blur)/` + path;
  } else
    return path;
}

export const __public_asset = (path: string) => {
  if (NODE_ENV === 'development') {
    path = path.replace(BASE_URL + '/storage/',
      ALTERENATE_URL + '/storage/');
  }
  return path;
}
