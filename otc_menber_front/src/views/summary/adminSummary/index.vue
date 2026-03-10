[2026/3/10 0:39] Way Andy: <template>
  <div class="list_page">
    <div class="cardbox">
      <div class="summary_controls">
        <el-radio-group v-model="timeFilter" size="small" @change="loadTotals">
          <el-radio-button label="today">当日</el-radio-button>
          <el-radio-button label="thisWeek">本周</el-radio-button>
          <el-radio-button label="lastWeek">上一周</el-radio-button>
          <el-radio-button label="lastMonth">上一月</el-radio-button>
          <el-radio-button label="thisMonth">本月</el-radio-button>
        </el-radio-group>
      </div>
      <div class="summary_cards">
        <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>卖单总金额</span>
          </div>
          <div class="summary_amount">¥ {{ res?.amountSell || 0 }}</div>
        </el-card>
        <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>买单总金额</span>
          </div>
          <div class="summary_amount">¥ {{ res?.amountBuy || 0 }}</div>
        </el-card>
        <el-card class="summary_card">
          <div slot="header" class="clearfix">
            <span>注册总人数</span>
          </div>
          <div class="summary_amount">¥ {{ res?.totalUser || 0 }}</div>
        </el-card>
      </div>
    </div>
    <div class="top_wrapper">
      <!-- <div class="search_box">
        <el-input placeholder="码商名称" v-model="params.transNumber" style="width: 30%; " @keyup.enter.native="search">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </div> -->
    </div>
    <div class="table_wrapper" style="height: calc(100% - 300px);">
      <el-table ref="multipleTable" :data="res.dataList || []" border height="100%" stripe style="width: 100%;">
        <el-table-column prop="nickName" label="码商名称"></el-table-column>
        <el-table-column prop="amountFirst" label="卖单金额"></el-table-column>
        <el-table-column prop="amountSecond" label="买单金额"></el-table-column>
        <el-table-column prop="amountThird" label="余额"></el-table-column>
        <!-- <el-table-column prop="amountThird" label="余额">
          <template slot-scope="scope">
            {{ formatCurrency(scope.row.amountThird) }}
          </template>
</el-table-column> -->
        <!-- <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">查看</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <!-- <el-pagination background @size-change="sizeChange" @current-change="changePage" :current-page="params.current"
      :page-sizes="[10, 20, 30]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total"></el-pagination> -->
  </div>
</template>

<script>
import { TransferRecordPage, statistical_count } from "@a/summary";
export default {
  name: "TransferRecord",
  components: {},
  data() {
    return {
      params: {
        size: 10,
        current: 1,
        startTime: null,
        endTime: null
      },
      total: 0,
      list: [], //表格数据
      money: 0,
      timeFilter: "thisMonth",
      res: {}
    };
  },
  methods: {
    formatCurrency(value) {
      if (typeof value !== "number") return "0.00";
      return value.toFixed(2);
    },
    sumByDirection(records, dir) {
      const key = dir === "in" ? "代收" : "代付";
      return (records || [])
        .filter(r => ((r.zdlxName || "") + "").indexOf(key) !== -1)
        .reduce((s, r) => s + (Number(r.money) || 0), 0);
    },
    async loadTotals() {
      const params = {
        "queryUserKind": "1",  // 1平台，2码商，3商户
        "timeType": this.timeFilter // today,thisWeek,lastWeek,lastMonth,thisMonth
        // "userId": ''   //  用户Id  this.userInfo.userId 
      }
      try {
        statistical_count(params).then((res) => {
          console.log(222, res)
          this.res = res || {};
        });
        // const test = {
        //   "code": "200",
        //   "msg": "操作成功",
        //   "data": {
        //     "createBy": null,
        //     "createName": null,
        //     "createTime": null,
        //     "updateBy": null,
        //     "updateTime": null,
        //     "updateName": null,
        //     "isDelete": 0,
        //     "queryType": null,
        //     "amountSell": 220,// 卖单总金额 （代付）
        //     "amountBuy": 562, // 买单总金额 （代收）
        //     "totalUser": 2, // 注册总人数 （总人数）
        //     "dataList": [
        //       {
        //         "userId": "2027753373462396929", // 用户id
        //         "userName": null,
        //         "nickName": "高二", //  ##用户昵称  （码商名称）
        //         "amountFirst": 160,  // ##  总后台/ 码商后 卖单金额（出款金额）  商户平台 充值金额 
        //         "amountSecond": 0,   // ## 买单金额  （收款金额）
        //         "amountThird": 890,  // ## 余额  
        //         "money": 0,
        //         "time1": null
        //       }
        //     ]
        //   }
        // }
        // this.res = test.data || {};
      } catch (e) {
        this.inTotal = 0;
        this.outTotal = 0;
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
      this.search();
    },
    async List() {
      this.params.descs = "a.update_time";
      const data = await TransferRecordPage(this.params);
      this.total = data.page.total;
      this.list = data.page.records;
      this.money = data.money;
      // 数据加载完成后，强制更新表格以确保合计行正确显示
      this.$nextTick(() => {
        this.$refs.multipleTable && this.$refs.multipleTable.doLayout();
      });
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

    //编辑
    edit(row) {
      this.$router.push({
        name: "adminSummaryEdit",
        query: {
          id: row.id
        }
      });
    }
  },
  mounted() {
    this.search();
    this.loadTotals();
  }
};
</script>
<style scoped>
.summary_controls {
  margin-bottom: 12px;
}

.summary_cards {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.summary_card {
  flex: 1;
}

.summary_amount {
  font-size: 22px;
  font-weight: 700;
  color: var(--primary);
}
</style>