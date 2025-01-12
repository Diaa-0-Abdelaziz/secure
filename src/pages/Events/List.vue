<template>
  <div class="row cars-list">
    <div class="col-md-12">
      <h4 class="title">Events List <small class="text-muted ml-2">Browse all the system Events.</small></h4>
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

            <div slot="locales" slot-scope="{row}">
              {{ GetLocaleData(row.locales)['name'] }}
            </div>

            <div slot="start" slot-scope="{row}">
              {{ row.start | moment("DD-MM-YYYY hh:mm A") }}
            </div>

            <div slot="end" slot-scope="{row}">
              {{ row.end | moment("DD-MM-YYYY hh:mm A") }}
            </div>

            <div slot="created_at" slot-scope="{row}">
              {{ row.created_at | moment("DD-MM-YYYY hh:mm A") }}
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
  </div>
</template>
<script>
import Vue from 'vue'
import {Table, TableColumn, Select, Option} from 'element-ui'
import PPagination from '@/components/UIComponents/Pagination.vue'
import {TableConfiguration} from "./TableConfiguration";
import DataTable from '@/components/Dashboard/Common/DataTable';
import {deleteEvent, getEventsList} from "@/API/EventsAPIs";
import CreateEvent from "./Create";
import EditEvent from "./Edit";

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
export default {
  name: "EventsList",
  mixins: [TableConfiguration],
  components: {
    PPagination,
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
          deleteEvent(row.id)
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
      return getEventsList({'per-page': this.pagination.perPage, page})
        .then(response => {
          return {data: response.data, total: response['meta']['total']};
        });
    },
    handleEdit(model) {
      this.$router.push({name:'Edit Event',params:{id:model.id}});
      // this.showAdd = false;
      // this.editModel = JSON.parse(JSON.stringify(model));
    },
    closeSideForm() {
      this.showAdd = false;
      this.editModel = null;
    },
    openSideForm() {
      this.$router.push({name:'Add Event'})
      // this.showAdd = true;
    }
  }
}
</script>
<style>
.el-table .td-actions button.btn {
    margin-right: 5px;
}
</style>
