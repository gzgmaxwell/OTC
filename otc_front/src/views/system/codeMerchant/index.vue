<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">

        <el-input
          placeholder="请输入姓名"
          @keyup.enter.native="search"
          v-model="params.fullName"
        ></el-input>


        <el-input
          placeholder="请输入登录名"
          @keyup.enter.native="search"
          style="margin-left: 5%;"
          v-model="params.userName"
        ></el-input>
        <el-button  style="margin-left: 5%;" type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="newEdit()">
          添加
        </el-button>
      </div>
    </div>
    <div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%">

        


        <el-table-column prop="fullName" label="真实姓名"></el-table-column>
        <el-table-column   prop="userName"           label="登录名"          show-overflow-tooltip        ></el-table-column>
        <el-table-column   prop="memberId"           label="邀请码"          show-overflow-tooltip        ></el-table-column>
        <el-table-column          prop="postName"          label="角色"          show-overflow-tooltip        ></el-table-column>
        <el-table-column          prop="updateTime"          label="更新时间"          show-overflow-tooltip        ></el-table-column>

        <!-- <el-table-column prop="lockStatusName" label="状态"></el-table-column> -->
        <el-table-column prop="lockStatus" label="状态">

          
                 <template slot-scope="scope" >
                   <el-switch v-model="scope.row.lockStatus"  active-color="#13ce66" inactive-color="#ff4949"   @change="gxztChange(scope.row)"  active-text="启用"
      inactive-text="禁用" active-value="1" inactive-value="2"> </el-switch>
                 </template>


           
        </el-table-column>

          <el-table-column label="操作"  width="350">          
          <template slot-scope="scope">		   
           <el-button size="mini" @click="edit(scope.row)">查看</el-button>		  
           <el-button  size="mini" type="primary"  @click="edit(scope.row)" >编辑</el-button>
           <el-button size="mini" type="danger" @click="Delete( scope.row)" >删除</el-button >
            
           <el-button size="mini" @click="removeGgyzm(scope.row)">重置谷歌验证码</el-button>		  
           <!-- <el-button size="mini" type="danger" v-if="scope.row.lockStatus == 1" @click="disabled(scope.row.userId,2)" >禁用</el-button >
           <el-button size="mini" v-if="scope.row.lockStatus == 2" @click="disabled( scope.row.userId,1)" >解禁</el-button > -->
          </template>
        </el-table-column>
      </el-table>
    </div>
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
</template>

<script>
import { UserPage, UserDelete ,UserLockStatus,RemoveSecretKey} from "@a/system";
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
   async removeGgyzm(row){
    

        this.$confirm("此操作将重置谷歌验证码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
          await RemoveSecretKey({"userId":row.userId});
        this.$message.success("操作成功");
        // this.params.current = 1;
        this.search();
      });
    },
   async gxztChange(row){
         await UserLockStatus({"userId":row.userId,"lockStatus":row.lockStatus});
        this.$message.success("操作成功");
        // this.params.current = 1;
        this.search();
    },
    // 搜索
    search() {
      // this.params.current = 1;
      this.List();
    },
    // 重置
    reset() {
      // this.params.current = 1;
      this.params={};
      //列表查询和搜索
      // this.List();
    },
    // 获取列表
    async List() {
      this.params.descs = "a.update_time";
      this.params.userType = "3";
      const data = await UserPage(this.params);
      this.total = data.total;
      this.list = data.records;
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
    // 删除接口
    // 新增
    newEdit(uuid) {
      this.$router.push({
        name: "EditCode",
        query: {
          id: uuid
        }
      });
    },
    // 编辑
    edit( row) {
      this.$router.push({
        name: "EditCode",
        query: {
          id: row.userId
        }
      });
    },
    //删除
    Delete( row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await UserDelete([row.userId]);
        this.$message.success("删除成功");
        // this.params.current = 1;
        this.search();
      });
    },
    //禁用
    disabled( userId,lockStatus) {
      this.$confirm("此操作将禁用该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await UserLockStatus({"userId":userId,"lockStatus":lockStatus});
        this.$message.success("操作成功");
        // this.params.current = 1;
        this.search();
      });
    }
  }
};
</script>
