<template>
  <div class="list_page">
    <div class="top_wrapper">
      <div class="search_box">
        <el-input placeholder="操作模块" v-model="params.module" @keyup.enter.native="search" style="width: 30%;">
        </el-input>
        <!-- <el-select
          v-model="params.configType"
          placeholder="配置类型"
          @keyup.enter.native="search()"
          style="width: 30%;margin-left: 5px;"
        >
          <el-option
            v-for="item in optConfigType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        <el-input placeholder="操作人账号" v-model="params.operateUsername" @keyup.enter.native="search"
          style="width: 30%;margin-left: 5px;">
        </el-input>
        <el-date-picker style="width: 50%; margin-left: 10px;" @change="selectTime" v-model="value2"
          type="datetimerange" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" align="right">
        </el-date-picker>


        <el-button type="primary" icon="el-icon-search" @click="search">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        <!-- <el-button type="primary" icon="el-icon-plus" @click="newEdit()">
          添加
        </el-button> -->
      </div>
    </div>

    <div class="table_wrapper">
      <el-table ref="multipleTable" :data="list" border height="100%">
        <el-table-column prop="module" label="操作模块"></el-table-column>
        <el-table-column prop="type" label="操作内容"></el-table-column>
        <el-table-column prop="content" label="操作行为"></el-table-column>
        <el-table-column prop="operateUsername" label="操作人账号"></el-table-column>
        <el-table-column prop="operateIp" label="操作IP"></el-table-column>
        <el-table-column prop="operateTime" label="操作时间"></el-table-column>

        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="Delete(scope.row)"
              >删除</el-button
            >
          </template>
</el-table-column> -->
      </el-table>
    </div>
    <el-pagination background @size-change="sizeChange" @current-change="changePage" :current-page="params.current"
      :page-sizes="[10, 20, 30]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total"></el-pagination>
  </div>
</template>

<script>
import { sysOperationLog_page, configDeleteBatch } from "@a/system";
import { optConfigType } from "@/utils/enum";

export default {
  name: "ConfigManage",
  components: {},
  data() {
    return {
      id: "",
      params: {
        size: 10,
        current: 1
      },
      total: 0,
      list: [], //表格数据
      optConfigType: optConfigType,
      value2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
    };
  },
  computed: {
    configTypeMap() {
      const map = {};
      (this.optConfigType || []).forEach(i => {
        map[String(i.value)] = i.label;
      });
      return map;
    }
  },
  methods: {
    selectTime(val) {
      if (val) {
        this.params.startTime = val[0];
        this.params.endTime = val[1];
      }
    },
    //搜索
    search() {
      this.params.current = 1;
      //列表查询和搜索
      this.List();
    },
    //重置
    reset() {
      this.params = {};
    },
    //获取列表
    async List() {
      // this.params.descs = "a.update_time";
      const data = await sysOperationLog_page(this.params);

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
    //设置表格表头颜色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #f2f2f2;color: #333;font-weight: 500;";
      }
    },
    //删除接口
    async delData(array) {
      await configDeleteBatch(array);
      this.$message.success("删除成功");
      this.search();
    },
    //新增
    newEdit() {
      this.$router.push({
        name: "configManageEdit"
      });
    },
    //编辑
    edit(row) {
      this.$router.push({
        name: "configManageEdit",
        query: row
      });
    },
    //删除
    Delete(row) {
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
        .catch(() => { });
    }
  },
  mounted() {
    this.search();
  }
};
</script>
