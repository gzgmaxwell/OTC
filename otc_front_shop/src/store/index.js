import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false,
    routerField: ""
  },
  getters: {
    isCollapse: state => state.isCollapse,
    routerField: state => state.routerField
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
    },
    SET_ROUTER(state, router) {
      state.routerField = router;
    }
  },
  actions: {},
  modules: {}
});
