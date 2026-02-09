<template>

</template>

<script>

export default {
  name: "load",
  components: {},
  data() {
    return {};
  }
};
import { Loading } from 'element-ui';
let loadingInstance = Loading.service({ fullscreen: true ,text:"加载中"});



 setTimeout(() => {
                loadingInstance.close();
        }, 500);
</script>
