<template>
    <DateRangePicker ref="picker"
                     :date-range="model"
                     v-model="model"
                     :ranges="false"
                     @update="updateValues" class="w-100"
                     :min-date="minDate"
                     :auto-apply="true"
                     :picker-options="{}">
      <template v-slot:input="picker" >
        <div v-if="picker.startDate && picker.endDate">
          {{ $t("From") }}: <b class="mr-3">{{ picker.startDate  | moment("YYYY-MM-DD") }}</b>
          {{ $t("To") }}: <b>{{ picker.endDate  | moment("YYYY-MM-DD") }}</b>
        </div>
      </template>
    </DateRangePicker>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import {__DateOptions} from "../../../util/dates";

export default {
  name: "MyDateRangePicker",
  props: ['modelData','minDate'],
  components: {
    DateRangePicker
  },
  data() {
    return {
      model:__DateOptions
    }
  },
  methods: {
    updateValues(values) {
      this.$emit('input', values)
    }
  },
  watch:{
    modelData:{
      deep:true,
      handler(value){
        this.model = value;
      }
    }
  }
}
</script>

<style>
</style>
