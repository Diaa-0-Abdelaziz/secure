<template>
  <!--  Select Menu   -->
  <b-card v-if="selectedBusinessId"
          :style="{ width: 'calc(100% - 280px)', position: 'absolute', marginTop: '-2px' }">
    <div class="row align-center  mb-1">
      <div class="d-flex col-sm-5 col-md-6   "
           v-if="userBusiness.length > 1 ">
        <div class="d-flex align-items-center bg-red ">
          <b-card-sub-title class="mx-2 mt-1">
            Business
          </b-card-sub-title>
        </div>
        <b-form-select class=" form-control mx-1"
                       v-if="userBusiness.length > 1"
                       v-model="selectedBusinessId"
                       @change="setMenuId">
          <b-form-select-option
            v-for="business in userBusiness"
            :value="business.id" :key="business.id">{{ business.name }}
          </b-form-select-option>
        </b-form-select>
      </div>
      <div class="d-flex col-sm-5 col-md-6 "
           v-if="userBusiness.filter(r => r.id === selectedBusinessId)[0].menus.length > 1">
        <div class="d-flex ml-4 align-items-center bg-red ">
          <b-card-sub-title class="mx-2  mt-1">
            Menu
          </b-card-sub-title>
        </div>
        <b-form-select class=" form-control  mx-1"
                       v-if=" selectedBusinessId !== null "
                       value-field="id" text-field="locales[0].name"
                       :options=" userBusiness.filter(r => r.id === selectedBusinessId)[0].menus"
                       v-model="selectedMenuId" @change="$emit('setMenuId', selectedMenuId)">
        </b-form-select>
      </div>
      <div class="d-flex col-sm-5 col-md-6  ">
        <div class="d-flex ml-4 align-items-center bg-red ">
          <b-card-sub-title class="mx-2  mt-1">
            Language
          </b-card-sub-title>
        </div>
        <LocaleSwitcher/>
      </div>
    </div>
  </b-card>

</template>
<script>
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";

export default {
  components: {LocaleSwitcher},
  data() {
    return {
      selectedBusinessId: null,
      selectedMenuId: null
    }
  },
  computed: {
    userBusiness() {
      return this.$store.state.user.business;
    }
  },
  mounted() {
    this.selectedBusinessId = this.$store.state.user.business[0].id;
    this.$emit('setBusinessId', this.selectedBusinessId)
    this.setMenuId();
  },
  methods: {
    setMenuId() {
      this.selectedMenuId = this.userBusiness.filter(r => r.id === this.selectedBusinessId)[0].menus[0].id
      this.$emit('setMenuId', this.selectedMenuId)
    },
    setBusinessId() {
      this.selectedMenuId = this.userBusiness.filter(r => r.id === this.selectedBusinessId)[0].menus[0].id
      this.$emit('setBusinessId', this.selectedBusinessId)
    },
  }

}
</script>

<style scoped>

</style>
