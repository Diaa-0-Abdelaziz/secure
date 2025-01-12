<template>
  <div class="row cars-list">
    <div class="col-md-12">
      <h4 class="title">Users List <small class="text-muted ml-2">Browse all the system Users.</small></h4>
      <p-button v-if="showAdd || editModel" class="m-0 mx-2 pull-right btn-round btn-warning" type="text"
                style="margin-top:-60px !important;"
                @click="closeSideForm">
        <i :class="'fas fa-close'"></i>
      </p-button>
      <p-button v-else class="m-0 mx-2 pull-right btn-round btn-warning" type="text"
                style="margin-top:-60px !important;"
                @click="openSideForm">
        <i :class="'fas fa-plus'"></i>
      </p-button>
    </div>
    <div :class="(showAdd || editModel )? 'col-md-8 card' :'card'">
      <div class="card-body row">
        <!-- New Table -->
        <div class="col-12">
          <data-table :get-data="getData"
                      ref="table"
                      :per-page="pagination.perPage"
                      :columns="columns">

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
          <CreateUser v-if="showAdd" :in-list="true" @onSubmit="$refs.table.getTableData()"/>
          <EditUser v-if="editModel" :in-list="true" @onSubmit="$refs.table.getTableData()" :model="editModel"/>
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
import {deleteUser, getUsersList} from "@/API/UsersAPIs";
import CreateUser from "./Create";
import EditUser from "./Edit";

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
export default {
  name: "UsersList",
  mixins: [TableConfiguration],
  components: {
    EditUser,
    CreateUser,
    PPagination ,
    DataTable
  },
  data() {
    return {
      tableData: [],
      showAdd: false,
      editId: null,
      editModel: null
    }
  },
  methods: {
    handleDelete(row) {
      this.$confirm().then(async (result) => {
        if (result['isConfirmed']) {
          let loader = this.$loading.show();
          deleteUser(row.id)
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
      return getUsersList({'per-page': this.pagination.perPage, page})
        .then(response => {
          return { data: response.data, total: response['meta']['total']};
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
