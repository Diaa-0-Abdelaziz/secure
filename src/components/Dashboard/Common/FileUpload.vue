<template>
  <div class="picture-container">
    <vue-dropzone ref="myVueDropzone" id="dropzone" class=""
                  v-on:vdropzone-success="uploadSuccess"
                  :vdropzone-error="uploadError"
                  v-on:vdropzone-removed-file="fileRemoved"
                  :options="dropzoneOptions"></vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import {UPLOAD_URL} from '@/config/API';
import {MAX_UPLOAD_FILE_SIZE} from '@/config/AppConfig';
import Category from '@/pages/Menu/Category';
import * as _ from 'lodash';
import {cloneObj} from "@/util/helpers";
import {commonHeaders} from "@/util/$http";
import {deleteMedia} from "@/API/MediaAPIs";

export default {
  name: "FileUpload",
  components: {
    Category,
    vueDropzone: vue2Dropzone,
  },
  props: ['value', 'multiple', 'field'],
  data() {
    return {
      count: 0,
      menu: [],
      loading: false,
      is_destroying: false,
      dropzoneOptions: {
        url: UPLOAD_URL,
        parallelUploads: 1,
        // thumbnailWidth: 150,
        maxFilesize: MAX_UPLOAD_FILE_SIZE,
        acceptedFiles : 'image/*',
        thumbnailHeight: 138,
        addRemoveLinks: true,
        headers: commonHeaders,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i> " + (this.field?.placeholder ?? "DROP YOUR IMAGES HERE"),
        // dictRemoveFileConfirmation: 'Are you sure you want to remove this file?',
        destroyDropzone: false,
      },
      mediaFiles: []
    };
  },
  computed: {
    locale() {
      return this.$store.state.locale;
    },
  },
  methods: {
    uploadSuccess(file) {
      var src = encodeURI(this.getFileSrc(file));
      this.addMedia({id: null, src: src})
    },
    getFileSrc(file) {
      return JSON.parse(file.xhr.response).file ?? false;
    },
    uploadError(error) {
      console.log('An Error Occurred', error);
    },
    addMedia(m) {
      this.mediaFiles.push({id: m.id, src: m.src})
      this.manuallyAddImage(m.src)
      this.$emit('input', this.mediaFiles);
    },
    async fileRemoved(file) {
      setTimeout(async ()=> {
        if (this.is_destroying) {
          let mediaFiles = cloneObj(this.mediaFiles)
          if (file.xhr) {
            let uploadedLink = this.getFileSrc(file);
            _.remove(mediaFiles, (media) => media.src === uploadedLink)
          } else {
            let media = mediaFiles.filter((media) => media.src === file.name)[0];
            if (media) {
              let confirm = await this.deleteMedia(media);
              if (confirm){
                _.remove(mediaFiles, (media) => media.src === file.name)
                this.$emit('updated');
              }
              else
                this.addMedia(media)
            }
          }
          this.mediaFiles = mediaFiles;
          this.$emit('input', this.mediaFiles);
          this.is_destroying = false;
        }
      } , 100);
    },
    async manuallyAddImage(imageUrl) {
      const options = {size: 123, name: imageUrl, type: "image/png"};
      this.$refs.myVueDropzone.manuallyAddFile(options, imageUrl);
    },
    async deleteMedia(media) {
      var result = await this.$confirm("Are you sure you want to delete this image permanently ?")
      if (result['isConfirmed']) {
        let loader = this.$loading.show();
        if(media.id)
          await deleteMedia(media.id)
        this.$notify({message: 'Deleted successfully', type: 'success'})
        loader.hide()
        return true;
      }
      return false;

    },
    listenDestroying(){
      const buttons = document.querySelectorAll(".dz-remove");
      buttons.forEach(button => {
        button.addEventListener("click", () =>{
          this.is_destroying = true;
        });
      });
    }
  },
  mounted(){
    this.listenDestroying();
  },
  watch: {
    value: {
      deep: true,
      handler(media, mediaOld) {
        if(!media)
          return;
        if (JSON.stringify(media) === JSON.stringify(mediaOld))
          return;
        this.count++ ;
        // to stop deadlock
        if(this.count < 1000){
          this.mediaFiles = [];
          this.$refs.myVueDropzone.removeAllFiles();
          media.map((m) => this.addMedia(m))
          this.listenDestroying();
        }else {
          console.error("dead lock fileUpload")
        }
      }
    },

  }
};

</script>
