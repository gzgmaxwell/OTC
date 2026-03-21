<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <el-input placeholder="请输入姓名" @keyup.enter.native="search" v-model="params.fullName"></el-input>

        <el-input placeholder="请输入登录名" @keyup.enter.native="search" style="margin-left: 5%;"
          v-model="params.userName"></el-input>
        <el-button style="margin-left: 5%;" type="primary" icon="el-icon-search" @click="search">
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
        <el-table-column prop="userName" label="登录名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="postName" label="角色" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip></el-table-column>

        <el-table-column prop="lockStatusName" label="状态"></el-table-column>

        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">查看</el-button>
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="Delete(scope.row)">删除</el-button>
            <el-button size="mini" type="danger" v-if="scope.row.lockStatus == 1"
              @click="disabled(scope.row.userId, 2)">禁用</el-button>
            <el-button size="mini" v-if="scope.row.lockStatus == 2"
              @click="disabled(scope.row.userId, 1)">解禁</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background @size-change="sizeChange" @current-change="changePage" v-if="params.current" :current-page.sync="params.current"
      :page-sizes="[10, 20, 30]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total"></el-pagination>
  </div>
</template>

<script>
import { UserPage, UserDelete, UserLockStatus } from "@a/system";
export default {
  name: "Admin",
  data() {
    return {
      params: {
        size: 10,
        current: null,
        userName: null,
        fullName: null
      },
      total: 0,
      list: [] //表格数据
    };
  },
  mounted() {
    const current = Number(this.$route.query.current);
    if (Number.isFinite(current) && current > 0) {
      this.params.current = current;
    } else {
      this.params.current = 1;
    }
    this.search();
  },
  watch: {
    "params.current"() {
      this.updatePaginationActive();
    },
    "$route.query.current"(val) {
      const current = Number(val);
      if (Number.isFinite(current) && current > 0 && current !== this.params.current) {
        this.params.current = current;
        this.List();
      }
    }
  },
  methods: {
    updatePaginationActive() {
      this.$nextTick(() => {
        const paginationEl = this.$el && this.$el.querySelector(".el-pagination");
        if (!paginationEl) return;
        const items = paginationEl.querySelectorAll(".el-pager li.number");
        items.forEach(li => {
          const n = Number(String(li.innerText || "").trim());
          if (Number.isFinite(n) && n === Number(this.params.current)) {
            li.classList.add("manual-active");
          } else {
            li.classList.remove("manual-active");
          }
        });
      });
    },
    // 搜索
    search() {
      this.List();
    },
    // 重置
    reset() {
     
      this.params = {
        size: 10,
        current: 1,
        userName: null,
        fullName: null
      };
      this.$router.replace({
        query: {
          ...this.$route.query,
          current: 1
        }
      });
      //列表查询和搜索
       this.params.current = 1;
      this.List();
    },
    // 获取列表
    async List() {
      this.params.descs = "a.update_time";
      this.params.userType = "2";
      const data = await UserPage(this.params);
      this.total = data.total;
      this.list = data.records;
      this.updatePaginationActive();
    },
    // 每页多少条，切换显示条数
    sizeChange(val) {
      this.params.size = val;
      this.List();
    },
    // 当前第几页，切换页码
    changePage(val) {
      this.params.current = Number(val);
      this.$router.replace({
        query: {
          ...this.$route.query,
          current: this.params.current
        }
      });
      this.List();
    },
    // 删除接口
    // 新增
    newEdit(uuid) {
      this.$router.push({
        name: "EditUser",
        query: {
          id: uuid,
          current: this.params.current
        }
      });
    },
    // 编辑
    edit(row) {
      this.$router.push({
        name: "EditUser",
        query: {
          id: row.userId,
          current: this.params.current
        }
      });
    },
    //删除
    Delete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await UserDelete([row.userId]);
        this.$message.success("删除成功");
        this.search();
      });
    },
    //禁用
    disabled(userId, lockStatus) {
      this.$confirm("此操作将禁用该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await UserLockStatus({ userId: userId, lockStatus: lockStatus });
        this.$message.success("操作成功");
        this.search();
      });
    }
  }
};
</script>

<style scoped>
.list_page /deep/ .el-pagination .el-pager li.is-active:not(.manual-active) {
  background-color: #fff;
  color: #606266;
}

.list_page /deep/ .el-pagination .el-pager li.manual-active {
  background-color: var(--primary);
  color: #fff;
}
</style>
