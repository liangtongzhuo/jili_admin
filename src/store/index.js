import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weddingList: []
  },
  mutations: {
    setWeddingList(state, list) {
      state.weddingList = list;
    }
  },
  actions: {},
  modules: {}
})
