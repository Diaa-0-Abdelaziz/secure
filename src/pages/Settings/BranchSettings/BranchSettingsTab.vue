<template>
  <div class="">
    <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver">
      <form
        v-if="selectedBranchId"
        @submit.prevent="handleSubmit(submit)" ref="form">
        <div :class="inList ? 'page-container py-0' : 'page-container bg-white ' ">
          <div class="d-flex mb-2 justify-content-center select-business">
            <b-form-select v-model="selectedBusinessId"
                           @change="setBranchId" class="form-control mx-1">
              <b-form-select-option
                v-for="business in $store.state.user.business"
                :value="business.id" :key="business.id">{{ business.name }}
              </b-form-select-option>
            </b-form-select>
            <b-form-select class="form-control  mx-1"
                           v-if="selectedBusinessId !== null"
                           value-field="id" text-field="locales[0].name"
                           :options=" $store.state.user.business.filter(r => r.id === selectedBusinessId)[0].branches"
                           v-model="selectedBranchId" @change="getData">
            </b-form-select>
          </div>
          <FormGenerator :fields="fields" :model="data" :options="options"/>
          <div class="text-right">
            <p-button type="warning" native-type="submit">Submit</p-button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>

import FormGenerator from "@/components/Dashboard/Common/FormGenerator.vue";
import {fields, models, options} from "./form_fields";
import {listBranchSetting, setBranchSetting} from "@/API/BranchesAPIs";
import {BranchSettings} from "@/config/Constants";

export default {
  components: {FormGenerator},
  props: [
    'id',
    'pageTitle',
    'model',
    'createForm'
  ],
  data() {
    return {
      selectedBusinessId: null,
      selectedBranchId: null,
      data: JSON.parse(JSON.stringify(models)),
      options: options,
      fields: fields,
      emptyModel: null,
      inList: false,
      rules: {
        Address: [
          {required: true, message: 'Please enter the name', trigger: 'blur'}
        ],
      }
    }
  },
  async mounted() {
    this.emptyModel = JSON.stringify(models);
    this.selectedBusinessId = this.$store.state.user.business[0].id;
    this.selectedBranchId = this.$store.state.user.business.filter(r => r.id === this.selectedBusinessId)[0].branches[0].id
    await this.getData();
  },
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.data = value;
      }
    }
  },
  methods: {
    // todo :: check boxes default values could be from backend
    setDefaultValues() {
      // this.data[BranchSettings]
    },
    async resetForm() {
      this.data = JSON.parse(this.emptyModel);
      await this.getData();
    },
    async getData() {
      this.data = {...JSON.parse(this.emptyModel)};
      let settingData = await listBranchSetting({businessId: this.selectedBusinessId, branchId: this.selectedBranchId});
      settingData.forEach(set => {
        this.data[set.key] = set.data;
      });
    },
    modelToSubmitDataConverter() {
      var data = [];
      for (const [key, value] of Object.entries(this.data)) {
        if (value !== null && value !== "" && key !== null && key !== "") {
          data.push({"key": key, "data": value});
        }
      }
      return data;
    },

    async setBranchId() {
      let loader = this.$loading.show();
      this.selectedBranchId = this.$store.state.user.business.filter(r => r.id === this.selectedBusinessId)[0].branches[0].id
      await this.getData();
      loader.hide();

    },
    // submit(formName)
    async submit() {
      const loader = this.$loading.show();
      let submitData = this.modelToSubmitDataConverter();
      await setBranchSetting(this.selectedBusinessId, this.selectedBranchId, submitData)
      loader.hide();
    },
  }
}

</script>
