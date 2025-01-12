<template>
  <div v-if="model" :id="formId">
    <div class="row">
      <div :class="((field.class || '') + ' col-12 ' + field.type + '-container')" v-for="field in fields">
        <template v-if="field.type === 'spacer'">
          <hr v-if="field.line"/>
          <div v-else class="w-100 row"/>
          <div class="fw-bold h5 text-grey" v-if="field.label">{{ field.label }}</div>
        </template>

        <LocalizedComponent v-else-if="field.type === 'localized'"
                            :field="field"
                            :locale-values="model[field.name]" :in-list="inList"></LocalizedComponent>


        <div v-else-if="customValidationTypes.includes(field.type)">
          <ValidationProvider :name="field.validationModel"
                              :rules="field.rules"
                              v-slot="{ passed, failed , errors , failedRules }">

            <fg-input
              v-model="model[field.name]"
              :field="field"
              :error="failed && field.validation_messages? field.validation_messages[Object.keys(failedRules)[0]]: errors[0]"
              :id="`${formId}-field-${field.name}`"
              :ref="`${formId}-field-${field.name}`"
              :label-classes="field.labelClasses"
              :disabled="(model.hasValue !== undefined && !model.hasValue) || field.disabled"
              :class="field.bodyClasses"
              :label=" field.label "
              :placeholder="field.placeholder"
              :hasSuccess="passed" :name="field.name"
            >

              <template v-slot:content #default="{model, field, passed, failed, failedRules}">
                <checkbox-list v-model="model[field.name]" v-if="field.type==='checkbox-list'"
                               :model-data="model[field.name]"
                               :options="options[`${field.name}Options`]"></checkbox-list>

                <FileUpload v-else-if="field.type==='file'"
                            :field="field"
                            v-model="model[field.name]"
                            :multiple="field.multiple"
                            @updated="$emit('updated')"
                />

                <!-- Phone number-->
                <div v-else-if="field.type === 'phone'">
                  <phone-number
                    v-model="model[field.name]"
                    :rules="field.rules"
                    :field="field"
                  />
                  <span v-if="model[field.name]">
                    <input  v-if="model[field.name]" :name="field.validationModel" v-bind:value="model[field.name]['formattedNumber']"
                           type='hidden'/>
                  </span>
                </div>
                <!-- End Phone number-->

                <!-- Location -->
                <GoogleMap v-else-if="field.type === 'location'" v-model="model[field.name]"
                           :model="model[field.name]"></GoogleMap>

              </template>
            </fg-input>
          </ValidationProvider>
        </div>

        <ValidationProvider v-else :name="field.name" :rules="field.rules" v-slot="{ passed, failed, failedRules, errors }">
          <!-- Normal input ('text', 'number', ... ) -->
          <fg-input v-if="normalTypes.includes(field.type)"
                    v-model="model[field.name]"
                    :field="field"
                    :error="failed && field.validation_messages? field.validation_messages[Object.keys(failedRules)[0]]: errors[0]"
                    :id="`field-${field.name}`"
                    :ref="`${formId}-field-${field.name}`"
                    :in-list="inList"
                    :disabled="(model.hasValue !== undefined && !model.hasValue) || field.disabled"
                    :hasSuccess="passed">
          </fg-input>

          <!-- Custom input ('select', 'phone', ... ) -->
          <fg-input v-else-if="customTypes.includes(field.type )"
                    v-model="model[field.name]"
                    :field="field"
                    :error="failed && field.validation_messages? field.validation_messages.required: null"
                    :id="`${formId}-field-${field.name}`"
                    :ref="`${formId}-field-${field.name}`"
                    :label-classes="field.labelClasses"
                    :disabled="(model.hasValue !== undefined && !model.hasValue) || field.disabled">
            <template v-slot:content #default="{field}">
              <!-- Select -->
              <b-form-select
                v-if="field.type === 'select'"
                v-model="model[field.name]"
                :class="{ 'rtl':$store.state.rtl, 'has-danger':true}"
                :disabled="field.disabled"
                :placeholder="$t(field.placeholder)"
                @change="handleAction({action: field.change, model:model})">


                <b-form-select-option :value="option.value"
                                      :key="option.key"
                                      v-for="option in options[field.name+'Options']">
                  {{ field.translated ? option.label : $t(option.label) }}
                </b-form-select-option>
              </b-form-select>

              <!-- Select2 -->
              <select2 v-else-if="field.type === 'select2'"
                       :multiple="field.multiple"
                       v-model="model[field.name]"
                       :model="model[field.name]"
                       :options="options[field.name+'Options']"
                       :class="{ 'rtl':$store.state.rtl}"
                       :popper-class="$store.state.rtl?'rtl':''"
                       :ref="`field_${field.name}`"
                       :fetchOptions="field.fetchOptions"
                       :filter="field.filter"
                       :search-params="field.searchParams"
                       @change="handleAction({action: field.change, model:model})"
                       :placeholder="$t(field.placeholder)" :disabled="field.disabled">
              </select2>

              <!-- CheckBox-->
              <b-form-checkbox v-model="model[field.name]" v-else-if="field.type === 'checkbox'"
                               :disabled="field.disabled"
                               @change="handleAction({action: field.change, model:model})"
                               :value="true" :unchecked-value="false"></b-form-checkbox>

              <color-picker v-else-if="field.type === 'color'" v-model="model[field.name]" :model="model[field.name]"
                            :color="model[field.name]"/>

              <color-options v-else-if="field.type === 'color-options'" v-model="model[field.name]"
                             :color-id="model[field.name]"/>

              <el-date-picker v-else-if="field.type === 'date'" v-model="model[field.name]"
                              :placeholder="$t(field.placeholder)"
                              :format="field.format" :picker-options="field.datePickerOptions" type="date"
                              :disabled="field.disabled"/>

              <my-date-range-picker v-else-if="field.type === 'date-range'" v-model="model[field.name]"
                                    :model-data="model[field.name]" :min-date="field.min"/>


            </template>
          </fg-input>


          <!-- Array of nested objects-->
          <div v-else-if="field.type==='array'">
            <div class="row">
              <template v-for="(subModel , index) in model[field.name]" v-if="!subModel.isDeleted">
                <div :class="(field.bodyClasses || 'col-12')">
                  <b-card :class="'w-100 border-1 '" :key="'subModal-'+index">
                    <b-card-header header-class="bg-light pt-0 rounded-lg">
                      <!-- Header buttons -->
                      <component v-if="field.topButtons"
                                 :is="field.topButtons"
                                 @removeSubFrom="removeSubFrom"
                                 v-bind="{ model, field , index }"/>
                      <h5 :class="field['labelClasses']+' card-sub-title p-2'">{{ $t(field.label) }}</h5>
                    </b-card-header>
                    <div class="row clearfix w-100"></div>
                    <transition name="fade">
                      <FormGenerator :fields="field.form" :model="subModel"
                                     :options="options" :in-list="inList"
                                     :id="`${ formId }-form-${index}`" :index="index"
                                     :ref="`${ formId }-form-${index}`"
                                     @addSubFor="addSubFor" @removeSubFrom="removeSubFrom"
                                     @handleAction="handleAction"/>
                    </transition>
                  </b-card>
                </div>
              </template>
              <div class="col-12">
                <b-button block class="btn btn-outline-warning rounded-lg"
                          @click="addSubFor({name:field.name , list:model[field.name]})">
                  <i class="fa fa-plus"></i> {{ $t(field.placeholder) }}
                </b-button>
              </div>
            </div>
          </div>

          <!-- Object -->
          <div v-else-if="field.type==='object'">
            <FormGenerator :fields="field.form" :model="model[field.name]"
                           :id="`${ formId }-form-${field.id}`"
                           :ref="`${ formId }-form-${field.id}`"
                           :model-path="formModelPath ? `${ formModelPath }.${field.id}` : field.id"
                           :options="options" :in-list="inList"/>
          </div>

        </ValidationProvider>
      </div>
    </div>
  </div>

</template>

<script>
import LocalizedComponent from "./LocalizedComponent";
import ColorPicker from "./ColorPicker";
import PButton from "../../UIComponents/Button";
import {Button, Input, Option, Select, DatePicker, FormItem} from "element-ui";
import {extend} from "vee-validate";
import {required} from "vee-validate/dist/rules";
import S3FileUpload from "./S3FileUpload";
import ColorOptions from "./ColorOptions";
import MyDateRangePicker from "./MyDateRangePicker";
import GoogleMap from "./GoogleMap";
import PhoneNumber from "./PhoneNumber";
import {Checkbox, TabPane} from "../../UIComponents";
import Select2 from "./Select2";
import FileUpload from "./FileUpload";
import CheckboxList from "./CheckboxList";

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

extend("required", required);

export default {
  name: "FormGenerator",
  components: {
    TabPane,
    CheckboxList,
    FileUpload,
    Select2,
    PhoneNumber,
    GoogleMap,
    MyDateRangePicker,
    ColorOptions,
    [DatePicker.name]: DatePicker,
    S3FileUpload, PButton, LocalizedComponent, ColorPicker,
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Checkbox.name]: Checkbox,
    VuePhoneNumberInput,

  },
  props: {
    fields: Array,
    model: Object,
    options: Object,
    inList: Boolean,
    selected: false,
    id: String,
    index: Number,
    modelPath: String
  },
  data() {
    return {
      test: '',
      normalTypes: ['text', 'number', 'number-native', 'textarea', 'label', 'password', 'validation', '', null],
      customTypes: ['select', 'color', 'color-options',
        'date', 'date-range', 'checkbox', 'select2', 'periods-pricing', 'pricing', 'location'],
      customValidationTypes: ['file', 'phone', 'payments', 'location', 'file-upload', 'checkbox-list']
    }
  },
  computed: {
    // Generates for normal and nested
    // Ex form , form-1 , form-form-0 , form-form-0-form-0 , ....
    formId() {
      return this.id ? this.id : 'form';
    },
    formModelPath() {
      return this.modelPath ? this.modelPath : '';
    }
  },
  methods: {
    addSubFor(props) {
      this.$emit('addSubFor', props)
    },
    removeSubFrom(props) {
      this.$emit('removeSubFrom', props)
    },
    handleAction(props) {
      if (props.action)
        this.$emit('handleAction', props)
    }
  }
}
</script>

<style scoped>

</style>
