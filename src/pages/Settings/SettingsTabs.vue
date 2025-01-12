<template>
  <div class='page-container bg-white py-4 px-5'>
    <div class="mt-3 px-2">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Business Settings" name="BusinessSettings">
          <BusinessSettingsTab/>
        </el-tab-pane>
        <el-tab-pane label="Branch Settings" name="BranchSettings">
          <BranchSettingsTab/>
        </el-tab-pane>
        <el-tab-pane label="Tablet App Settings" name="TabletAppSettings">
          <TabletAppSettingsTab/>
        </el-tab-pane>
        <el-tab-pane label="Mobile App Settings" name="MobileAppSettings">
          <MobileAppSettingsTab/>
        </el-tab-pane>
        <el-tab-pane label="Account Settings" name="AccountSettings">
          <AccountSettingsTab/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AccountSettingsTab from "@/pages/Settings/AccountSettingsTab/AccountSettingsTab.vue";
import TabletAppSettingsTab from "@/pages/Settings/TabletAppSettings/TabletAppSettingsTab.vue";
import MobileAppSettingsTab from "@/pages/Settings/MobileAppSettingsTab/MobileAppSettingsTab.vue";
import BusinessSettingsTab from "./BusinessSettings/BusinessSettingsTab.vue";
import BranchSettingsTab from "./BranchSettings/BranchSettingsTab.vue";

import './settings.css'

export default {
  name: 'SettingsTabs',
  components: {
    BranchSettingsTab,
    AccountSettingsTab,
    BusinessSettingsTab,
    MobileAppSettingsTab,
    TabletAppSettingsTab
  },
  data() {
    return {
      activeName: 'BusinessSettings',
      businessSettings: null,
    };
  },
  methods: {
    handleClick(tab, event) {

    }
  }
}
</script>

<style scoped>
nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

nav ul li {
  margin-right: 15px;
}
</style>
