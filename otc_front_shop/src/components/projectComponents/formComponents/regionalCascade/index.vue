
<template>
  <div>
    <div >
      <el-select
      v-for="(itemProvince,index) in provinceAndCityList"
      :key="index"
      v-model="newForm[index]"
      value-key="regionCode"
      placeholder="请选择"
      @change="getNextData($event,index)"
      :style="`width:33.3%`"
      >
        <el-option
          v-for="item in itemProvince"
          :key="item.regionCode"
          :label="item.regionName"
          :value="item">
        </el-option>
      </el-select>
    </div>

  </div>
</template>
<script>
import request from '@/utils/httpRequest'
export default {
  props: {
    filed:{
      type: Array,
      default: () => []
    },
    width:{
      type: String,
      default: () => '100%'
    },
    lastLevel:{
      type: Number,
      default: () => 3
    }
  },
  data() {
    return {
      level:0,
      form:[],
      provinceAndCityList:[],//省市区
      optionsList:[],
      isReq:true
    }
  },
  methods: {
    getNextData(v,idx){
      this.$emit('update:filed',null)
      this.form[idx]=v
      if(idx<this.lastLevel-1) {
        this.setArr(idx,'form')
        this.getProvinceAndCity(v.regionCode,idx+1)
      }
    },
    getProvinceAndCity(value,index=0){
      request({
        url:`/skill/api/sysRegion/getChild`,
        method: 'get',
        params:{regionCode:value}
      }).then(res=>{
        if(res&&res.errorCode==200){
          this.$set(this.provinceAndCityList,index,res.data)
          this.setArr(index,'provinceAndCityList')
        }
      })
    },
    setArr(index,type){
      for(let i=index+1;i<this.lastLevel;i++){
        this.$set(this[type],i,null)
      }
    }
  },
  computed:{
    newForm: {
      get() {
        const {filed,lastLevel,form,isReq}=this
        if(filed&&filed.length>0&&isReq){
          for(let i=0;i<lastLevel;i++){
            this.getNextData(filed[i],i)
          }
        }
        return form
      }
    }
  },
  watch: {

    form:{
      handler(n){
        let newA=n.filter(v=>v&&v.regionCode)
        if(newA.length===this.lastLevel){
          this.isReq=false
          this.$emit('update:filed',newA)
        }
      },
      deep:true
    }

  },
  mounted(){
    for(let i=0;i<this.lastLevel;i++){
      this.provinceAndCityList.push(null)
    }
    this.getProvinceAndCity()
  }

}
</script>
<style lang="scss" scoped>

</style>
