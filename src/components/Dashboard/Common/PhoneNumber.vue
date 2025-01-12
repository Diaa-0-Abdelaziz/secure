<template>
  <div>
    <vue-phone-number-input v-model="phoneModel" default-country-code="KW"
                            @update="updatePhone"
                            ref="phone-10"
                            :translations="translations"
    />
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';


import {__PhoneOption} from "@/util/options";

export default {
  name: "phone-number",
  components: {VuePhoneNumberInput},
  props: ['value', 'rules'],
  data() {
    return {
      phoneModel: '',
      phone_number: JSON.parse(JSON.stringify(__PhoneOption)),
      translations: {
        countrySelectorLabel: this.$i18n.t('Country'),
        countrySelectorError: this.$i18n.t('Choose Country'),
        phoneNumberLabel: this.$i18n.t('Phone Number'),
        example: this.$i18n.t('Example :')
      }
    }
  },
  methods: {
    updatePhone(props) {
      this.setPhone(props.formattedNumber, props.isValid)
    },
    setPhone(formattedNumber, isValid) {
      this.phone_number = {formattedNumber, isValid};
      this.$emit('input', this.phone_number)
    }
  },
  watch: {
    value: {
      deep: true,
      handler(value, oldValue) {
        if (value?.formattedNumber !== oldValue?.formattedNumber) {
          this.phoneModel = value.formattedNumber;
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
