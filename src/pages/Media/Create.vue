<template>
  <Form page-title="Add a new Media"
        :create-form="true" :in-list="inList" @submit="submit" ref="MediaForm" />
</template>
<script>
import Form from "./Form";
import {createMedia} from "@/API/MediaAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateMedia",
  props:['inList'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.MediaForm.resetForm();
      submitAndNotify(this, createMedia(data), callback.bind(this));
    }
  }
}
</script>
<style>
</style>
