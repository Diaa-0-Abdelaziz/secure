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
import FormGenerator from "@/components/Dashboard/Common/FormGenerator";
import {models, options, fields} from "@/pages/Floors/form_fields";
import {getFloorData} from "@/API/FloorsAPIs";
import {getUsersOptionsList} from "@/API/UsersAPIs";

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
    'branchId',
    'businessId'
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
    await this.getData();
    this.data.branch_id = this.branchId;
    this.data.business_id = this.businessId;

    this.options.user_idOptions = await getUsersOptionsList()
  },
  watch: {
    async id(val) {
      if (this.id)
        this.data = await getFloorData(val);
    },
    model: {
      deep: true,
      handler(value) {
        this.data = value;
      }
    },
    branchId(val) {
      this.data.branch_id = val;
    },
    businessId(val) {
      this.data.business_id = val;
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {...this.data,
        businessId: this.data.business_id,
        branchId: this.data.branch_id,
      });
      this.$refs.validationObserver.reset();
    },
    async resetForm() {
      this.data = JSON.parse(this.emptyModel);
      // to set after null
      this.data.branch_id = this.branchId;
      this.data.business_id = this.businessId;
      await this.getData();
    },
    async getData() {
      if (!this.id)
        this.id = this.$route.params.id;
      if (this.id)
        return this.data = await getFloorData({
          businessId: this.data.business_id,
          branchId: this.data.branch_id,
          id: this.id
        });
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
