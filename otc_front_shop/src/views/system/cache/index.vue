<template>
  <div class="page">
    <el-card shadow="never" class="box-card">
      <el-row :gutter="12" class="nav">
        <el-col :span="16">
          <el-button type="primary" @click="newEdit()">新建</el-button>
        </el-col>

        <el-col :span="4">
          <el-input
            placeholder="请输入请求地址"
            v-model="params.url"
            @keyup.enter.native="search"
          ></el-input>
        </el-col>

        <el-col :span="4" class="f-right">
          <el-button class="ml-10" @click="search()" type="primary"
            >搜索</el-button
          >
          <el-button class="ml-10" @click="reset()">重置</el-button>
        </el-col>
      </el-row>

      <div>
        <el-table
          ref="multipleTable"
          :data="list"
          border
          tooltip-effect="dark"
          :header-cell-style="tableHeaderColor"
          @selection-change="selectChange"
          max-height="488"
        >
          <el-table-column prop="name" label="名称"></el-table-column>

          <el-table-column prop="url" label="请求地址"></el-table-column>

          <el-table-column prop="method" label="请求方式"></el-table-column>

          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="medium" type="text" @click="syn(scope.row)"
                >同步</el-button
              >
              <el-button
                size="medium"
                type="text"
                @click="edit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="medium"
                type="text"
                @click="totalDel([scope.row])"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagetion-frame">
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
      </div>
    </el-card>
  </div>
</template>

<script>
import ajax from "@p/request";

export default {
  name: "SysCache",
  components: {},
  data() {
    return {
      id: "",
      import_url: this.http_url + "/api/sysCache/import",
      headers: {
        Authorization: window.getToken()
      },
      params: {
        size: 10,
        current: 1,
        url: null
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
  created() {},
  methods: {
    async syn(row) {
      let data = await ajax.ajax({
        type: row.method,
        url: row.url,
        params: row.params
      });
      this.$message.success(data.msg);
    },
    //搜索
    search() {
      // this.params.current = 1;
      //列表查询和搜索
      this.List();
    },
    //搜索更多
    searchMore() {
      if (!this.isShow) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    //重置
    reset() {
      // this.params.current = 1;
      this.params.url = "";
      //列表查询和搜索
      this.List();
    },
    //返回搜索
    back() {
      this.isShow = false;
    },
    //操作
    //展开操作
    operate() {
      this.showOperate = true;
    },
    //收起操作
    collapse() {
      this.showOperate = false;
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
            totalArr.push(item.cacheId);
          });
          this.delData(totalArr);
        })
        .catch(() => {});
    },
    //导入
    Import() {},
    //导出
    Export() {
      let excel = {
        authorization: this.$store.state.token,
        queryMap: this.params
      };
      let downExcelUrl =
        this.http_url +
        `/api/sysCache/export?excel=${encodeURI(JSON.stringify(excel))}`;
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = downExcelUrl;
      a.click();
      a.remove();
    },
    //获取列表
    async List() {
      let { code, data } = await this.$ajax.sysCacheApi.sysCacheList(
        this.params
      );
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
    //设置表格表头颜色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #f2f2f2;color: #333;font-weight: 500;";
      }
    },
    //删除接口
    async delData(array) {
      let { code, data, msg } = await this.$ajax.sysCacheApi.sysCacheDelete(
        array
      );
      if (code == 200) {
        this.$message.success("删除成功");
        // this.params.current = 1;
        this.search();
      } else {
        this.$message.error(msg);
      }
    },
    //新增
    newEdit(uuid) {
      this.$router.push({
        name: "newCache",
        params: {
          id: uuid
        }
      });
    },
    //编辑
    edit(index, row) {
      this.$router.push({
        name: "newCache",
        params: {
          id: row.cacheId
        }
      });
    },

    handleError(err, file, fileList) {
      if (err.status == 401) {
        this.$message.error("没有权限");
      }
      console.log(err);
      console.log(JSON.stringify(err));
    },
    handleSuccess(response, file, fileList) {
      this.$message.error(response);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  mounted() {
    this.search();
  }
};
</script>
