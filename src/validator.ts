import Vue from "vue";
import {extend} from "vee-validate";

class ValidationCustomRules {
  static install(vue: Vue | any, options: {}): void {

    /**
     * url rule
     */
    extend('url', {
      validate(value) {
        if (value)
          return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value);
        return false;
      },
      message: 'invalid_url',
    });

    /**
     * Phone rule
     */

    extend('phone', {
      validate(myValue) {
        // try {
        return new Promise(resolve => {
          resolve({valid: myValue?.isValid})
        })
      },
      message: '{field} must be a valid phone number.'
    });

    /**
     * Greater than zero rule
     */
    extend('gtZero', {
      validate: (value) => value > 0,
      message: 'field must be greater than Zero'
    })


  }
}

export default ValidationCustomRules;




