<template>
  <div class="edit_page">
    <div class="top_box">
      <div class="title">
        编辑黑名单用户
      </div>
      <div>
        <ja-button type="primary" :click="save">
          保存
        </ja-button>
        <el-button @click="backTo('formValidate')">返回</el-button>
      </div>
    </div>
    <div class="edit_content">
      <el-form class="u_form" :model="formValidate" :rules="rules" ref="formValidate" label-width="100px">
        <el-form-item label="拉黑原因：" prop="blackUserReason">
          <el-select v-model="formValidate.blackUserReason" placeholder="请选择">
            <el-option v-for="item in blackUserReasonOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="formValidate.userName"></el-input>
        </el-form-item>
        <el-form-item label="操作权限：" v-if="compcCheckedCities(formValidate.blackUserReason)">
           <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
           <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city.value" :key="city.value">{{city.label}}</el-checkbox>
           </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { blackUserReasonOptions,blackUserReasonOptions111,blackUserReason_enum } from "@/utils/enum";
import { UserUpdate2233 } from "@a/system";

export default {
  name: "Edit",
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: blackUserReasonOptions111,
      isIndeterminate: true,
      blackUserReasonOptions,
      formValidate: {
        userName: "",
        blackUserReason: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        blackUserReason: [{ required: true, message: "请选择拉黑原因", trigger: "change" }]
      }
    };
  },
  computed: {
    compcCheckedCities(blackUserReason) {
      return (blackUserReason)=> blackUserReason === blackUserReason_enum.beforeThreeDays ;
    }
  },
  mounted() {
    this.formValidate.userName = this.$route.query.id;
  },
  methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cities.map(item => item.value) : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
    //新增保存接口
    async addData() {
      await UserUpdate2233(this.formValidate);
      this.$message.success("保存成功");
      this.$router.push({
        name: "User"
      });
    },
    //保存
    save() {
      return this.$refs["formValidate"].validate().then(() => {
        return this.addData()
      });
    },

    //返回
    backTo() {
      this.$router.push({
        name: "User"
      });
    }
  }
};
</script>