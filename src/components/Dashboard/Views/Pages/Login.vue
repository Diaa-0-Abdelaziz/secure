<template>
  <div class="login-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page ">
      <div class="full-page section-image" filter-color="black">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 col-md-5 ml-auto">

              </div>
              <div class="col-xl-4 col-lg-5 col-md-6  mr-auto">
                <card type="login" class="card-login text-center">
                  <template slot="header">
                    <h4 class="card-title">Login</h4>
                    <p class="card-description"> Use your credentials to login </p>
                  </template>

                  <form @submit.prevent="login" class="auth-form">

                    <ValidationProvider name="Email" :rules="rules.email" v-slot="{ errors }">
                      <fg-input v-model="form.email" addon-left-icon="nc-icon nc-email-85"
                                placeholder="Enter your email..."
                                :error="errors[0]"></fg-input>
                    </ValidationProvider>

                    <ValidationProvider name="Password" :rules="rules.password" v-slot="{ errors }">
                      <fg-input v-model="form.password" :type="isVisiblePassword? 'text' :'password'"
                                addon-left-icon="nc-icon nc-lock-circle-open"
                                placeholder="Enter your password..."
                                :error="errors[0]">
                        <template v-slot:after>
                          <div class="show-password">
                            <a @mousedown="showPassword" @mouseup="hidePassword" @mouseleave="hidePassword">
                              <i class="fa fa-eye"></i>
                            </a>
                          </div>
                        </template>
                      </fg-input>
                    </ValidationProvider>

                    <p-button native-type="submit" slot="footer" type="warning" round>Login
                    </p-button>
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
                    <p class="card-description mb-1 mt-2"> don't have account?
                      <router-link to="/register">Register</router-link>
                    </p>

                  </form>

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
import {Card, Checkbox, Button} from 'src/components/UIComponents';
import AppNavbar from './Layout/AppNavbar'
import AppFooter from './Layout/AppFooter'
import {loginUser} from "@/API/UsersAPIs";
import {setAccessToken} from "@/util/authentication";
import InfoSection from "@/components/UIComponents/InfoSection";
import router from "@/routes/routes";

export default {
  components: {
    InfoSection,
    Card,
    AppNavbar,
    AppFooter,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle('nav-open')
    },
    closeMenu() {
      document.body.classList.remove('nav-open')
      document.body.classList.remove('off-canvas-sidebar')
    },
    notifyLoginError() {
      this.$notify({
        title: 'Error login credentials',
        type: "warning"
      })
    },
    async login() {
      try {
        const user = await loginUser(this.form);
        this.$store.commit('setUser', user);
        console.log(user)
        if (user.token) {
          setAccessToken(user.token)
          setTimeout(async () => {
            window.location.replace('/');
          }, 200);
          return;
        }
        this.notifyLoginError();
      } catch (error) {
        console.error(error);
        this.notifyLoginError();
      }
    },
    showPassword() {
      this.isVisiblePassword = true;
    },
    hidePassword() {
      this.isVisiblePassword = false;
    },
  },
  data() {
    return {
      isVisiblePassword: false,
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: 'required|email',
        password: 'required|min:8',
      },
    }
  },
  beforeDestroy() {
    this.closeMenu()
  }
}
</script>
<style>
</style>
