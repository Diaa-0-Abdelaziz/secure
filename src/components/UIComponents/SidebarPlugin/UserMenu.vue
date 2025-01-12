<template>
  <div class="user">
    <div class="photo">
      <img src="/assets/images/MGamal.png" alt="user avatar"/>
    </div>
    <div class="info">
      <a  href="#">
         <span>
           Mohamed Gamal
        </span>
      </a>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions'

  export default {
    components: {
      CollapseTransition
    },
    data() {
      return {
        isClosed: true
      }
    },
    methods: {
      toggleMenu() {
        this.isClosed = !this.isClosed
      }
    }
  }
</script>
<style scoped>
  .nav.nav-menu {
    margin-top: 0;
  }
</style>
