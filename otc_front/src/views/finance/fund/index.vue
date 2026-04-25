<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <el-input placeholder="商户ID" v-model="params.userId" style="width: 30%; " @keyup.enter.native="search" />
        <el-select v-model="params.type" style="width: 30%;margin-left: 5px;" placeholder="账户类型">
          <el-option v-for="(item, index) in optAccountType" :key="index" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker style="width: 50%; margin-left: 10px;" @change="selectTime" v-model="value2"
          type="datetimerange" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期" align="right" :default-time="['00:00:00', '23:59:59']" />
        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        <el-button type="primary" @click="newEditAdd()"> 手动加款</el-button>
        <el-button type="primary" @click="newEditSub()"> 手动扣款</el-button>
      </div>
    </div>

    <div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%" stripe style="width: 100%">
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="balance" label="发起者余额"></el-table-column>
        <el-table-column prop="balance2" label="接收者余额"></el-table-column>
        <el-table-column label="账户类型">
          <template slot-scope="scope">
            {{ compcChecked(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="walletAddress" label="钱包地址"></el-table-column>
        <el-table-column label="操作类型">
          <template slot-scope="scope">
            {{ compcOperationType(scope.row.operationType) }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="Delete(scope.row)">删除</el-button>
          </template>
</el-table-column> -->
      </el-table>
    </div>
    <el-pagination background @size-change="sizeChange" @current-change="changePage" :current-page="params.current"
      :page-sizes="[10, 20, 30]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total"></el-pagination>
  </div>
</template>

<script>
import { operation_page } from "@a/finance";
import { optAccountType, optOperationType, enum_OperationType } from "@/utils/enum";

export default {
  name: "TransferRecord",
  components: {},
  data() {
    return {
      optAccountType,
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
      id: "",
      params: {
        size: 10,
        current: 1,
        type: '',
        startTime: null,
        endTime: null
      },
      total: 0,
      list: [], //表格数据
      selectedList: [], //批量删除的数组
      select: "",
      isShow: false,
      showOperate: false,
      fileList: []
    };
  },
  computed: {
    compcChecked() {
      return (val) => optAccountType.find(item => item.value == val)?.label;
    },
    compcOperationType() {
      return (val) => optOperationType.find(item => item.value == val)?.label;
    },
  },
  methods: {
    selectTime(val) {
      if (val) {
        this.params.startTime = val[0];
        this.params.endTime = val[1];
      }
    },
    //搜索
    search() {
      this.params.current = 1;
      this.List();
    },
    reset() {
      this.params = {};
      this.params.type = '';
      this.value2 = "";
      this.search();
    },
    back() {
      this.isShow = false;
    },

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
    async List() {
      this.params.descs = "a.update_time";
      const data = await operation_page(this.params);
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
    selectChange(val) {
      this.selectedList = val;
    },
    //删除接口
    async delData(array) {
      await TransferRecordDelete(array);
      this.$message.success("删除成功");
      this.search();
    },
    newEditAdd() {
      this.$router.push({
        name: "FundEdit",
        query: {
          operationType: enum_OperationType.add
        }
      });
    },
    newEditSub() {
      this.$router.push({
        name: "FundEdit",
        query: {
          operationType: enum_OperationType.sub
        }
      });
    },
    //编辑
    edit(row) {
      this.$router.push({
        name: "FundEdit",
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
  }
};
</script>
