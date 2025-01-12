<template>
  <div>
    <div class="form-group d-flex" v-for="(addon, index) in item.addons">

      <template v-if="addon.id">

        <span class="d-flex align-items-center small pl-2 pr-2 bg-white border-solid">Addon</span>
        <b-input name="addon_label" v-model="__t(item.addons[index].locales)['name']" @change="updateItem" class="border-radius-0"
                 placeholder="Name"/>
        <b-input name="price" v-model="item.addons[index].price" @change="updateItem" placeholder="Price"
                 class="border-radius-0 "/>
        <span class="d-flex align-items-center small pl-2 pr-2 bg-white border-solid">USD</span>
        <b-button size="sm" variant="danger" class=" no-margin border-radius-0 px-2 border-solid"
                  @click="deleteAddon(item.addons, index, addon.id)">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>

    </div>
  </div>
</template>

<script>
import AddonLocale from "@/components/Models/AddonLocale";
import Addon from "@/components/Models/Addon";
import {deleteAddon} from "@/API/AddonsAPIs";

export default {
  name: "Addons",
  props: ['item'],
  data(){
    return {

    }
  },
  mounted() {
    this.setDefaultAddons();
  },
  methods: {
    setDefaultAddons(){
      const addonLocaleObj = (new AddonLocale(this.$i18n.locale));
      this.item.addons.map((addon) => {
        if (addon.locales.length === 0)
          addon.locales.push(JSON.parse(JSON.stringify(addonLocaleObj)))
      })
    },

    addAddon(addons) {
      const addonObj = new Addon((new AddonLocale(this.$i18n.locale)));
      addons.push(addonObj);
      this.updateItem();
    },

    async deleteAddon(addons, index, id) {
      this.sync = true;
      await deleteAddon(id)
      addons.splice(index, 1);
      setTimeout(() => this.sync = false, 200)
    },
    updateItem(){
      this.$emit('updateItem', this.item)
    }
  }
}
</script>

<style scoped>

</style>
