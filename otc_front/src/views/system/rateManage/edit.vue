<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        {{ this.id ? "编辑费率" : "新增费率" }}
      </div>
      <div>
        <ja-button type="primary" :click="save">
          保存
        </ja-button>
        <el-button @click="backTo()">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="100px">
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="费率名称" prop="feeName">
              <el-input v-model="formValidate.feeName" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="费率类型" prop="feeType">
              <el-select style="width: 100%;" :disabled="id ? true : false" v-model="formValidate.feeType"
                placeholder="请选择类型" clearable>
                <el-option v-for="item in optRateType" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">

          <el-col :span="10">
            <el-form-item label="费率编码" prop="configCode">
              <el-select style="width: 100%;" :disabled="id ? true : false" v-model="formValidate.configCode"
                placeholder="请选择费率编码" clearable>
                <el-option v-for="item in optConfigCode" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否启用" prop="isEnable">
              <el-select style="width: 100%;" v-model="formValidate.isEnable" placeholder="请选择是否启用" clearable>
                <el-option v-for="item in optRateSwitch" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="比例值" prop="feeValue1">
              <el-input v-model="formValidate.feeValue1" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { fee_update, fee_add } from "@a/system";
import { optRateType, optConfigCode, optRateSwitch } from "@/utils/enum";

export default {
  name: "ConfigManageEdit",
  components: {},
  data() {
    return {
      id: "",
      optRateType,
      optConfigCode,
      optRateSwitch,
      formValidate: {
        feeName: null,
        configCode: null,
        feeType: null,
        feeValue1: null,
        isEnable: null,
      },
      rules: {
        feeName: [
          { required: true, message: "请输入费率名称", trigger: "blur" }
        ],
        feeType: [
          { required: true, message: "请选择费率类型", trigger: "change" }
        ],
        feeValue1: [
          { required: true, message: "请输入手续费", trigger: "blur" }
        ],
        configCode: [{ required: true, message: "请选择费率编码", trigger: "change" }],
        isEnable: [{ required: true, message: "请选择是否启用", trigger: "change" }]
      },
      dialogVisible: false
    };
  },
  methods: {
    getInfo(id) {
      this.formValidate.feeName = this.$route.query.feeName;
      this.formValidate.feeType = this.$route.query.feeType;
      this.formValidate.feeValue1 = this.$route.query.feeValue1;
      this.formValidate.configCode = this.$route.query.configCode;
      this.formValidate.id = this.$route.query.feeId;
      this.formValidate.isEnable = this.$route.query.isEnable;
    },
    //新增保存接口
    async addData() {
      console.log(111);
      await fee_add(this.formValidate);
      this.$message.success("新增成功");
      this.resetForm();
      this.backTo();
    },
    //编辑保存接口
    async editData() {
      await fee_update(this.formValidate);
      this.$message.success("修改成功");
      this.resetForm();
      this.backTo();
    },
    //保存
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.id ? this.editData() : this.addData();
      });
    },

    //重置
    resetForm() {
      this.formValidate = {
        id: null,
        feeName: null,
        configCode: null,
        feeType: null,
        feeValue1: null,
        isEnable: null,
      };
    },
    //返回
    backTo() {
      this.$router.push({
        name: "RateManage"
      });
    }
  },
  mounted() {
    this.id = this.$route.query.feeId;
    if (this.id) {
      this.getInfo(this.id);
    }
  }
};
</script>
