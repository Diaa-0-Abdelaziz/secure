<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver3">
      <form @submit.prevent="handleSubmit(register)" ref="form3">
        <ValidationProvider name="name" :rules="rules.name" v-slot="{ passed, failed, failedRules, errors  }">
          <fg-input v-model="form.name" addon-left-icon="nc-icon nc-single-02"
                    placeholder="Your Name..."
                    :id="form.name"
                    :error="failed && validation_messages.name? validation_messages.name[Object.keys(failedRules)[0]]: errors[0]"
                    :hasSuccess="passed"></fg-input>
        </ValidationProvider>

        <ValidationProvider name="businessName" :rules="rules.businessType"
                            v-slot="{ passed, failed, failedRules, errors  }">
          <fg-input v-model="form.businessType"
                    type="select"
                    addon-left-icon="nc-icon nc-bank" placeholder="Select business type..."
                    :error="failed && validation_messages.businessType? validation_messages.businessType[Object.keys(failedRules)[0]]: errors[0]"
                    :hasSuccess="passed">
            <template v-slot:after>
              <b-form-select v-model="form.businessType" class="w-300 form-control">
                <b-form-select-option value="" >{{ $t("Select business type") }} </b-form-select-option>
                <b-form-select-option
                  v-for="type in businessTypes"
                  :value="type" :key="type">{{ $t(type) }}
                </b-form-select-option>
              </b-form-select>
            </template>
          </fg-input>
        </ValidationProvider>

        <ValidationProvider name="businessName" :rules="rules.businessName"
                            v-slot="{ passed, failed, failedRules, errors  }">
          <fg-input v-model="form.businessName" addon-left-icon="nc-icon nc-bank"
                    placeholder="Your Business Name..."
                    :error="failed && validation_messages.businessName? validation_messages.businessName[Object.keys(failedRules)[0]]: errors[0]"
                    :hasSuccess="passed"></fg-input>
        </ValidationProvider>
        <ValidationProvider name="password" :rules="rules.password" v-slot="{passed, failed, failedRules, errors  }">
          <fg-input v-model="form.password" :type="isVisiblePassword? 'text' :'password'"
                    addon-left-icon="nc-icon nc-lock-circle-open" placeholder="Password..."
                    :error="failed && validation_messages.password? validation_messages.password[Object.keys(failedRules)[0]]: errors[0]"
                    :hasSuccess="passed">
            <template v-slot:after>
              <div class="show-password">
                <a @mousedown="showPassword" @mouseup="hidePassword" @mouseleave="hidePassword">
                  <i class="fa fa-eye"></i>
                </a>
              </div>
            </template>
          </fg-input>
        </ValidationProvider>
        <ValidationProvider name="acceptTerms" :rules="rules.acceptTerms"
                            v-slot="{passed, failed, failedRules, errors  }">
          <p-checkbox class="text-left" v-model="form.acceptTerms"
                      id="acceptTerms"
                      :error="failed && validation_messages.acceptTerms? validation_messages.acceptTerms[Object.keys(failedRules)[0]]: errors[0]"
                      :hasSuccess="passed">
            I agree to the
            <a href="#terms-and-conditions">terms and conditions</a>.
          </p-checkbox>
        </ValidationProvider>
        <p-button native-type="submit" slot="footer" type="warning" round :disabled="loading">
          Register
          <b-spinner small label="Small Spinner" v-if="loading"></b-spinner>
        </p-button>

      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {registerUser} from "@/API/UsersAPIs";
import {setAccessToken} from "@/util/authentication";
import {presentApiErrorMessage} from "@/helpers/utils";
import {listBusinessTypes} from "@/API/BusinessAPIs";

export default {
  props: [
    'email',
    'code'
  ],
  data() {
    return {
      isVisiblePassword: false,
      loading: false,
      businessTypes: [],
      form: {
        name: '',
        businessType: '',
        businessName: '',
        email: '',
        password: '',
        acceptTerms: null,
        code: '',
        password_confirmation: ''
      },
      rules: {
        name: 'required',
        businessName: 'required|min:5',
        password: 'required|min:8',
        acceptTerms: 'required'
      },
      validation_messages: {
        name: {
          required: 'Your name is required',
        },
        businessType: {
          required: 'Select business please',
        },
        businessName: {
          required: 'Business Name  is required',
          min: 'Minimum length 5 characters required'
        },
        password: {
          required: 'Password is required',
          min: 'Minimum length 8 characters required'
        },
        acceptTerms: {
          required: 'Please agree our terms & conditions'
        }
      }
    }
  },
  async mounted() {
    this.form.email = this.email;
    this.form.code = this.code;
    this.businessTypes = await listBusinessTypes();
  },
  methods: {

    async register() {
      let loader = this.$loading.show();
      this.loading = true;
      setTimeout(() => {
        this.stopLoading(loader);
      }, 5000)
      this.form.password_confirmation = this.form.password;
      registerUser(this.form)
        .then((user) => {
          this.$store.commit('setUser', user);
          setAccessToken(user.token)
          this.stopLoading(loader);
          return window.location.replace('/');
        })
        .catch((error) => presentApiErrorMessage(this, error))
        .finally(() => this.stopLoading(loader))
    },
    showPassword() {
      this.isVisiblePassword = true;
    },
    hidePassword() {
      this.isVisiblePassword = false;
    },
    stopLoading(loader) {
      loader.hide();
      this.loading = false;
    },
  },
  watch: {
    email(value) {
      this.form.email = value;
    },
    code(value) {
      this.form.code = value;
    },
  }
}
</script>

<style scoped>

</style>
