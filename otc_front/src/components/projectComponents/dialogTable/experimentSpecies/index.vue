<template>
  <el-dialog
    :title="title"
    :visible.sync="open"
    width="1000px"
    @close="cancel"
    append-to-body
    :key="dialogKey"
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
      <el-form-item label="物种名称" prop="speciesName">
        <el-input
          v-model="queryParams.speciesName"
          placeholder="请输入物种名称"
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
      @pagination="handleChangePage"
    >
      <template v-slot:speciesType="slotProps">
        <div class="dic-list">
          <dict-tag
            v-for="(type, index) in slotProps.row.speciesTypes"
            :key="index"
            :options="dict.type.sys_species_type"
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
import { getExperimentList } from "@/api/manager/wareHouse";
import Table from "@/components/projectComponents/table";
export default {
  dicts: ["sys_species_type"],
  components: { Table },
  props: {
    dialogKey: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      title: "",
      open: false,
      // 显示搜索条件
      showSearch: true,
      // 遮罩层
      loading: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        speciesName: undefined,
        total: 0
      },
      total: 0,
      column: [],
      // 表格数据
      tableList: [],
      speciesUrl: '',
      experimentType: ''
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    /** 查询公告列表 */
    getList() {
      this.loading = true;
      console.log('this.speciesUrl',this.speciesUrl)
      getExperimentList(this.speciesUrl,this.queryParams).then((response) => {
        this.tableList = response.rows || [];
        this.queryParams.total = response.total || 0;
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
    /** table 初始化 */
    init(type) {
      switch(type) {
        case '1': // 核酸
          this.speciesUrl = '/system/nucleic/listUnUse';
          this.title = '选择核酸样品'
          this.column = [
            { label: "序号", prop: "serialNumber", width: "80", type: "text" },
            { label: "实验编号", prop: "experimentNo", width: "", type: "text", tooltip: true },
            { label: "物种编号", prop: "speciesNumber", width: "", type: "text", tooltip: true },
            { label: "物种名称", prop: "speciesName", width: "", type: "text", tooltip: true },
            { label: "采样时间", prop: "samplingTime", width: "", type: "text", tooltip: true },
            { label: "江河流域", prop: "riverBasin", width: "", type: "text", tooltip: true },
            { label: "行政区域", prop: "administrativeDivision", width: "", type: "text", tooltip: true },
            // { label: "位置编号", prop: "sampleName", width: "", type: "text", tooltip: true },
            { label: "操作", prop: "slot", width: "100", slotName: "action", fixed: 'right', align: 'center' },
          ]
          break;
        case '2': // 组织
          this.speciesUrl = '/system/tissue/listUnUse';
          this.title = '选择组织样品'
          this.column = [
            { label: "序号", prop: "serialNumber", width: "80", type: "text" },
            { label: "实验编号", prop: "experimentNo", width: "", type: "text", tooltip: true },
            { label: "物种编号", prop: "speciesNumber", width: "", type: "text", tooltip: true },
            { label: "物种名称", prop: "speciesName", width: "", type: "text", tooltip: true },
            { label: "采样时间", prop: "samplingTime", width: "", type: "text", tooltip: true },
            { label: "江河流域", prop: "riverBasin", width: "", type: "text", tooltip: true },
            { label: "行政区域", prop: "administrativeDivision", width: "", type: "text", tooltip: true },
            // { label: "位置编号", prop: "sampleName", width: "", type: "text", tooltip: true },
            { label: "操作", prop: "slot", width: "100", slotName: "action", fixed: 'right', align: 'center' },
          ]
          break;
        case '3': // 标本
          this.speciesUrl = '/system/specimen/listUnUse';
          this.title = '选择标本样品'
          this.column = [
            { label: "序号", prop: "serialNumber", width: "80", type: "text" },
            { label: "标本编号", prop: "specimenNo", width: "", type: "text", tooltip: true },
            { label: "物种名称", prop: "speciesName", width: "", type: "text", tooltip: true },
            { label: "采样时间", prop: "operatorTime", width: "", type: "text", tooltip: true },
            { label: "江河流域", prop: "riverBasin", width: "", type: "text", tooltip: true },
            { label: "行政区域", prop: "administrativeDivision", width: "", type: "text", tooltip: true },
            // { label: "位置编号", prop: "cabinetId", width: "", type: "text", tooltip: true },
            { label: "操作", prop: "slot", width: "100", slotName: "action", fixed: 'right', align: 'center' },
          ]
          break;
        default:
          break;
      }
    },
    /** 展示 */
    async show(type) {
      this.open = true;
      this.experimentType = type;
      console.log('type===>', type)
      console.log('type===>', typeof(type))
      await this.init(type)
      this.getList();
    },
    /** 取消 */
    cancel() {
      this.tableList = []
      this.column =[]
      this.open = false;
      this.resetForm("queryForm");
      this.resetQuery()
    },
    /** 提交 */
    submitForm() {
      console.log("选择了");
    },
    /** 选择 */
    handleSelect(row) {
      this.$emit("selectSpecies", row);
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
