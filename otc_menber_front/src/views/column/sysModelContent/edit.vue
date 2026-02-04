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
        label-width="100px"
      >
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="栏目" prop="modelId">
              <SelectTree
                :checkedKey.sync="formValidate.modelId"
                :checkStrictly="true"
                :defaultProps="defaultProps"
                :nodeKey="'id'"
                :data="columnNameList"
                :width="100"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="标题" prop="title">
              <el-input
                v-model="formValidate.title"
                placeholder="请输入"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="内容" prop="content">
              <!-- <el-input v-model="formValidate.content" style="width: 100%;"></el-input> -->

              <editor ref="ntiContent" @change="catchData" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="是否超链接：">
              <el-radio-group v-model="formValidate.status">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="center" v-if="formValidate.status === '0'">
          <el-col :span="20">
            <el-form-item label="超链接" prop="url">
              <el-input
                v-model="formValidate.url"
                placeholder="请输入"
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
  SysModelContentInfo,
  SysModelContentSave,
  SysModelContentUpdate,
  SysModelList,
  SysModelTree,
} from "@a/column";

import { DeletesByUrl } from "@a/system";
import SelectTree from "@/components/tree/SelectTree.vue";

import editor from "@/components/editor/index.vue";
export default {
  name: "Edit",
  components: { editor, SelectTree },
  data() {
    return {
      column: [],
      id: "",
      columnNameList: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      title: "",
      params: {},
      formValidate: {
        modelId: null,
        title: null,
        fj: [],
        content: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        status: '1',
        url: null,
      },
      data: [],
      rules: {
        modelId: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },{  max: 50, message: "最多50位", trigger: "blur" }
        ],
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { max: 50, message: "最多50位", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { max: 200000, message: "最多200000位", trigger: "blur" },
        ],
        url: [
          { required: true, message: "请输入超链接", trigger: "blur" },
          { max: 200000, message: "最多200000位", trigger: "blur" },
        ],
      },
      dialogVisible: false,
      otherType: "",
    };
  },
  methods: {
    handleFjSuccess(res, file) {
      this.formValidate.fj.push(res);
    },
    beforeJdpfbUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 50;

      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 50MB!");
      }
      return isLt2M;
    },
    async handleRemove(res, columnNameListfileList) {
      this.formValidate.fj.splice(this.formValidate.fj.indexOf(res), 1);
      // await  DeletesByUrl([res.url]);
      this.$message.success("删除成功");
    },

    handlePreview(file) {
      if (file.response) {
        if (file.response.url) {
          download(file.response.url);
        }
      }
      if (file.url) {
        download(file.url);
      }
    },
    async getClumnTree() {
      this.columnNameList = await SysModelTree();
    },
    async getColumn() {
      this.column = await SysModelList();
      //拿到从列表页传过来的ID
      this.id = this.$route.query.id;

      if (this.id) {
        this.getInfo(this.id);
      }
    },
    catchData(content) {
      this.formValidate.content = content;
    },
    //获取列表详情接口
    async getInfo(id) {
      const data = await SysModelContentInfo(id);

      this.formValidate = data;
      if (data.content) {
        this.$refs.ntiContent.setHtml(data.content);
      }
    },
    //新增保存接口
    async addData() {
      const data = await SysModelContentSave(this.formValidate);
      this.$message.success("新增成功");
      this.resetForm();
      this.backTo();
    },
    //编辑保存接口
    async editData() {
      const data = await SysModelContentUpdate(this.formValidate);
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
        name: "SysModelContent",
      });
    },
  },
  mounted() {
    this.getColumn();

    this.getClumnTree();
    
  },
};
</script>
<style scoped>
.el-select-dropdown {
  z-index: 120010;
}
</style>