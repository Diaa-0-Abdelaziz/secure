<template>
  <Form page-title="Add a new Order"
        :create-form="true" :in-list="inList" @submit="submit" ref="OrderForm" />
</template>
<script>
import Form from "./Form";
import {createOrder} from "@/API/OrdersAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateOrder",
  props:['inList'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.OrderForm.resetForm();
      submitAndNotify(this, createOrder(data), callback.bind(this));
    }
  }
}
</script>
<style>
</style>
