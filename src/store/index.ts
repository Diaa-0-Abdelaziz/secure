import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex);
import sidebar from "./sidebar";

import {userStore} from "@/store/UserStore";

export default new Vuex.Store({
  state: {
    ...userStore.state,
    ...sidebar.state
  },
  mutations: {
    ...userStore.mutations,
    ...sidebar.mutations
  },
  actions:{
    ...userStore.actions
  }
})
