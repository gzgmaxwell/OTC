<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <el-input placeholder="用户电话" v-model="params.phoneNum" @keyup.enter.native="search"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
    </div>

    <div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%">
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column label="拉黑原因">
          <template slot-scope="scope">
            <span>{{ blackUserReasonOptComp(scope.row.recType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="note1" label="备注"></el-table-column>
        <el-table-column prop="nickName" label="用户昵称"></el-table-column>
        <el-table-column prop="phoneNum" label="用户电话"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="Delete(scope.row)">移除黑名单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background @size-change="sizeChange" @current-change="changePage" :current-page="params.current"
      :page-sizes="[10, 20, 30]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { blackList_page, blackList_deleteByIds } from "@a/system";
import { blackUserReasonOpt } from "@/utils/enum";
export default {
  name: "BalckList",
  components: {},
  data() {
    return {
      params: {
        size: 10,
        current: 1
      },
      total: 0,
      list: [], //表格数据
    };
  },
  computed: {
    blackUserReasonOptComp() {
      return (val) => blackUserReasonOpt.find(v => v.value === val)?.label;
    }
  },
  methods: {
    //搜索
    search() {
      this.params.current = 1;
      //列表查询和搜索
      this.List();
    },
    //删除
    Delete(row) {
      this.$confirm("此操作将移除黑名单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await blackList_deleteByIds([row.id]);
        this.$message.success("移除黑名单成功");
        this.search();
      });
    },
    //重置
    reset() {
      this.params = {};
    },
    //获取列表
    async List() {
      this.params.descs = "a.update_time";
      const data = await blackList_page(this.params);
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
  },
  mounted() {
    this.search();
  }
};
</script>
