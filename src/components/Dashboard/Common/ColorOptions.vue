<template>
  <div>
    <swatches-picker v-if="colorValue" :swatches="swatches" v-model="colorValue.hex"/>
  </div>
</template>

<script>
import VSwatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.css"
import {colorHexToColorObj, colorIdToColorObj} from "@/util/helpers";

export default {
  name: "ColorOptions",
  props: ['colorId'],
  components: {
    'swatches-picker': VSwatches
  },
  data() {
    return {
      colorValue: {
        hex:'',
      },
      swatches: [''],
      colorOptions: []
    }
  },
  computed:{
    colorComputed: function() {
      return Object.assign({}, this.colorValue);
    }
  },
  async mounted() {
    this.colorOptions = ['#000' , '#fff'];
    if(this.colorId)
      this.colorValue = colorIdToColorObj(this.colorOptions , this.colorId);
    if(this.colorOptions.length) {
      this.swatches = [];
      this.colorOptions.map((color) => this.swatches.push(color.hex));
    }
  },
  methods: {

  },
  watch: {
    colorComputed: {
      deep:true,
      handler(newVal, oldVal){
        if (newVal.hex && (oldVal.hex !== newVal.hex)) {
          this.colorValue = colorHexToColorObj(this.colorOptions, newVal.hex)
          this.$emit('input' , this.colorValue.id)
        }
      }
    },
    colorId(newVal){
      this.colorValue = colorIdToColorObj(this.colorOptions, newVal)
    }
  },
}
</script>

<style scoped>
.current-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.max-width-300 {
  max-width: 300px;
}
</style>
