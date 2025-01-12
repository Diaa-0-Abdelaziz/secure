<template>
  <Form page-title="Edit Table"
        :floor-id="floorId" :branch-id="branchId" :business-id="businessId"
        :in-list="inList" :model="model" @submit="submit" ref="ColorForm"/>
</template>
<script>
import Form from "./Form.vue";
import {updateTable} from "../../../API/TablesAPIs";
export default {
  name: "EditTable",
  components: {Form},
  props: ['inList', 'model','businessId','branchId','floorId'],
  methods: {
    submit(data) {
      let loader = this.$loading.show();
      updateTable(data)
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
