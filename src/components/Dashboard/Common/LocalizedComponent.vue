<template>
  <div class="localized-component">
    <div class="form-group"
         v-if="field.label"
         :class="[{'input-group': true},
             {'has-label': field.label }]">
      <label v-if="field.label" size="lg" :class="field.labelClasses + ' text-dark col-form-label '">
        <h6 v-html="field.label" v-if="field.label"></h6>
        <h6 v-html="'&nbsp;'" v-else></h6>
        <span class="text-danger" v-if="field.required">*</span>
      </label>
    </div>
    <card>
      <tabs vertical>
        <tab-pane :title="localeNames[locale.locale]" :key="locale.locale" v-for="(locale , index) in localeData "
                  :active="index === 0">
          <ValidationProvider
            :name="locale.name"
            :rules="index === 0 ? field.rules : ''"
            v-slot="{ passed, failed, failedRules, errors }">
            <fg-input v-model="locale.name" :placeholder="namePlaceHolder" type="text"
                      :error="failed && validation_messages && validation_messages[locale.locale] ?
                      validation_messages[locale.locale][Object.keys(failedRules)[0]]:
                      errors[0]"
                      :hasSuccess="passed"></fg-input>
          </ValidationProvider>

          <fg-input v-model="locale.description" :placeholder="descriptionPlaceHolder" type="textarea" ></fg-input>

        </tab-pane>
      </tabs>
    </card>
  </div>
</template>

<script>
import {Card, Collapse, CollapseItem, TabPane, Tabs} from "@/components/UIComponents";
import {__localesModel, __localeNames} from "@/util/locales";

export default {
  name: "LocalizedComponent",
  props: ['localeValues', 'field', 'inList'],
  watch: {
    localeValues: {
      deep: true,
      handler(val) {
        this.localeData = val;
      }
    },
  },
  computed: {
    namePlaceHolder() {
      return (this?.field?.placeholder ?? "Enter the name")
    },
    descriptionPlaceHolder() {
      return (this?.field?.placeholder2 ?? "Enter the description");
    },
    validation_messages(){
      return this.field.validation_messages ?? {
        en: {
          required: 'Name is required'
        },
        ar: {
          required: 'الاسم مطلوب'
        }
      }
    }
  },
  data() {
    return {
      localeNames: __localeNames,
      localeData: __localesModel
    }
  },
  mounted() {
    this.localeData = this.localeValues || __localesModel;
  },
  components: {
    TabPane,
    Tabs,
    CollapseItem,
    Collapse,
    Card
  }
}
</script>

<style scoped>

</style>
