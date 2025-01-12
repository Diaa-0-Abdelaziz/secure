<template>
  <Form page-title="Edit Menu" :business-id="businessId"
        :in-list="inList" :model="model" @submit="submit" ref="ColorForm"/>
</template>
<script>
import Form from "./Form";
import {updateMenu} from "../../API/MenusAPIs";
export default {
  name: "EditMenu",
  components: {Form},
  props: ['inList', 'model','businessId'],
  methods: {
    submit(data) {
      let loader = this.$loading.show();
      updateMenu(data)
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
