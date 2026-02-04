<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        查看信息
      </div>
      <div>
        <ja-button type="primary" :click="save"> 保存 </ja-button>
        <el-button @click="backTo()">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-form
        class="u_form"
        :model="formValidate"
        :rules="rules"
        ref="formValidate"
        label-width="150px"
      >
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="栏目名称" prop="modelName">
              <el-input
                v-model="formValidate.modelName"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="上一级菜单" prop="parentId">
              <!-- <el-input v-model="formValidate.columnName" style="width: 100%;"></el-input> -->

              <el-select
                v-model="formValidate.parentId"
                placeholder="请选择栏目名称"
                style="width: 100%"
              >
                <el-option
                  v-for="item in columns"
                  :key="item.id"
                  :label="item.modelName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="顺序" prop="num">
              <el-input
                v-model="formValidate.num"
                oninput="value=value.replace(/[^0-9]/g,'')"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  SysModelInfo,
  SysModelSave,
  SysModelUpdate,
  SysModelList,
} from "@a/column";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      columns: [],
      title: "",
      params: {},
      formValidate: {
        modelName: null,
        num: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
      },
      data: [],
      rules: {
        modelName: [
          { required: true, message: "请输入栏目名称", trigger: "blur" },
          { max: 50, message: "最多50位", trigger: "blur" },
        ],
        num: [{ required: true, message: "请输入顺序", trigger: "blur" }],
      },
      dialogVisible: false,
      otherType: "",
    };
  },
  methods: {
    async getColumn() {
      this.columns = await SysModelList();
    },
    //获取列表详情接口
    async getInfo(id) {
      const data = await SysModelInfo(id);

      this.formValidate = data;
    },
    //新增保存接口
    async addData() {
      const data = await SysModelSave(this.formValidate);
      this.$message.success("新增成功");
      this.resetForm();
      this.backTo();
    },
    //编辑保存接口
    async editData() {
      const data = await SysModelUpdate(this.formValidate);
      this.$message.success("修改成功");
      this.resetForm();
      this.backTo();
    },
    //保存
    save(formName) {
      return this.$refs["formValidate"].validate().then(() => {
        return this.id ? this.editData() : this.addData();
      });
    },

    //重置
    resetForm(formName) {
      this.formValidate = {};
    },
    //返回
    backTo() {
      this.$router.push({
        name: "SysModel",
      });
    },
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.id;
    this.getColumn();

    if (this.id) {
      this.getInfo(this.id);
    }
  },
};
</script>
