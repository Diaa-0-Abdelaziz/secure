import {getCurrentUser} from "@/API/UsersAPIs";
import store from "@/store";
import {userSidebarLinks} from "@/util/roles";

export const setAccessToken = (token) => localStorage.setItem('token', token);

export const getAccessToken = () => localStorage.getItem('token') ?? '';

export const resetAccessToken = () => localStorage.removeItem('token');

export const isAuthenticated = async (store) => {
  if(!getAccessToken()) return false;
    try {
      let currentUser = await getCurrentUser();
      if (currentUser) {
        store.commit('setUser', currentUser);
        store.commit('setSidebarLinks', userSidebarLinks(currentUser));
        return true;
      }else {
        console.log("error", "couldn't get user")
        resetAccessToken();
        return false;
      }
    } catch (error) {
      console.log("error", error)
      resetAccessToken();
      window.location = '/';
      return false;
    }
}

export const resetUser = async (store)=>{
  resetAccessToken();
  store.commit('resetUser');
}
