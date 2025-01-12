<template>
  <b-card no-body class="mt-1 mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <div class="category data-content">
        <div class="image-holder center-image rounded">
          <div class="picture-container">
            <el-upload class="picture position-relative"
                       accept="image/jpeg,image/gif,image/png"
                       ref="uploadImg"
                       :headers="uploadingHeaders"
                       :action="uploadingUrl"
                       :on-success="uploadSuccess"
            >
              <img v-if="category.media && category.media[0]" :src="__assetDimensioned(category.media[0].src, 200, ImagePreview.Squared, ImagePreview.Cropped)"
                   class="picture-src"
                   alt="Choose Picture"/>
              <img v-else src="@/assets/images/placeholder.jpeg" alt="Choose Picture">
              <label class="position-absolute mx-auto mt--20 w-100 text-center  cursor-pointer">Choose Picture</label>
            </el-upload>
          </div>
        </div>
        <div class="entity-data mx-1">
          <div class="form-group">
            <b-input name="title" v-model="__t(category.locales)['name']" @keyup="updateCategory(category)"
                     :placeholder="$t('category-title')"/>
          </div>
          <div class="form-group">
            <b-textarea name="description" v-model="__t(category.locales)['description']"
                        @change="updateCategory(category)"
                        placeholder="Category description"/>
          </div>
        </div>
        <div class="mx-1" style="width: 200px">
          <div class="form-group ps-1 ">
            <label class="fw-bold"> Images Fitting</label>
            <b-form-radio-group v-model="items_images_fitting" :value="ImagePreview.Cropped"
                                @change="setCategorySettings(category.id, CategorySettings.item_images_fitting , items_images_fitting)">
              <b-form-radio :value="ImagePreview.Cropped">
                <div class="mt-1"><i class="fa fa-square-o"></i> Cropped </div>
              </b-form-radio>
              <b-form-radio :value="ImagePreview.Filled">
                <div class="mt-1"><i class="fa fa-picture-o"></i> Filled </div>
              </b-form-radio>
            </b-form-radio-group>
          </div>
        </div>
        <div class="mx-1" style="width: 200px">
          <div class="form-group ps-1 ">
            <label class="fw-bold"> Images dimensions</label>
            <b-form-radio-group v-model="items_images_preview" :value="ImagePreview.Squared"
                                @change="setCategorySettings(category.id, CategorySettings.item_images_dimensions , items_images_preview)">
              <b-form-radio :value="ImagePreview.Squared">
                <div class="mt-1"><i class="fa fa-square-o"></i> Squared</div>
              </b-form-radio>
              <b-form-radio :value="ImagePreview.Landscape">
                <div class="mt-1"><i class="fa fa-picture-o"></i> Landscape</div>
              </b-form-radio>
              <b-form-radio :value="ImagePreview.Portrait">
                <div class="mt-1"><i class="fa fa-picture-o nc-icon rotate-90"></i> Portrait</div>
              </b-form-radio>
            </b-form-radio-group>
          </div>
        </div>
        <div class="actions">
          <b-button block variant="outline-danger"
                    class="mb-0 mt-0 border-dashed" type="button" @click="deleteCategory(category.id)">
            <b-icon-trash></b-icon-trash>
            Delete
          </b-button>

          <b-button block class="mb-0 mt-1" variant="outline-primary"
                    @click="updateCategory(category)">
            <i class="fa fa-check"></i>
            Update
          </b-button>

          <b-button block v-b-toggle="`accordion-${category.id}`" class="mb-0 mt-1" variant="outline-primary"
                    @click="toggled=!toggled">
            <b-icon-arrow-up v-if="!toggled"></b-icon-arrow-up>
            <b-icon-arrow-down v-else></b-icon-arrow-down>
            Collapse
          </b-button>

        </div>
      </div>
    </b-card-header>
    <b-collapse :id="`accordion-${category.id}`" visible role="tabpanel">
      <b-card-body class="pb-1 pt-1">
        <draggable :group="{ name: 'g1' }"
                   v-bind="dragOptions"
                   tag="div"
                   @start="drag = true"
                   @end="dragend"
                   :list="category.items"
                   class="d-flex flex-wrap">
          <transition-group tag="div" class="row w-100 " type="transition" name="flip-list">
            <!--- Items --->
            <b-col sm="6" md="6" :xl="galleryItem ? 4 : 3" :xxl="galleryItem ? 4:3" v-for="item in category.items"
                   v-bind:key="`item-${item.id}`"
                   class="d-inline-flex p-1">
              <Item :item="item" @refreshMenu="refreshMenu" @openGallery="openGallery"
                    :images_preview="items_images_preview"
                    :images_fitting="items_images_fitting"
                    :gallery-item="galleryItem"></Item>
            </b-col>
            <!--- Add Item --->
            <b-col sm="6" md="6" :xl="galleryItem ? 4 : 3" :xxl="galleryItem ? 4:3" class="add-item-wrapper"
                   :class="{'with-items': category.items && category.items.length}" :key="`item-add`">
              <b-button variant="outline-primary add-item" class="m-0"
                        @click="addItem({category_id:category.id})" size="large" block>
                <i class="fa fa-plus"></i>
                Add Item
              </b-button>
              <b-button variant="outline-primary add-item" class="m-0"
                        @click="addSubCategory({parent_id:category.id})" size="large" block>
                <i class="fa fa-plus"></i>
                Add SubCategory
              </b-button>
            </b-col>
          </transition-group>
        </draggable>

        <Category v-for="subCategory in category.children_nested" :category="subCategory" @refreshMenu="refreshMenu"
                  :gallery-item="galleryItem"
                  @openGallery="openGallery"
                  :business-id="businessId"
                  v-bind:key="`subcategory-${subCategory.id}`"></Category>
      </b-card-body>
    </b-collapse>
  </b-card>

</template>


<script>
import Item from '@/pages/Menu/Item';
import {createCategory, deleteCategory, setCategorySetting, updateCategory} from "@/API/CategoriesAPIs";
import draggable from "vuedraggable";
import {createItem, sortItems} from "@/API/ItemsAPIs";
import * as _ from 'lodash';
import {__localesModel} from "@/util/locales";
import {Upload} from "element-ui";
import {UPLOAD_URL} from "@/config/API";
import {commonHeaders} from "@/util/$http";
import {__asset, __assetDimensioned, __assetFilledBlur} from "@/helpers/helpers";
import {CategorySettings} from "@/config/Constants";
import {ImagePreview} from "@/config/AppConfig";

export default {
  name: 'Category',
  components: {
    Item, draggable,
    [Upload.name]: Upload
  },
  props: {
    imageUrl: null,
    category: null,
    enableSorting: true,
    businessId: null,
    galleryItem: null,
  },
  data() {
    return {
      drag: false,
      toggled: false,
      sorting: false,
      uploadingHeaders: commonHeaders,
      uploadingUrl: UPLOAD_URL,
      items_images_preview: ImagePreview.Squared,
      items_images_fitting: ImagePreview.Cropped,
      CategorySettings: CategorySettings,
      ImagePreview: ImagePreview,
      helo:"henn"
    }
  },
  mounted() {
    this.items_images_preview = this.category.settings?.filter((item) => item.key === CategorySettings.item_images_dimensions )[0]?.data ?? ImagePreview.Squared ;
    this.items_images_fitting = this.category.settings?.filter((item) => item.key === CategorySettings.item_images_fitting )[0]?.data ?? ImagePreview.Cropped ;
  },
  computed: {
    categoryItemsIdsComputed() {
      return this.categoryItemsIds(this.category);
    },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
  },
  methods: {
    __assetDimensioned,
    __assetFilledBlur,
    handlePreview(file) {
      this.imageUrl.imageUrl = URL.createObjectURL(file.raw);
    },
    validate() {
      return this.$refs.form.validate().then(res => {
        this.$emit('on-validated', res, this.imageUrl)
        return res
      })
    },
    updateCategory: _.debounce(function (category) {
      updateCategory(category)
    }, 500),
    async deleteCategory(id) {
      try {
        await deleteCategory(id);
        this.$emit('refreshMenu')
        this.$notify({title: "Deleted successfully"});
      } catch (e) {
        this.$notify({title: "Error occurred", type: "danger"});
        console.error(e)
      }
    },
    refreshMenu() {
      this.$emit('refreshMenu')
    },
    categoryItemsIds(category) {
      let itemsSort = [];
      category.items?.map(item => itemsSort.push(item.id));
      return itemsSort;
    },
    async dragend() {
      this.drag = false;
      if (this.enableSorting && !this.sorting) {
        this.sorting = true;
        let itemsSort = this.categoryItemsIds(this.category);
        await sortItems({'sortedIds': itemsSort, 'categoryId': this.category.id});
      }
    },
    async addItem(data) {
      let locales = __localesModel;
      let sort = this.category.items?.length + 1
      await createItem({...data, locales, sort});
      this.$emit('refreshMenu')
    },
    async addSubCategory(data) {
      let locales = __localesModel;
      let sort = this.category.children_nested?.length + 1
      let business_id = this.businessId;
      await createCategory({...data, locales, sort, business_id});
      this.$emit('refreshMenu')
    },
    uploadSuccess(uploaded) {
      this.category.media = [{id: null, src: uploaded.file}];
      this.updateCategory(this.category);
    },
    openGallery(item) {
      this.$emit('openGallery', item);
    },
    async setCategorySettings(categoryId, key, value) {
      await setCategorySetting(categoryId, [{key,  data: value}]);
    }

  },
  watch: {
    categoryItemsIdsComputed: {
      deep: true,
      handler: function (newIds, oldIds) {
        if (newIds !== oldIds)
          this.dragend();
      }
    },
  }
};
</script>


<style scoped>
</style>
