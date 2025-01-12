<template>
  <draggable class="" tag="div" :draggable="false"
             :group="{ name: 'group-mc'}"
             @start="drag = true"
             :list="menuCategories">
      <div v-for="data in menuCategories" :key="data.id">
        <Category :category="data" @refreshMenu="$emit('get-menu')"
                  :business-id="businessId"
                  :galleryItem="galleryItem"
                  @openGallery="openGallery"
                  v-bind:key="`category-${data.id}`"></Category>
      </div>

      <EmptyCategory
        :business-id="businessId"
        :menu-id="menuId"
        @refreshMenu="$emit('get-menu')"/>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import Category from "@/pages/Menu/Category";
import EmptyCategory from "@/pages/Menu/EmptyCategory.vue";
import Item from "@/pages/Menu/Item.vue";

export default {
  props: ['menuCategories', 'enableSorting', 'menuId', 'businessId' ,'galleryItem'],
  components: {
    Item,
    EmptyCategory,
    Category,
    draggable,
  },
  name: "nested-draggable",
  methods: {
    openGallery(item){
      this.$emit('openGallery', item);
    }
  }
};
</script>
<style scoped>
</style>
