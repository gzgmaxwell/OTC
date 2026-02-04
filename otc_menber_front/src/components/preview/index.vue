<template>
  <el-dialog
    title="查看"
    :visible.sync="dialogVisible"
    width="80%"
    top="10vh"
    append-to-body
    >
    <div class="preview-box">
      <iframe id="pdfIframe" class="iframe-box" :src="previewUrl" width="100%" height="100%" style="border: none"></iframe>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    previewUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
        dialogVisible: false
    }
  },
  methods: {
    open() {
        this.dialogVisible = true
    },
    close() {
        this.dialogVisible = false
    }
  }
};
</script>

<style scoped lang="scss">
.preview-box {
  width: 100%;
  height: 600px;
  .iframe-box {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>