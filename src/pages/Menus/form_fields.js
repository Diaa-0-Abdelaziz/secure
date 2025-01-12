import {__localesModel, __localizedField} from "@/util/locales";

export const models = {
  locales: __localesModel,
  business_id:null,
}
export const options = {
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
];
