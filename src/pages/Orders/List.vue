<template>
  <div class="row cars-list">
    <div class="col-md-12">
      <h4 class="title">Orders List <small class="text-muted ml-2">Browse all the system Orders.</small></h4>
      <p-button v-if="editModel"
                class="m-0 mx-2 pull-right btn-round btn-warning mt--45" type="text"
                v-b-tooltip="(editModel) ? 'Close Edit' : 'Start add' "
                @click="(editModel) ? closeSideForm() : openSideForm()">
        <i :class="(editModel) ? 'fas fa-minus' : 'fas fa-plus'"></i>
      </p-button>

    </div>
    <div :class="(showAdd || editModel )? 'col-md-8 card' :'card'">
      <div class="card-body row">
        <!-- New Table -->
        <div class="col-12">

          <!--          :row-class-name="row.status"-->
          <data-table :get-data="getData"
                      ref="table"
                      :per-page="pagination.perPage"
                      :columns="columns">
            <div slot="header-buttons">
              <SelectBranch @setBusinessId="setBusinessId" @setBranchId="setBranchId" :defaultValues="defaultValues"/>
            </div>
            <div slot="id" slot-scope="{row}">
              {{ row.id }}
            </div>

            <div slot="order_note" slot-scope="{row}">
              {{ row.note }}

              <div v-for="ol in row.locales">
                {{ ol.name }} <br>
                {{ ol.description }}
              </div>
            </div>

            <div slot="order_lines" slot-scope="{row}">
              <div v-for="ol in row.orderlines">
                {{ ol.data.item.locales[0].name }} <br>
                <span class="text-warning text-sm">{{ ol.data.note }} </span>

                <div v-for="addon in ol.data.addons">
                  {{ addon.locales[0].name }} <br>
                </div>
              </div>
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
          <EditOrder v-if="editModel" :in-list="true"
                     :branch-id="selectedBranchId" :business-id="selectedBusinessId"
                     @onSubmit="$refs.table.getTableData()" :model="editModel"/>
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
import {deleteOrder, getBusinessOrdersList} from "@/API/OrdersAPIs";
import CreateOrder from "./Create";
import EditOrder from "./Edit";
import Pusher from "pusher-js";
import {getAccessToken} from "@/util/authentication";
import {PUSHER_KEY, BASE_URL, ENABLE_WS} from "@/config/config";
import SelectBranch from "@/components/Common/SelectBranch.vue";

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)


Vue.prototype.$pusher = new Pusher(PUSHER_KEY, {
  cluster: 'ap2',
  authEndpoint: BASE_URL + "/api/pusher/auth",
  auth: {
    headers: {
      "Authorization": "Bearer " + getAccessToken(),
      "Access-Control-Allow-Origin": "*"
    },
  },

});

export default {
  name: "OrdersList",
  mixins: [TableConfiguration],
  components: {
    SelectBranch,
    EditOrder,
    CreateOrder,
    PPagination,
    DataTable
  },
  data() {
    return {
      selectedBusinessId: null,
      selectedBranchId: null,
      defaultValues: {},
      tableData: [],
      showAdd: false,
      editId: null,
      editModel: null
    }
  },
  mounted() {
    setTimeout(() => this.connectSocket(), 1000)
    this.defaultValues = {
      defaultBusinessId: this.selectedBusinessId,
      defaultBranchId: this.selectedBranchId
    }
  },
  methods: {
    async changeBusiness() {
      this.$refs.table.getTableData()
      // this.connectSocket();
    },
    connectSocket() {
      if (ENABLE_WS === 'true' && this.selectedBranchId) {
        let channelName = "private-business-" + this.selectedBusinessId + "-branch-" + this.selectedBranchId + "-orders"
        var channel = this.$pusher.subscribe(channelName);
        channel.bind("new-order", (response) => {
          if (this.$refs.table)
            this.$refs.table.tableData.unshift(response.order);
        });
        channel.bind("update-order", (response) => {
          var objIndex = this.$refs.table.tableData.findIndex(obj => obj.id === response.order.id);
          this.$refs.table.tableData[objIndex] = response.order;
          var newData = this.$refs.table.tableData;
          this.$refs.table.tableData = [];
          this.$refs.table.tableData = JSON.parse(JSON.stringify(newData));
        });
      }
    },
    handleDelete(row) {
      this.$confirm().then(async (result) => {
        if (result['isConfirmed']) {
          let loader = this.$loading.show();
          deleteOrder(row.id)
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
      if(this.selectedBranchId){
        return getBusinessOrdersList({
          businessId: this.selectedBusinessId,
          branchId: this.selectedBranchId,
          'per-page': this.pagination.perPage,
          page
        })
          .then(response => {
            return {data: response.data, total: response['meta']['total']};
          });
      }
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
    fetchTableData() {
      if (this.$refs.table)
        this.$refs.table.getTableData({
          page: this.page
        });
    },
    async setBranchId(bid) {
      this.selectedBranchId = bid;
      this.fetchTableData();
    },
    async setBusinessId(businessId) {
      this.selectedBusinessId = businessId;
    }
  }
}
</script>
<style>
.el-table .td-actions button.btn {
  margin-right: 5px;
}
</style>
