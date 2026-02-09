<template>
  <Layout>
    <div class="database_wrapper2">
      <div class="top_wrapper2">
        <div class="search_box">
          <span style="font-weight:800;font-size:16px;">项目名称：</span>
          <el-select
            v-model="params.xmId"
            placeholder="项目名称"
            filterable
            @change="xmChange"
            style="width: 20%;"
          >
            <el-option
              v-for="item in xmLists"
              :key="item.id"
              :label="item.xmmc"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="box_content2">
        <el-card class="box-card3">
          <div slot="header" class="clearfix">
            <span class="card-title">物联设备统计</span>
          </div>
          <div class="card-content">
            <div id="wlwsb" class="echartImg"></div>
            <div class="sum" v-if="dataInfo.wlsbtj">
              <div class="sumItem">
                设备总数:
                <span class="sumItemNum">{{ dataInfo.wlsbtj.sbzs }}</span>
              </div>
              <div class="sumItem">
                在线设备:
                <span class="sumItemNum">{{ dataInfo.wlsbtj.zxsb }}</span>
              </div>
              <div class="sumItem">
                离线设备:
                <span class="sumItemNum">{{ dataInfo.wlsbtj.lxsb }}</span>
              </div>
              <div class="sumItem">
                停用设备:
                <span class="sumItemNum">{{ dataInfo.wlsbtj.tysb }}</span>
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="box-card3">
          <div slot="header" class="clearfix">
            <span class="card-title">视频监控设备统计</span>
          </div>
          <div class="card-content">
            <div id="spjksb" class="echartImg"></div>
            <div class="sum" v-if="dataInfo2.spjksbtj">
              <div class="sumItem">
                设备总数:
                <span class="sumItemNum">{{ dataInfo2.spjksbtj.sbzs }}</span>
              </div>
              <div class="sumItem">
                在线设备:
                <span class="sumItemNum">{{ dataInfo2.spjksbtj.zxsb }}</span>
              </div>
              <div class="sumItem">
                离线设备:
                <span class="sumItemNum">{{ dataInfo2.spjksbtj.lxsb }}</span>
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="box-card3">
          <div slot="header" class="clearfix">
            <span class="card-title">企业设备离线率<span class="red">(数据包含自建及停用的数量)</span></span>
          </div>
          <div class="card-content">
            <el-table ref="multipleTable" :data="qysbList" height="100%">
              <el-table-column
                prop="company_name"
                show-overflow-tooltip
                label="企业名称"
              ></el-table-column>
              <el-table-column
                prop="szlxl"
                width="120px"
                label="物联设备离线率"
              >
               <template slot-scope="scope">
                  <span>{{ scope.row.szlxl}}({{ scope.row.szlxsl}}/{{ scope.row.szzs}})</span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="splxl" width="80px" label="">
               
              </el-table-column> -->
              <el-table-column prop="splxl" width="120px" label="视频离线率">
                <template slot-scope="scope">
                  <span>{{ scope.row.splxl || "-" }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
      <div class="box_content2">
        <el-card class="box-card3">
          <div slot="header" class="clearfix">
            <span class="card-title">故障类别统计分析</span>
          </div>
          <div class="card-content">
            <div id="bjlb" class="echartImg2"></div>
          </div>
        </el-card>
        <el-card class="box-card3">
          <div slot="header" class="clearfix">
            <span class="card-title">故障处理率</span>
          </div>
          <div class="card-content">
            <div id="bjcl" class="echartImg"></div>
            <div class="sum" v-if="dataInfo5.bjcll">
              <div class="sumItem">
                报警总数:
                <span class="sumItemNum">{{ dataInfo5.bjcll.bjzs }}</span>
              </div>
              <div class="sumItem">
                已处理报警:
                <span class="sumItemNum">{{ dataInfo5.bjcll.yclbj }}</span>
              </div>
              <div class="sumItem">
                待处理报警:
                <span class="sumItemNum">{{ dataInfo5.bjcll.wclbj }}</span>
              </div>
              <div class="sumItem">
                处理中报警:
                <span class="sumItemNum">{{ dataInfo5.bjcll.clzbj }}</span>
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="box-card3">
          <div slot="header" class="clearfix">
            <span class="card-title">企业故障统计分析</span>
            <span style="float:right;">
              <a
                style="margin-right:15px;color:#409EFF;cursor:pointer;"
                @click="rqClick(1)"
                >当日</a
              >
              <a
                style="margin-right:15px;color:#409EFF;cursor:pointer;"
                @click="rqClick(2)"
                >历史</a
              >
            </span>
          </div>
          <div class="card-content">
            <el-table ref="multipleTable" :data="wlsbList" height="100%">
              <el-table-column
                prop="company_name"
                show-overflow-tooltip
                label="企业名称"
              ></el-table-column>
              <el-table-column prop="bjsl" label="报警数量"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
      <el-card class="box-card4">
        <div slot="header" class="clearfix">
          <span class="card-title">故障设备统计分析</span>
        </div>
        <div class="card-content">
          <div class="top_wrapper2">
            <div class="search_box">
              <a
                :class="params2.lx == 1 ? 'tabActive' : 'noActive'"
                style="margin-right:15px;cursor:pointer;"
                @click="onTime(1)"
                >最近一天</a
              >
              <a
                :class="params2.lx == 2 ? 'tabActive' : 'noActive'"
                style="margin-right:15px;cursor:pointer;"
                @click="onTime(2)"
                >最近一周</a
              >
              <a
                :class="params2.lx == 3 ? 'tabActive' : 'noActive'"
                style="margin-right:15px;cursor:pointer;"
                @click="onTime(3)"
                >最近一个月</a
              >
              <a
                :class="params2.lx == 4 ? 'tabActive' : 'noActive'"
                style="margin-right:15px;cursor:pointer;"
                @click="onTime(4)"
                >最近三个月</a
              >
              <el-date-picker
                v-model="params2.sTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :clearable="false"
                placeholder="开始日期"
              >
              </el-date-picker>
              至
              <el-date-picker
                style="margin-right:15px;"
                v-model="params2.eTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :clearable="false"
                placeholder="结束日期"
              >
              </el-date-picker>
              <el-button type="primary" icon="el-icon-search" @click="search">
                搜索
              </el-button>
              <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
            </div>
          </div>
          <el-table ref="multipleTable" class="tableBox" :data="list2" border>
            <el-table-column
              prop="companyName"
              show-overflow-tooltip
              label="企业名称"
            ></el-table-column>
            <el-table-column
              prop="sbmc"
              show-overflow-tooltip
              label="设备名称"
            ></el-table-column>
            <el-table-column
              prop="xmmc"
              show-overflow-tooltip
              label="项目名称"
            ></el-table-column>
            <!-- <el-table-column   prop="bjcs"   show-overflow-tooltip    label="报警次数" ></el-table-column> -->
          </el-table>
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="changePage"
            :current-page="params2.current"
            :page-sizes="[10, 20, 30]"
            :page-size="params2.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import { xmList, sjfx, sjfx2, bjsbPage } from "@a/dashboard";
import Layout from "@v/layout";
export default {
  name: "dashboard",
  components: { Layout },
  data() {
    return {
      xmLists: [],
      wlsbList: [],
      qysbList: [],
      drList: [],
      lsList: [],
      params: {
        xmId: "",
      },
      params2: {
        size: 10,
        current: 1,
        lx: "1",
        sTime: "",
        eTime: "",
      },
      dataInfo: {},
      dataInfo2: {},
      dataInfo5: {},
      total: 0,
      list2: [],
      wlwsb: null,
      bjlb: null,
      spjksb: null,
      bjcl: null,
    };
  },
  async mounted() {
    await this.getList();
    // await this.getWlwsb();
    this.getWlwsb1();
    this.getWlwsb2();
    this.getWlwsb3();
    this.getWlwsb4();
    this.getWlwsb5();
    this.getWlwsb6();
    await this.List();
    window.onresize = () => {
      this.spjksb.resize();
      this.wlwsb.resize();
      this.bjcl.resize();
      this.bjlb.resize();
    };
  },
  methods: {
    async getList() {
      this.xmLists = [];
      this.xmLists.push({
        id: "",
        xmmc: "全部",
      });
      const data = await xmList();
      this.xmLists = [...this.xmLists, ...data];
    },
    xmChange(val) {
      //this.getWlwsb();
      
      this.getWlwsb1();
      this.getWlwsb2();
      this.getWlwsb3();
      this.getWlwsb4();
      this.getWlwsb5();
      this.getWlwsb6();
      this.List();
    },
    //每页多少条，切换显示条数
    sizeChange(val) {
      this.params2.size = val;
      this.List();
    },
    //当前第几页，切换页码
    changePage(val) {
      this.params2.current = val;
      this.List();
    },
    onTime(type) {
      this.params2.lx = type;
      this.params2.sTime = "";
      this.params2.eTime = "";
      this.List();
    },
    //搜索
    search() {
      this.params.current = 1;
      //列表查询和搜索
      this.List();
    },
    //重置
    reset() {
      this.params2 = {
        size: 10,
        current: 1,
        lx: "1",
        sTime: "",
        eTime: "",
      };
      this.List();
    },
    async List() {
      this.params2.xmId = this.params.xmId;
      if (this.params2.sTime || this.params2.eTime) {
        this.params2.lx = "";
      }
      const data = await bjsbPage(this.params2);

      this.total = data.total;
      this.list2 = data.records;
    },
    rqClick(type) {
      if (type == 1) {
        this.wlsbList = this.drList;
      } else {
        this.wlsbList = this.lsList;
      }
    },
    async getWlwsb1() {
      const data = await sjfx2(this.params, 1);
      this.dataInfo = data;
      const wlwsbList = [];
      if (data.wlsbtj) {
        wlwsbList.push({
          name: "离线率",
          value: data.wlsbtj.lxsb,
        });
        wlwsbList.push({
          name: "在线率",
          value: data.wlsbtj.zxsb,
        });
        wlwsbList.push({
          name: "停用率",
          value: data.wlsbtj.tysb,
        });
      }

      setTimeout(() => {
        this.wlwsb = this.$echarts.init(document.getElementById("wlwsb"));
        let wlwsbNum = isNaN(
          ((data.wlsbtj.zxsb / data.wlsbtj.sbzs) * 100).toFixed(1)
        )
          ? "-"
          : ((data.wlsbtj.zxsb / data.wlsbtj.sbzs) * 100).toFixed(1) + "%";

        this.wlwsb.setOption({
          color: ["#f56c6c", "#67c23a","#DBA710"],
          tooltip: {
            trigger: "item",
          },
          // title: [
          //   {
          //     left: "48%",
          //     top: "40%",
          //     textAlign: "center",
          //     text: "{a|" + "在线率" + "}",
          //     textStyle: {
          //       fontSize: 16,
          //       rich: {
          //         a: {
          //           fontSize: 15,
          //           color: "#000",
          //         },
          //       },
          //     },
          //     subtext: wlwsbNum,
          //     subtextStyle: {
          //       fontSize: 15,
          //       color: ["#000"],
          //     },
          //   },
          // ],
          // legend: { top: "bottom" },
          series: [
            {
              type: "pie",
              // radius: ["40%", "55%"],
              radius:'50%',
              // center: ["50%", "50%"],
              // avoidLabelOverlap: false,
              // itemStyle: {
              //   borderRadius: 10,
              //   borderColor: "#fff",
              //   borderWidth: 2,
              // },
              label: {
                show: true,
                formatter:'{b} :'+'\n'+'{d}%',
                // position: "", 
                fontSize:"13px"
              },
              labelLine: {
                show: true,
              },
              data: wlwsbList,
            },
          ],
        });
      });
    },

    async getWlwsb2() {
      const data = await sjfx2(this.params, 2);
      this.dataInfo2 = data;
      const spjksbList = [];
      if (data.spjksbtj) {
        spjksbList.push({
          name: "离线设备",
          value: data.spjksbtj.lxsb,
        });
        spjksbList.push({
          name: "在线设备",
          value: data.spjksbtj.zxsb,
        });
      }

      setTimeout(() => {
        this.spjksb = this.$echarts.init(document.getElementById("spjksb"));
        let spjkNum = isNaN(
          ((data.spjksbtj.zxsb / data.spjksbtj.sbzs) * 100).toFixed(1)
        )
          ? "-"
          : ((data.spjksbtj.zxsb / data.spjksbtj.sbzs) * 100).toFixed(1) + "%";
        this.spjksb.setOption({
          color: ["#f56c6c", "#67c23a"],
          tooltip: {
            trigger: "item",
          },
          title: [
            {
              left: "48%",
              top: "40%",
              textAlign: "center",
              text: "{a|" + "在线率" + "}",
              textStyle: {
                fontSize: 16,
                rich: {
                  a: {
                    fontSize: 18,
                    color: "#000",
                  },
                },
              },
              subtext: spjkNum,
              subtextStyle: {
                fontSize: 18,
                color: ["#000"],
              },
            },
          ],
          legend: { top: "bottom" },
          series: [
            {
              type: "pie",
              radius: ["55%", "70%"],
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: false,
              },
              data: spjksbList,
            },
          ],
        });
      });
    },

    async getWlwsb3() {
      const data = await sjfx2(this.params, 3);
      this.qysbList = data.qysblxl;
    },

    async getWlwsb4() {
      const data = await sjfx2(this.params, 4);
      setTimeout(() => {
        this.bjlb = this.$echarts.init(document.getElementById("bjlb"));

        this.bjlb.setOption({
          grid: {
            left: "15%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
            data: data.bjx,
            axisLabel: {
              // formatter: function (value) {
              //   return value.split("").join("\n");
              // },
              rotate:45,
              fontSize:'11px'
      	    }
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: data.bjy,
              type: "bar",
              label: {
                show: true, // 显示标签
                position: 'top' // 标签位置
              }
            },
          ],
        });
      });
    },

    async getWlwsb5() {
      const data = await sjfx2(this.params, 5);
      this.dataInfo5 = data;
      const bjcllList = [];
      if (data.bjcll) {
        bjcllList.push({
          name: "待处理",
          value: data.bjcll.wclbj,
        });
        bjcllList.push({
          name: "已处理",
          value: data.bjcll.yclbj,
        });
        bjcllList.push({
          name: "处理中",
          value: data.bjcll.clzbj,
        });
      }

      setTimeout(() => {
        this.bjcl = this.$echarts.init(document.getElementById("bjcl"));
        let bjcllNum = isNaN(
          ((data.bjcll.yclbj / data.bjcll.bjzs) * 100).toFixed(1)
        )
          ? "-"
          : ((data.bjcll.yclbj / data.bjcll.bjzs) * 100).toFixed(1) + "%";

        this.bjcl.setOption({
          color: ["#f56c6c", "#67c23a","#DBA710"],
          tooltip: {
            trigger: "item",
          },
          // title: [
          //   {
          //     left: "48%",
          //     top: "40%",
          //     textAlign: "center",
          //     text: "{a|" + "处理率" + "}",
          //     textStyle: {
          //       fontSize: 16,
          //       rich: {
          //         a: {
          //           fontSize: 18,
          //           color: "#000",
          //         },
          //       },
          //     },
          //     subtext: data.bjcll.clv + "%",
          //     subtextStyle: {
          //       fontSize: 18,
          //       color: ["#000"],
          //     },
          //   },
          // ],
          // legend: { top: "bottom" },
          series: [
            {
              type: "pie",
              // radius: ["55%", "70%"],
              // center: ["50%", "50%"],
              // avoidLabelOverlap: false,
              // itemStyle: {
              //   borderRadius: 10,
              //   borderColor: "#fff",
              //   borderWidth: 2,
              // },
              radius:"50%",
              label: {
                show: true,
                fontSize:"13px",
                formatter:'{b} :'+'\n'+'{d}%',
              },
              labelLine: {
                show: true,
              },
              data: bjcllList,
            },
          ],
        });
      });
    },
    
    async getWlwsb6() {
      const data = await sjfx2(this.params, 6);
      this.drList = data.bjtjfx;
      this.lsList = data.bjtjfxls;
      this.wlsbList = data.bjtjfx;
    },

    async getWlwsb() {
      const data = await sjfx(this.params);
      this.dataInfo = data;
      const wlwsbList = [];
      if (data.wlsbtj) {
        wlwsbList.push({
          name: "离线设备",
          value: data.wlsbtj.lxsb,
        });
        wlwsbList.push({
          name: "在线设备",
          value: data.wlsbtj.zxsb,
        });
      }
      const spjksbList = [];
      if (data.spjksbtj) {
        spjksbList.push({
          name: "离线设备",
          value: data.spjksbtj.lxsb,
        });
        spjksbList.push({
          name: "在线设备",
          value: data.spjksbtj.zxsb,
        });
      }
      const bjcllList = [];
      if (data.bjcll) {
        bjcllList.push({
          name: "未处理",
          value: data.bjcll[0].wclbj,
        });
        bjcllList.push({
          name: "已处理",
          value: data.bjcll[0].yclbj,
        });
      }
      setTimeout(() => {
        this.qysbList = data.qysblxl;
        this.drList = data.bjtjfx;
        this.lsList = data.bjtjfxls;
        this.wlsbList = data.bjtjfx;
        this.wlwsb = this.$echarts.init(document.getElementById("wlwsb"));
        this.bjcl = this.$echarts.init(document.getElementById("bjcl"));
        this.spjksb = this.$echarts.init(document.getElementById("spjksb"));
        this.bjlb = this.$echarts.init(document.getElementById("bjlb"));
        console.log(
          ((data.spjksbtj.zxsb / data.spjksbtj.sbzs) * 100).toFixed(1)
        );
        let spjkNum = isNaN(
          ((data.spjksbtj.zxsb / data.spjksbtj.sbzs) * 100).toFixed(1)
        )
          ? "-"
          : ((data.spjksbtj.zxsb / data.spjksbtj.sbzs) * 100).toFixed(1) + "%";
        let wlwsbNum = isNaN(
          ((data.wlsbtj.zxsb / data.wlsbtj.sbzs) * 100).toFixed(1)
        )
          ? "-"
          : ((data.wlsbtj.zxsb / data.wlsbtj.sbzs) * 100).toFixed(1) + "%";
        let bjcllNum = isNaN(
          ((data.bjcll[0].yclbj / data.bjcll[0].bjzs) * 100).toFixed(1)
        )
          ? "-"
          : ((data.bjcll[0].yclbj / data.bjcll[0].bjzs) * 100).toFixed(1) + "%";
        this.spjksb.setOption({
          color: ["#f56c6c", "#67c23a"],
          tooltip: {
            trigger: "item",
          },
          title: [
            {
              left: "48%",
              top: "40%",
              textAlign: "center",
              text: "{a|" + "在线率" + "}",
              textStyle: {
                fontSize: 16,
                rich: {
                  a: {
                    fontSize: 18,
                    color: "#000",
                  },
                },
              },
              subtext: spjkNum,
              subtextStyle: {
                fontSize: 18,
                color: ["#000"],
              },
            },
          ],
          legend: { top: "bottom" },
          series: [
            {
              type: "pie",
              radius: ["55%", "70%"],
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: false,
              },
              data: spjksbList,
            },
          ],
        });
        this.wlwsb.setOption({
          color: ["#f56c6c", "#67c23a"],
          tooltip: {
            trigger: "item",
          },
          title: [
            {
              left: "48%",
              top: "40%",
              textAlign: "center",
              text: "{a|" + "在线率" + "}",
              textStyle: {
                fontSize: 16,
                rich: {
                  a: {
                    fontSize: 18,
                    color: "#000",
                  },
                },
              },
              subtext: wlwsbNum,
              subtextStyle: {
                fontSize: 18,
                color: ["#000"],
              },
            },
          ],
          legend: { top: "bottom" },
          series: [
            {
              type: "pie",
              radius: ["55%", "70%"],
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: false,
              },
              data: wlwsbList,
            },
          ],
        });
        this.bjcl.setOption({
          color: ["#f56c6c", "#67c23a"],
          tooltip: {
            trigger: "item",
          },
          title: [
            {
              left: "48%",
              top: "40%",
              textAlign: "center",
              text: "{a|" + "处理率" + "}",
              textStyle: {
                fontSize: 16,
                rich: {
                  a: {
                    fontSize: 18,
                    color: "#000",
                  },
                },
              },
              subtext: bjcllNum,
              subtextStyle: {
                fontSize: 18,
                color: ["#000"],
              },
            },
          ],
          legend: { top: "bottom" },
          series: [
            {
              type: "pie",
              radius: ["55%", "70%"],
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: false,
              },
              data: bjcllList,
            },
          ],
        });
        this.bjlb.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
            data: data.bjx,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: data.bjy,
              type: "bar",
            },
          ],
        });
      }, 0);
    },
  },
};
</script>

<style lang="scss">
.database_wrapper2 {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
}
.top_wrapper2 {
  margin-bottom: 20px;
}
.box_content2 {
  display: flex;
  align-items: center;
}
.box-card4 {
  width: 98%;
  min-height: 530px;
  .tableBox {
    min-height: 340px;
  }
  .card-title {
    font-size: 18px;
    font-weight: 800;
  }
  .card-content {
    width: 100%;
    min-height: 380px;
  }
}
.box-card3 {
  width: 32%;
  height: 330px;
  margin-bottom: 20px;
  margin-right: 1%;
  .el-card__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-table::before {
    background-color: #fff;
  }
  .el-table .el-table__cell {
    padding: 10px 0;
  }
  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
  }
  .card-title {
    font-size: 18px;
    font-weight: 800;
  }
  .card-content {
    width: 100%;
    height: 260px;
    display: flex;
    align-items: center;
    .echartImg {
      width: 100%;
      height: 230px;
    }
    .echartImg2 {
      width: 100%;
      height: 230px;
    }
    .sum {
      width: 45%;
      margin-left: 5%;
      font-weight: 800;
      .sumItem {
        font-size: 16px;
        margin-bottom: 15px;
      }
    }
  }
}
.tabActive {
  color: #67c23a;
}
.noActive {
  color: #409eff;
}
.red{
  color:red;
  font-size: 17px;
}
</style>
