<template>
  <div class="item">
    <b-card body-class="no-padding" class="border-0 shadow-sm mb-0">
      <div class="item-actions">
        <b-button class="m-1 p-2 no-border" variant="outline-warning" @click="openGallery(item)">
          <b-icon icon="images" variant="primary" class=""></b-icon>
        </b-button>
        <b-button class="p-2 m-1 no-border" variant="outline-danger" @click="deleteItem(item.id)">
          <b-icon icon="trash-fill" variant="danger" class="remove-item"></b-icon>
        </b-button>
      </div>
      <div class="image-holder center-image ">

        <el-upload class="picture position-relative"
                   accept="image/jpeg,image/gif,image/png"
                   ref="uploadImg"
                   :headers="uploadingHeaders"
                   :action="uploadingUrl"
                   :on-success="uploadSuccess"
        >
          <div v-if="item.media[0]">
            <img :src="__assetBg(item.media[0].src, 350, images_preview, images_fitting)" class="item-img" alt="Choose Picture"/>
          </div>
          <img v-else src="@/assets/images/placeholder.jpeg" class="item-img" alt="Choose Picture">
          <label class="position-absolute text-center choose-pic cursor-pointer">Choose Picture</label>
        </el-upload>
      </div>
      <div class="entity-data">
        <div class="form-group">
          <b-input name="title" v-model="__t(item.locales)['name']"
                   @change=""
                   placeholder="Item title" class="border-radius-0"/>
        </div>
        <div class="form-group d-flex" v-for="(price, index) in item.prices">

          <template v-if="price.id">

            <b-input name="price_label" v-model="__t(item.prices[index].locales)['name']"
                     @change=""
                     class="border-radius-0"
                     placeholder="Label"/>
            <b-input name="price" v-model="item.prices[index].price"
                     @change=""
                     placeholder="Price"
                     class="border-radius-0 "/>
            <span class="d-flex align-items-center small pl-2 pr-2 bg-white border-solid">USD</span>
            <b-button size="sm" variant="danger" class=" no-margin border-radius-0 px-2 border-solid"
                      @click="deletePrice(item.prices, index, price.id)">
              <i class="fa fa-trash"></i>
            </b-button>
          </template>

        </div>
        <Addons :item="item" ref="addons" @updateItem="updateItem" />
        <div class="form-group d-flex" v-for="(discount, index) in item.discounts">

          <template v-if="discount.id">
            <span class="d-flex align-items-center small pl-2 pr-2 bg-white border-solid">Discount</span>

            <b-input v-model="item.discounts[index].amount"
                     @change=""
                     class="border-radius-0"
                     placeholder="Amount"/>
            <b-form-select v-model="discount.type" variant="warning" @change="updateItem"
                            class=" no-margin border-radius-0 px-2 border-solid select-sm" >
              <b-form-select-option :value="DiscountTypes.value" ><small>{{ "KWD" }}</small></b-form-select-option>
              <b-form-select-option :value="DiscountTypes.percentage" ><small>{{ "%" }}</small></b-form-select-option>
            </b-form-select>
          </template>

        </div>
        <div class="form-group">

          <b-textarea name="description"
                      @change=""
                      v-model="__t(item.locales)['description']"
                      placeholder="Item description"/>
        </div>
        <div class="form-group">

        </div>
        <b-row class="form-group bg-white">
          <b-col sm="6" class="no-padding">
            <b-button variant="primary" class="p-2 no-border no-margin text-ca border-radius-0" block
                      @click="addAddon(item.addons)">
              Add Addon
            </b-button>
          </b-col>
          <b-col sm="6" class="no-padding">
            <b-button :disabled="this.item.discounts.length > 0" variant="warning" class="p-2 no-border no-margin text-ca border-radius-0" block
                      @click="addDiscount(item.discounts)">
              Add Discount
            </b-button>
          </b-col>
          <b-col sm="6" class="no-padding">
            <b-button variant="warning" class="p-2 no-border no-margin text-ca border-radius-0" block
                      @click="addPrice(item.prices)">
              Add price
            </b-button>
          </b-col>
          <b-col sm="6" class="no-padding">
            <b-button variant="primary" class="p-2 no-border no-margin text-ca no-pa border-radius-0" block
                      :disabled="sync"
                      @click="updateItem">
              Save
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {deleteItem, updateItem} from "@/API/ItemsAPIs";
import * as _ from "lodash";
import Price from '@/components/Models/Price'
import PriceLocale from '@/components/Models/PriceLocale'
import {deletePrice} from "@/API/PricesAPIs";
import {commonHeaders} from "@/util/$http";
import {UPLOAD_URL} from "@/config/API";
import {Upload} from "element-ui";
import DiscountTypes from "@/config/DiscountTypes";
import {deleteDiscount} from "@/API/DiscountsAPIs";
import Discount from "@/components/Models/Discount";
import DiscountLocale from "@/components/Models/DiscountLocale";
import Addons from "@/pages/Menu/Addons";
import {__assetDimensioned, __assetFilledBlur} from "@/helpers/helpers";
import {ImagePreview} from "@/config/AppConfig";

export default {
  name: 'Item',
  props: {
    item: {},
    images_preview: null,
    images_fitting: null,
    galleryItem: null
  },
  data() {
    return {
      sync: false,
      uploadingHeaders: commonHeaders,
      uploadingUrl: UPLOAD_URL,
      DiscountTypes
    }
  },
  components: {
    Addons,
    [Upload.name]: Upload
  },
  mounted() {
    this.setDefaultPrices();
  },
  methods: {
    __assetBg: __assetDimensioned,
    setDefaultPrices(){
      const priceLocaleObj = (new PriceLocale(this.$i18n.locale));
      this.item.prices.map((price) => {
        if (price.locales.length === 0)
          price.locales.push(JSON.parse(JSON.stringify(priceLocaleObj)))
      })
    },
    async deleteItem(id) {
      await deleteItem(id)
      this.$emit('refreshMenu')
      this.$notify({title: "Deleted successfully"});
    },
    addAddon(addons){
      this.$refs['addons'].addAddon(addons);
    },
    addDiscount(discounts) {
      const addonObj = new Discount((new DiscountLocale(this.$i18n.locale)));
      discounts.push(addonObj);
      this.updateItem();
    },
    addPrice(prices) {
      const priceObj = new Price((new PriceLocale(this.$i18n.locale)));
      prices.push(priceObj);
      this.updateItem();
    },
    async deletePrice(prices, index, id) {
      this.sync = true;
      await deletePrice(id)
      prices.splice(index, 1);
      setTimeout(() => this.sync = false, 200)
    },
    async deleteDiscount(discounts, index, id) {
      this.sync = true;
      await deleteDiscount(id)
      discounts.splice(index, 1);
      setTimeout(() => this.sync = false, 200)
    },
    updateItem: _.debounce(async function () {
      this.sync = true;
      let item = await updateItem(this.item);
      this.item.media = item.media;
      this.item.prices = item.prices;
      this.item.addons = item.addons;
      this.item.discounts = item.discounts;
      setTimeout(() => this.sync = false, 200)
    }, 400),
    uploadSuccess(uploaded) {
      if(this.item.media.length > 0){
        var firstImageIndex = this.item.media.findIndex(item => item.type !== "video/mp4");
        this.item.media[firstImageIndex]['src'] = uploaded.file;
      }
      else
        this.item.media = [{id: null, src: uploaded.file}];
      this.updateItem(this.item);
      if(this.galleryItem) {
        this.$emit('openGallery', this.item);
      }
    },
    openGallery(item){
      this.$emit('openGallery', item);
    }
  },
};
</script>

<style scoped>
  .border-dashed{
    border: 1px dashed #eee;
  }
  .border-solid{
    border: 1px solid #eee;
  }
</style>
