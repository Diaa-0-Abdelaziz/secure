<template>
  <Form page-title="Edit Floor"
        :branch-id="branchId"
        :business-id="businessId"
        :in-list="inList" :model="model" @submit="submit" ref="ColorForm"/>
</template>
<script>
import Form from "./Form";
import {updateFloor} from "../../API/FloorsAPIs";
export default {
  name: "EditFloor",
  components: {Form},
  props: ['inList', 'model','branchId','businessId'],
  methods: {
    submit(data) {
      let loader = this.$loading.show();
      updateFloor(data)
        .then(() => {
          this.$emit('onSubmit');
          this.$notify({message: 'Updated successfully', type: 'success'});
        })
        .catch((error) =>  this.$error(error.message))
        .finally(() => loader.hide())
    }
  }
}
</script>
<style>
</style>
