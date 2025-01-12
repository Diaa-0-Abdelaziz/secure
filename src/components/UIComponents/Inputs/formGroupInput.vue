<template>
  <div class="form-group"
       v-if="field"
       :id="id"
       :class="[{'input-group': hasIcon},
             {'has-danger': error },
             {'input-group-focus': focused},
             {'has-label': label || $slots.label},
             {'has-success': hasSuccess}]">

    <slot name="label">
      <label v-if="label" size="lg" :class="labelClasses + ' text-dark col-form-label '">
        <h6 v-html="labelRequired" v-if="typeData!=='label'"></h6>
        <h6 v-html="'&nbsp;'" v-else> </h6>
      </label>
    </slot>

    <div v-if="addonLeftIcon || $slots.addonLeft">
        <span class="input-group-text">
          <slot name="addonLeft">
            <i :class="addonLeftIcon"></i>
          </slot>
        </span>
    </div>

    <slot name="content">
      <input v-if="typeData==='text' || typeData==='number-native' || typeData==='password'"
             :type='typeData'
             :value="value"
             v-on="listeners"
             v-bind="$attrs"
             class="form-control"
             :placeholder="placeholderData"
             :pattern="pattern"
             :disabled="disabled || field.disabled"
             :class="[{'is-valid': hasSuccess}, inputClasses, {'is-invalid': error}]"
             aria-describedby="addon-right addon-left"/>

      <input v-if="typeData==='label'"
             :type='typeData'
             :value="label"
             v-on="listeners"
             v-bind="$attrs"
             class="form-control"
             :placeholder="placeholderData"
             :disabled="true"
             :class="[{'is-valid': hasSuccess}, inputClasses, {'is-invalid': error}]"
             aria-describedby="addon-right addon-left"/>

      <input v-if="typeData==='validation'"
             type="hidden"
             :value="label"
             v-on="listeners"
             v-bind="$attrs"
             aria-describedby="addon-right addon-left"/>

      <input-number v-if=" typeData==='number'"
                    :type='typeData'
                    :value="value"
                    :min="min"
                    :max="max"
                    :precision="precision"
                    v-on="listeners"
                    v-bind="$attrs"
                    :placeholder="placeholderData"
                    :disabled="disabled || field.disabled"
                    :class="[{'is-valid': hasSuccess}, inputClasses, {'is-invalid': error}]"
                    aria-describedby="addon-right addon-left"/>

      <textarea
        v-if="typeData==='textarea'"
        :value="value"
        v-on="listeners"
        v-bind="$attrs"
        class="form-control"
        :class="[{'is-valid': hasSuccess}, inputClasses, {'is-invalid': error}]"
        aria-describedby="addon-right addon-left"></textarea>
    </slot>
    <div v-if="addonRightIcon || $slots.addonRight" class="input-group-append">
          <span class="input-group-text">
              <slot name="addonRight">
                  <i :class="addonRightIcon"></i>
              </slot>
          </span>
    </div>
    <slot name="infoBlock"></slot>
    <slot name="helpBlock">
      <div class="invalid-feedback error-text" :class="{'mt-2': hasIcon}" v-if="error">
        {{ error }} <br />
      </div>
    </slot>
    <slot name="after"></slot>
  </div>
</template>
<script>
import {FormItem} from 'element-ui';
export default {
  inheritAttrs: false,
  name: 'fg-input',
  props: {
    inList: {
      type: Boolean,
    },
    error: {
      type: String,
      default: '',
      description: 'Input error (below input)'
    },
    value: {
      description: 'Input value'
    },
    addonRightIcon: {
      type: String,
      description: 'Addon right icon'
    },
    addonLeftIcon: {
      type: String,
      description: 'Addon left icon'
    },
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    field: {
      type: Object,
      default: () => ({
        disabled: false,
        label: null,
      })
    },
  },
  components: {
    [FormItem.name]: FormItem,
  },
  data() {
    return {
      touched: false,
      focused: false,
      hadError: false,
      model: '',
      disabled: false,
      typeData: null,
      precision: null,
      min: null,
      max: null,
      placeholderData: null,
      label: null,
      inputClasses: null,
      bodyClasses: null,
      labelClasses: null,
      pattern: null,
      changed: false
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur
      }
    },
    hasSuccess() {
      return this.hadError && this.touched && !this.error
    },
    hasIcon() {
      const {addonRight, addonLeft} = this.$slots
      return addonRight !== undefined || addonLeft !== undefined || this.addonRightIcon !== undefined || this.addonLeftIcon !== undefined
    },
    labelRequired() {
      let hasRequired = this.field.rules? this.field.rules.search('required') !== -1 : false;
      if (this.label && hasRequired)
        return this.label + " <span class=\"text-danger\" v-if=\"required\">*</span>";
      else if (this.label)
        return this.label;
      else
        return '';
    }
  },
  methods: {
    updateValue(evt) {
      // if(this.changed){
      if (evt && evt.target)
        this.$emit('input', evt.target.value)
      else
        this.$emit('input', evt)
      // }
      this.changed = true;
    },
    onFocus(value) {
      this.focused = true;
      this.$emit('focus', value);
    },
    onBlur(value) {
      this.focused = false;
      this.$emit('blur', value);
    },
    setDisable(status) {
      this.field.disabled = status
    },
    setData(field) {
      this.typeData = field.type ? field.type : this.type;
      this.placeholderData = field.placeholder ? this.$t(field.placeholder) : this.$t(this.placeholder);
      this.label = this.$t(field.label);
      this.class = field.bodyClasses;
      this.labelClasses = field.labelClasses;
      this.inputClasses = field.inputClasses;
      this.pattern = field.pattern;
      this.precision = field.precision;
      this.min = field.min;
      this.max = field.max;
    }
  },
  mounted() {
    this.setData(this.field)
  },
  created() {
    this.$watch('error', (newVal) => {
      if (newVal) {
        this.hadError = true;
      }
    }, {immediate: true})
  },
  watch: {
    field: {
      immediate: true,
      handler(field) {
        this.setData(field);
      }
    }
  }
}
</script>
<style>
.error-text {
  display: block;
}
.el-input-number{
  line-height: 37px;
}
.form-group .has-danger .el-input-number .el-input__inner {
  background-color: #FFC0A4 !important;
  border: 1px solid #ef8157 !important;
  color: #ef8157 !important;
}
</style>
