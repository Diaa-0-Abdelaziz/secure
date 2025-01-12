<template>
  <div class="row cars-list">
    <div class="col-md-12">

      <div class="d-flex mb-2 justify-content-center">
        <b-form-select v-model="selectedBusinessId" @change="(e) => $refs.table.getTableData()  " class="w-300">
          <b-form-select-option
            v-for="business in $store.state.user.business"
            :value="business.id" :key="business.id">{{ business.name }}
          </b-form-select-option>
        </b-form-select>
      </div>

    </div>
    <div class="col-md-12">
      <h4 class="title">Menus List <small class="text-muted ml-2">Browse all the system Menus.</small></h4>
      <p-button class="m-0 mx-2 pull-right btn-round btn-warning mt--45" type="text"
                v-b-tooltip="(showAdd || editModel) ? 'Close Add/Edit' : 'Start add' "
                @click="(showAdd || editModel) ? closeSideForm() : openSideForm()">
        <i :class="(showAdd || editModel) ? 'fas fa-minus' : 'fas fa-plus'"></i>
      </p-button>
    </div>
    <div :class="(showAdd || editModel )? 'col-md-8 card' :'card'">
      <div class="card-body row">
        <!-- New Table -->
        <div class="col-12" v-if="selectedBusinessId !== null">
          <data-table :get-data="getData"
                      ref="table"
                      :per-page="pagination.perPage"
                      :columns="columns">

            <div slot="locales" slot-scope="{row}">
              {{ GetLocaleData(row.locales)['name'] }}
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
          <CreateMenu v-if="showAdd" :in-list="true" @onSubmit="$refs.table.getTableData()"
                      :business-id="selectedBusinessId"/>
          <EditMenu v-if="editModel" :in-list="true" @onSubmit="$refs.table.getTableData()" :model="editModel"
                    :business-id="selectedBusinessId"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {Table, TableColumn, Select, Option} from 'element-ui'
import PPagination from '@/components/UIComponents/Pagination.vue'
import {TableConfiguration} from "./TableConfiguration";
import DataTable from '@/components/Dashboard/Common/DataTable';
import {deleteMenu, getMenusList} from "@/API/MenusAPIs";
import CreateMenu from "./Create";
import EditMenu from "./Edit";
import {GetLocaleData} from "@/util/locales";

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
export default {
  name: "MenusList",
  mixins: [TableConfiguration],
  components: {
    EditMenu,
    CreateMenu,
    PPagination,
    DataTable
  },
  data() {
    return {
      selectedBusinessId: null,
      menuIdOptions: [],
      tableData: [],
      showAdd: false,
      editId: null,
      editModel: null
    }
  },
  mounted() {
    this.selectedBusinessId = this.$store.state.user.business[0].id;
  },
  methods: {
    GetLocaleData,
    handleDelete(row) {
      this.$confirm().then(async (result) => {
        if (result['isConfirmed']) {
          let loader = this.$loading.show();
          deleteMenu({businessId: this.selectedBusinessId, id: row.id})
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
      return getMenusList({businessId: this.selectedBusinessId, 'per-page': this.pagination.perPage, page})
        .then(response => {
          return {data: response.data, total: response['meta']['total']};
        });
    },
    handleEdit(model) {
      this.showAdd = false;
      this.editModel = JSON.parse(JSON.stringify(model));
    },
    closeSideForm() {
      this.showAdd = false;
      this.editModel = null;
    },
    openSideForm() {
      this.showAdd = true;
    },
  }
}
</script>
<style>
.el-table .td-actions button.btn {
  margin-right: 5px;
}
</style>
