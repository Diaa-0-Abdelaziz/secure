import {BranchSettings} from "@/config/Constants";
import {__localesModel} from "@/util/locales";

const createObj = (configModel) => {
  const model = {};
  Object.keys(configModel).map(x => model[x] = null);
  model[BranchSettings.Locales] = __localesModel;
  return model
}

export const models = createObj(BranchSettings);


export const options = {}

export const fields = [
  {
    label: 'Branch settings',
    type: "spacer",
    line: false,
    class: ""
  },
  {
    label: '',
    name: BranchSettings.Locales,
    placeholder: 'Enter your Branch Name',
    placeholder2: 'About your branch',
    type: 'localized',
    value: '',
    class: 'col-sm-12',
    validation_messages: {
      required: 'This field is required'
    }
  },

  {
    label: 'Contact settings',
    type: "spacer",
    line: true,
  },
  {
    label: 'Phone Number',
    name: BranchSettings.ContactPhone,
    placeholder: 'Enter your contact Phone number',
    // todo:: make it phone
    class: 'col-sm-6  ',
    type: 'phone',
    // rules: 'phone',
  },
  {
    label: 'Whatsapp Number',
    name: BranchSettings.Whatsapp,
    placeholder: 'Enter your Whatsapp number',
    // todo:: make it phone
    class: 'col-sm-6  ',
    type: 'phone',
    // rules: 'phone',
  },
  {
    label: 'Address',
    name: BranchSettings.Address,
    placeholder: 'Enter your Address',
    type: 'text',
    value: '',
    class: 'col-lg-12 col-xl-8',
    validation_messages: {
      required: 'This field is required'
    }
  },

  {
    label: 'Preferences',
    type: "spacer",
    line: true,
  },
  {
    label: 'Dine In',
    name: BranchSettings.DineIn,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },
  {
    label: 'Delivery',
    name: BranchSettings.Delivery,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },
  {
    label: 'Car Pickup',
    name: BranchSettings.CarPickup,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },
  {
    label: 'Self Pickup',
    name: BranchSettings.SelfPickUp,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },
  {
    type: 'spacer'
  },

];
