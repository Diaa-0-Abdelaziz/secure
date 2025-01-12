<template>
  <el-table
    class="w-100"
    :border="true"
    :empty-text="$t('No data available')"
    :data="data" :row-class-name="tableRowClassName">
    <el-table-column prop="key" label="" label-class-name="hidden" width="200">
      <template #default="{row}">
        {{ translateKeys ? $t(row.key) : row.key}}
      </template>
    </el-table-column>
    <el-table-column prop="value" label="" label-class-name="hidden">
      <template #default="{row}">
        <b v-html="row.value"></b>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "KeyValueTable",
  props :{
    data : {
      default:null
    },
    translateKeys:{
      default: true
    }
  },
  methods:{
    tableRowClassName: ({row, rowIndex}) => (rowIndex % 2) ? '' : 'default-row' ,
  }
}
</script>

<style scoped>

</style>
