import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfiles: {}
  },
  getters: {
    getUserProfiles (state) {
      return state.userProfiles
    }
  },
  mutations: {
    updataUserProfiles (state, payload) {
      state.userProfiles = payload
    }
  },
  actions: {
    updataUserProfiles ({ commit }) {
      commit('updataUserProfiles')
    }
  },
  modules: {
  }
})
