<template>
  <Form page-title="Add a new Event"
        :create-form="true" :in-list="inList" @submit="submit" ref="EventForm" />
</template>
<script>
import Form from "./Form";
import {createEvent} from "@/API/EventsAPIs";
import {submitAndNotify} from "@/helpers/utils";

export default {
  name: "CreateEvent",
  props:['inList'],
  components: {Form},
  methods: {
    submit(data) {
      let callback = ()=> this.$refs.EventForm.resetForm();
      submitAndNotify(this, createEvent(data), callback.bind(this))
    }
  }
}
</script>
<style>
</style>
