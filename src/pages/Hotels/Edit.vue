<template>
  <Form page-title="Edit Hotel"
        :in-list="inList" :model="model" @submit="submit" ref="ColorForm"/>
</template>
<script>
import Form from "./Form";
import {updateHotel} from "@/API/HotelsAPIs";
export default {
  name: "EditHotel",
  components: {Form},
  props: ['inList', 'model'],
  methods: {
    submit(data) {
      let loader = this.$loading.show();
      updateHotel(data)
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
