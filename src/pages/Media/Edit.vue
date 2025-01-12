<template>
  <Form page-title="Edit Media"
        :in-list="inList" :model="model" @submit="submit" ref="ColorForm"/>
</template>
<script>
import Form from "./Form";
import {updateMedia} from "../../API/MediaAPIs";
export default {
  name: "EditMedia",
  components: {Form},
  props: ['inList', 'model'],
  methods: {
    submit(data) {
      let loader = this.$loading.show();
      updateMedia(data)
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
