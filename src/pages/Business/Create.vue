<template>
  <Form page-title="Add a new Business" @updated="$emit('updated')"
        :create-form="true" :in-list="inList" @submit="submit" ref="BusinessForm" />
</template>
<script>
import Form from "./Form";
import {createBusiness} from "@/API/BusinessAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateBusiness",
  props:['inList'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.BusinessForm.resetForm();
      submitAndNotify(this, createBusiness(data), callback.bind(this));
    }
  }
}
</script>
<style>
</style>
