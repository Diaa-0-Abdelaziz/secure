<template>
  <!--  Select Menu   -->
  <div v-if="selectedBusinessId && userBusiness && (userBusiness.length > 1 || hasMultipleBranches )" class="select-branch-qr px-3 pull-end">

    <div :class="{'row':horizontal}">
      <div :class="{'col-md-6' : horizontal }" v-if="userBusiness.length > 1 ">
        <div  class="row bg-grey mb-1" >
          <label class="col-md-5 pt-1 label text-muted text-sm d-flex justify-content-end align-items-end"> Business:</label>
          <div class="col-md-7 px-1 ">
            <b-form-select class="form-control"
                           label-field="Branch"
                           v-if="userBusiness.length > 1"
                           v-model="selectedBusinessId"
                           @change="updatedBusinessId">
              <b-form-select-option
                v-for="business in userBusiness"
                :value="business.id" :key="business.id">{{ business.name }}
              </b-form-select-option>
            </b-form-select>
          </div>
        </div>
      </div>
      <div :class="{'col-md-6' : horizontal }"
           v-if="hasMultipleBranches">
        <div class="row bg-grey">
          <label class=" col-md-5 pt-1 label text-muted text-sm d-flex  justify-content-end  align-items-end">Branch:</label>
          <div class="col-md-7 px-1">
            <b-form-select class="form-control"
                           value-field="id" text-field="locales[0].name"
                           :options=" userBusiness.filter(r => r.id === selectedBusinessId)[0].branches"
                           v-model="selectedBranchId" @change="$emit('setBranchId', selectedBranchId)">
            </b-form-select>
          </div>
        </div>
      </div>

      </div>
    </div>


</template>
<script>
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";

export default {
  components: {LocaleSwitcher},
  // TODO:: default Values not working

  props: {
    defaultValues:{
      type: Object,
      default:  () => {}
    },
    horizontal:{
      type: Boolean,
      default:  true
    },
  },
  data() {
    return {
      selectedBusinessId: null,
      selectedBranchId: null
    }
  },
  computed: {
    userBusiness() {
      return this.$store.state.user.business;
    },
    hasMultipleBranches(){
      return this.userBusiness.filter(r => r.id === this.selectedBusinessId)[0].branches.length > 1;
    }
  },
  mounted() {
    if (this.defaultValues?.businessId) {
      this.selectedBusinessId = this.defaultValues.businessId;
      this.selectedBranchId = this.defaultValues.branchId;
    } else {
      this.selectedBusinessId = this.$store.state.user.business[0].id;
      this.updatedBusinessId();
      this.updatedBranchId();
    }
  },
  methods: {
    updatedBranchId() {
      this.$emit('setBranchId', this.selectedBranchId)
    },
    updatedBusinessId() {
      this.$emit('setBusinessId', this.selectedBusinessId)
      this.selectedBranchId = this.userBusiness.filter(r => r.id === this.selectedBusinessId)[0].branches[0].id
      this.$emit('setBranchId', this.selectedBranchId)
    },
  },
  watch: {
    defaultValues: {
      deep: true,
      handler(value) {
        this.selectedBusinessId = value.businessId;
        this.selectedBranchId = value.branchId;
      }
    }
  }

}
</script>

<style scoped>
.select-branch-qr {
  background: #eee;
  padding: 5px 20px 5px 0;
  border-radius: 10px;
}

</style>
