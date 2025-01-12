import {__localesModel, __localizedField} from "@/util/locales";
import {__DateOptions} from "@/util/dates";
import {DBDataTypes} from "@/config/AppConfig";

export const models = {
  locales: __localesModel,
  media: [],
  eventable_id: 1,
  eventable_type: DBDataTypes.hotel,
  start: null,
  end: null,
  dateRange: JSON.parse(JSON.stringify(__DateOptions)),
}

export const options = {}

export const fields = [
  {
    label: 'About Event ',
    name: 'locales',
    placeholder: 'Enter the name',
    type: 'localized',
    value: '',
    class:'col-sm-5',
    validation_messages: {
      required: 'This field is required'
    }
  },
  {
    label: 'Event media',
    name: 'media',
    placeholder: 'Choose image',
    type: 'file',
    multiple: true,
    value: '',
    class:'col-sm-7',
    bodyClasses: 'single-image',
    validation_messages: {
      required: 'This field is required'
    }
  },
  {
    label: 'Date range',
    name: "dateRange",
    placeholder: 'Select the start date',
    type: 'date-range',
    value: '',
    format: 'dd-mm-yyyy HH:mm:ss',
    rules: 'required',
    class:'col-sm-5',
    validation_messages: {
      required: 'This field is required'
    }
  },
];
