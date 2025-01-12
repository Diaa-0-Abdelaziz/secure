<template>
  <Form page-title="Add a new Floor"
        :branch-id="branchId"
        :business-id="businessId"
        :create-form="true" :in-list="inList" @submit="submit" ref="FloorForm" />
</template>
<script>
import Form from "./Form";
import {createFloor} from "@/API/FloorsAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateFloor",
  props:['inList','branchId','businessId'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.FloorForm.resetForm();
      submitAndNotify(this, createFloor(data), callback.bind(this))
    }
  }
}
</script>
<style>
</style>
