<template>
  <div class="fix-buttons">
    <div class="btn" @click="handlerFixClick(1)">
      <img src="../../assets/images/fix_ico.png" width="23" height="23" />
    </div>
    <div class="btn" @click="handlerFixClick(2)">
      <img src="../../assets/images/fix_ico2.png" width="23" height="23" />
    </div>
    <div class="btn" @click="handlerFixClick(3)">
      <img src="../../assets/images/fix_ico3.png" width="23" height="23" />
    </div>
    <div class="tip-dialog" v-if="fixShow">
      <span class="tip-close" @click="handlerFixClose">关闭</span>
      <div class="box1" v-if="clickedButton == 1">
        <h4>联系我们</h4>
        <ul>
          <li>
            <div class="ico">
              <img
                src="../../assets/images/contact_ico.png"
                width=""
                height=""
              />
            </div>
            <span>15487958647</span>
          </li>
          <li>
            <div class="ico">
              <img
                src="../../assets/images/contact_ico2.png"
                width=""
                height=""
              />
            </div>
            <span>1024755983@qq.com</span>
          </li>
          <li>
            <div class="ico">
              <img
                src="../../assets/images/contact_ico3.png"
                width=""
                height=""
              />
            </div>
            <span>2232090023</span>
          </li>
          <li>
            <div class="ico">
              <img
                src="../../assets/images/contact_ico4.png"
                width=""
                height=""
              />
            </div>
            <span>aewiuew_01</span>
          </li>
        </ul>
      </div>
      <div class="box2" v-if="clickedButton == 2">
        <h4>留言板</h4>
        <div>
          <FormComponents
            labelWidth="'100px'"
            :formConfig="configForm"
            :formData="formData"
            :rules="formRules"
            ref="ruleForm"
          >
            <template v-slot:button>
              <el-button @click="handlerFixClose">取消</el-button>
              <el-button type="primary" @click="submit" :loading="isSaving">确定</el-button>
            </template>
          </FormComponents>
        </div>
      </div>
      <div class="box3" v-if="clickedButton == 3">
        <h4>帮助中心</h4>
        <dl>
          <dt>检索功能</dt>
          <dd>本网站啊提供海南岛淡水及河口鱼类物种信息<br />检索功能</dd>
          <dt style="padding-top: 10px">下载功能</dt>
          <dd>
            本网站提供本单位完成的海南淡水及河口鱼类<br />DNA和环境DNA条形码数据下载功能
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import FormComponents from "@/components/projectComponents/formComponents/index";
import { configForm } from "./data/footer";
import { sendMessage } from "@/api/web";
import { isExternal } from "@/utils/validate";
export default {
  components: { FormComponents },
  data() {
    return {
      fixShow: false,
      clickedButton: null,
      configForm: configForm,
      formData: {
        messageContent: undefined,
        phone: undefined
      },
      formRules: {
        messageContent: [
          { required: true, message: "请输入留言内容", trigger: ["blur", 'change'] },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: ["blur", 'change'] },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: ["blur", 'change'],
          },
        ],
      },
      isSaving: false
    };
  },
  methods: {
    handlerFixClick(type) {
      this.fixShow = true;
      this.clickedButton = type;
    },
    handlerFixClose() {
      if(this.clickedButton === 2) this.$refs.ruleForm.resetForm();
      this.fixShow = false;
      this.clickedButton = null;
    },
    submit() {
      this.$refs.ruleForm.submitForm(this.save);
    },
    async save() {
      this.isSaving = true;
      sendMessage(this.formData).then((res) => {
        this.isSaving = false;
        this.$modal.msgSuccess("留言成功");
        this.handlerFixClose()
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";
.fix-buttons {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 151px;
  background: #ffffff;
  box-shadow: 0px 0px 21px 0px rgba(23, 71, 79, 0.2);
  border-radius: 25px;
  padding-top: 12px;
  z-index: 1000;
  .btn {
    width: 100%;
    padding: 10px 0;
    cursor: pointer;
    text-align: center;
  }
  .tip-dialog {
    position: absolute;
    bottom: -10px;
    left: -443px;
    width: 405px;
    background: #ffffff;
    box-shadow: 0px 0px 21px 0px rgba(23, 71, 79, 0.2);
    border-radius: 10px;
    padding: 0 32px;
    h4 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 49px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }
    .tip-close {
      position: absolute;
      top: 0;
      right: 32px;
      line-height: 49px;
      font-size: 14px;
      font-weight: 500;
      color: #666666;
      cursor: pointer;
    }
    .box1 {
      ul {
        padding: 15px 0;
      }
      li {
        line-height: 40px;
        display: flex;
        align-items: center;
        .ico {
          width: 38px;
        }
        span {
          color: #666666;
        }
      }
    }
    .box2 {
      padding-bottom: 20px;
      h4 {
        border-bottom: 0;
      }
      ::v-deep .el-col {
        padding: 0;
      }
      ::v-deep .el-col:last-child {
        text-align: right;
      }
    }
    .box3 {
      dl {
        padding: 13px 0 18px;
      }
      dt {
        font-size: 16px;
        font-weight: bold;
        color: #278de4;
        line-height: 31px;
      }
      dd {
        font-size: 14px;
        font-weight: 500;
        color: #666666;
        line-height: 31px;
      }
    }
  }
}
::v-deep .el-textarea__inner {
height: 107px;;
}
</style>
