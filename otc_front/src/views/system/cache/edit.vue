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
          <el-button @click="backTo('formValidate')">返回</el-button>
        </div>
      </div>
      <div class="fixTopHeader_content">
        <el-form
          :model="formValidate"
          :rules="rules"
          ref="formValidate"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="20">
              <el-form-item label="请求地址" prop="url">
                <el-input v-model="formValidate.url"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="20">
              <el-form-item label="接口用途">
                <el-input v-model="formValidate.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="20">
              <el-form-item label="请求方式" prop="method">
                <el-select
                  v-model="formValidate.method"
                  placeholder="请选择请求方式"
                >
                  <el-option
                    v-for="item in dics.method"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-form-item label="请求参数" >
              <el-input v-model="formValidate.params"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "newCache",
  components: {},
  data() {
    return {
      pk: "",
      title: "",
      params: {},
      formValidate: {},
      data: [],
      rules: {
        url: [{ required: true, message: "请输入请求地址", trigger: "blur" }],
        method: [
          { required: true, message: "请输入请求方式", trigger: "blur" }
        ],
        params: [{ required: true, message: "请输入请求参数", trigger: "blur" }]
      },
      dialogVisible: false,
      otherType: ""
    };
  },
  methods: {
    //获取列表详情接口
    async getInfo(id) {
      let { code, data } = await this.$ajax.sysCacheApi.sysCacheInfo(id);
      if (code == 200) {
        this.formValidate = data;
      }
    },
    //新增保存接口
    async addData(params) {
      let { code, data, msg } = await this.$ajax.sysCacheApi.sysCacheSave(
        params
      );
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
      let { code, data, msg } = await this.$ajax.sysCacheApi.sysCacheUpdate(
        params,
        id
      );
      if (code == 200) {
        this.$message.success(msg);
        this.resetForm();
        this.$router.back();
      } else {
        this.$message.error(msg);
      }
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
    //返回
    backTo() {
      this.$router.back();
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.pk = this.$route.params.id;

    if (!this.pk) {
      this.title = "新增信息";
    } else {
      this.title = "编辑信息";
      this.getInfo(this.pk);
    }
  }
};
</script>
