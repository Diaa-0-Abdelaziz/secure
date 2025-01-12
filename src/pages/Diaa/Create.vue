<template>
  <Form page-title="Add a new Branch" :business-id="businessId"
        :create-form="true" :in-list="inList" @submit="submit" ref="BranchForm" />
</template>

<script setup>
import Form from "./Form";
import {createBranch} from "@/API/BranchesAPIs";
import {submitAndNotify} from "@/helpers/utils";
import { ref, defineOptions } from "vue";
const probs = defineProps(['inList', 'businessId'])


const  BranchForm = ref(null);
const submit = (data) =>{
  const callback = ()=> BranchForm.value.resetForm();
  submitAndNotify(null, createBranch(data), callback);
}
</script>
<style>
</style>
