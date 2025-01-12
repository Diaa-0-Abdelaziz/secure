<template>
  <div class="picture-container">
    <el-upload class="picture"
               :action="''"
               :on-change="upload"
               :auto-upload="false"
               :show-file-list="false">
      <img v-if="imageUrl" :src="imageUrl" class="picture-src img-thumbnail p-1" alt="Choose Image" width="220">
    </el-upload>
  </div>
</template>

<script>
import {Upload} from 'element-ui';
export default {
  name: "S3FileUpload",
  props:['fileData'],
  components:{
    [Upload.name]: Upload
  },
  data(){
    return {
      imageUrl:'/static/img/upload-icon.png?v=2',
      file:{
        location:''
      },
    }
  },
  mounted() {
    this.file = this.fileData ;
    if(this.file.location)
      this.imageUrl = this.file.location;
  },
  watch:{
    fileData(val){
      this.file = val;
    }
  },
  methods:{
    upload(file){
      this.imageUrl = '/static/img/loading.gif';
    }
  }
}
</script>

<style scoped>

</style>
