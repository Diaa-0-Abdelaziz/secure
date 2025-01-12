<template>
  <div class="row">
    <div class="col-sm-6">
      <fg-input class="input-sm"
                :field="{placeholder:'Search', type:'text'}"
                v-model="searchQuery"
                @input="searchChanged"
                addon-right-icon="nc-icon nc-zoom-split">
      </fg-input>
    </div>
    <div class="col-sm-6">
      <slot name="header-buttons"></slot>
    </div>
    <div class="col-sm-12" >
      <slot name="content">
        <el-table
          :data="tableData"
          v-bind="$attrs"
          v-on="listeners"
          style="width: 100%"
          class="table-striped">
          <slot name="columns">
            <el-table-column
              :sortable="column.sortable ? 'custom' : false"
              v-for="column in columns"
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :min-width="200"
              :fixed="column.fixed"
            >
              <template slot-scope="{row}">
                <slot :name="column.prop || column.type || column.label" :row="row">
                  <img v-if="column.prop ==='image'" :src="props.row.image" alt="" class="table-car-image">
                  <span v-else>{{ row[column.prop] }}</span>
                </slot>
              </template>
            </el-table-column>
          </slot>
        </el-table>
        <br>
        <slot name="pagination" :page="page" :total="total">
          <p-pagination
            v-model="page"
            :total="total"
            :perPage="perPage"
            @current-change="getTableData"
            layout="prev, pager, next"
          >
          </p-pagination>
        </slot>
      </slot>
    </div>
  </div>
</template>

<script>
import PPagination from "../../UIComponents/Pagination";
import * as _ from 'lodash';

export default {
  name: "DataTable",
  components: {PPagination},
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    getData: {
      type: Function,
      default: () => Promise.resolve([])
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      tableData: [],
      page: 1,
      total: null,
      sortParams: [],
      loading: false,
      searchQuery: '',
      lodash:null
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        ["sort-change"]: this.onSortChange
      };
    }
  },
  mounted() {
    this.lodash = _ ;
  },
  watch: {
    page(page) {
      this.getTableData(page)
    }
  },
  methods: {
    searchChanged: _.debounce(function (e){
      this.searchSubmit(e)
    }, 500),
    searchSubmit(event){
      this.$emit('search' , this.searchQuery);
    },
    async getTableData(page) {
      // const loader = this.$loading.show();
      this.loading = true;
      let reqPage = page || this.page;
      try {
        let response = await this.getData({
          page: reqPage,
          sortParams: this.sortParams
        });
        if(response){
          this.tableData = response.data;
          this.total = response.total;
        }
      } finally {
        // loader.hide();
        this.loading = false;
      }
    },
    onSortChange({column, prop, order}) {
      if (prop !== null) {
        let shortOrder = order === "ascending" ? "asc" : "desc";
        this.sortParams = [`${prop}|${shortOrder}`];
      } else {
        this.sortParams = [];
      }
      this.getTableData();
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
td:last-child,th:last-child{
  background: #fff;
  border-inline-start: #eee 1px solid;
}
</style>
