<template>
  <div class="locale-switcher">
    <b-form-select v-model="$i18n.locale"  class=" form-control  mx-1">
      <option value="en">English</option>
      <option value="ar">Arabic</option>
    </b-form-select>
  </div>
</template>

<script>
export default {
  name: 'LocaleSwitcher',
};
</script>

<style scoped>

</style>
