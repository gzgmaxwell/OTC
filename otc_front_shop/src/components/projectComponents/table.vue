<!--  -->
<template>
  <div :class="[isManager ? '' : 'web-page']">
    <el-table
      :show-overflow-tooltip="true"
      stripe
      :data="dataSource"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="handlerRowClick"
      header-click
      v-loading="loading"
      :height="tableHeight"
      :max-height="tableHeight"
      ref="tableRef"
    >
      <el-table-column v-if="isSelection" type="selection" width="55" align="center"></el-table-column>
      <el-table-column v-if="hasIndex" label="序号" type="index" :index="indexMethod" width="80"></el-table-column>
      <el-table-column
        v-for="(item, i) in column"
        :key="i"
        :label="item.label"
        :prop="item.prop"
        :align="item.align || 'left'"
        :width="item.width"
        :fixed="item.fixed"
        :min-width="item.minWidth"
        :class-name="isRowClick && item.cursor == true ? 'cursor' : ''"
        :show-overflow-tooltip="item.tooltip"
      >
        <!-- slot -->
        <template slot-scope="scope">
          <slot
            v-if="item.prop === 'slot'"
            :name="item.slotName"
            :row="scope.row"
          ></slot>
          <span v-else>{{ scope && scope.row[item.prop] }}</span>
        </template>
        <!-- 用于处理数组英文字段转为汉子显示 -->
        <!-- <template slot-scope="scope">
                <template v-if="!item.cusColumn">{{ scope.row[item.prop] }}</template>
                <template v-else>
                  <slot :name="item.prop" :row="scope.row"></slot>
                </template>
              </template> -->
      </el-table-column>
      <slot name="action"></slot>
    </el-table>
    <Pagination
        v-if="(pagination.total > 0)"
        :pageNum.sync="pagination.pageNum"
        :pageSize.sync="pagination.pageSize"
        :total.sync="pagination.total"
        @pagination="handleChangePage"
      />
  </div>
</template>
<script>
  import Pagination from "./pagination.vue";
export default {
  components: {
      Pagination
  },
  props: {
    column: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    isSelection: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    optionWidth: {
      type: String,
      default: "100",
    },
    pagination: {
      type: Object,
      default() {
        return {};
      },
    },
    tableHeight: {
      type: Number,
      default: null,
    },
    isRowClick: { // 当前行是否可以点击 
      type: Boolean,
      default: false
    },
    clickColumnIndex: {
      type: Array,
      default: () => [],
    },
    isManager: { // 后端系统 
      type: Boolean,
      default: false
    },
    hasIndex: { 
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    // 分页信息切换
    handleChangePage(val) {
      this.$emit("pagination", val);
    },
    handleClickShowDetail: function (scope) {
      console.log(scope);
    },
    handleClickPass: function () {},
    handleClickReject: function () {},
    handleSelectionChange(arr) {
      this.$emit("selectionChange", arr);
    },
    // 点击行
    handlerRowClick(row, column, event) {
      if(!this.isRowClick || !this.clickColumnIndex) return
      if(this.clickColumnIndex.length) {
        const isGo = this.clickColumnIndex.some(col => {return col == column.property})
        if(!isGo) return
      }
      console.log('row',row)
      console.log('column',column)
      this.$emit('rowClick', row)
    },
    indexMethod(index) {
      return (index + 1) + ((this.pagination.pageNum - 1) * this.pagination.pageSize);
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.web-page {
  .el-table {
  ::v-deep th {
    background-color: #eff5f8 !important;
    color: #278de4 !important;
    padding: 16px 0 9px !important;
    border: none !important;
    font-size: 16px;
  }
  ::v-deep td {
    border: none;
    padding: 10px 0 !important;
    font-size: 16px;
  }
  ::v-deep th .cell {
    line-height: 18px !important;
    padding: 0 20px !important;
  }
  ::v-deep td .cell {
    height: 28px;
    line-height: 28px !important;
    padding: 0 20px !important;
  }
  &::before{
    height: 0 !important;
  }
}
}
</style>
