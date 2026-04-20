<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <el-input placeholder="商户会员名" @keyup.enter.native="search" v-model="params.fullName"></el-input>
        <el-input placeholder="商户手机号码" @keyup.enter.native="search" style="margin-left: 5px;"
          v-model="params.phoneNum"></el-input>
        <el-input placeholder="商户ID" @keyup.enter.native="search" style="margin-left: 5px;"
          v-model="params.userId"></el-input>
        <el-input placeholder="名称" @keyup.enter.native="search" style="margin-left: 5px;"
          v-model="params.nickName"></el-input>
        <el-input placeholder="商户平台" @keyup.enter.native="search" style="margin-left: 5px;"
          v-model="params.postName"></el-input>
        <el-button style="margin-left: 5px;" type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        <!-- <el-button type="primary" icon="el-icon-plus" @click="newEdit()">
          添加
        </el-button> -->
      </div>
    </div>
    <div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%">
        <el-table-column prop="userId" label="商户ID" width="180"></el-table-column>
        <el-table-column prop="userName" label="商户登录账号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phoneNum" label="商户手机号码"></el-table-column>
        <el-table-column prop="lockStatusName" label="锁定状态"></el-table-column>
        <el-table-column prop="fullName" label="商户会员名"></el-table-column>
        <el-table-column prop="gatewayAddress" label="网关地址"></el-table-column>
        <el-table-column prop="appKey" label="api密钥"></el-table-column>
        <el-table-column prop="ip" label="接口ip白名单"></el-table-column>
        <el-table-column prop="postName" label="商户平台"></el-table-column>
        <el-table-column label="操作" width="450">
          <template slot-scope="scope">
            <el-button size="mini" @click="secretKey(scope.row)">查看密钥</el-button>
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="whitelist(scope.row)">API白名单</el-button>
            <el-button size="mini" type="primary">手续费</el-button>
            <el-button size="mini" type="primary" @click="paymentMethod(scope.row)">收款码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background @size-change="sizeChange" @current-change="changePage" :current-page="params.current"
      :page-sizes="[10, 20, 30]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total"></el-pagination>
  </div>
</template>

<script>
import { merchant_list } from "@a/merchant";
export default {
  name: "Admin",
  data() {
    return {
      params: {
        size: 10,
        current: 1,
        userName: null
      },
      total: 0,
      list: [] //表格数据
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    async editBlackUser(row) {
      this.$router.push({
        name: "EditBlackUser",
        query: row
      });
    },
    paymentMethod(row) {
      this.$router.push({
        name: "SetPaymentMethod",
        query: row
      });
    },
    whitelist(row) {
      this.$router.push({
        name: "SetWhitelist",
        query: row
      });
    },
    secretKey(row) {
      this.$router.push({
        name: "SetSecretKey",
        query: row
      });
    },
    search() {
      this.List();
    },
    reset() {
      this.params = {};
      this.List();
    },
    async List() {
      this.params.descs = "a.update_time";
      const data = await merchant_list(this.params);
      this.total = data.total;
      this.list = data.records;
    },
    sizeChange(val) {
      this.params.size = val;
      this.List();
    },
    changePage(val) {
      this.params.current = val;
      this.List();
    },
    edit(row) {
      this.$router.push({
        name: "SetEdit",
        query: {
          id: row.userId
        }
      });
    }
  }
};
</script>
