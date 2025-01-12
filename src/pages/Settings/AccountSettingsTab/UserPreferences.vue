<template>
  <div class="">
    <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver">
      <form @submit.prevent="handleSubmit(submit)" ref="form">
        <div class='page-container bg-white '>
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
import {AppSettings, BranchSettings} from "@/config/Constants";
import * as _ from "lodash";
import {getCurrentUser, getUserSetting, setUserSetting} from "@/API/UsersAPIs";

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
      data: JSON.parse(JSON.stringify(models)),
      options: options,
      fields: fields,
      emptyModel: null
    }
  },
  async mounted() {
    this.emptyModel = JSON.stringify(models);
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
      this.data = {...JSON.parse(this.emptyModel)};
      await this.getData();
    },
    async getData() {
      this.data = {...JSON.parse(this.emptyModel)};
      var settingData = await getUserSetting({userId: this.$store.state.user.id});
      if (settingData && settingData.length)
        settingData.forEach(set => {
          this.data[set.key] = set.data;
        })
    },
    modelToSubmitDataConverter() {
      var data = [];
      for (const [key, value] of Object.entries(this.data)) {
        if (value !== null && value !== "") {
          data.push({"key": key, "data": value});
        }
      }
      return data;
    },

    // submit(formName)
    async submit() {
      const loader = this.$loading.show();
      let submitData = this.modelToSubmitDataConverter();
      await setUserSetting({userId: this.$store.state.user.id, data: submitData})
      loader.hide();
    },
  }
}

</script>
