<template>
  <div>
    <b-form-group v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        @change="updateValue"
        :aria-describedby="ariaDescribedby"
      ></b-form-checkbox-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "CheckboxList",
  props: ['value', 'options'],
  data: () => ({
    selected: [],
  }),
  methods: {
    updateValue(value) {
      this.$emit("input", value)
    }
  },
  watch: {
    value(v) {
      this.selected = v;
    }
  }
}
</script>

<style scoped>

</style>
