<template>
  <Form page-title="Edit Branch" :business-id="businessId"
        :in-list="inList" :model="model" @submit="submit" ref="ColorForm"/>
</template>
<script setup>
import Form from "./Form";
import {updateBranch} from "../../API/BranchesAPIs";
const props = defineProps( ['inList', 'model','businessId']);
const emit = defineEmits(['onSubmit']);
const submit = async (data) => {
      // const loader = this.$loading.show();
      console.log("this.$loading.show()")
      try{

       await updateBranch(data);
          emit('onSubmit');
          // this.$notify({message: 'Updated successfully', type: 'success'});
          console.log("Updated successfully")
      } catch(error){
        // this.$error(error.message)
        console.log(error)
      }
        finally{
        //  loader.hide()
         console.log("loader.hide()")
        }
    }
</script>
<style>
</style>
