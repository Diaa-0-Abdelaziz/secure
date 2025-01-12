<!-- TODO ::  If Empty Menu  -->
<template>
  <b-container :style="{position: 'relative'}">

    <!-- Select Menu -->
    <SelectMenu @setMenuId="setMenuId" @setBusinessId="setBusinessId"/>

    <!-- Smart Uploader -->
    <div>
      <div class="w-100 clearfix" :class="{'mb-3': !dzOpened}">
        <b-button @click="dzOpened = !dzOpened"
                  :variant=" dzOpened ? 'outline-primary':'primary' "
                  :style="{border : '0 !important',
                         borderRadius: '10px' ,
                         borderBottomLeftRadius: dzOpened ? '0' : '10px',
                         borderBottomRightRadius: dzOpened ? '0' : '10px'}"
                  class="shadow border-0 pull-end  m-0 ml-auto py-3"
                  :class="{'bg-white' : dzOpened  }">
          <i class="fa fa-magic mx-2"></i>
          Smart Uploader
        </b-button>
      </div>

      <b-card class=" brt-0 mb-3 " v-if="dzOpened">
        <b-card-body class="p-2 m-0">
          <vue2-dropzone ref="myVueDropzone" id="dropzone" class="p-0 m-0"
                         v-on:vdropzone-success="uploadSuccess"
                         v-on:vdropzone-sending="sending"
                         v-on:vdropzone-file-added="filesAdded"
                         v-on:vdropzone-queue-complete="completeQueue"
                         v-on:vdropzone-error="uploadError"
                         v-on:vdropzone-removed-file="fileRemoved"
                         :options="dropzoneOptions"></vue2-dropzone>
        </b-card-body>
      </b-card>
    </div>

    <b-row>
      <b-col :sm="galleryItem ? 6 : 12" :md="galleryItem ? 8:12">

        <!--  Menu Items  -->
        <div class="business-menu mt-2">

          <div class="accordion" role="tablist">
            <nested-draggable
              v-if="menu && menu.categories"
              :menu-categories="menu.categories"
              :enable-sorting="enableSorting"
              :menu-id="selectedMenuId"
              :business-id="selectedBusinessId"
              @get-menu="getMenu"
              :gallery-item="galleryItem"
              @openGallery="openGallery"
            />
          </div>
        </div>

      </b-col>
      <b-col sm="6" md="4" lg="3" v-if="galleryItem">
        <edit-gallery :gallery-item="galleryItem" @close-gallery="galleryItem = null;"  @refreshMenu="getMenu" />
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import {UPLOAD_URL, MENU_URL} from '@/config/API';
import {MAX_UPLOAD_FILE_SIZE} from '@/config/AppConfig';
import $http from '@/util/$http';
import MenuAPI from '@/API/MenuAPI';
import {commonHeaders} from "@/util/$http";
import {cloneObj} from "@/util/helpers";
import * as _ from "lodash";
import Item from '@/pages/Menu/Item';
import draggable from 'vuedraggable'
import nestedDraggable from "./nested";
import {initial} from "lodash";
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
import './Menu.scss.css';
import SelectMenu from "@/components/Common/SelectMenu.vue";
import EditGallery from "@/pages/Menu/EditGallery.vue";

export default {
  name: 'Menu',
  components: {
    EditGallery,
    SelectMenu,
    LocaleSwitcher,
    Item,
    vue2Dropzone,
    draggable,
    nestedDraggable
  },
  data() {
    const acceptedFiles = 'image/*, video/mp4';
    return {
      dzOpened: false,
      selectedBusinessId: null,
      selectedMenuId: null,
      menuIdOptions: [],
      menu: [],
      enableSorting: true,
      loading: false,
      // TODO:: Resize images before uploading
      dropzoneOptions: {
        url: UPLOAD_URL,
        parallelUploads: 1,
        maxFilesize: MAX_UPLOAD_FILE_SIZE,
        acceptedFiles,
        thumbnailWidth: 150,
        thumbnailHeight: 160,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload text-primary'></i> UPLOAD IMAGES HERE",
        headers: {...commonHeaders, 'convert-item': true}
      },
      mediaFiles: [],
      galleryItem: null
    };
  },
  mounted() {
    // if(this.selectedBusinessId){
    //   this.getMenu();
    //   this.setMenuId();
    // }
  },
  computed: {
    locale() {
      return this.$store.state.locale;
    },
  },
  methods: {
    initial,
    async filesAdded(files) {
      this.enableSorting = false;
    },
    completeQueue() {
      setTimeout(() => {
        this.enableSorting = true;
        this.getMenu();
      }, 100)
    },
    async sendPost() {
      $http.post(MENU_URL, {})
        .then(() => console.log('SUCCESS!!'))
        .catch(() => console.log('FAILURE!!'));
    },
    async setMenuId(menuId) {
      this.selectedMenuId = menuId;
      await this.getMenu();
    },
    async setBusinessId(businessId) {
      this.selectedBusinessId = businessId;
    },
    async getMenu() {
      if (!this.loading && this.selectedMenuId && this.enableSorting) {
        this.loading = true;
        this.menu = await MenuAPI.getMenu(this.selectedMenuId);
        // if(this.menu.categories.length > 0)
        //   this.dzOpened = false;
        this.loading = false;
      }
    },
    uploadSuccess(file) {
      let uploadedLink = this.getFileSrc(file);
      this.mediaFiles.push({id: null, src: uploadedLink});
      this.$emit('input', this.mediaFiles);
      this.getMenu();
      this.$refs.myVueDropzone.removeFile(file);
      this.$notify({title: 'Item ' + file.name + ' added successfully', duration: 2000})
    },
    getFileSrc(file) {
      return JSON.parse(file.xhr.response).file ?? false;
    },
    uploadError() {
      console.log('An Error Occurred');
    },
    addMedia(m) {
      this.mediaFiles.push({id: m.id, src: m.src})
    },
    fileRemoved(file) {
      let mediaFiles = cloneObj(this.mediaFiles)
      if (file.xhr) {
        let uploadedLink = this.getFileSrc(file);
        _.remove(mediaFiles, (media) => media.src === uploadedLink)
      } else {
        _.remove(mediaFiles, (media) => media.id === file.name)
      }
      this.mediaFiles = mediaFiles;
      this.$emit('input', this.mediaFiles);
    },
    sending(file, xhr, formData) {
      xhr.setRequestHeader('menu-id', this.selectedMenuId)
      xhr.setRequestHeader('full-path', file.fullPath ?? file.name)
    },
    openGallery(item){
      if(this.galleryItem && item === this.galleryItem)
        return this.galleryItem = null;
      this.galleryItem = item
    }

  },
};

</script>
