<template>
  <Form page-title="Edit Category" :business-id="businessId" :menu-id="menuId"
        :in-list="inList" :model="model" @submit="submit" ref="ColorForm"/>
</template>
<script>
import Form from "./Form";
import {updateCategory} from "@/API/CategoriesAPIs";
export default {
  name: "EditCategory",
  components: {Form},
  props: ['inList', 'model', 'businessId', 'menuId'],
  methods: {
    submit(data) {
      let loader = this.$loading.show();
      updateCategory(data)
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
