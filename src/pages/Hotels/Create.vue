<template>
  <Form page-title="Add a new Hotel"
        :create-form="true" :in-list="inList" @submit="submit" ref="HotelForm" />
</template>
<script>
import Form from "./Form";
import {createHotel} from "@/API/HotelsAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateHotel",
  props:['inList'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.HotelForm.resetForm();
      submitAndNotify(this, createHotel(data), callback.bind(this))
    }
  }
}
</script>
<style>
</style>
