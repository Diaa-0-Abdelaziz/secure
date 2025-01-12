<template>
  <Form page-title="Edit Order"
        :branch-id="branchId" :business-id="businessId"
        :in-list="inList" :model="model" @submit="submit" ref="ColorForm"/>
</template>
<script>
import Form from "./Form";
import {updateOrder} from "@/API/OrdersAPIs";

export default {
  name: "EditOrder",
  components: {Form},
  props: ['inList', 'model', 'businessId', 'branchId'],
  methods: {
    submit(data) {
      let loader = this.$loading.show();
      data.branchId = this.branchId;
      data.businessId = this.businessId;
      console.log(data)
      updateOrder(data)
        .then(() => {
          this.$emit('onSubmit');
          this.$notify({message: 'Updated successfully', type: 'success'});
        })
        .catch((error) => this.$error(error.message))
        .finally(() => loader.hide())
    }
  }
}
</script>
<style>
</style>
