<template>
  <div class="row">

    <div class="col-md-6">
      <register-form></register-form>
    </div>

    <div class="col-md-12">
      <type-validation-form></type-validation-form>
    </div>
  </div>
</template>
<script>
  import RegisterForm from './ValidationForms/RegisterForm.vue'
  import TypeValidationForm from './ValidationForms/TypeValidationForm.vue'

  export default {
    components: {
      RegisterForm,
      TypeValidationForm
    }
  }
</script>
<style>
</style>
