<template>
  <Form page-title="Add a new Branch" :business-id="businessId"
        :create-form="true" :in-list="inList" @submit="submit" ref="BranchForm" />
</template>
<script>
import Form from "./Form";
import {createBranch} from "@/API/BranchesAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateBranch",
  props:['inList', 'businessId'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.BranchForm.resetForm();
      submitAndNotify(this, createBranch(data) , callback.bind(this))
    }
  }
}
</script>
<style>
</style>
