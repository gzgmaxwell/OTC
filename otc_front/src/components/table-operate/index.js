export default {
  name: "TableOperate",
  props: {
    rowData: {
      require: true
    }
  },
  methods: {
    operate(type) {
      this.$emit(type, this.rowData.$index, this.rowData.row);
    }
  },
  render() {
    return (
      <div>
        <el-button
          size="mini"
          type="primary"
          on-click={() => this.operate("edit")}
        >
          编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          on-click={() => this.operate("delete")}
        >
          删除
        </el-button>
      </div>
    );
  }
};
