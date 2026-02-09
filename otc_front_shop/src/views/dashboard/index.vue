<template>
  <Layout>
  <div class="dashboard_wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">运营概况</span>
      </div>
      <div class="card-content6">
        <div v-for="item in yyList" :key="item.name" class="card-item">
            <div class="item-left">
              <img :src="item.img"/>
            </div>
            <div class="item-right">
              <div class="item-right-title">{{item.name}}</div>
              <div class="item-right-num1">{{item.num}}</div>
              <div class="item-right-num3" @click="dialogTableVisible = true" v-if="item.lxNum&&item.name=='物联设备在线数'">离线和停用数量：{{item.lxNum}}</div>
              <div class="item-right-num2" @click="dialogTableVisible1 = true" v-if="item.lxNum&&item.name!='物联设备在线数'">离线和停用数量：{{item.lxNum}}</div>
            </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">实时概况</span>
      </div>
      <div class="card-content8">
        <div v-for="item in gkList" :key="item.name" class="card-item">
            <div class="item-left">
              <img :src="item.img"/>
            </div>
            <div class="item-right">
              <div class="item-right-title">{{item.name}}</div>
              <div class="item-right-num1">{{item.num}}</div>
            </div>
        </div>
      </div>
    </el-card>
    <div class="table-box">
      <el-card class="box-card2">
        <div slot="header" class="clearfix">
          <span class="card-title">最近三日设备离线</span>
        </div>
        <div class="table_wrapper">
          <el-table ref="multipleTable" :data="list" border>
            <el-table-column
              prop="companyName"
              label="企业名称"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="sbmc"
              label="设备名称"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="bjnr"
              label="报警内容"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="sblxName"
              label="设备类型"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="dtu"
              label="设备编号"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="离线时间"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
          
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="changePage"
            :current-page="params.current"
            :page-sizes="[10, 20, 30]"
            :page-size="params.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div slot="header" class="clearfix">
          <span class="card-title">近三日设备报警</span>
        </div>
        <div class="table_wrapper">
          <el-table ref="multipleTable" :data="list2" border>
            <el-table-column
              prop="companyName"
              label="企业名称"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="sbmc"
              label="设备名称"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="bjnr"
              label="报警内容"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="sblxName"
              label="设备类型"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="dtu"
              label="设备编号"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="报警时间"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
          
          <el-pagination
            background
            @size-change="sizeChange2"
            @current-change="changePage2"
            :current-page="params2.current"
            :page-sizes="[10, 20, 30]"
            :page-size="params2.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total2"
          ></el-pagination>
        </div>
      </el-card>
    </div>
    <el-dialog title="物联设备故障统计" :visible.sync="dialogTableVisible">
      <div class="ycl">已处理</div>
      <el-table :data="wlData">
        <el-table-column property="gzlb1Name" label="故障原因" width="250"></el-table-column>
        <el-table-column property="gzlb2Name" label="具体原因"></el-table-column>
        <el-table-column property="gzsl" label="故障数量" width="300"></el-table-column>
      </el-table>
      <div class="dcl">待处理</div>
      <div class="dclsl" @click="wlJump" >待处理数量：{{this.wlNum}}</div>
       <div class="dcl">已停用</div>
      <div class="dclsl" @click="wltyJump" >已停用数量：{{this.wltyNum}}</div>
    </el-dialog>
    <el-dialog title="摄像头设备故障统计" :visible.sync="dialogTableVisible1">
      <div class="ycl">已处理</div>
      <el-table :data="sxtData">
        <el-table-column property="gzlb1Name" label="故障原因" width="250"></el-table-column>
        <el-table-column property="gzlb2Name" label="具体原因"></el-table-column>
        <el-table-column property="gzsl" label="故障数量" width="300"></el-table-column>
      </el-table>
      <div class="dcl">待处理</div>
      <div class="dclsl" @click="sxtJump" >待处理数量：{{this.sxtNum}}</div>
    </el-dialog>
  </div>
  </Layout>
</template>

<script>
import { disasterInfo, tableInfo, tableInfo2 } from "@a/dashboard";
import {DataWlCount,DataSxtCount} from '../../api/home'
import imgUrl1 from "@/assets/images/sbsl.png";
import imgUrl2 from "@/assets/images/sbzxsl.png";
import imgUrl3 from "@/assets/images/sxj.png";
import imgUrl4 from "@/assets/images/sxjzxsl.png";
import imgUrl5 from "@/assets/images/bj.png";
import bjbg from "@/assets/images/bjbg.png";
import Layout from "@v/layout";
// 
export default {
  name:'dashboard',
  components: { Layout },
  data(){
    return {
      yyList: [
        {
          name: '物联设备总数',
          img: imgUrl1,
          num: '0'
        },
        {
          name: '物联设备在线数',
          img: imgUrl2,
          num: '0',
          lxNum: '0'
        },
        {
          name: '摄像头设备总数',
          img: imgUrl3,
          num: '0'
        },
        {
          name: '摄像头设备在线数',
          img: imgUrl4,
          num: '0',
          lxNum: '0'
        }
      ],
      gkList: [
        {
          name: '今日设备离线数',
          img: imgUrl5,
          num: '0'
        },
        {
          name: '今日设备报警数',
          img: imgUrl5,
          num: '0'
        }
      ],
      params: {
        size: 10,
        current: 1,
        userName: null
      },
      total: 0,
      list: [], //表格数据
      params2: {
        size: 10,
        current: 1,
        userName: null
      },
      total2: 0,
      list2: [], //表格数据,
      wlData:[], //物联设备离线数量
      sxtData:[], //摄像头设备离线数量，
      dialogTableVisible: false,
      dialogTableVisible1: false,
      wlNum:0,
      sxtNum:0,
      wltyNum:0
    }
  },
  mounted(){
    this.info();
    this.List();
    this.List2();
    this.goShebei();
    this.goVideo();
  },
  methods:{
    async info() {
      const data = await disasterInfo();
      this.yyList[0].num = data.wlsbzs;
      this.yyList[1].num = data.wlsbzxs;
      this.yyList[1].lxNum = data.wlsblxs;
      this.yyList[2].num = data.sxtsbzs;
      this.yyList[3].num = data.sxtsbzxs;
      this.yyList[3].lxNum = data.sxtsblxs;
      this.gkList[0].num = data.jrsblxs;
      this.gkList[1].num = data.jrsbbjs;
    },
    async List() {
      this.params.descs = "a.update_time";
      const data = await tableInfo(this.params);
      this.total = data.total;
      this.list = data.records;
    },
    async List2() {
      this.params2.descs = "a.update_time";
      const data = await tableInfo2(this.params2);
      this.total2 = data.total;
      this.list2 = data.records;
    },
    //物联设备
    async goShebei() {
      await DataWlCount().then(res=>{
        console.log(res,243);
        this.wlData=res.ycl.list
        this.wlNum=res.dcl.num
        this.wltyNum=res.tysb.list
      })
    },
    //摄像头设备
    async goVideo() {
      await DataSxtCount().then(res=>{
        console.log(res,255);
        this.sxtData=res.ycl.list
        this.sxtNum=res.dcl.num
      })
    },
    // 物联设备跳转
    wlJump(){
      this.$router.push({
        name: "warning",
        query: {
          type: '1'
        }
      });
    },
    // 物联停用设备跳转
    wltyJump(){
      this.$router.push({
        name: "device",
        query: {
          type: '1'
        }
      });
    },
    // 摄像头设备跳转
    sxtJump(){
      this.$router.push({
        name: "warning",
        query: {
          type: '2'
        }
      });
    },
    // 每页多少条，切换显示条数
    sizeChange(val) {
      this.params.size = val;
      this.List();
    },
    // 当前第几页，切换页码
    changePage(val) {
      this.params.current = val;
      this.List();
    },
    // 每页多少条，切换显示条数
    sizeChange2(val) {
      this.params2.size = val;
      this.List2();
    },
    // 当前第几页，切换页码
    changePage2(val) {
      this.params2.current = val;
      this.List2();
    },
  }
};
</script>

<style lang="scss">
.dashboard_wrapper {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
}
.box-card {
  width: 100%;
  height: 290px;
  margin-bottom: 20px;
}
.box-card2 {
  width: 49.5%;
  min-height: 290px;
  margin-bottom: 20px;
}
.card-title {
  font-size: 18px;
  font-weight: 800;
}
.card-content8 {
  width:100%;
  display: flex;
  justify-content: flex-start;
  .card-item {
    width: 24%;
    height:180px;
    border-radius: 10px;
    background: url("../../assets/images/bjbg.png") no-repeat;
    margin-right: 20px;
    display: flex;
    justify-content: flex-start;
    padding:30px 20px;
    .item-left {
      width: 35%;
      margin-right: 30px;
      img{
        width:100%;
        height:auto;
      }
    }
    .item-right {
      .item-right-title {
        font-size: 18px;
        font-weight:800;
        margin: 10px 0;
      }
      .item-right-num1 {
        font-size: 26px;
        text-align: center;
        margin: 10px 0;
      }
      .item-right-num2 {
        font-size: 16px;
        color: red;
        margin: 10px 0;
      }
      .item-right-num3 {
        font-size: 16px;
        color: red;
        margin: 10px 0;
        cursor: pointer;
      }
    }
  }
}
.card-content6 {
  width:100%;
  display: flex;
  justify-content: space-around;
  .card-item {
    width: 24%;
    height:180px;
    border-radius: 10px;
    background-color: #f4f8fe;
    display: flex;
    justify-content: flex-start;
    padding:30px 20px;
    .item-left {
      width: 35%;
      margin-right: 30px;
      img{
        width:100%;
        height:auto;
      }
    }
    .item-right {
      .item-right-title {
        font-size: 18px;
        font-weight:800;
        margin: 10px 0;
      }
      .item-right-num1 {
        font-size: 26px;
        text-align: center;
        margin: 10px 0;
      }
      .item-right-num2 {
        font-size: 16px;
        color: red;
        margin: 10px 0;
        cursor: pointer;
      }
      .item-right-num3 {
        font-size: 16px;
        color: red;
        margin: 10px 0;
        cursor: pointer;
      }
    }
  }
}
.table-box {
  width:100%;
  display: flex;
  justify-content: space-between;
}
.ycl{
  padding-left: 17px;
  font-size: 16px;
}
.dcl{
  padding-left: 17px;
  font-size: 16px;
  margin-top:20px ;
}
.dclsl{
  padding-left: 96px;
  font-size: 14px;
  margin-top:20px ;
  color: blue;
  text-decoration: underline;
}
.dclsl:hover{
  color: red;
  text-decoration: underline; /* 当鼠标悬停时添加下划线 */
  cursor: pointer; /* 将鼠标指针变为小手形状 */
}
</style>