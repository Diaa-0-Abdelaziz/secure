<template>
  <div class="qr-wrapper">
    <div class="row m-0">
      <div class="col-6 m-0 p-0">

        <drop-down icon="nc-icon nc-bell-55" tag="li"
                   position="right"
                   direction="none"
                   class="nav-item dropdown">
          <a slot="title"
             slot-scope="{isOpen}"
             class="nav-link dropdown-toggle"
             data-toggle="dropdown"
             aria-haspopup="true"
             :aria-expanded="isOpen">
            <i class="nc-icon nc-layout-11"></i>
            <p>
              Menu Qr
              <span class="d-lg-none d-md-block"></span>
            </p>
          </a>

          <div class="p-3" style="width: 250px">
            <SelectBranch @setBranchId="setBranchId" @setBusinessId="setBusinessId" :horizontal="false" />
            <div class="p-1 mt-2">
              <img :src="menuQR" class="border-1" alt="">
            </div>
          </div>
        </drop-down>


      </div>
      <div class="col-6  m-0 p-0">

        <drop-down icon="nc-icon nc-bell-55" tag="li"
                   position="right"
                   direction="none"
                   class="nav-item dropdown">
          <a slot="title"
             slot-scope="{isOpen}"
             class="nav-link dropdown-toggle"
             data-toggle="dropdown"
             aria-haspopup="true"
             :aria-expanded="isOpen">
            <i class="nc-icon nc-layout-11"></i>
            <p>
              Login QR
              <span class="d-lg-none d-md-block"></span>
            </p>
          </a>

          <div class="p-3" style="width: 250px">
            <SelectBranch @setBranchId="setBranchId" @setBusinessId="setBusinessId" :horizontal="false"/>
            <div class="p-1 mt-2">
              <img :src="loginQrDataSrc" class="border-1" alt="">
            </div>
          </div>

        </drop-down>

      </div>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import {createLoginQr, getBranchPreviewQr} from "@/API/BranchesAPIs";
import SelectMenu from "@/components/Common/SelectMenu.vue";
import SelectBranch from "@/components/Common/SelectBranch.vue";

export default Vue.extend({
  name: "QRHeader",
  components: {SelectBranch, SelectMenu},
  data() {
    return {
      menuQR: null,
      loginQrDataSrc: null,
      selectedBusinessId: null,
      selectedBranchId: null
    }
  },
  methods: {
    async setBranchId(menuId) {
      this.selectedBranchId = menuId;
      this.loading = false;
    },
    async setBusinessId(businessId) {
      this.selectedBusinessId = businessId;
      this.loading = false;
    },
    async generateQrs() {
      this.menuQR = await getBranchPreviewQr({businessId: this.selectedBusinessId, id: this.selectedBranchId})
      this.loginQrDataSrc = await createLoginQr({businessId: this.selectedBusinessId, id: this.selectedBranchId})
    }
  },
  async mounted() {
    setTimeout(async ()=> {
      if (!this.selectedBranchId) {
        await this.generateQrs();
      }
    }, 5000)
  },
  watch:{
    selectedBranchId(oldVal, newVal){
      if(oldVal !== newVal)
        this.generateQrs()
    }
  }
})
</script>
<style scoped>

</style>
