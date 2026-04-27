<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <el-input placeholder="用户id" v-model="params.userId" style="width: 30%; " @keyup.enter.native="search" />
        <el-input placeholder="交易流水号" v-model="params.transNumber" style="width: 30%;margin-left: 10px; "
          @keyup.enter.native="search" />
        <!-- <el-select v-model="params.orderModel" style="width: 30%;margin-left: 5px;" placeholder="下单模式">
          <el-option v-for="(item, index) in optOrderModel" :key="index" :label="item.label"
            :value="item.value"></el-option>
        </el-select> -->
        <!-- <el-date-picker style="width: 50%; margin-left: 10px;" @change="selectTime" v-model="value2"
          type="datetimerange" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期" align="right" :default-time="['00:00:00', '23:59:59']" /> -->

        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
    </div>

    <div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%" stripe style="width: 100%">
        <el-table-column prop="transNumber" label="交易流水号" width="110"></el-table-column>
        <el-table-column prop="balance" label="转出人余额" width="110"></el-table-column>
        <el-table-column prop="fromId" label="转出人用户id" width="110"></el-table-column>
        <el-table-column prop="fromNickName" label="转出人"></el-table-column>
        <!-- <el-table-column prop="userId" label="用户id"></el-table-column> -->
        <!-- <el-table-column prop="nickName" label="用户名"></el-table-column> -->
        <el-table-column prop="purposeId" label="接收人用户id" width="120"></el-table-column>
        <el-table-column prop="balance2" label="接收人余额" width="100"></el-table-column>
        <el-table-column prop="purposeNickName" label="接收人"></el-table-column>
        <el-table-column prop="title" label="交易描述"></el-table-column>
        <el-table-column prop="money" label="交易金额"></el-table-column>
        <el-table-column prop="operator" label="操作人"></el-table-column>
        <el-table-column prop="updateBy" label="操作人工号" width="100"></el-table-column>
        <el-table-column prop="createTime" label="记录时间"></el-table-column>
        <el-table-column label="交易类型" fixed="right" width="100">
          <template slot-scope="scope">
            {{ compcChecked(scope.row.zdlx) }}
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
import { operation_fund_page } from "@a/finance";
import { optOrderModel, optCominPayType } from "@/utils/enum";

export default {
  name: "TransferRecord",
  components: {},
  data() {
    return {
      optOrderModel: optOrderModel,
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
      return (val) => optCominPayType.find(item => item.value === val)?.label;
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
      const data = await operation_fund_page(this.params);
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
        name: "newTransferRecord"
      });
    },
    //编辑
    edit(row) {
      this.$router.push({
        name: "newTransferRecord",
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
