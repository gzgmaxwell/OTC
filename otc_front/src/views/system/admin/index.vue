<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <el-input
          placeholder="请输入登录名"
          @keyup.enter.native="search"
          v-model="params.userName"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">
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
        <el-table-column
          prop="userName"
          label="登录名"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="postName"
          label="角色"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <TableOperate :rowData="scope" @edit="edit" @delete="Delete" />
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
import { AdminList, AdminDelete } from "@a/system";
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
    // 搜索
    search() {
      // this.params.current = 1;
      this.List();
    },
    // 重置
    reset() {
      // this.params.current = 1;
      this.params.userName = "";
      //列表查询和搜索
      this.List();
    },
    // 获取列表
    async List() {
      this.params.descs = "a.update_time";
      const data = await AdminList(this.params);
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
        name: "NewAdmin",
        query: {
          id: uuid
        }
      });
    },
    // 编辑
    edit(index, row) {
      this.$router.push({
        name: "NewAdmin",
        query: {
          id: row.userId
        }
      });
    },
    //删除
    Delete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await AdminDelete([row.userId]);
        this.$message.success("删除成功");
        // this.params.current = 1;
        this.search();
      });
    }
  }
};
</script>
