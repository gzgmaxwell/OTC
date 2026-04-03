import Vue from "vue";

import JaButton from "./ja-button";
import TableOperate from "./table-operate";
import preview from "./preview";

const components = {
  JaButton,
  TableOperate,
  preview
};

Vue.use({
  install() {
    Object.keys(components).map(key => {
      console.log(1111,key, components[key]);
      Vue.component(key, components[key]);
    });
  }
});
