<template>
  <div class="list_page">


    <div class="top_wrapper">
      <div class="search_box">
         
          <el-select
            v-model="params.resType"
            placeholder="资源类型"
            @keyup.enter.native="search()"
          >
            <el-option
              v-for="item in dics.resType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>


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

       <el-table
          :data="list"
          border height="100%"
          row-key="id"
          @selection-change="selectChange"
          :tree-props="{ children: 'children', hasChildren: 'hasChildrens' }"
          @cell-dblclick="tableDbEdit"
        >
          
          
          <el-table-column prop="label" label="资源名称"></el-table-column>
          <el-table-column prop="parentName" label="上级菜单"></el-table-column>
          <el-table-column label="资源类型">
            <template slot-scope="{ row }">
              <el-button v-if="row.type == '1'" type="info">{{
                row.typeName
              }}</el-button>
              <el-button v-if="row.type == '2'" type="primary">{{
                row.typeName
              }}</el-button>
              <el-button v-if="row.type == '3'" type="success">{{
                row.typeName
              }}</el-button>
              <el-button v-if="row.type == '4'" type="warning">{{
                row.typeName
              }}</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="number" label="排序">
            <template slot-scope="{ row }">
              <el-input
                v-if="showEdit.indexOf(row.id) != -1"
                v-model="row.number"
                placeholder="请输入内容"
              ></el-input>
              <span v-if="showEdit.indexOf(row.id) == -1">{{
                row.number
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="url"
            label="资源地址"
            show-overflow-tooltip
          ></el-table-column>

          
          <el-table-column label="操作">
            <template slot-scope="scope">

              <el-button
                v-if="showEdit.indexOf(scope.row.id) != -1"
                size="medium"
                type="text"
                @click="save(scope.row)"
                >保存</el-button
              >

              <el-button
                v-if="showEdit.indexOf(scope.row.id) != -1"
                size="medium"
                type="text"
                @click="cancel(scope.row)"
                >取消</el-button
              >



              <TableOperate :rowData="scope" @edit="edit" @delete="Delete" />
            </template>
          </el-table-column>
        </el-table>

    </div>

        <!-- <el-pagination
            background
            @size-change="sizeChange"
            @current-change="changePage"
            :current-page="params.current"
            :page-sizes="[10, 20, 30]"
            :page-size="params.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination> -->




  </div>
</template>
<style>
.restable.el-table tbody td > .cell,
.restable.el-table tbody th > .cell {
  text-align: left !important;
}
</style>

<script>

import { ResourceAllTree, ResourceDelete , ResourceTableUpdate } from "@a/system";



export default {
  name: "Resource",
  components: {},
  data() {
    return {
      id: "",
      params: {
        size: 10,
        current: 1,
        sidx: "",
        sord: "asc",
        resType: null,
        showMenu: null,
        title: null
      },
      total: 0,
      showEdit: [],
      list: [], //表格数据
      selectedList: [], //批量删除的数组
      select: "",
      showOperate: false
    };
  },
  created() {},
  methods: {
    tableDbEdit(row, column, cell, event) {
      this.showEdit.push(row.id);

      this.showEdit = unique(this.showEdit);
    },
    //搜索
    search() {
        // this.params.current = 1;
      //列表查询和搜索
      this.List();
    },
    //搜索重置
    reset() {
      // this.params.current = 1;
      this.params.resType = null;
      this.params.showMenu = null;
      this.params.title = "";
      this.List();
    },
    //获取列表接口
    async List() {
        let data = await ResourceAllTree(this.params);
        this.list = data;
        this.total = data.length;
    },
    //删除接口
    async delData(array) {
        await ResourceDelete(array);
        this.$message.success("删除成功");
        this.search();
    },
    //每页多少条，切换显示条数
    sizeChange(val) {
      this.params.current = val;
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
    //新增
    newEdit(uuid) {
      this.$router.push({
        name: "New",
        query: {
          id: uuid
        }
      });
    },
    //编辑
    edit(index, row) {
      this.$router.push({
        name: "Edit",
        query: {
          id: row.id
        }
      });
    },
    //编辑
    async save( row) {
      var params = {};
      params.resId = row.id;
      params.number = row.number;
      await ResourceTableUpdate(
        params,
        params.resId
      );
      this.$message.success("修改成功");
      this.del(row.id);
    },
    cancel(row) {
      var index = this.showEdit.findIndex(item => {
        if (item == row.id) {
          return true;
        }
      });
      this.showEdit.splice(index, 1);
    },
    del(id) {
      var index = this.showEdit.findIndex(item => {
        if (item == id) {
          return true;
        }
      });
      this.showEdit.splice(index, 1);
    },
    //删除
    Delete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var arr = [];
          arr.push(row.id);
          this.delData(arr);
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.search();
  }
};
</script>
