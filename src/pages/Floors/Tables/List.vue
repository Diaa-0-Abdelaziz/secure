<template>
  <div class="row cars-list">
    <div class="col-md-12">
      <h4 class="title">Floor : {{ selectedFloor && selectedFloor.locales[0].name }}  - Tables  <small class="text-muted ml-2">Browse all
        the system Tables.</small></h4>
      <p-button
        v-if="selectedBusinessId && selectedBranchId && selectedFloorId"
        class="m-0 mx-2 pull-right btn-round btn-warning mt--45" type="text"
        v-b-tooltip="(showAdd || editModel) ? 'Close Add/Edit' : 'Start add' "
        @click="(showAdd || editModel) ? closeSideForm() : openSideForm()">
        <i :class="(showAdd || editModel) ? 'fas fa-minus' : 'fas fa-plus'"></i>
      </p-button>
    </div>
    <div :class="(showAdd || editModel )? 'col-md-8 card' :'card w-100'">
      <div class="card-body row">
        <template v-if="selectedBusinessId && selectedBranchId && selectedFloorId">

          <!-- New Table -->
          <div class="col-12">
            <data-table :get-data="getData"
                        ref="table"
                        :per-page="pagination.perPage"
                        :columns="columns">

              <div slot="locales" slot-scope="{row}">
                {{ GetLocaleData(row.locales)['name'] }}
              </div>

              <div slot="branch_id" slot-scope="{row}">
                <template v-if="selectedBranchData.locales">
                  {{ selectedBranchData.locales[0].name }}
                </template>
              </div>
              <div slot="floor_id" slot-scope="{row}">
                <template
                  v-if="selectedBranchData && selectedBranchData.floors.filter(r => r.id === row.floor_id).length ">
                  {{ selectedBranchData.floors.filter(r => r.id === row.floor_id)[0].locales[0].name }}
                </template>
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


        </template>
        <div v-else class="col-12">
          <div class="card-body w-100">
            <h5 class="text-muted">
              You don't have floors in this branch
              <RouterLink :to="`/floors/list?businessId=${selectedBusinessId}&branchId=${selectedBranchId}`">Add
                floor
              </RouterLink>
              first
            </h5>
          </div>
        </div>
      </div>
    </div>

    <div class="col-4 px-3 "
         v-if="selectedBusinessId && selectedBranchId && selectedFloorId && ( showAdd || editModel)">
      <div class="card">
        <div class="card-body">
          <CreateTable v-if="showAdd" :in-list="true"
                       @onSubmit="$refs.table.getTableData()"
                       :branch-id="selectedBranchId"
                       :business-id="selectedBusinessId"
                       :floor-id="selectedFloorId"/>
          <EditTable v-if="editModel" :in-list="true"
                     @onSubmit="$refs.table.getTableData()"
                     :model="editModel"
                     :branch-id="selectedBranchId"
                     :business-id="selectedBusinessId"
                     :floor-id="selectedFloorId"/>
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
import DataTable from '@/components/Dashboard/Common/DataTable.vue';
import CreateTable from "./Create.vue";
import EditTable from "./Edit.vue";
import {GetLocaleData} from "@/util/locales";
import {getTableData, deleteTable} from "@/API/TablesAPIs";

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
export default {
  name: "TablesList",
  mixins: [TableConfiguration],
  components: {
    EditTable,
    CreateTable,
    PPagination,
    DataTable
  },
  data() {
    return {
      selectedBusinessId: null,
      selectedBranchId: null,
      selectedFloorId: null,
      menuIdOptions: [],
      tableData: [],
      showAdd: false,
      editId: null,
      editModel: null
    }
  },
  async mounted() {
    this.selectedBusinessId = parseInt(this.$route.query.rid);
    this.selectedBranchId = parseInt(this.$route.query.bid);
    this.selectedFloorId = parseInt(this.$route.params.floorId);
  },
  computed: {
    selectedBranchData() {
      if (this.selectedBusinessId && this.$store?.state?.user?.business)
        return this.$store.state.user.business.filter(r => r.id === this.selectedBusinessId)[0]?.branches.filter(r => r.id === this.selectedBranchId)[0];
      return null;
    },
    selectedFloor() {
      if (this.selectedBusinessId && this.$store?.state?.user?.business)
        return this.$store.state.user.business.filter(r => r.id === this.selectedBusinessId)[0]
          ?.branches.filter(r => r.id === this.selectedBranchId)[0]
          ?.floors.filter(r => r.id === this.selectedFloorId)[0]
      return null;
    }
  },
  methods: {
    GetLocaleData,
    handleDelete(row) {
      this.$confirm().then(async (result) => {
        if (result['isConfirmed']) {
          let loader = this.$loading.show();
          deleteTable({
            'businessId': this.selectedBusinessId,
            'branchId': this.selectedBranchId,
            'floorId': this.selectedFloorId,
            'id': row.id
          })
            .then(() => {
              this.$notify({message: 'Deleted successfully', type: 'success'})
              this.$refs.table.getTableData();
            })
            .catch((error) => this.$error(error.message))
            .finally(() => loader.hide())
        }
      })
    },
    async getData({page}) {
      return getTableData({
        'businessId': this.selectedBusinessId,
        'branchId': this.selectedBranchId,
        'floorId': this.selectedFloorId,
        'per-page': this.pagination.perPage, page
      }).then(response => {
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
