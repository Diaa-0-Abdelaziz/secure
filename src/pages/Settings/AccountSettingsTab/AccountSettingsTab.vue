<template>

  <div class="page-container bg-white py-4 ">
    <b-row class="row">
      <b-col xl="5">
        <div class="row ">
          <div data-v-4d936d16="" class="pt-2 col-12 spacer-container">
            <div data-v-4d936d16="" class="w-100 row"></div>
            <div data-v-4d936d16="" class="fw-bold h5 text-grey">User Settings</div>
          </div>
          <div data-v-4d936d16="" class=" col-12 spacer-container">
            <hr data-v-4d936d16="">
          </div>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="180px" class="demo-ruleForm black">
          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Photo">

            <div class="image-holder center-image rounded">
              <div class="picture-container">
                <el-upload class="picture position-relative"
                           accept="image/jpeg,image/gif,image/png"
                           ref="uploadImg"
                           :headers="uploadingHeaders"
                           :action="uploadingUrl"
                           :on-success="uploadSuccess"
                >
                  <img v-if="form.media && form.media[0]" :src="__asset(form.media[0].src, 200, 160)"
                       class="picture-src"
                       alt="Choose Picture"/>
                  <img v-else src="@/assets/images/placeholder.jpeg" alt="Choose Picture">
                  <label class="position-absolute mx-auto mt--20 w-100 text-center  cursor-pointer">Choose Profile
                    Picture</label>
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="Password Confirmation" prop="password_confirmation">
            <el-input type="password" v-model="form.password_confirmation"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">Submit</el-button>
          </el-form-item>
        </el-form>
      </b-col>

      <b-col xl="7">
        <UserPreferences/>


      </b-col>
    </b-row>
  </div>
</template>

<script>
import {getCurrentUser, updateUser} from "@/API/UsersAPIs";
import {commonHeaders} from "@/util/$http";
import {UPLOAD_URL} from "@/config/API";
import {__asset} from "@/helpers/helpers";
import UserPreferences from "@/pages/Settings/AccountSettingsTab/UserPreferences.vue";

export default {
  components: {UserPreferences},
  data() {
    return {
      uploadingHeaders: commonHeaders,
      uploadingUrl: UPLOAD_URL,
      form: {
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        email_verified: false,
        media: []
      },
      rules: {
        name: [
          {required: true, message: 'Please enter the name', trigger: 'blur'}
        ],
        email: [
          {required: true, message: 'Please enter the email', trigger: 'blur'},
          {type: 'email', message: 'Please enter a valid email address', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: 'Please enter the phone', trigger: 'blur'},
          {type: 'email', message: 'Please enter a valid email address', trigger: 'blur'}
        ],
        password: [
          {message: 'Please enter the password', trigger: 'blur'},
          {min: 8, message: 'Password must be at least 8 characters', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    __asset,
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.password_confirmation) {
            this.$notify({type: 'error', message: 'Password & Confirmation are not matched!'});
            return false;
          }

          updateUser(this.form).then(response => {
            this.$notify({type: 'success', message: 'Updated successfully'});
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    uploadSuccess(uploaded) {
      this.form.media = [{id: null, src: uploaded.file}];
    }
  },
  async mounted() {
    var user = await getCurrentUser();
    this.form.id = user.id;
    this.form.name = user.name;
    this.form.email = user.email;
    this.form.phone = user.phone;
    this.form.media = user.media;
    this.form.email_verified = Boolean(user.email_verified);
  }
}
</script>

<style>
.demo-ruleForm {
  max-width: 500px;
  margin-bottom: 30px;
  margin-top: 20px;
}

.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: '';
}

.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:after,
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:after {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
  margin-left: 4px;
}

.el-form-item__label {
  text-align: start;
}
</style>
