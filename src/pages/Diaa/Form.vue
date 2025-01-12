<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver">
    <form @submit.prevent="handleSubmit(submit)" ref="form">
      <div :class="inList ? 'page-container py-0' : 'page-container bg-white py-4 px-5' ">
        <h4 :class="inList ? 'card-title':'card-title pb-4'">
          {{ pageTitle }}
        </h4>
        <FormGenerator :fields="fields" :model="data" :options="options"/>
        <div class="text-right">
          <p-button type="warning" native-type="submit">Submit</p-button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script setup>
import FormGenerator from "@/components/Dashboard/Common/FormGenerator";
import {models, options, fields} from "@/pages/Branches/form_fields";
import {getBranchData} from "@/API/BranchesAPIs";
import { onMounted, ref, watch } from "vue";
import store from "@/store";

const data = ref(JSON.parse(JSON.stringify(models)));
const emptyModel = ref(null);

  const emit = defineEmits(['submit']);
 const props = defineProps([
    'id',
    'pageTitle',
    'inList',
    'model',
    'businessId',
    'createForm'
  ]);
 
   
  onMounted(async () => {
    emptyModel.value = JSON.stringify(models);
    await getData();
    options.business_idOptions = store.state.user.business;
    data.value.businessId = props.businessId;
  });
  watch(()=> props.id, async(val) => {
      if (val){
        data.value = await getBranchData(val);
    }
    });
   
    watch(()=> props.model, (value)=>{
      data.value = value;
    },{deep: true,})  
      
   
 
   const submit = async() => {
      data.value.businessId = props.businessId;
      emit('submit',data.value);
      // this.$refs.validationObserver.reset();
    await resetForm();
    };
    const resetForm = async () =>{
      data.value = JSON.parse(emptyModel.value);
      await this.getData();
    };
    const getData = async ()=>{
      if (!props.id)
        // id.value = this.$route.params.id;
      if (props.id)
        return data.value = await getBranchData(this.id);
      if (props.model)
        return data.value = props.model;
      // Set Initial data for create form
      if (props.createForm) {
      }
    }
</script>

<style scoped>

</style>
