import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false,
    routerField: "",
    theme: "dark"
  },
  getters: {
    isCollapse: state => state.isCollapse,
    routerField: state => state.routerField,
    theme: state => state.theme
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
    },
    SET_ROUTER(state, router) {
      state.routerField = router;
    },
    SET_THEME(state, theme) {
      state.theme = theme;
    }
  },
  actions: {},
  modules: {}
});
