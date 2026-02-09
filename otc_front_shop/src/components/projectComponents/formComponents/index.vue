<template>
  <div :class="['form-components', isDialog ? 'dialog-form' : '']">
    <el-row>
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        :label-width="labelWidth"
        :label-position="labelPosition"
        :show-message="showMessage"
        :inline-message="!showMessage"
        :validate-on-rule-change="false"
        @submit.native.prevent
      >
        <el-col
          v-for="item in formConfig"
          :key="item.prop"
          :span="item.span || 24"
          :style="{ float: item.float ? item.float : 'left', }"
          :class="[item.className ? item.className : (item.type == 'slotName' || item.type == 'textarea' || item.type == 'upload' ? '' : 'h37')]"
        >
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :required="item.require"
            v-if="item.type != 'slotName'"
          >
            <!-- 输入框,密码框 ,文本域-->
            <el-input
              v-if="
                item.type === 'text' ||
                item.type === 'textarea' ||
                item.type === 'password'
              "
              :type="item.type"
              class="input"
              :placeholder="item.placeholder || '请输入'"
              v-model="formData[item.prop]"
              :disabled="item.disabled"
              :maxlength="item.maxlength"
              :show-word-limit="item.showLimit"
              :style="{ width: item.width || '100%' }"
              :rows="item.rows"
              clearable
              :autosize="item.autosize"
              :resize="item.resize"
              :readonly="item.readonly"
              @keyup.enter.native="handleQuery(item.isEnter)"
            >
            <template slot="append" v-if="item.append">{{item.append}}</template>
          </el-input>

            <!-- 数字输入框 -->
            <el-input-number
              v-if="item.type === 'inputNumber'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || '请输入'"
              :controls-position="item.position || 'right'"
              :min="item.min"
              :style="{ width: item.width || '100%' }"
              :max="item.max"
            ></el-input-number>

            <!-- 下拉框 -->
            <el-select
              v-if="item.type === 'select'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder||'请选择'"
              :disabled="item.disabled"
              :style="{ width: item.width || '100%' }"
              :multiple="item.multiple"
              clearable
            >
              <el-option
                v-for="option in item.options"
                :label="option.label"
                :value="option.value"
                :key="option.value"
              >
              </el-option>
            </el-select>

            <!-- 单选框 -->
            <el-radio-group
              v-if="item.type === 'radio'"
              v-model="formData[item.prop]"
              :disabled="item.disabled"
              :style="{ width: item.width || '100%' }"
            >
              <el-radio
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.value"
                >{{option.label}}</el-radio>
            </el-radio-group>

            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type === 'checkbox'"
              v-model="formData[item.prop]"
              :disabled="item.disabled"
              :style="{ width: item.width || '100%' }"
            >
              <el-checkbox
                v-for="option in item.options"
                :label="option.label"
                :key="option.label"
                name="type"
              >
              </el-checkbox>
            </el-checkbox-group>

            <!-- 上传 -->
            <!-- <UploadForm v-if="item.type === 'upload'" :btnText="item.btnText || '上传'" @handleSuccess="(v) => handleSuccess(v, item.prop)" /> -->
            <ImgUpload
              ref="uploadRef"
              v-if="item.type === 'upload'"
              :img-list="formData[item.prop]"
              :maxLength="item.maxlength"
              :accept="item.accept"
              :size="item.size"
              :type="item.btnType || 'text'"
              :item="item"
              :showFile="item.showFile"
              @uploadSuccess="(v) => handleSuccess(v, item.prop)"
              @uoloadRemove="(v) => handleRemove(v, item.prop)"
              v-bind="$attrs"
            >
              <template slot="uploadBtn" v-if="item.btnType === 'picture-card'">
                <div class="upload-card">
                  <i class="el-icon-plus"></i>
                </div>
              </template>
              <template slot="uploadBtn" v-else>
                  <el-button size="small" type="primary">{{
                    item.btnText || '上传文件'
                  }}</el-button>
              </template>
              <template slot="more">
                <div>{{item.tip || ''}}</div>
              </template>
            </ImgUpload>

            <!-- 富文本 -->
            <div style="height: 300px" v-if="item.type === 'editor'">
              <Editor :html.sync="formData[item.prop]" :limitLength="item.maxlength" />
            </div>
            <!-- 时间选择器 -->
            <el-date-picker
              :style="{ width: item.width || '100%' }"
              v-if="
                item.type === 'daterange' ||
                item.type === 'datetimerange' ||
                item.type === 'date'
              "
              v-model="formData[item.prop]"
              :type="item.type"
              range-separator="至"
              :placeholder="item.placeholder || '请选择'"
              :start-placeholder="item.startPlaceholder || '开始日期'"
              :end-placeholder="item.endPlaceholder || '结束日期'"
              :value-format="item.format || null"
              :readonly="item.readonly"
            >
            </el-date-picker>

            <!-- 地区级联 -->
            <!-- <Regional-cascader
              v-if="item.type === 'cascader'"
              :width="item.width"
              :lastLevel="item.lastLevel||3"
              :placeholder="item.placeholder || '请选择'"
              :filed.sync="formData[item.prop]"
            /> -->

            <el-cascader v-if="item.type === 'cascader'" 
            :options="item.options" 
            v-model="formData[item.prop]"
            :show-all-levels="item.showAllLevels"
            :placeholder="item.placeholder || '请选择'" 
            :disabled="item.disabled"
            :props="item.optionProps"
            filterable
            clearable>
            </el-cascader>

            <!-- 日期选择器 -->
            <div v-if="item.type === 'dateCustom'">
              <DatePicker
                :config="item"
                :filed.sync="formData[item.prop]"
                @pickerChange="(v) => handleSuccess(v, item.prop)"
              />
            </div>
            <!-- slot -->
          </el-form-item>
          <div :class="[item.className ? item.className : '']" v-if="item.type === 'slotName'">
            <slot :name="item.slotName"></slot>
          </div>
          <!-- 操作按钮 -->
          <!-- <template v-if="item.type === 'slotName'">
            <slot name="button"></slot>
          </template> -->
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
// import UploadForm from './upload-form.vue'
import DatePicker from './date-picker.vue'
// import Editor from '@/components/projectComponents/formComponents/editor'
import ImgUpload from './ImgUpload'
// import RegionalCascader from './regionalCascade'
export default {
  components: {
    // UploadForm,
    ImgUpload,
    DatePicker,
    // Editor,
    // RegionalCascader
  },
  props: {
    // 表单域标签的宽度
    labelWidth: {
      type: String,
      default: () => '140px'
    },
    // 表单域标签的位置
    labelPosition: {
      type: String,
      default: 'right'
    },
    // 表单配置
    formConfig: {
      type: Array,
      required: true
    },
    // 表单数据
    formData: {
      type: Object,
      required: true
    },
    // 表单规则
    rules: {
      type: Object
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    isDialog: {
      type: Boolean,
      default: false
    },
  },
  computed: {},

  data() {
    return {
      show: true
    }
  },
  methods: {
    submitForm(cb) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          cb && cb()
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    // 图片上传成功
    handleSuccess(v, type) {
      // this.formData[type] = v
      console.log('form组件-图片个数', v)
      this.$set(this.formData, type, v)
    },
    handleRemove(v, type) { 
      
      // this.$set(this.formData, type, v)
    },
    editorChange() {},
    handleQuery(isEnter) {
      if(!isEnter) return
      this.$emit('handleSearch')
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .img-content .img-item .overlay {
  background-color: rgba(0, 0, 0, 0);
  span {
    display: none;
  }
}
::v-deep .img-content .img-item .overlay:hover {
  background-color: rgba(0, 0, 0, 0.3);
  span {
    display: inline;
  }
}
.form-components {
  position: relative;

  ::v-deep .el-form {
    width: 100%;
  }

  ::v-deep .el-row {
    justify-content: flex-start;
  }

  ::v-deep .el-input__inner {
    text-align: left;
  }

  .el-form, ::v-deep .el-textarea__inner {
    font-family: "Arial";
  }

  ::v-deep .el-col {
    padding: 0 20px;
    // height: 100%;
    // display: inline-flex;
    // align-items: center;
    // color: #909399;
    // font-size: 12px;
    // position: absolute;
    // right: -49px;
  }

  ::v-deep .ql-editor {
    min-height: 200px;
  }

  ::v-deep .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #666;
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .flex50 .el-form-item {
    width: 50%;
    padding-right: 20px;
  }
}
.dialog-form {
  max-height: 600px;
  overflow-y: auto;
  padding: 5px 0;
}
::v-deep .el-form-item {
  height: auto;
}
::v-deep .h37 .el-form-item {
  height: 37px;
}
::v-deep .h54 .el-form-item {
  height: 54px;
}
</style>
