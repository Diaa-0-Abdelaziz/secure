<template>
  <div>
    <v-select :options="optionsModel"
              v-model="selected"
              :label="filter"
              @search="search"
              :multiple="multiple">
      <template v-slot:option="option">
        {{ option[filter] }}
      </template>
    </v-select>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import * as _ from 'lodash';
export default {
  name: "Select2",
  components: {
    vSelect,
  },
  props: ['options','fetchOptions', 'model','filter','multiple', 'searchParams'],
  data() {
    return {
      optionsModel: [],
      selected: null,
    }
  },
  async mounted() {
    this.selected = this.model;
    this.optionsModel = this.options;
  },
  watch: {
    options: {
      deep: true,
      handler(value) {
        this.optionsModel = value;
      }
    },
    selected(value) {
      this.$emit('input', value)
    },
    model:{
      deep:true,
      handler(value){
        this.selected = value
      }
    }
  },
  methods:{
    search: _.debounce(function (search, loading){
      loading(true)
      this.fetchOptions(search, this.searchParams).then((response) => {
        this.optionsModel = response;
        loading(false)
      })
    }, 300)
  }
}
</script>

<style scoped>

</style>
