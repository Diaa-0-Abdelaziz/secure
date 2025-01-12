<template>
  <Form page-title="Add a new Table"
        :floor-id="floorId" :branch-id="branchId" :business-id="businessId"
        :create-form="true" :in-list="inList" @submit="submit" ref="TableForm" />
</template>
<script>
import Form from "./Form.vue";
import {createTable} from "@/API/TablesAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateTable",
  props:['inList','businessId','branchId','floorId'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.TableForm.resetForm();
      submitAndNotify(this, createTable(data), callback.bind(this));
    }
  }
}
</script>
<style>
</style>
