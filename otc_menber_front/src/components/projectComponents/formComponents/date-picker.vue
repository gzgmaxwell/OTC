<template>
  <div>
    <el-date-picker
      v-model="dataPicker[0]"
      align="right"
      @change="(v) => changeTime(v, 0)"
      :type="config.pickerType || 'date'"
      :placeholder="config.placeholder || '请选择'"
      :picker-options="startDatePicker"
      :format="config.format || 'yyyy-MM-dd'"
      :value-format="config.format || 'yyyy-MM-dd'"
      :style="{ width: config.width ? config.width / 2 : 'calc(50% - 8px)' }"
    >
    </el-date-picker>
    <span class="line">-</span>
    <el-date-picker
      v-model="dataPicker[1]"
      align="right"
      type="date"
      @change="(v) => changeTime(v, 1)"
      :placeholder="config.placeholder || '请选择'"
      :picker-options="endDatePicker"
      :format="config.format || 'yyyy-MM-dd'"
      :value-format="config.format || 'yyyy-MM-dd'"
      :style="{ width: config.width ? config.width / 2 : 'calc(50% - 8px)' }"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    //
    filed: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      show: true,
      startDatePicker: this.beginDate(),
      endDatePicker: this.endDate(),
      newDataPicker: []
    }
  },
  computed: {
    dataPicker: {
      get() {
        const arr = this.filed.length == 2 ? this.filed : this.newDataPicker
        return arr
      }
    }
  },
  methods: {
    changeTime(val, type) {
      this.dataPicker[type] = val
      const newArr = this.dataPicker.filter((v) => v !== null)
      this.newDataPicker = this.dataPicker
      if (val && newArr.length == 2) {
        this.$emit('update:filed', this.dataPicker)
      } else {
        this.$emit('update:filed')
      }
    },
    beginDate() {
      return {
        disabledDate: (time) => {
          return this.dataPicker[1] ? time.getTime() > new Date(this.dataPicker[1]) : false
        }
      }
    },
    //结束时间需大于开始时间
    endDate() {
      return {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.dataPicker[0])
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.line {
  display: inline-block;
  width: 16px;
  text-align: center;
  color: #606266;
}
</style>
