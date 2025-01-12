<template>
  <div class="extended-forms">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <h4 class="card-title">Datetime Picker</h4>
            <div class="form-group">
              <el-date-picker
                v-model="dateTimePicker"
                type="datetime"
                placeholder="Select date and time"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
          </div>
        </div>

        <br/><br/>
      </div>
    </div> <!-- end card -->
  </div>
</template>
<script>
  import {DatePicker } from 'element-ui'
  export default {
    components: {
      [DatePicker.name]: DatePicker,
    },
    data () {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: 'Today',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: 'Yesterday',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: 'A week ago',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        datePicker: '',
        dateTimePicker: '',
        timePicker: ''
      }
    },
    methods: {
      showInput () {
        this.tags.inputVisible = true
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

    }
  }
</script>
<style>
  .extended-forms .el-select {
    width: 100%;
  }
</style>
