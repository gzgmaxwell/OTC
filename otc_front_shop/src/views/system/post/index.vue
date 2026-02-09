<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <el-input
          placeholder="请输入角色名称"
          @keyup.enter.native="search"
          v-model="params.postName"
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
        <el-table-column prop="postName" label="角色名称"></el-table-column>
        <!-- <el-table-column prop="departmentName" label="部门"></el-table-column> -->
        <!-- <el-table-column prop="parentName" label="父角色"></el-table-column> -->
        <el-table-column prop="updateName" label="更新人"></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{ scope.row.updateTime }}</template>
        </el-table-column>
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
import { PostList, PostDelete } from "@a/system";
export default {
  name: "Post",
  data() {
    return {
      params: {
        size: 10,
        current: 1,
        postName: null
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
      this.params.postName = "";
      //列表查询和搜索
      this.search();
    },
    // 获取列表
    async List() {
      this.params.descs = "a.update_time";
      const data = await PostList(this.params);
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
    // 新增
    newEdit() {
      this.$router.push({
        name: "newSysPost"
      });
    },
    // 编辑
    edit(index, row) {
      this.$router.push({
        name: "newSysPost",
        query: {
          id: row.postId
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
        await PostDelete([row.postId]);
        this.$message.success("删除成功");
        // this.params.current = 1;
        this.search();
      });
    }
  }
};
</script>
