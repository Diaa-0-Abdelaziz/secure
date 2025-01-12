<template>
  <Form page-title="Edit Service"
        :in-list="inList" :model="model" @submit="submit" ref="ColorForm"/>
</template>
<script>
import Form from "./Form";
import {updateService} from "../../API/ServicesAPIs";
export default {
  name: "EditService",
  components: {Form},
  props: ['inList', 'model'],
  methods: {
    submit(data) {
      let loader = this.$loading.show();
      updateService(data)
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
