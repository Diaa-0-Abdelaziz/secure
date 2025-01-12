<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver">
    <form @submit.prevent="handleSubmit(submit)" ref="form">
      <div :class="inList ? 'page-container py-0' : 'page-container bg-white py-4 px-5' ">
        <h4 :class="inList ? 'card-title':'card-title pb-4'">
          {{ pageTitle }} ( {{ model.id }} )
        </h4>
        <FormGenerator :fields="fields" :model="data" :options="options" />
        <div class="text-right">
          <p-button type="warning" native-type="submit">Submit</p-button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import FormGenerator from "@/components/Dashboard/Common/FormGenerator";
import {models,options,fields} from "@/pages/Orders/form_fields";
import {getOrderData, getStatusOptions} from "@/API/OrdersAPIs";

export default {
  name: "Form",
  components: {
    FormGenerator
  },
  props: [
    'id',
    'pageTitle',
    'inList',
    'model',
    'createForm', 'businessId', 'branchId'
  ],
  data() {
    return {
      data: JSON.parse(JSON.stringify(models)),
      options: options,
      fields: fields,
      emptyModel: null
    }
  },
  async mounted() {
    this.emptyModel = JSON.stringify(models);
    this.options.statusOptions = await getStatusOptions();
    await this.getData();
  },
  watch: {
    async id(val) {
      if (this.id) {
        var props = {branchId:this.branchId, businessId:this.businessId , id:val};
        this.data = await getOrderData(props);
      }
    },
    model:{
      deep:true,
      handler(value){
        this.data = value;
      }
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.data);
      this.$refs.validationObserver.reset();
    },
    async resetForm() {
      this.data = JSON.parse(this.emptyModel);
      await this.getData();
    },
    async getData(){
      if (this.model)
        return this.data = this.model;

    }
  }
}
</script>

<style scoped>

</style>
