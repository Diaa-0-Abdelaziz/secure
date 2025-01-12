<template>
  <div class="form-check"
       :class="[
          {disabled: disabled}, inlineClass,
          {'has-danger': error },
          {'has-success': hasSuccess}
        ]">
    <label :for="cbId" class="form-check-label">
      <input :id="cbId"
             :class="[{'is-valid': hasSuccess}, {'is-invalid': error}]"
             class="form-check-input"
             type="checkbox"
             :disabled="disabled"
             v-model="model"/>
      <span class="form-check-sign"></span>
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
      <slot name="helpBlock">
        <div class="invalid-feedback error-text"  v-if="error">
          {{ error }} <br />
        </div>
      </slot>
    </label>
  </div>
</template>
<script>
export default {
  name: 'p-checkbox',
  model: {
    prop: 'checked'
  },
  props: {
    checked: {
      type: [Array, Boolean],
      description: 'Whether checkbox is checked'
    },
    disabled: {
      type: Boolean,
      description: 'Whether checkbox is disabled'
    },
    inline: {
      type: Boolean,
      description: 'Whether checkbox is inline'
    },
    error: {
      type: String,
      default: '',
      description: 'Input error (below input)'
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      cbId: '',
      touched: false
    }
  },
  computed: {
    model: {
      get() {
        return this.checked
      },
      set(check) {
        if (!this.touched) {
          this.touched = true
        }
        this.$emit('input', check)
      },
    },
    hasSuccess() {
      return this.touched && !this.error
    },
    inlineClass() {
      if (this.inline) {
        return `form-check-inline`
      }
    }
  },
  created() {
    this.cbId = this.id ?? Math.random().toString(16).slice(2)
  }
}
</script>
