import {__localesModel, __localizedField} from "@/util/locales";
import {DBDataTypes} from "@/config/AppConfig";

export const models = {
  locales: __localesModel,
  media:[],
  serviceable_id: 1,
  serviceable_type: DBDataTypes.hotel
}

export const options = {}

export const fields = [
  __localizedField,
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
