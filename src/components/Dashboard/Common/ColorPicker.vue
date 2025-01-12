<template>
  <div>
    <b-input-group class="max-width-300" >
      <template #append>
        <b-input-group-text class="vc-group bg-light p-2 cursor-pointer border-left current-color-click" @click="togglePicker()">
          <span class="current-color current-color-click border-right-1"
                :style="'background-color: ' + colorValue"></span>
        </b-input-group-text>
      </template>
      <b-form-input disabled type="text" class="form-control current-color-click" v-model="colorValue" @focus="showPicker()"
                    @input="updateFromInput"></b-form-input>
    </b-input-group>
    <chrome-picker :value="colors" @input="updateFromPicker" v-if="displayPicker"/>
  </div>
</template>

<script>
import {Chrome} from 'vue-color';

export default {
  name: "ColorPicker",
  props: {
    color:{
      type: String,
      default:  '#000000'
    },
  },
  components: {
    'chrome-picker': Chrome,
  },
  data() {
    return {
      colors: {
        hex: '#000000',
      },
      colorValue: '',
      displayPicker: false,
    }
  },
  mounted() {
    if(this.color)
      this.setColor(this.color);
  },
  methods: {
    setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    updateColors(color) {
      if (color.slice(0, 1) === '#')
        this.colors = {hex: color};
      else if (color.slice(0, 4) === 'rgba') {
        let rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
        let hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) +
          (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
        this.colors = {hex: hex, a: rgba[3]}
      }
    },
    showPicker() {
      this.displayPicker = true;
      document.addEventListener('click', this.documentClick);
    },
    hidePicker() {
      this.displayPicker = false;
      document.removeEventListener('click', this.documentClick);
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
    },
    updateFromInput() {
      this.updateColors(this.colorValue);
    },
    updateFromPicker(color) {
      this.colors = color;
      if (color.rgba.a === 1)
        this.colorValue = color.hex;
      else
        this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
    },
    documentClick(e) {
      if (!e.target.classList.contains('current-color-click')) {
        e.target.getAttribute('class')
          .split(' ').map((cssClass) => {
            if (cssClass.search('vc-') !== 0) {
              this.hidePicker();
            }
        });
      }
    }
  },
  watch: {
    colorValue(val) {
      if (val) {
        this.updateColors(val);
        this.$emit('input', val);
      }
    },
    color(val){
      if(!val)
        val = '#000000'
      this.setColor(val)
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
.max-width-300{
  max-width: 300px;
}
</style>
