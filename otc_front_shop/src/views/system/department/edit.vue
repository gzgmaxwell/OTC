<template>
  <div class="page">
    <el-card class="box-card fixTopHeader">
      <div slot="header" class="clearfix" :title="title">
        <div>
          {{ title }}
        </div>
        <div class="fixTopHeader_action">
          <el-button type="primary" @click="save('formValidate')"
            >保存</el-button
          >
          <el-button @click="backTo()">返回</el-button>
        </div>
      </div>
      <div class="fixTopHeader_content">
        <el-form
          :model="formValidate"
          :rules="rules"
          ref="formValidate"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-row :gutter="20" type="flex" class="row-bg" justify="left">
            <el-col :span="18" :offset="2">
              <el-form-item label="部门名称" prop="departmentName">
                <el-input
                  v-model="formValidate.departmentName"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row :gutter="20" type="flex" class="row-bg" justify="left">
          <el-col :span="18" :offset="2">
            <el-form-item label="上级部门" >
                     <select-tree v-model="formValidate.parentId" :options="departments" :props="departmentProps" />
            </el-form-item>
          </el-col>	

        </el-row>-->
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import SelectTree from "@/components/tree/SelectTree.vue";

export default {
  name: "EditSysDepartment",
  components: { SelectTree },
  data() {
    return {
      pk: "",
      // 数据默认字段
      departmentProps: {
        parent: "parentValue", // 父级唯一标识
        value: "value", // 唯一标识
        label: "label", // 标签显示
        children: "children" // 子级
      },
      departments: [], //部门列表
      title: "",
      params: {},
      formValidate: {
        departmentName: null,
        appName: null,
        createId: null,
        createDate: null,
        isEnable: null,
        updateId: null,
        updateDate: null,
        parentId: null
      },
      data: [],
      rules: {
        departmentName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        appName: [
          { required: true, message: "请输入所属项目", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "请输入上一级部门Id", trigger: "blur" }
        ]
      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //获取部门接口
    async getDepartments() {
      let {
        code,
        data
      } = await this.$ajax.sysDepartmentApi.departmentCascader();
      this.departments = data;
    },
    //获取列表详情接口
    async getInfo(id) {
      let { code, data } = await this.$ajax.sysDepartmentApi.sysDepartmentInfo(
        id
      );
      if (code == 200) {
        this.formValidate = data;
      }
    },
    //新增保存接口
    async addData(params) {
      let {
        code,
        data,
        msg
      } = await this.$ajax.sysDepartmentApi.sysDepartmentSave(params);
      if (code == 200) {
        this.$message.success(msg);
        this.resetForm();
        this.$router.back();
      } else {
        this.$message.error(msg);
      }
    },
    //编辑保存接口
    async editData(params, id) {
      let {
        code,
        data,
        msg
      } = await this.$ajax.sysDepartmentApi.sysDepartmentUpdate(params, id);
      this.$message.success(msg);
      this.resetForm();
      this.$router.back();
    },
    //保存
    save(formName) {
      //验证表单必填
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message.error("请检查表单红字段!");
          return;
        }
        if (this.pk) {
          this.editData(this.formValidate, this.pk);
        } else {
          this.addData(this.formValidate);
        }
      });
    },

    //重置
    resetForm(formName) {
      this.formValidate = {};
    },
    backTo() {
      this.$router.back();
    }
  },
  async mounted() {
    //拿到从列表页传过来的ID
    this.pk = this.$route.query.id;
    await this.getDepartments();
    if (!this.pk) {
      this.title = "新增信息";
    } else {
      this.title = "编辑信息";
      this.getInfo(this.pk);
    }
  }
};
</script>
