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
      <el-table ref="multipleTable" :data="list" border height="100%">
        <el-table-column prop="userId" label="商户ID"></el-table-column>
        <el-table-column prop="ip" label="IP地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { merchant_whitelist } from "@a/merchant/set";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      id: "",
      title: "",
      list: []
    };
  },
  methods: {
    async getInfo(id) {
      const data = await merchant_whitelist({
        userId: id
      });
      this.list = data;
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
