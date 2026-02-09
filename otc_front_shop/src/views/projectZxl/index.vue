<template>
  <Layout>
    <div class="list_page">
      <div class="top_wrapper">
        <div class="search_box">
          <el-date-picker
            style="width: 300px;"
            v-model="params.ny"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            :clearable="false"
            placeholder="年月"
            @keyup.enter.native="search"
          >
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" @click="search">
            搜索
          </el-button>
          <!-- <el-button icon="el-icon-refresh" @click="reset">重置</el-button> -->
        </div>
      </div>

      <div>
        <el-table ref="multipleTable" :data="list.list" border>
          <el-table-column fixed prop="xmmc" width="400px" label="项目名称">
            <template slot-scope="scope">
              <span
                @click="detail(scope.row)"
                style="color:#409eff;cursor:pointer"
                >{{ scope.row.xmmc }}</span
              >
            </template>
          </el-table-column>
          <el-table-column v-for="item in list.rq" :key="item" :label="item">
            <template slot-scope="scope">
              <div v-for="(item2, index) in scope.row.zxl" :key="index">
                <span v-if="index + 1 == item">
                  {{ item2 }}<span v-if="item2">%</span>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-drawer :title="title" size="960px" :visible.sync="drawer">
        <div class="drawer-content">
          <div class="search_box">
            <el-date-picker
              style="width: 300px;margin-right:10px;margin-left:60px;"
              v-model="params2.ny"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              :clearable="false"
              placeholder="年月"
              @keyup.enter.native="search2"
            >
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="search2">
              搜索
            </el-button>
            <!-- <el-button icon="el-icon-refresh" @click="reset">重置</el-button> -->
          </div>
          <div id="xmsbzxl" class="echartImg"></div>
        </div>
      </el-drawer>
    </div>
  </Layout>
</template>

<script>
import { sbzxl, xmsbzxl } from "@a/dashboard";
import Layout from "@v/layout";
export default {
  name: "projectZxl",
  components: { Layout },
  data() {
    return {
      params: {
        ny: "",
      },
      params2: {
        ny: "",
        xmId: "",
      },
      xmsb: null,
      drawer: false,
      total: 0,
      title: "设备在线率",
      currentMonth: "",
      list: [], //表格数据
    };
  },
  created() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    if (currentMonth < 10) {
      currentMonth = "0" + currentMonth; // 如果月份小于10，则补零
    }
    this.currentMonth = year + "-" + currentMonth;
    this.params.ny = this.currentMonth;
  },
  methods: {
    search() {
      //列表查询和搜索
      this.List();
    },
    search2() {
      //列表查询和搜索
      this.List2();
    },
    detail(row) {
      this.drawer = true;
      this.params2.xmId = row.xm_id;
      this.params2.ny = this.currentMonth;
      this.List2();
    },
    //重置
    reset() {
      this.params = {
        size: 10,
        current: 1,
        ny: this.currentMonth,
      };
      this.List();
    },
    //重置

    //获取列表
    async List() {
      const data = await sbzxl(this.params);
      this.list = data;
    },
    async List2() {
      const data = await xmsbzxl(this.params2);
      setTimeout(() => {
        this.xmsb = this.$echarts.init(document.getElementById("xmsbzxl"));
        this.xmsb.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: "category",
            data: data.rq,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: data.list,
              type: "line",
            },
          ],
        });
      }, 0);
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
  },
  mounted() {
    this.search();
  },
};
</script>
<style>
.table_wrapper2 {
  width: 45%;
}
.table_box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
#xmsbzxl {
  width: 100%;
  height: 500px;
}
</style>
