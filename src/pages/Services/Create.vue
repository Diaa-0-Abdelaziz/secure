<template>
  <Form page-title="Add a new Service"
        :create-form="true" :in-list="inList" @submit="submit" ref="ServiceForm" />
</template>
<script>
import Form from "./Form";
import {createService} from "@/API/ServicesAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateService",
  props:['inList'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.ServiceForm.resetForm();
      submitAndNotify(this, createService(data), callback.bind(this));
    }
  }
}
</script>
<style>
</style>
