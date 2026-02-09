import Vue from "vue";

import JaButton from "./ja-button";
import TableOperate from "./table-operate";

const components = {
  JaButton,
  TableOperate
};

Vue.use({
  install() {
    Object.keys(components).map(key => {
      Vue.component(key, components[key]);
    });
  }
});
