import DiscountTypes from "../../config/DiscountTypes";

export default class{
  locales = [];
  amount = 0;
  type = DiscountTypes.value;
  constructor(locale) {
    this.locales.push(locale);
  }
}
