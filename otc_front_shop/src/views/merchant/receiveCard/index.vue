<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <!-- <el-input placeholder="用户ID" v-model="params.userId" style="width: 30%; "
          @keyup.enter.native="search"></el-input> -->
        <el-input placeholder="用户账号" v-model="params.userName" style="width: 40%;"
          @keyup.enter.native="search"></el-input>
        <!-- <el-date-picker style="width: 50%; margin-left: 10px;" @change="selectTime" v-model="value2"
          type="datetimerange" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" align="right">
        </el-date-picker> -->

        <!-- <el-select v-model="params.payType" style="width: 30%;margin-left: 5px;" placeholder="请选择">
          <el-option v-for="(item, index) in optPayType" :key="index" :label="item.label"
            :value="item.value"></el-option>
        </el-select> -->

        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        <el-button size="mini" type="primary" @click="newEdit">新增</el-button>
      </div>
    </div>

    <div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%" stripe style="width: 100%">
        <el-table-column prop="payType" label="付款类型">
          <template slot-scope="scope">
            {{ compcChecked(scope.row.payType) }}
          </template>
        </el-table-column>
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="userName" label="用户账号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="withdrawType" label="提现类型">
          <template slot-scope="scope">
            {{ compcChecked111(scope.row.withdrawType) }}
          </template>
        </el-table-column>
        <el-table-column prop="fcbAddress" label="货币地址"></el-table-column>
        <el-table-column prop="idCardName" label="银行卡姓名"></el-table-column>
        <el-table-column prop="bankCaller" label="银行名称"></el-table-column>
        <el-table-column prop="bankCode" label="银行编码"></el-table-column>
        <el-table-column prop="paymentQr" label="收款码图">
          <template slot-scope="scope">
            <img :src="scope.row.paymentQr" style="width: 50px; height: 50px" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
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
import { TransferRecordDelete, merchant_payMethodList } from "@a/merchant";
import { optPayType, optWithdrawType, optCominPayType } from "@/utils/enum";

export default {
  name: "TransferRecord",
  components: {},
  data() {
    return {
      value2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      optPayType: optPayType,
      id: "",
      params: {
        size: 10,
        current: 1,
        startTime: null,
        endTime: null
      },
      total: 0,
      list: [], //表格数据
      money: 0,
      selectedList: [], //批量删除的数组
      select: "",
      isShow: false,
      showOperate: false,
      fileList: []
    };
  },
  computed: {
    compcChecked() {
      return (val) => optCominPayType.find(item => item.value === val)?.label;
    },
    compcChecked111() {
      return (val) => optWithdrawType.find(item => item.value === val)?.label;
    }
  },
  methods: {
    formatCurrency(value) {
      if (typeof value !== "number") return "0.00";
      return value.toFixed(2);
    },
    selectTime(val) {
      if (val) {
        this.params.startTime = val[0];
        this.params.endTime = val[1];
      }
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
      this.value2 = "";
      this.search();
    },
    //返回搜索
    back() {
      this.isShow = false;
    },
    //获取列表
    async List() {
      this.params.descs = "a.update_time";
      const data = await merchant_payMethodList(this.params);
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

    //删除接口
    async delData(array) {
      await TransferRecordDelete(array);
      this.$message.success("删除成功");
      this.search();
    },
    //新增
    newEdit() {
      this.$router.push({
        name: "ReceiveCardEdit"
      });
    },
    //编辑
    edit(row) {
      this.$router.push({
        name: "ReceiveCardEdit",
        query: row
      });
    }
  },
  mounted() {
    this.search();
  }
};
</script>
