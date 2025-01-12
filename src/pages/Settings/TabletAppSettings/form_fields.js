import {
  BusinessSettings, MobileAppSettings,
  TabletAppSettings,
  TabletCategoriesViewOptions,
  TabletItemsListViewOptions
} from "@/config/Constants";
import {formatListOptions} from "@/util/formatters";

const createObj = (configModel) => {
  const model = {};
  Object.keys(configModel).map(x => model[x] = null);
  return model
}

export const models = createObj(TabletAppSettings);

export const options = {
  CategoriesViewOptions:formatListOptions(TabletCategoriesViewOptions),
  ItemsListViewOptions:formatListOptions(TabletItemsListViewOptions)
}

export const fields = [
  {
    label: 'Tablet App Settings',
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
    name: TabletAppSettings.CoverScreen,
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
    label: 'Preview Preferences',
    type: "spacer",
    line: true,
    class: ""
  },
  {
    label: 'Categories View',
    name: TabletAppSettings.CategoriesView,
    placeholder: '',
    type: "select",
    value: "",
    class: 'col-sm-4',
  },
  {
    label: 'Items List View',
    name: TabletAppSettings.ItemsListView,
    placeholder: '',
    type: "select",
    value: "",
    class: 'col-sm-4',
  },
  {
    label: '',
    type: "spacer",
    line: false,
  },
  {
    label: 'Preview Cart',
    name: TabletAppSettings.CartVisible,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },
  {
    label: 'Enable Ordering',
    name: TabletAppSettings.EnableOrdering,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },
  {
    label: 'Preview Prices',
    name: TabletAppSettings.PreviewPrices,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-4 pt-4 col-sm-12 col-lg-4',
  },

  {
    label: 'Pass keys',
    type: "spacer",
    line: true,
    class: ""
  },
  {
    label: "Pass key",
    name: TabletAppSettings.PassKey,
    placeholder: "enter 4 pin key",
    type: 'number',
    value: "",
    class: 'col-sm-4 ',
    rules: 'digits:4'
  },
];
