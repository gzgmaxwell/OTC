<!--
 * @Descripttion: 分页组件
 * @version: 1.0.0
 * @Author: 某人
 * @Date: 2022-03-08 10:06:18
-->
<template>
  <div :class="{ hidden: hidden }" class="pagination-container2">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="limit"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      ref="pagination"
    />
    <!-- <el-button type="primary" class="jump-btn">确定</el-button> -->
  </div>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: "total, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.pageNum;
      },
      set(val) {
        this.$emit("update:pageNum", val);
      },
    },
    limit: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("update:pageSize", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      console.log("val", val);
      this.$emit("pagination", { pageNum: this.currentPage, pageSize: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { pageNum: val, pageSize: this.limit });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.pagination-container2 {
  background: #fff;
  padding: 28px 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .jump-btn {
    width: 58px;
    height: 30px;
    border-radius: 4px;
    padding: 0;
    margin-left: 15px;
  }
}
.pagination-container2.hidden {
  display: none;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  /* background-color: #4d78d5; */
}
</style>
