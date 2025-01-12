<template>
  <div class="">
    <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver">
      <form @submit.prevent="handleSubmit(submit)" ref="form">
        <div :class="inList ? 'page-container py-0' : 'page-container bg-white ' ">
          <div class="d-flex mb-2 justify-content-center select-business">
            <b-form-select v-model="businessId" class="form-control mx-1" @change="getData">
              <b-form-select-option
                v-for="business in $store.state.user.business"
                :value="business.id" :key="business.id">{{ business.name }}
              </b-form-select-option>
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
import {listBusinessSetting, setBusinessSetting} from "@/API/BusinessAPIs";
import FormGenerator from "@/components/Dashboard/Common/FormGenerator.vue";
import {fields, models, options} from "./form_fields";

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
      businessId: null,
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
    this.businessId = this.$store.state.user.business[0].id;
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
    async getData() {
      this.data = {...JSON.parse(this.emptyModel)};
      let settingData = await listBusinessSetting({businessId: this.businessId});
      settingData.forEach(set => {
        this.data[set.key] = set.data;
      });
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
      await setBusinessSetting(this.businessId, submitData);
      loader.hide();
      // this.$emit('submit', this.data);
      // this.$refs.validationObserver.reset();

      // this.$refs[formName].validate(async (valid) => {
      //   if (valid) {
      //     // var data =  this.modelToDataConverter();
      //     // console.log(data);
      //     // await setBusinessSetting({businessId: this.businessId}, data)
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });

    },
  }
}

</script>
