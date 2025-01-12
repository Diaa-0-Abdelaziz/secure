import {
  BranchSettings, MobileMenuLayoutOptions,
  MobileAppSettings,
  MobileCategoriesViewOptions, MobileItemsListViewOptions, MobileLayoutOptions,
} from "@/config/Constants";
import {formatListOptions} from "@/util/formatters";

const createObj = (configModel) => {
  const model = {};
  Object.keys(configModel).map(x => model[x] = null);
  return model
}

export const models = createObj(MobileAppSettings);


export const options = {
  CategoriesViewOptions:formatListOptions(MobileCategoriesViewOptions),
  ItemsListViewOptions:formatListOptions(MobileItemsListViewOptions),
  MenuLayoutOptions:formatListOptions(MobileMenuLayoutOptions),
}

export const fields = [
  {
    label: 'Mobile App Settings',
    type: "spacer",
    line: false,
    class: ""
  },
  {
    label: '',
    type: "spacer",
    line: true,
    class: ""
  },
  {
    label: 'Choose Cover Screen',
    name: MobileAppSettings.CoverScreen,
    placeholder: 'Upload your amazing cover screen saver',
    type: 'file',
    multiple: false,
    value: '',
    class: 'col-sm-6',
    bodyClasses: 'single-image',
    validation_messages: {
      required: 'This field is required'
    }
  },
  {
    label: 'Choose Header Background',
    name: MobileAppSettings.HeaderBackground,
    placeholder: 'Upload your amazing background',
    type: 'file',
    multiple: false,
    value: '',
    class: 'col-sm-6',
    bodyClasses: 'single-image',
    validation_messages: {
      required: 'This field is required'
    }
  },
  {
    label: 'Advertisement',
    type: "spacer",
    line: true,
    class: ""
  },
  {
    label: '',
    name: MobileAppSettings.HomeAd,
    placeholder: 'Upload Home Ad 500x200px preferred',
    type: 'file',
    multiple: false,
    value: '',
    class: 'col-sm-6',
    bodyClasses: 'single-image',
    validation_messages: {
      required: 'This field is required'
    }
  },
  {
    label: 'Home Ad Link',
    name: MobileAppSettings.HomeAdLink,
    placeholder: 'Enter your Address',
    type: 'text',
    value: '',
    class: 'col-sm-6',
  },
  {
    label: 'Preview Preferences',
    type: "spacer",
    line: true,
    class: ""
  },
  {
    label: 'Layout View',
    name: MobileAppSettings.MenuLayout,
    placeholder: '',
    type: "select",
    value: "",
    class: 'col-sm-4',
  },
  {
    label: 'Categories View',
    name: MobileAppSettings.CategoriesView,
    placeholder: '',
    type: "select",
    value: "",
    class: 'col-sm-4',
  },
  {
    label: 'Items List View',
    name: MobileAppSettings.ItemsListView,
    placeholder: '',
    type: "select",
    value: "",
    class: 'col-sm-4',
  },
  {
    label: '',
    type: "spacer",
    line: true,
  },
  {
    label: 'Hide Cart',
    name: MobileAppSettings.HideCart,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },
  {
    label: 'Disable Ordering',
    name: MobileAppSettings.DisableOrdering,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },
  {
    label: 'Hide Prices',
    name: MobileAppSettings.HidePrices,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },
  {
    label: 'Random Sorting',
    name: MobileAppSettings.RandomSorting,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },

];
