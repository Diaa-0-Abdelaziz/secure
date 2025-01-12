import * as rules from 'vee-validate/dist/rules';
import {extend} from "vee-validate";
import PhoneNumber from 'awesome-phonenumber'

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});
