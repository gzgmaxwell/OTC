<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        {{ this.id ? "编辑配置" : "新增配置" }}
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
            <el-form-item label="配置名称" prop="configName">
              <el-input v-model="formValidate.configName" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="配置类型" prop="configType">
              <el-select :disabled="this.id ? true : false" style="width: 100%;" v-model="formValidate.configType"
                placeholder="请选择类型" clearable>
                <el-option v-for="item in optConfigType" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="配置编码" prop="configCode">
              <el-input :disabled="this.id ? true : false" v-model="formValidate.configCode"
                style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="配置值" prop="value1">
              <el-input v-model="formValidate.value1" style="width: 100%;" type="textarea" :rows="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { configAdd, configUpdate } from "@a/system";
import { optConfigType } from "@/utils/enum";

export default {
  name: "ConfigManageEdit",
  components: {},
  data() {
    return {
      id: "",
      optConfigType,
      formValidate: {
        id: null,
        configName: null,
        value1: null,
        configType: null,
        configCode: null
      },
      rules: {
        configName: [
          { required: true, message: "请输入配置名称", trigger: "blur" }
        ],
        configType: [
          { required: true, message: "请选择配置类型", trigger: "change" }
        ],
        configCode: [
          { required: true, message: "请输入配置编码", trigger: "blur" }
        ],
        value1: [{ required: true, message: "请输入配置值", trigger: "blur" }]
      },
      dialogVisible: false
    };
  },
  methods: {
    getInfo(id) {
      this.formValidate.configName = this.$route.query.configName;
      this.formValidate.configType = this.$route.query.configType;
      this.formValidate.configCode = this.$route.query.configCode;
      this.formValidate.value1 = this.$route.query.value1;
      this.formValidate.id = this.$route.query.id;
    },
    //新增保存接口
    async addData() {
      await configAdd(this.formValidate);
      this.$message.success("新增成功");
      this.resetForm();
      this.backTo();
    },
    //编辑保存接口
    async editData() {
      await configUpdate(this.formValidate, this.$route.query.id);
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
        configName: null,
        value1: null,
        configType: null,
        configCode: null
      };
    },
    //返回
    backTo() {
      this.$router.push({
        name: "ConfigManage"
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.getInfo(this.id);
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
