import {__localesModel, __localizedField} from "@/util/locales";

export const models = {
  locales: __localesModel,
  media:[],
  business_id: null,
  menu_id: null,
  parent_id: null
}

export const options = {
  parent_idOptions:[],
}

export const fields = [
  __localizedField,
  {
    label: "Parent category",
    name: "parent_id",
    type: "select",
    value: ""
  },
  {
    label: 'Images',
    name: 'media',
    placeholder: 'Choose image',
    type: 'file',
    multiple:false,
    value: '',
    bodyClasses:'single-image',
    validation_messages: {
      required: 'This field is required'
    }
  }
];
