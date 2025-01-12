<template>
  <div class="row cars-list">
    <div class="col-md-8">
      <h4 class="title">Categories List<small class="text-muted ml-2">Browse all the system Categories.</small></h4>
    </div>
    <div class="col-md-4 mt-3">
      <p-button class="mx-2 pull-right btn-round btn-warning " type="text"
                v-b-tooltip="(showAdd || editModel) ? 'Close Add/Edit' : 'Start add' "
                @click="(showAdd || editModel) ? closeSideForm() : openSideForm()">
        <i :class="(showAdd || editModel) ? 'fas fa-minus' : 'fas fa-plus'"></i>
      </p-button>
      <b-form-select class="w-300  pull-right mt-2" v-model="businessId" @change="getData" >
        <b-form-select-option
            v-for="business in $store.state.user.business"
            :value="business.id" :key="business.id">{{ business.name }}
        </b-form-select-option>
      </b-form-select>

    </div>
    <div :class="(showAdd || editModel )? 'col-md-8 card' :'card'">
      <div class="card-body row">
        <!-- New Table -->
        <div class="col-12">
          <data-table :get-data="getData"
                      ref="table"
                      :per-page="pagination.perPage"
                      :columns="columns">
            <div slot="locales" slot-scope="{row}">
              {{ GetLocaleData(row.locales)['name'] }}
            </div>

            <div slot="media" slot-scope="{row}">
              <img v-if="row.media[0]" :src="row.media[0]['src']" class="img-thumbnail w-50" alt=""/>
            </div>

            <div slot="Operations" slot-scope="{row}">
              <p-button type="success" class="mx-1" size="sm" icon @click="handleEdit(row)">
                <i class="fa fa-edit"></i>
              </p-button>
              <p-button type="danger" class="mx-1" size="sm" icon @click="handleDelete(row)">
                <i class="fa fa-times"></i>
              </p-button>
            </div>
          </data-table>
        </div>
      </div>
    </div>

    <div class="col-4 px-3 " v-if="showAdd || editModel">
      <div class="card">
        <div class="card-body">
          <CreateCategory v-if="showAdd" :business-id="businessId" :in-list="true" @onSubmit="$refs.table.getTableData()"/>
          <EditCategory v-if="editModel" :business-id="businessId" :in-list="true" @onSubmit="$refs.table.getTableData()" :model="editModel"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {Option, Select, Table, TableColumn} from 'element-ui'
import PPagination from '@/components/UIComponents/Pagination.vue'
import {TableConfiguration} from "./TableConfiguration";
import DataTable from '@/components/Dashboard/Common/DataTable';
import {deleteCategory, getCategoriesList} from "@/API/CategoriesAPIs";
import CreateCategory from "./Create";
import EditCategory from "./Edit";
import {cloneObj} from "@/util/helpers";
import {GetLocaleData} from "@/util/locales";

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
export default {
  name: "CategoriesList",
  mixins: [TableConfiguration],
  components: {
    EditCategory,
    CreateCategory,
    PPagination,
    DataTable
  },
  data() {
    return {
      tableData: [],
      showAdd: false,
      editId: null,
      editModel: null,
      businessId: null,
    }
  },
  created() {
    this.businessId = this.$store.state.user.business[0].id;
  },
  methods: {
    GetLocaleData,
    getLocaleData: GetLocaleData,
    handleDelete(row) {
      this.$confirm().then(async (result) => {
        if (result['isConfirmed']) {
          let loader = this.$loading.show();
          deleteCategory(row.id)
              .then(() => {
                this.$notify({message: 'Deleted successfully', type: 'success'})
                this.$refs.table.getTableData();
              })
              .catch((error) => this.$error(error.message))
              .finally(() => loader.hide())
        }
      })
    },
    getData({page}) {
      console.log("res2", this.businessId)
      return getCategoriesList({'per-page': this.pagination.perPage, page, businessId: this.businessId})
          .then(response => {
            return {data: response.data, total: response['meta']['total']};
          });
    },
    handleEdit(model) {
      this.showAdd = false;
      this.editModel = cloneObj(model);
    },
    closeSideForm() {
      this.showAdd = false;
      this.editModel = null;
    },
    openSideForm() {
      this.showAdd = true;
    }
  }
}
</script>
<style>
.el-table .td-actions button.btn {
  margin-right: 5px;
}
</style>
