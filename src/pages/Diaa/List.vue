<template>
  <div class="row cars-list">
    <div class="col-md-12">
      <div class="d-flex mb-2 justify-content-center">
        <b-form-select v-model="selectedBusinessId" @change="(e) => $refs.table.getTableData()" class="w-300">
          <b-form-select-option
            v-for="business in $store.state.user.business"
            :value="business.id" :key="business.id">{{ business.name }}
          </b-form-select-option>
        </b-form-select>
      </div>

    </div>
    <div class="col-md-12">
      <h4 class="title">Branches List <small class="text-muted ml-2">Browse all the system Branches.</small></h4>
      <p-button class="m-0 mx-2 pull-right btn-round btn-warning mt--45" type="text"
                v-b-tooltip="(showAdd || editModel) ? 'Close Add/Edit' : 'Start add' "
                @click="(showAdd || editModel) ? closeSideForm() : openSideForm()">
        <i :class="(showAdd || editModel) ? 'fas fa-minus' : 'fas fa-plus'"></i>
      </p-button>
    </div>
    <div :class="(showAdd || editModel )? 'col-md-8 card' :'card'">
      <div class="card-body row">
        <!-- New Table -->
        <div class="col-12" v-if="selectedBusinessId">
          <data-table :get-data="getData"
                      ref="table"
                      :per-page="pagination.perPage"
                      :columns="columns">

            <div slot="locales" slot-scope="{row}">
              {{ GetLocaleData(row.locales)['name'] }}
            </div>
            <div slot="business_id" slot-scope="{row}">
              {{ $store.state.user.business.filter(r => r.id === row.business_id)[0].name }}
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
          <CreateDiaa v-if="showAdd" :in-list="true" @onSubmit="$refs.table.getTableData()"
                        :business-id="selectedBusinessId"/>
          <EditDiaa v-if="editModel" :in-list="true" @onSubmit="$refs.table.getTableData()" :model="editModel"
                      :business-id="selectedBusinessId"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import {useTableConfiguration} from "./TableConfiguration";
import DataTable from '@/components/Dashboard/Common/DataTable';
import {deleteBranch, getBranchesList} from "@/API/BranchesAPIs";
import CreateDiaa from "./Create";
import EditDiaa from "./Edit";
import {GetLocaleData} from "@/util/locales";
import store from "@/store";

const { columns,pagination} = useTableConfiguration();
const selectedBusinessId = ref(null)
const showAdd = ref(false)
   const  editModel = ref(null)


  const updateTableData = () => {
  if (selectedBusinessId.value && $refs.table) {
    $refs.table.getTableData();
  }
};

onMounted(() =>{selectedBusinessId.value = store.state.user.business[0].id;})

const handleDelete = async (row) => {
  try {
    const confirmed = confirm("Are you sure you want to delete this branch?");
    if (confirmed) {
      await deleteBranch({ businessId: selectedBusinessId.value, id: row.id });
      alert("Branch deleted successfully!");
      updateTableData();
    }
  } catch (error) {
    console.error("Error deleting branch:", error);
    alert("Failed to delete branch.");
  }
};


const getData = async ({ page }) => {
  try {
    const response = await getBranchesList({
      businessId: selectedBusinessId.value,
      "per-page": pagination.perPage,
      page,
    });
    return { data: response.data, total: response.meta.total };
  } catch (error) {
    console.error("Error fetching branches:", error);
    return { data: [], total: 0 };
  }
};

    const handleEdit = (model)=> {
      showAdd.value = false;
      editModel.value = JSON.parse(JSON.stringify(model));
    }
    const closeSideForm = () => {
      showAdd.value = false;
      editModel.value = null;
    }
    const openSideForm = () => {
     showAdd.value = true;
    }
  

</script>
<style>
.el-table .td-actions button.btn {
  margin-right: 5px;
}
</style>
