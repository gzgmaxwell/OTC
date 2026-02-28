<template>
  <div class="list_page">



    <div class="top_wrapper">
      <div class="search_box">

        <el-input placeholder="姓名" style="width: 30%;" v-model="params.fullName" @keyup.enter.native="search"></el-input>
        <el-input placeholder="手机号" style="width: 30%; margin-left: 5px;" v-model="params.phoneNum"
          @keyup.enter.native="search"></el-input>
        <el-input placeholder="身份证号" style="width: 30%;margin-left: 5px;" v-model="params.idNumber"
          @keyup.enter.native="search"></el-input>

        <el-button type="primary" icon="el-icon-search" @click="search">
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
        <el-table-column prop="fullName" label="姓名"></el-table-column>
        <el-table-column prop="userName" label="用户帐号"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号码"></el-table-column>
        <el-table-column prop="emailAddress" label="邮箱地址"></el-table-column>
        <el-table-column prop="money" label="余额"></el-table-column>
        <el-table-column prop="idNumber" label="身份证号"></el-table-column>
        <el-table-column prop="walletAddress" label="钱包地址"></el-table-column>
        <el-table-column label="操作" width="310">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">查看</el-button>
            <el-button size="mini" type="success" v-if="userId != scope.row.userId" @click="handleTransfer(scope.row)">
              转入
            </el-button>
            <el-button size="mini" type="danger" v-if="userId != scope.row.userId" @click="handleWithdraw(scope.row)">
              转出
            </el-button>
            <el-button size="mini" type="danger" @click="delData(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background @size-change="sizeChange" @current-change="changePage" :current-page="params.current"
      :page-sizes="[10, 20, 30]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total"></el-pagination>


    <!-- 转入金额弹窗 -->
    <el-dialog title="请输入转入金额" :visible.sync="transferDialogVisible" width="30%" @close="clearTransferForm">
      <el-form :model="transferForm" label-position="left" label-width="80px">
        <el-form-item label="金额">
          <el-input v-model="transferForm.money" placeholder="请输入金额，如 0.01" type="text"
            @input="formatMoneyInput('transfer')" @blur="ensureTwoDecimals('transfer')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="transferDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmTransfer">确认</el-button>
      </span>
    </el-dialog>

    <!-- 转出金额弹窗 -->
    <el-dialog title="请输入转出金额" :visible.sync="withdrawDialogVisible" width="30%" @close="clearWithdrawForm">
      <el-form :model="withdrawForm" label-position="left" label-width="80px">
        <el-form-item label="金额">
          <el-input v-model="withdrawForm.money" placeholder="请输入金额，如 0.01" type="text"
            @input="formatMoneyInput('withdraw')" @blur="ensureTwoDecimals('withdraw')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="withdrawDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmWithdraw">确认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import { UserAccountPage, UserAccountDelete, Transfer, TransferRecordDelete } from "@a/transaction";



export default {
  name: "UserAccount",
  components: {},
  data() {
    return {
      id: "",
      params: {
        size: 10,
        current: 1
      },
      total: 0,
      list: [], //表格数据
      selectedList: [], //批量删除的数组
      select: "",
      isShow: false,
      showOperate: false,
      fileList: [],
      // === 转入相关 ===
      transferDialogVisible: false,
      transferForm: {
        fromId: null,
        purposeId: null,
        money: ""
      },

      // === 转出相关 ===
      withdrawDialogVisible: false,
      withdrawForm: {
        fromId: null,
        purposeId: null,
        money: ""
      }
    };
  },
  created() { },
  methods: {
    // === 转入 ===
    handleTransfer(row) {
      this.transferForm.fromId = this.userId;
      this.transferForm.purposeId = row.userId;
      this.transferForm.money = "";
      this.transferDialogVisible = true;
    },
    // === 转出 ===
    handleWithdraw(row) {
      this.withdrawForm.fromId = row.userId;     // 钱从对方账户转出
      this.withdrawForm.purposeId = this.userId; // 转入当前用户
      this.withdrawForm.money = "";
      this.withdrawDialogVisible = true;
    },
    // === 金额输入控制（保留，提升体验）===
    formatMoneyInput(type) {
      const form = type === 'transfer' ? this.transferForm : this.withdrawForm;
      let value = form.money;
      // 移除非数字和小数点
      value = value.replace(/[^\d.]/g, '');
      // 防止多个小数点
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }
      // 限制小数位最多两位
      if (parts[1] && parts[1].length > 2) {
        value = parts[0] + '.' + parts[1].substring(0, 2);
      }
      form.money = value;
    },
    ensureTwoDecimals(type) {
      const form = type === 'transfer' ? this.transferForm : this.withdrawForm;
      if (form.money) {
        const num = parseFloat(form.money);
        if (!isNaN(num)) {
          form.money = num.toFixed(2);
        }
      }
    },
    async confirmTransfer() {
      if (!this.validateMoney(this.transferForm.money)) return;

      const money = parseFloat(this.transferForm.money);
      await Transfer({
        fromId: this.transferForm.fromId,
        purposeId: this.transferForm.purposeId,
        money: money
      });
      this.$message.success(`已提交向用户转入 ${money.toFixed(2)} 元`);
      this.transferDialogVisible = false;
      this.search();
    },
    async confirmWithdraw() {
      if (!this.validateMoney(this.withdrawForm.money)) return;

      const money = parseFloat(this.withdrawForm.money);
      await Transfer({
        fromId: this.withdrawForm.fromId,
        purposeId: this.withdrawForm.purposeId,
        money: money
      });
      this.$message.success(`已提交从用户转出 ${money.toFixed(2)} 元`);
      this.withdrawDialogVisible = false;
      this.search();
    },
    clearTransferForm() {
      this.transferForm.fromId = null;
      this.transferForm.purposeId = null;
      this.transferForm.money = "";
    },
    clearWithdrawForm() {
      this.withdrawForm.fromId = null;
      this.withdrawForm.purposeId = null;
      this.withdrawForm.money = "";
    },
    // ✅ 新增：金额格式校验（基于字符串）
    validateMoney(moneyStr) {
      if (!moneyStr || moneyStr.trim() === '') {
        this.$message.warning("请输入金额");
        return false;
      }

      // 去除前后空格
      moneyStr = moneyStr.trim();

      // 正则：匹配正数，允许整数或最多两位小数
      // - 不允许负号
      // - 允许 0.01, 1, 123.45
      // - 不允许 .5 或 00.5（但 0.5 是允许的）
      const reg = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

      if (!reg.test(moneyStr)) {
        this.$message.warning("请输入大于0的有效金额，最多保留两位小数（例如：0.01、10、123.45）");
        return false;
      }

      const num = parseFloat(moneyStr);
      if (num <= 0) {
        this.$message.warning("金额必须大于0");
        return false;
      }

      return true;
    },
    //删除接口
    async delData(row) {
      const ids = [row.id];
      await TransferRecordDelete(ids);
      this.$message.success("删除成功");
      this.search();

    },
    //搜索
    search() {
      this.params.current = 1;
      //列表查询和搜索
      this.List();
    },
    //重置
    reset() {
      this.params = {};
    },
    //返回搜索
    back() {
      this.isShow = false;
    },

    //批量删除
    totalDel(total) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var totalArr = [];
          total.forEach(item => {
            totalArr.push(item.id);
          });
          this.delData(totalArr);
        })
        .catch(() => { });
    },
    //获取列表
    async List() {
      this.params.descs = "a.update_time";
      const data = await UserAccountPage(this.params);

      this.total = data.total;
      this.list = data.records;

    },
    //每页多少条，切换显示条数
    sizeChange(val) {
      this.params.size = val;
      this.List();
    },
    //当前第几页，切换页码
    changePage(val) {
      this.params.current = val;
      this.List();
    },
    //选择批量删除的数据
    selectChange(val) {
      this.selectedList = val;
    },
    //设置表格表头颜色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #f2f2f2;color: #333;font-weight: 500;";
      }
    },
    //删除接口
    async delData(array) {
      await UserAccountDelete(array);

      this.$message.success("删除成功");

      this.search();

    },
    //新增
    newEdit() {
      this.$router.push({
        name: "newUserAccount"
      });
    },
    //编辑
    edit(row) {
      this.$router.push({
        name: "newUserAccount",
        query: {
          id: row.id
        }
      });
    },
    //删除
    Delete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var arr = [];
          arr.push(row.id);
          this.delData(arr);
        })
        .catch(() => { });
    }
  },
  mounted() {
    this.search();
    this.userId = this.userInfo?.userId || '';
    console.log('当前用户ID:', this.userId);
  }
};
</script>

