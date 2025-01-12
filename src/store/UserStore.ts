import User from '@/interfaces/UserInterface';

let user: User = {
  id: null,
  name: null,
  email: null,
  type: null,
  currency: null,
  email_verified_at: null,
  token: null,
  business: [],
  hotels:[]
}

export const userStore = {
  state: {
    user
  },
  mutations: {
    setUser(state:any , user: User){
      state.user = user;
    },
    resetUser(state:any){
      state.user = user;
    }
  },
  actions: {}
}
