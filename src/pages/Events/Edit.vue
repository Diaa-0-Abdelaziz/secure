<template>
  <Form page-title="Edit Event"
        :in-list="inList" :model="model" @submit="submit" ref="ColorForm"/>
</template>
<script>
import Form from "./Form";
import {updateEvent} from "../../API/EventsAPIs";
export default {
  name: "EditEvent",
  components: {Form},
  props: ['inList', 'model'],
  methods: {
    submit(data) {
      let loader = this.$loading.show();
      updateEvent(data)
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
