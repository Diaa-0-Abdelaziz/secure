<template>
  <div class="register-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page ">
      <div class="full-page section-image" filter-color="black">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 col-md-5 ml-auto">
              </div>
              <div class="col-xl-4 col-lg-5 col-md-6  mr-auto">
                <card type="signup" class="card-register text-center">
                  <template >
                    <button v-if="step > 1" @click="stepBack" class="btn btn-icon btn-round back-btn">
                      <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="card-title">Register</h4>
                    <p class="card-description"> Create a new account in finemenu </p>
                    <div v-if="step === 1">
                      <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver">
                        <form @submit.prevent="handleSubmit(sendCode)" ref="form">
                          <ValidationProvider name="Email" :rules="rules.email" v-slot="{ errors }">
                            <fg-input v-model="sendCodeForm.email" addon-left-icon="nc-icon nc-email-85"
                                      placeholder="Email..."
                                      :error="errors[0]"></fg-input>
                          </ValidationProvider>
                          <p-button native-type="submit" slot="footer" type="warning" round :disabled="loading" >
                            Register Email
                            <b-spinner small label="Small Spinner" v-if="loading"></b-spinner>
                          </p-button>
                        </form>
                      </ValidationObserver>
                    </div>
                    <div v-else-if="step === 2">
                      <Step2 :email="sendCodeForm.email"
                             @setStep="setStep"
                             @setCode="setCode" />

                    </div>
                    <div v-else-if="step === 3">
                      <Step3  :email="sendCodeForm.email"
                              :code="code" />
                    </div>

                    <p class="card-description mb-1 mt-2"> or use your social media account </p>
                    <div class="social">
                      <button class="btn btn-icon btn-round btn-twitter">
                        <i class="fa fa-twitter"></i>
                      </button>
                      <button class="btn btn-icon btn-round btn-dribbble">
                        <i class="fa fa-dribbble"></i>
                      </button>
                      <button class="btn btn-icon btn-round btn-facebook">
                        <i class="fa fa-facebook-f"></i>
                      </button>
                    </div>
                    <p class="card-description mb-1 mt-2"> Already have account ?
                      <router-link to="/login">Login</router-link>
                    </p>
                  </template>


                </card>
              </div>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div class="full-page-background"></div>
      </div>
    </div>
  </div>
</template>
<script>
import AppNavbar from './Layout/AppNavbar'
import AppFooter from './Layout/AppFooter'
import {Card, Checkbox, Button, InfoSection} from 'src/components/UIComponents';
import {sendCode} from "@/API/UsersAPIs";
import {presentApiErrorMessage} from "@/helpers/utils";
import {ValidationProvider} from 'vee-validate';
import Step3 from "@/components/Dashboard/Views/Pages/RegistrationSteps/Step3.vue";
import Step2 from "@/components/Dashboard/Views/Pages/RegistrationSteps/Step2.vue";

export default {
  components: {
    Step2,
    Step3,
    Card,
    AppNavbar,
    AppFooter,
    InfoSection,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
    ValidationProvider
  },
  data() {
    return {
      isVisiblePassword: false,
      loading: false,
      step: 1,
      code: null,
      sendCodeForm:{
        email: ''
      },
      rules:{
        email: 'required|email',
      }
    }
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle('nav-open')
    },
    closeMenu() {
      document.body.classList.remove('nav-open')
      document.body.classList.remove('off-canvas-sidebar')
    },
    stopLoading(loader){
      loader.hide();
      this.loading = false;
    },
    stepBack(){
      if(this.step === 2){
        this.sendCodeForm.email = "";
        this.step = 1;
      }
      if(this.step === 3){
        this.step = 2;
      }
    },
    async sendCode() {
      let loader = this.$loading.show();
      this.loading = true;
      setTimeout(() => {
        this.stopLoading(loader);
      }, 5000)
      sendCode(this.sendCodeForm)
        .then((data) => {
          this.step = 2;
          this.stopLoading(loader);
        })
        .catch((error) => presentApiErrorMessage(this, error))
        .finally(() => this.stopLoading(loader))
    },
    setStep(step){
      this.step = step;
    },
    setCode(code){
      this.code = code;
    }
  },
  beforeDestroy() {
    this.closeMenu()
  }
}
</script>
<style>
</style>
