<template>
  <Form page-title="Add a new Menu" :business-id="businessId"
        :create-form="true" :in-list="inList" @submit="submit" ref="MenuForm" />
</template>
<script>
import Form from "./Form";
import {createMenu} from "@/API/MenusAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateMenu",
  props:['inList', 'businessId'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.MenuForm.resetForm();
      submitAndNotify(this, createMenu(data), callback.bind(this));
    }
  }
}
</script>
<style>
</style>
