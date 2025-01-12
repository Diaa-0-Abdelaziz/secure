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

<script>
import FormGenerator from "@/components/Dashboard/Common/FormGenerator.vue";
import {models, options, fields} from "@/pages/Floors/Tables/form_fields";
import {getTableData} from "@/API/TablesAPIs";
import {getTablesTypes, getUsersOptionsList} from "@/API/UsersAPIs";

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
    'createForm',
    'businessId', 'branchId', 'floorId'
  ],
  data() {
    return {
      data: JSON.parse(JSON.stringify(models)),
      options: options,
      fields: fields,
      emptyModel: null,
      tableObj: {
        businessId: null,
        branchId: null,
        floorId: null
      }
    }
  },
  async mounted() {
    this.emptyModel = JSON.stringify(models);
    await this.getData();
    this.tableObj = {businessId: this.businessId, branchId: this.branchId, floorId: this.floorId}
  },
  watch: {
    async id(val) {
      if (this.id)
        this.data = await getTableData(val);
    },
    model: {
      deep: true,
      handler(value) {
        this.data = value;
      }
    },
    floorId:{
      handler(value) {
        this.tableObj = {businessId: this.businessId, branchId: this.branchId, floorId: value}
      }
    }
  },
  methods: {
    submit() {
      this.data = {...this.data, ...this.tableObj};
      this.$emit('submit', this.data);
      this.$refs.validationObserver.reset();
    },
    async resetForm() {
      this.data = JSON.parse(this.emptyModel);
      await this.getData();
    },
    async getData() {
      if (!this.id)
        this.id = this.$route.params.id;
      if (this.id)
        return this.data = await getTableData(this.id);
      if (this.model)
        return this.data = this.model;
      // Set Initial data for create form
      if (this.createForm) {
      }
    }
  }
}
</script>

<style scoped>

</style>
