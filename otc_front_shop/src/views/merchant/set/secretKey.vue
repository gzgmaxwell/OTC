<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        {{ this.id ? "查看信息" : "新增信息" }}
      </div>
      <div>
        <el-button @click="backTo()">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-form class="u_form" :model="formValidate" ref="formValidate" label-width="100px">
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <el-form-item label="昵称">
              <el-input v-model="formValidate.nickName" disabled style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="secretKey">
              <el-input v-model="formValidate.secretKey" disabled style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>

import { merchant_secretKey } from "@a/merchant/set";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      formValidate: {
        nickName: null,
        secretKey: null
      },
    };
  },
  methods: {

    //获取列表详情接口
    async getInfo(id) {
      const data = await merchant_secretKey(id);
      this.formValidate = data;
    },
    //返回
    backTo() {
      this.$router.push({
        name: "MerchantSet"
      });
    }
  },
  mounted() {
    //拿到从列表页传过来的ID
    this.id = this.$route.query.userId;
    if (this.id) {
      this.getInfo(this.id);
    }
  }
};
</script>
