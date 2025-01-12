import {BranchSettings, BusinessSettings} from "@/config/Constants";
import {__localesModel} from "@/util/locales";
import {CurrencyOptions} from "@/config/options";

const createObj = (configModel) => {
  const model = {};
  Object.keys(configModel).map(x => model[x] = null);
  model[BusinessSettings.Locales] = __localesModel;
  return model
}

export const models = createObj(BusinessSettings);

export const options = {
  CurrencyOptions: CurrencyOptions
}

export const fields = [
  {
    label: 'Business settings',
    type: "spacer",
    line: false,
    class: ""
  },
  {
    label: '',
    name: BusinessSettings.Locales,
    placeholder: 'Enter your Business Name',
    placeholder2: 'About your business',
    type: 'localized',
    value: '',
    class: 'col-sm-8',
    validation_messages: {
      required: 'This field is required'
    }
  },
  {
    label: '',
    name: BusinessSettings.Logo,
    placeholder: 'Upload your Logo',
    type: 'file',
    multiple: false,
    value: '',
    class: 'col-sm-4',
    bodyClasses: 'single-image',
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
    name: BusinessSettings.ContactPhone,
    placeholder: 'Enter your contact Phone number',
    // todo:: make it phone
    class: 'col-sm-6  ',
    type: 'phone',
    // rules: 'phone',
  },
  {
    label: 'Whatsapp Number',
    name: BusinessSettings.Whatsapp,
    placeholder: 'Enter your Whatsapp number',
    // todo:: make it phone
    class: 'col-sm-6  ',
    type: 'phone',
    // rules: 'phone',
  },
  {
    label: "Time Zone",
    name: BusinessSettings.TimeZone,
    placeholder: "select your app timezone",
    type: 'text',
    value: "",
    class: 'col-sm-6 ',
  },
  {
    label: 'Address',
    name: BusinessSettings.Address,
    placeholder: 'Enter your Address',
    type: 'text',
    value: '',
    class: 'col-sm-6',
    validation_messages: {
      required: 'This field is required'
    }
  },
  {
    label: 'Website',
    name: BusinessSettings.Website,
    placeholder: 'Enter your Website url',
    type: 'text',
    value: '',
    class: 'col-sm-6',
    validation_messages: {
      required: 'This field is required'
    }
  },
  {
    label: 'Theme settings',
    type: "spacer",
    line: true,
  },
  {
    label: 'PrimaryColor',
    name: BusinessSettings.PrimaryColor,
    placeholder: 'Pic the PrimaryColor',
    type: 'color',
    value: '',
    class: 'col-sm-6 col-md-4',
    validation_messages: {
      required: 'This field is required'
    }
  },

  {
    label: 'AccentColor',
    name: BusinessSettings.AccentColor,
    placeholder: 'Pic the AccentColor',
    type: 'color',
    value: '',
    class: 'col-sm-6 col-md-4',
    validation_messages: {
      required: 'This field is required'
    }
  },
  {
    label: 'TextColor',
    name: BusinessSettings.TextColor,
    placeholder: 'Pic the TextColor',
    type: 'color',
    value: '',
    class: 'col-sm-6 col-md-4',
    validation_messages: {
      required: 'This field is required'
    }
  },
  {
    label: 'Social media settings',
    type: "spacer",
    line: true,
  },
  {
    label: '',
    name: BusinessSettings.X,
    placeholder: 'Enter X (Twitter) account URL ',
    type: 'text',
    // // rules: 'url',
    class: 'col-sm-6',
  },
  {
    label: '',
    name: BusinessSettings.Youtube,
    placeholder: 'Enter Youtube URL ',
    type: 'text',
    // rules: 'url',
    class: 'col-sm-6',
  },
  {
    label: '',
    name: BusinessSettings.Instagram,
    placeholder: 'Enter Instagram account URL ',
    type: 'text',
    // rules: 'url',
    class: 'col-sm-6',
  },
  {
    label: '',
    name: BusinessSettings.Facebook,
    placeholder: 'Enter Facebook account URL ',
    type: 'text',
    // rules: 'url',
    class: 'col-sm-6',
  },
  {
    label: '',
    name: BusinessSettings.Snapchat,
    placeholder: 'Enter Snapchat URL ',
    type: 'text',
    // rules: 'url',
    class: 'col-sm-6',
  },
  {
    label: '',
    name: BusinessSettings.Linkedin,
    placeholder: 'Enter LinkedIn URL ',
    type: 'text',
    // rules: 'url',
    class: 'col-sm-6',
  },
  {
    label: 'Price settings',
    type: "spacer",
    line: true,
  },
  {
    label: 'Currency',
    name: BusinessSettings.Currency,
    placeholder: 'Select your currency',
    type: 'select',
    class: 'col-sm-4 pe-1 col-lg-3'
  },
  {
    label: 'General Discount',
    name: BusinessSettings.GeneralDiscount,
    placeholder: 'This will be applied for all your items',
    type: 'number',
    min: 0,
    max: 100,
    class: 'col-sm-4 pe-1 col-lg-3',
    // rules: 'gtZero',
    disabled: false
  },
  {
    label: '%',
    type: 'label',
    class: 'col-sm-2 pe-1 ps-1 col-lg-1'
  },
  {
    label: 'Extra Charge',
    name: BusinessSettings.ExtraCharge,
    placeholder: 'This will be applied for all your items',
    type: 'number',
    min: 0,
    class: 'col-sm-4 pe-1 col-lg-3',
    // rules: 'gtZero',
    disabled: false
  },
  // TODO:: Change to user's currency
  {
    label: '$',
    type: 'label',
    class: 'col-sm-2 pe-1 ps-1 col-lg-1'
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
    class: 'ps-4 pt-4 col-sm-12 col-lg-3',
  },
  {
    label: 'Delivery',
    name: BranchSettings.Delivery,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-3',
  },
  {
    label: 'Car Pickup',
    name: BranchSettings.CarPickup,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-3',
  },
  {
    label: 'Self Pickup',
    name: BranchSettings.SelfPickUp,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-3',
  },
  {
    label: '',
    type: "spacer",
    line: false,
  },

  {
    label: 'Preview Prices',
    name: BusinessSettings.PreviewPrices,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-3',
  },
];
