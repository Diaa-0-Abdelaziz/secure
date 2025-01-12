import {
  UserSettings
} from "@/config/Constants";

const createObj = (configModel) => {
  const model = {};
  Object.keys(configModel).map(x => model[x] = null);
  return model
}

export const models = createObj(UserSettings);


export const options = {
}

export const fields = [
  {
    label: 'User Preferences',
    type: "spacer",
    line: false,
    class: "pt-2 pb-0 mb-0"
  },
  {
    label: '',
    type: "spacer",
    line: true,
    class: "mt-0 pt-0"
  },
  {
    label: 'Receive notifications for orders ',
    name: UserSettings.ReceiveOrderNotifications,
    placeholder: '',
    type: 'checkbox',
    change: 'checkHasValue',
    class: 'ps-6 pt-4 col-sm-12 col-lg-6',
  },
  {
    label: '',
    type: "spacer",
    line: true,
    class: "mt-0 pt-0"
  },

];
