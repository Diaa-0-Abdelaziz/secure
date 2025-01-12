import {__DateOptions} from "./dates";

export const formatUsersOptions = (data) => {
  const nd = data.map(d => {
    return {label: d.email  , value: d.id, key: d.id}
  });
  return JSON.parse(JSON.stringify(nd));
}

let locale = localStorage.getItem('locale') || 'en';

export const formatSpecsOptions = (data) => {
  data = _.filter(data, {status: 'active'})
  const nd = data.map(d => {
    return {
      label: (d.name[locale] || d.name.en),
      value: d.value, key: d.id,
      hasValue: d.hasValue,
      name: null,
      en: d.name.en
    }
  });
  return JSON.parse(JSON.stringify(nd));
}
export const formatCarsOptions = (data) => {
  const nd = data.map(d => {
    return {label: d.name.en, value: d.carId, key: d.carId}
  });
  return JSON.parse(JSON.stringify(nd));
}
export const setPhoneNumber = (data) => {
  data.phone = data.phone_number.phone?.replaceAll(' ', '');
  data.phoneExt = data.phone_number.phoneExt;
}
export const setListPhoneNumber = (data) => {
  data.phone_number = {};
  data.phone_number.phone = data.phone;
  data.phone_number.phoneExt = data.phoneExt;
}
export const setLocation = (data) => {
  data.latitude = data.location.latitude;
  data.longitude = data.location.longitude;
}
export const setListLocation = (data) => {
  data.location = {};
  data.location.latitude = data.latitude;
  data.location.longitude = data.longitude;
}
export const setS3Location = (data, field) => {
  data[field] = data[`${field}S3`]['location'];
}
export const setListS3Location = (data, field) => {
  data[`${field}S3`] = {};
  data[`${field}S3`].location = data[field];
}
export const formatBranchesNamesOptions = (data) => {
  const nd = data.map(d => {
    return {label: (d.name[locale] || d.name.en), value: d.id, key: d.id, en: d.name.en, status: d.status}
  });
  return JSON.parse(JSON.stringify(nd));
}
export const formatOptions = (data) => {
  const nd = data.map(d => {
    return {label: (d.name[locale] || d.name.en), value: d.id, key: d.id, en: d.name.en, ar: d.name.ar}
  });
  return JSON.parse(JSON.stringify(nd));
}
export const formatColorsOptions = (data) => {
  const nd = data.map(d => {
    return {id: d.id, label: (d.name[locale] || d.name.en), value: d.id, key: d.id, hex: d.hex, en: d.name.en}
  });
  return JSON.parse(JSON.stringify(nd));
}
export const formatPaymentOptions = (data) => {
  const options = data.map(d => ({
      id: d.id,
      paymentMethodId: d.paymentMethodId,
      text: (d.name[locale] || d.name.en),
      value: d.id,
      status: 'active'
    })
  );
  return JSON.parse(JSON.stringify(options));
}
export const setListDateRange = (data) => {
  data.dateRange = JSON.parse(JSON.stringify(__DateOptions))
  data.dateRange.startDate = data.start;
  data.dateRange.endDate = data.end;
}
export const setDateRange = (data) => {
  data.start = data.dateRange.startDate;
  data.end = data.dateRange.endDate;
}

export const setDateRangeDate = (data) => {
  data.startDate = data.dateRange.startDate;
  data.endDate = data.dateRange.endDate;
}

export const formatListOptions = (data) => {
  const nd = data.map(d => {
    return {label: d, value: d, key: d}
  });
  return JSON.parse(JSON.stringify(nd));
}
