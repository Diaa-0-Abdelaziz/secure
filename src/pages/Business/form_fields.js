import {__localesModel, __localizedField} from "@/util/locales";

export const models = {
  locales: __localesModel,
  media:[],
  type: null
}
export const options = {
  typeOptions:[]
}

export const fields = [
  __localizedField,
  {
    label:'Type',
    name:'type',
    placeholder:'Choose type',
    type:'select',
    value:'',
    validation_messages:{
      required: 'This field is required'
    }
  },
  {
    label: 'Logo',
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
