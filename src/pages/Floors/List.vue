<template>
  <div class="row cars-list">
    <div class="col-md-12">
      <h4 class="title">Floors List <small class="text-muted ml-2">Browse all the system Floors.</small></h4>
      <p-button class="m-0 mx-2 pull-right btn-round btn-warning mt--45" type="text"
                v-b-tooltip="(showAdd || editModel) ? 'Close Add/Edit' : 'Start add' "
                @click="(showAdd || editModel) ? closeSideForm() : openSideForm()">
        <i :class="(showAdd || editModel) ? 'fas fa-minus' : 'fas fa-plus'"></i>
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
            <div slot="header-buttons">
              <SelectBranch @setBusinessId="setBusinessId" @setBranchId="setBranchId" :defaultValues="defaultValues"/>
            </div>
            <div slot="locales" slot-scope="{row}">
              {{ GetLocaleData(row.locales)['name'] }}
            </div>

            <div slot="business_id" slot-scope="{row}">
              {{ business.filter(r => r.id === row.business_id)[0].name }}
            </div>

            <div slot="branch_id" slot-scope="{row}">
              {{
                business.filter(r => r.id === row.business_id)[0].branches.filter(r => r.id === row.branch_id)[0].name
              }}
            </div>

            <div slot="tables_btn" slot-scope="{row}">

              <router-link class="btn btn-warning p-2" :to="`/floors/${row.id}/tables?rid=${selectedBusinessId}&bid=${selectedBranchId}`">
                <i class="fa fa-list"></i> Tables
              </router-link>

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
          <CreateFloor v-if="showAdd" :in-list="true"
                       @onSubmit="$refs.table.getTableData()"
                       :branch-id="selectedBranchId"
                       :business-id="selectedBusinessId"/>
          <EditFloor v-if="editModel" :in-list="true"
                     @onSubmit="$refs.table.getTableData()"
                     :model="editModel"
                     :branch-id="selectedBranchId"
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
import {deleteFloor, getFloorsList} from "@/API/FloorsAPIs";
import CreateFloor from "./Create";
import EditFloor from "./Edit";
import {GetLocaleData} from "@/util/locales";
import SelectBranch from "@/components/Common/SelectBranch.vue";

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
export default {
  name: "FloorsList",
  mixins: [TableConfiguration],
  components: {
    SelectBranch,
    EditFloor,
    CreateFloor,
    PPagination,
    DataTable
  },
  data() {
    return {
      selectedBusinessId: null,
      selectedBranchId: null,
      menuIdOptions: [],
      tableData: [],
      showAdd: false,
      editId: null,
      editModel: null,
      defaultValues: {}
    }
  },
  mounted() {
    if (this.$route.query.businessId) {
      this.selectedBranchId = null;
      this.selectedBusinessId = parseInt(this.$route.query.businessId);
      if (this.$route.query.branchId)
        this.selectedBranchId = parseInt(this.$route.query.branchId);
      this.defaultValues = {
        defaultBusinessId: this.selectedBusinessId,
        defaultBranchId: this.selectedBranchId
      }
    }
  },
  computed: {
    business() {
      return this.$store.state.user?.business ?? null;
    }
  },
  methods: {
    GetLocaleData,
    handleDelete(row) {
      this.$confirm().then(async (result) => {
        if (result['isConfirmed']) {
          let loader = this.$loading.show();
          deleteFloor({
            'businessId': this.selectedBusinessId,
            'branchId': this.selectedBranchId,
            id: row.id
          })
            .then(() => {
              this.$notify({message: 'Deleted successfully', type: 'success'})
              this.$refs.table.getTableData();
            })
            .catch((error) => this.$error(error.message))
            .finally(() => loader.hide())
        }
      })
    }
    ,
    getData({page}) {
      return getFloorsList({
        'businessId': this.selectedBusinessId,
        'branchId': this.selectedBranchId,
        'per-page': this.pagination.perPage, page
      }).then(response => {
        return {data: response.data, total: response['meta']['total']};
      });
    }
    ,
    handleEdit(model) {
      this.showAdd = false;
      this.editModel = JSON.parse(JSON.stringify(model));
    }
    ,
    closeSideForm() {
      this.showAdd = false;
      this.editModel = null;
    }
    ,
    openSideForm() {
      this.showAdd = true;
    }
    ,
    fetchTableData() {
      if (this.$refs.table)
        this.$refs.table.getTableData({
          page: this.page
        });
    }
    ,
    async setBranchId(bid) {
      this.selectedBranchId = bid;
      this.fetchTableData();
    }
    ,
    async setBusinessId(businessId) {
      this.selectedBusinessId = businessId;
    }
    ,
  }
}
</script>
<style>
.el-table .td-actions button.btn {
  margin-right: 5px;
}
</style>
