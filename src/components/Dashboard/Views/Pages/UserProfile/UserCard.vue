<template>

  <drop-down icon="nc-icon nc-settings-gear-65" tag="li"
             position="right"
             direction="none"
             class="nav-item btn-rotate">
    <a slot="title"
       slot-scope="{isSettingsOpen}"
       class="nav-link cursor-pointer"
       data-toggle="dropdown"
       aria-haspopup="true"
       :aria-expanded="isSettingsOpen">
      <i class="nc-icon nc-settings-gear-65"></i> Settings
    </a>
    <div class="card card-user mb-0">
      <div class="card-body " style="min-width: 200px; z-index: 999999">
        <div class="author">
          <img v-if="$store.state.user.media[0]" :src="__asset($store.state.user.media[0].src , 200, 160)" alt="">
          <img v-else class="avatar border-gray" src="/static/img/faces/face-0.jpg" alt="...">
          <h3 class="title mb-0 p-0" :style="{fontSize: '14px'}">{{ $store.state.user.name }}</h3>
          <h5 class="mt-2" style="font-size: 12px">{{ $store.state.user.email }}</h5>
          <SelectBranch @setBranchId="setBranchId" @setBusinessId="setBusinessId" :horizontal="false"/>
          <div class="list-group" v-if="selectedBranchId">
            <a target="_blank" :href="QR_URL" class="list-group-item list-group-item-action">QR App</a>
            <a target="_blank" :href="Orders_URL" class="list-group-item list-group-item-action">Orders App</a>
            <a target="_blank" :href="Tablet_URL" class="list-group-item list-group-item-action">Tablet App</a>
            <a class="list-group-item list-group-item-action btn-danger logout w-100" href="#"
               @click="logout">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </drop-down>
</template>
<script>
import {logoutUser} from "@/API/UsersAPIs";
import {ORDERS_URL, QR_URL, TABLET_URL} from "@/config/config";
import SelectBranch from "@/components/Common/SelectBranch.vue";

export default {
  components: {SelectBranch},
  data(){
    return {
      selectedBranchId:null,
      selectedBusinessId: null
    }
  },
  mounted() {

  },
  computed:{
    QR_URL() {
      var branchSlug = this.$store.state.user.business.filter((ob) => ob.id === this.selectedBusinessId)[0].branches.filter((ob) => ob.id === this.selectedBranchId)[0].slug;
      return QR_URL + '/' + branchSlug;
    },
    Orders_URL(){
      return ORDERS_URL;
    },
    Tablet_URL(){
      return TABLET_URL;
    }

  },
  methods: {

    async logout() {
      await logoutUser();
      this.$router.push({name: 'Login'})
    },
    async setBranchId(menuId) {
      this.selectedBranchId = menuId;
      this.loading = false;
    },
    async setBusinessId(businessId) {
      this.selectedBusinessId = businessId;
      this.loading = false;
    },
  }

}

</script>
<style>
.logout {
  background-color: #eda825 !important;
  color: #fff !important;
}

</style>
