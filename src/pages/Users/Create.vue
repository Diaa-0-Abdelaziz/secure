<template>
  <Form page-title="Add a new UserStore"
        :create-form="true" :in-list="inList" @submit="submit" ref="UserForm" />
</template>
<script>
import Form from "./Form";
import {createUser} from "@/API/UsersAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateUser",
  props:['inList'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.UserForm.resetForm();
      submitAndNotify(this, createUser(data), callback.bind(this));
    }
  }
}
</script>
<style>
</style>
