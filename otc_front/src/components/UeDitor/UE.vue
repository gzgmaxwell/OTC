<template>
  <div style="height: 500px">
    <script ref="editor" type="text/plain"></script>
  </div>
</template>

<script>
export default {
  name: 'UE',
  props: {
    value: {
      type: String,
      default: null
    },
    config: {
      type: Object,
      default: function () {
        return {
          autoHeightEnabled: false,
          autoFloatEnabled: true,
          initialContent: '',
          autoClearinitialContent: true,
          initialFrameWidth: null,
          initialFrameHeight: 800,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/'
        }
      }
    }
  },
  data() {
    return {
      id: 'ueditorId' + Math.random().toString(16).substring(2),
      editor: null
    }
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        console.log(this.$refs.editor, this.$refs)
        this.$refs.editor.id = this.id
        console.log(this.id)
        // eslint-disable-next-line no-undef
        this.editor = UE.getEditor(this.id, this.config)
        this.editor.ready(function f() {
        })
      }, 200);

    })
  },
  methods: {
    getUEContent: function () { // 对外暴露的获取富文本内容接口
      return this.editor.getContent()
    },
    setUEContent: function (data) { // 对外暴露的获取富文本内容接口
      console.log(data)
      this.editor.ready(function f() {
        // this.editor.setContent('<p>' + data + '</p>', false)
        this.editor.setContent(data)
      }.bind(this))
    },
    destroyUE() { // 对外暴露销毁组件接口
      // this.editor1.destroy();
    }
  }
}

</script>

<style>

</style>
