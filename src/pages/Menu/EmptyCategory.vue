<template>
  <b-card class="empty-category">
    <b-card-title> Create a new category </b-card-title>
    <b-card no-body class="mt-1 mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <div class="category data-content align-items-end">
          <div class="image-holder overflow-hidden rounded">
            <div class="picture-container">
              <el-upload class="picture position-relative"
                         accept="image/jpeg,image/gif,image/png"
                         ref="uploadImg"
                         :headers="uploadingHeaders"
                         :action="uploadingUrl"
                         :on-success="uploadSuccess"
              >
                <img v-if="category.media[0]" :src="__asset(category.media[0].src, 200, 160)"
                     class="picture-src"  alt="Choose Picture"/>
                <img v-else src="@/assets/images/placeholder.jpeg" alt="Choose Picture">
                <label class="position-absolute mx-auto mt--20 w-100 text-center  cursor-pointer"
                :style="{left:0, bottom:0}"
                >Choose Picture</label>
              </el-upload>
            </div>
          </div>


          <div class="entity-data mx-1">
            <div class="form-group">
              <b-input name="title" v-model="__t(category.locales)['name']"
                       :placeholder="$t('enter-category-title')"/>
            </div>
            <div class="form-group">
              <b-textarea name="description" v-model="__t(category.locales)['description']"
                          :placeholder="$t('enter-category-description')"/>
            </div>
          </div>

          <div class="actions">

            <b-button block v-b-toggle="`accordion-${category.id}`" class="no-border mb-0" variant="outline-primary"
                      @click="submit">
              <i class="fa fa-check"></i>
              Submit
            </b-button>
          </div>

        </div>
      </b-card-header>

    </b-card>
  </b-card>

</template>


<script>
import {Upload} from "element-ui";
import {UPLOAD_URL} from "@/config/API";
import {commonHeaders} from "@/util/$http";
import {models} from "@/pages/Categories/form_fields";
import {submitAndNotify} from "@/helpers/utils";
import {createCategory} from "@/API/CategoriesAPIs";

export default {
  name: 'EmptyCategory',
  components: {
    [Upload.name]: Upload
  },
  props: [
    'businessId',
    'menuId'
  ],
  data() {
    return {
      category: JSON.parse(JSON.stringify(models)),
      uploadingHeaders: commonHeaders,
      uploadingUrl: UPLOAD_URL,
      emptyModel: null
    }
  },
  mounted() {
    this.emptyModel = JSON.stringify(models);
    this.resetModel();
  },
  computed: {},
  methods: {
    resetModel(){
      this.category = JSON.parse(this.emptyModel);
      this.category.business_id = this.businessId;
      this.category.menu_id = this.menuId;
      console.log("this.category ", this.category )
    },
    validate() {
      return this.$refs.form.validate().then(response => {
        this.$emit('on-validated', response, this.imageUrl)
        return response;
      })
    },
    refreshMenu() {
      this.$emit('refreshMenu')
    },
    uploadSuccess(uploaded) {
      this.category.media = [{id: null, src: uploaded.file}];
    },
    submit() {
      let callback = ()=> {
        this.resetModel();
        this.$emit('refreshMenu')
      };
      submitAndNotify(this, createCategory(this.category), callback.bind(this))
    }
  },
  watch: {

    menuId:{
      handler: function (value) {
        this.resetModel();
      }
    }
  }
};
</script>


<style scoped>
</style>
