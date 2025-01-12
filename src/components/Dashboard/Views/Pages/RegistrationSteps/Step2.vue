<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver2">
      <form @submit.prevent="handleSubmit(validateEmail)" ref="form2">
        <ValidationProvider name="Email" :rules="rules.email" v-slot="{ errors }">
          <fg-input v-model="validateEmailForm.email"
                    :field="{disabled: true}"
                    addon-left-icon="nc-icon nc-email-85"
                    placeholder="Email..."
                    :error="errors[0]"></fg-input>
        </ValidationProvider>
        <ValidationProvider name="Code" :rules="rules.code" v-slot="{ errors }">
          <fg-input v-model="validateEmailForm.code" addon-left-icon="nc-icon nc-key-25 pen_spark"
                    placeholder="Enter your received code..."
                    :error="errors[0]"></fg-input>
        </ValidationProvider>
        <p-button native-type="submit" slot="footer" type="warning" round :disabled="loading">
          Validate Code
          <b-spinner small label="Small Spinner" v-if="loading"></b-spinner>
        </p-button>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import {validateEmail} from "@/API/UsersAPIs";

export default {
  props: ['email'],
  data() {
    return {
      loading: false,
      validateEmailForm: {
        email: '',
        code: ''
      },
      rules: {
        email: 'required|email',
        code: 'required|min:6'
      },
    }
  },
  methods: {
    async validateEmail() {
      let loader = this.$loading.show();
      this.loading = true;
      setTimeout(() => {
        this.stopLoading(loader);
      }, 5000)
      validateEmail(this.validateEmailForm)
        .then((data) => {
          this.$emit('setStep', 3)
          this.$emit('setCode',  this.validateEmailForm.code);
          this.stopLoading(loader);
        })
        .catch((error) => {
          console.log(error)
          this.$notify({title: error.response.data['message'], type: 'danger'})
        })
        .finally(() => this.stopLoading(loader))
    },
    stopLoading(loader){
      loader.hide();
      this.loading = false;
    },
  },
  watch: {
    email(newValue, oldValue) {
      // Perform actions here when myProp changes
      console.log(`myProp changed from "${oldValue}" to "${newValue}"`);


      this.validateEmailForm.email = newValue;
    },
  },
  mounted() {
    this.validateEmailForm.email = this.email;
  },
}
</script>

<style scoped>

</style>
