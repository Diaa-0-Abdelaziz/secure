<template>
  <div :class="'sidebar ' + ( $store.state.rtl ? 'rtl' : '') "
       :data-color="backgroundColor"
       :data-active-color="activeColor">
    <div class="position-relative" style="z-index: 4">
      <div class="user">
        <div class="info text-center" v-if="!this.$sidebar.isMinimized">
          <img src="/assets/images/logo-light.png" alt="" style="width:80%;">
          <div class="clearfix"></div>
        </div>
      </div>
    </div>


    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <slot>
      </slot>
      <ul class="nav">
        <slot name="links">
          <sidebar-item v-for="(link, index) in $store.state.sidebarLinks"
                        :key="link.name + index"
                        :link="link">

            <sidebar-item v-for="(subLink, index) in link.children"
                          :key="subLink.name + index"
                          :link="subLink">
            </sidebar-item>
          </sidebar-item>
        </slot>

      </ul>
    </div>
  </div>
</template>
<script>
import 'perfect-scrollbar/css/perfect-scrollbar.css'

export default {
  props: {
    title: {
      type: String,
      default: 'TryCar Dashboard',
      description: 'Sidebar title'
    },
    backgroundColor: {
      type: String,
      default: 'purple',
      validator: (value) => {
        let acceptedValues = ['white', 'brown', 'black', 'purple']
        return acceptedValues.indexOf(value) !== -1
      },
      description: 'Sidebar background color (white|brown|black)'
    },
    activeColor: {
      type: String,
      default: 'success',
      validator: (value) => {
        let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
        return acceptedValues.indexOf(value) !== -1
      },
      description: 'Sidebar active text color (primary|info|success|warning|danger)'
    },
    logo: {
      type: String,
      default: '/assets/images/logo.png',
      description: 'Sidebar Logo'
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    }
  },
  methods: {
    async initScrollBarAsync() {
      let isWindows = navigator.platform.startsWith('Win');
      if (!isWindows) {
        return;
      }
      const PerfectScroll = await import('perfect-scrollbar')
      PerfectScroll.initialize(this.$refs.sidebarScrollArea)
    }
  },
  mounted() {
    this.initScrollBarAsync()
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false
    }
  }
}

</script>
<style>
@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
}
</style>
