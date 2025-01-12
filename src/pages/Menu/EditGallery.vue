<template>
  <div class="edit-gallery-container">
    <b-button class="btn pull-end close-btn"
              variant="default-outline"  @click="$emit('close-gallery')" >X</b-button>


    <div class="edit-gallery">
      <div v-if="mediaList.length > 0" v-for="mediaObj in mediaList" class="mx-1">
        <b-card body-class="no-padding" class="border-0 shadow-sm mb-2" :key="mediaObj.id">
          <div class="item-actions">
            <b-button class="p-2 m-1 no-border" variant="outline-danger" @click="deleteImage(mediaObj.id)">
              <b-icon icon="trash-fill"  class="remove-item"></b-icon>
            </b-button>
          </div>
          <div class="image-holder center-image ">

            <el-upload id="el-upload"
                       class="picture position-relative"
                       accept="image/jpeg,image/gif,image/png"
                       ref="uploadImg"
                       :headers="uploadingHeaders"
                       :action="uploadingUrl"
                       :on-success="uploadSuccess"
            >
              <video width="320" height="240" controls v-if="mediaObj.type === 'video/mp4' ">
                <source :src="mediaObj.src" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <img v-else :src=" __asset(mediaObj.src, 200, 200)"  alt="Choose Picture "/>
              <label class="position-absolute text-center choose-pic cursor-pointer" >Choose
                Picture</label>
            </el-upload>

          </div>
        </b-card>



      </div>
      <div class="empty-picture mx-1" >

        <el-upload class="picture position-relative"
                   accept="image/jpeg,image/gif,image/png,video/mp4"
                   ref="uploadImg"
                   :headers="uploadingHeaders"
                   :action="uploadingUrl"
                   :on-success="uploadSuccess"
        >
          <img src="@/assets/images/placeholder.jpeg" alt="Choose Picture">
          <label class="d-block mx-auto  w-100 text-center  cursor-pointer">Add media</label>
        </el-upload>

      </div>

    </div>
  </div>
</template>

<script>
import {UPLOAD_URL} from "@/config/API";
import {commonHeaders} from "@/util/$http";
import item from "@/pages/Menu/Item.vue";
import {__asset, __assetFilledBlur} from "@/helpers/helpers";
import {getItemData, updateItem} from "@/API/ItemsAPIs";
import {deleteMedia} from "@/API/MediaAPIs";

export default {
  name: 'EditGallery',
  props: ['galleryItem'],
  data() {
    return {
      mediaList: [],
      selectedFiles: [],
      uploadingHeaders: commonHeaders,
      uploadingUrl: UPLOAD_URL,
    };
  },
  methods: {
    __assetBg: __assetFilledBlur,
    async uploadSuccess(uploaded) {
      // TODO :: select mimeType
      var type = uploaded.file.search(".mp4") !== -1 ? "video/mp4" : "image/jpeg";
      this.mediaList.push({id: null, src: uploaded.file , type: type });
      var item = await updateItem({id: this.galleryItem.id, media: this.mediaList, type});
      this.mediaList = item.media;
      this.refreshMenu();
    },
    refreshMenu(){
      if(this.mediaList.length <= 1){
        this.$emit('refreshMenu');
      }
    },
    async deleteImage(id) {
      await deleteMedia(id);
      await this.getItem();
      this.refreshMenu();
    },
    async getItem(){
      var item = await getItemData(this.galleryItem.id);
      this.mediaList = item.media;
    }
  },
  mounted() {
    if(this.galleryItem)
      this.mediaList = this.galleryItem.media;
  },
  watch: {
    galleryItem:{
      deep: true,
      handler(value) {
        this.mediaList = value.media;

      }
    }
  }
};
</script>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
}

.media-item {
  margin: 10px;
  text-align: center;
}

.media-item img {
  max-width: 150px;
  max-height: 150px;
}

.item-img {
  border-radius: 3px 3px 0 0 !important;
  height: 260px;
  object-fit: contain;
  width: 100%;
  @media all and (min-width: 576px) and (max-width: 769px) {
    height: 120px;
  }
}
.edit-gallery{
  display: flex;
  flex-wrap: wrap;
  &>div{
    flex-basis: 47%;
  }
}
.empty-picture{
  border: #ffffff 1px solid;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #f4f4f4;
  padding: 5px;
}
.edit-gallery-container{
  background: #f4f3ef;
  padding: 5px;
  border: #e3e3e3 1px solid;
  border-radius: 10px;
  border-top-right-radius: 0;
}
.close-btn{
  padding: 10px;
  position: absolute;
  right: 0;
  margin-right: -13px;
  top: -10px;
  background: #f4f3ef;
  color: #000;
  font-size: 1.1em;
  border: #e3e3e3 1px solid;
  border-radius: 0;
  border-left: 0;
}
</style>
