<template>
  <el-dialog
    :title="title"
    :visible.sync="open"
    width="1000px"
    @close="cancel"
    append-to-body
  >
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      @submit.native.prevent
    >
    <el-form-item label="姓名" prop="personName">
        <el-input
          v-model="queryParams.personName"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入联系方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <Table
      v-loading="loading"
      :column="column"
      :dataSource="tableList"
      class="table-box"
      :pagination="queryParams"
      :isManager="true"
      :total="total"
      @pagination="handleChangePage"
    >
      <template v-slot:gender="slotProps">
        <div class="dic-list">
          <dict-tag
            v-for="(type, index) in slotProps.row.gender"
            :key="index"
            :options="dict.type.sys_user_sex"
            :value="type"
          />
        </div>
      </template>
      <template v-slot:action="slotProps">
        <el-button
          size="mini"
          type="text"
          icon=""
          @click="handleSelect(slotProps.row)"
          v-hasPermi="['manager:species:edit']"
          >选择</el-button
        >
      </template>
    </Table>
  </el-dialog>
</template>

<script>
import { getList } from "@/api/manager/user";
import Table from "@/components/projectComponents/table";
export default {
  dicts: ["type.sys_user_sex"],
  components: { Table },
  data() {
    return {
      title: "选择人员",
      open: false,
      // 显示搜索条件
      showSearch: true,
      // 遮罩层
      loading: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        personName: undefined,
        phone: undefined
      },
      total: 0,
      column: [
        { label: "序号", prop: "serialNumber", width: "80", type: "text" },
        { label: "姓名", prop: "personName", width: "", type: "text", tooltip: true },
        { label: "性别", prop: "slot", width: "", slotName: "speciesType", tooltip: true },
        { label: "联系方式", prop: "phone", width: "", type: "text", tooltip: true },
        { label: "出生年月", prop: "birthday", width: "", type: "text", tooltip: true },
        { label: "邮箱", prop: "email", width: "", type: "text", tooltip: true },
        { label: "操作", prop: "slot", width: "100", slotName: "action", align: 'center' },
      ],
      // 表格数据
      tableList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询公告列表 */
    getList() {
      this.loading = true;
      getList(this.queryParams).then((response) => {
        console.log('response.total', response.total)
        this.tableList = response.rows;
        this.queryParams.total = response.total;
        this.loading = false;
      }).catch(()=>{
        this.tableList = [];
        this.queryParams.total = 0;
      }).finally(()=>{
        this.loading = false;
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.speciesId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.pageNum = 1;
      this.handleQuery();
    },
    /** 展示 */
    show() {
      this.open = true;
    },
    /** 取消 */
    cancel() {
      this.open = false;
      this.resetQuery();
    },
    /** 提交 */
    submitForm() {
      console.log("选择了");
    },
    /** 选择 */
    handleSelect(row) {
      this.$emit("selectPerson", row);
      this.cancel()
    },
    /** 分页切换 */
    handleChangePage(page) {
      const { pageNum, pageSize } = page;
      this.queryParams.pageNum = pageNum;
      this.queryParams.pageSize = pageSize;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
// ::v-deep .el-dialog__body {
//   height: 760px;
//   overflow-x: auto;
// }
.dic-list {
  display: flex;
  div {
    &::before {
      content: ", ";
    }
    &:first-child::before {
      content: "";
    }
  }
}
</style>
