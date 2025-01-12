<template>
  <Form page-title="Add a new Category" :business-id="businessId" :menu-id="menuId"
        :create-form="true" :in-list="inList" @submit="submit" ref="CategoryForm"/>
</template>
<script>
import Form from "./Form";
import {createCategory} from "@/API/CategoriesAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateCategory",
  props: ['inList', 'businessId', 'menuId'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.CategoryForm.resetForm();
      submitAndNotify(this, createCategory(data), callback.bind(this))
    }
  }
}
</script>
<style>
</style>
