<template>
  <div>
    <div style="border: 1px solid #ccc; margin-top: 10px; height: 300px">
      <!-- 工具栏 -->
      <Toolbar :editor="editor" :defaultConfig="toolbarConfig" />
      <!-- 编辑器 -->
      <Editor style="height: 200px; overflow-y: hidden" :defaultConfig="editorConfig" v-model="newHtml" @onChange="onChange" @onCreated="onCreated" />
    </div>
    <!-- <div v-if="warnShow">11111</div> -->
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import * as fileManage from '@/utils/fileManage'
export default {
  name: 'MyEditor',
  components: { Editor, Toolbar },
  props: {
    html: {
      type: String,
      default: () => ''
    },
    limitLength: {
      type: Number,
      default: () => 1000
    }
  },
  computed: {
    newHtml: {
      set(value) {
        console.log(value)
      },
      get() {
        return this.html
      }
    }
  },

  data() {
    return {
      TiLength: 0,
      editor: null,
      warnShow: false,
      editorHtml: null,
      // newHtml: null,
      toolbarConfig: {
        //toolbarKeys: [/* 显示哪些菜单，如何排序、分组 */ 'uploadImage']
        //excludeKeys: [/* 隐藏哪些菜单 */]
      },
      editorConfig: {
        placeholder: '请输入内容...',
        maxLength: this.limitLength,
        // autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {}
      }
    }
  },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      this.$emit('update:html', editor.getHtml() === '<p><br></p>' ? null : editor.getHtml())
    },
    getEditorText() {
      const editor = this.editor
      if (editor == null) return
      // console.log(editor.getText()); // 执行 editor API
    },
    uploadCustom() {
      let that = this
      this.editorConfig.MENU_CONF['uploadImage'] = {
        timeout: 5 * 1000, // 5s

        fieldName: 'image',
        headers: {
          'Content-Type': 'multipart/form-data'
          // Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        maxFileSize: 500 * 1024 * 1024, // 10M

        base64LimitSize: 5 * 1024, // 5kb 以下插入 base64

        onBeforeUpload(files) {
          return files // 返回哪些文件可以上传
          // return false 会阻止上传
        },
        onProgress(progress) {
          console.log('onProgress', progress)
        },
        onSuccess(file, res) {
          console.log('onSuccess', file, res)
        },
        onFailed(file, res) {
          alert(res.message)
          console.log('onFailed', file, res)
        },
        onError(file, err, res) {
          alert(err.message)
          console.log('onError', file, err, res)
        },

        // 用户自定义上传图片
        customUpload(file, insert) {
          //这是调用封装的接口
          if (that.warnShow) {
            this.$message.error('超出范围')
          } else {
            fileManage.uploadFile({ file }).then((res) => {
              insert(res.mapList[0].url)
            })
          }
        }
      }
    }
  },
  mounted() {},
  created() {
    this.uploadCustom()
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
