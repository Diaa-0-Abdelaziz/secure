import {__localesModel, __localizedField} from "@/util/locales";

export const models = {
  locales: __localesModel,
  name:null,
  media:[],
}
export const options = {
}

export const fields = [
  __localizedField,
  {
    label:'Name',
    name:'name',
    placeholder:'Enter the name',
    type:'text',
    value:'',
    rule: 'required',
    validationModel: 'name',
    validation_messages:{
      required: 'This field is required'
    }
  },
  {
    label: 'Images',
    name: 'media',
    placeholder: 'Choose image',
    type: 'file',
    multiple:false,
    value: '',
    validationModel: 'media',
    // bodyClasses:'single-image',
    // validation_messages: {
    //   required: 'This field is required'
    // }
  }
];
