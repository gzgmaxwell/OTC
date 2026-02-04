<template>
  <div class="map">
    <div id="myPageTop" v-if="!isView">
      <el-input v-model="inputSearch" id="tipinput" placeholder="请输入关键字" style="width: 290px"></el-input>
      <el-button type="primary" @click="query">搜索</el-button>
    </div>
    <div id="map-container"></div>
  </div>
</template>

<script>
import { JS_API_KEY } from "@/settings/amap.config";
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  components: {},
  props: {
    receiveLongitude: {
      type: String,
      defalut: "",
    },
    receiveLatitude: {
      type: String,
      defalut: "",
    },
    isView: {
      type: Boolean,
      defalut: false,
    },
  },
  data() {
    return {
      title: "",
      dialogVisible: true,
      AMap: null,
      map: null,
      auto: null,
      placeSearch: null,
      infoWindow: null,
      geocoder: null,
      selectPosition: [],
      inputSearch: "",
      cityCode: "",
      lnglat: {},
      province: "",
      city: "",
      area: "",
      coordinate: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      AMapLoader.load({
        key: JS_API_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.Scale",
          "AMap.PlaceSearch",
          "AMap.AutoComplete",
          "AMap.Geocoder",
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.AMap = AMap;
          this.map = new AMap.Map("map-container", {
            //设置地图容器id
            // viewMode: "3D", //是否为3D地图模式
            zoom: 8, //初始化地图级别
            center: [109.84, 19.16], //初始化地图中心点位置
            // mapStyle: 'amap://styles/macaron', //设置地图的显示样式
          });

          // 地图控件
          // this.map.addControl(new AMap.Scale())
          // 搜索框自动完成类
          this.auto = new AMap.AutoComplete({
            input: "tipinput",
          });
          //构造地点查询类
          this.placeSearch = new AMap.PlaceSearch({
            map: this.map,
          });
          // 当选中某条搜索记录时触发
          this.auto.on("select", this.select);
          // poi覆盖物点击事件
          this.placeSearch.on("markerClick", this.markerClickHandler);
          if (this.receiveLongitude || this.receiveLatitude) {
            let marker = new AMap.Marker({
              position: new AMap.LngLat(
                this.receiveLongitude,
                this.receiveLatitude
              ),
            });
            marker.on("click", this.markerClickHandler2);
            let param = {
              lnglat: {
                lng: this.receiveLongitude,
                lat: this.receiveLatitude,
              },
            };
            this.map.add(marker);
            this.markerClickHandler2(param);
          }
          // 地图点击事件
          if(!this.isView) this.map.on("click", this.clickHandler);
          //this.map.on("click", this.clickHandler);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // placeSeacher显示的点的事件
    markerClickHandler(e) {
      // this.lnglat.longit = e.data.location.lng;
      // this.lnglat.latit = e.data.location.lat;
      if(this.isView) return
      this.lnglat = {
        longit: e.data.location.lng,
        latit: e.data.location.lat,
      };
      this.coordinate = `${e.data.location.lng},${e.data.location.lat}`;
      // emit("lngAndlat", state.longit, state.latit);
      // 省
      this.province = e.data.pname;
      // 市
      this.city = e.data.cityname;
      // 区
      this.area = e.data.adname;
      this.address =
        this.province + this.city + this.area + e.data.address + e.data.name;
      // emit("toponymy", state.address ? state.address : "");
      // emitter.emit("toponymy", [state.longit, state.latit, state.address]);

      this.$emit("clickCoordinate", this.lnglat);
    },
    // 自定义标记点的点击事件
    markerClickHandler2(e) {
      if(this.isView) return
      let longit = e.lnglat.lng;
      let latit = e.lnglat.lat;
      this.lnglat = {
        longit: e.lnglat.lng,
        latit: e.lnglat.lat,
      };
      let self = this;
      this.coordinate = `${longit},${latit}`;
      this.$emit("clickCoordinate", this.lnglat);
      self.geocoder &&
        self.geocoder.getAddress([longit, latit], function (status, result) {
          if (status === "complete" && result.info === "OK") {
            if (result && result.regeocode) {
              const { province, city, district } =
                result.regeocode.addressComponent;
              const { formattedAddress } = result.regeocode;
              // self.formData.selectCity = formattedAddress;
              // const str = `${province}${city}${district}`;
              self.province = province; // 省
              self.city = city; // 市
              self.area = district; // 区
              self.address = formattedAddress; // 具体地址
            }

            let poi = {
              name: self.address,
              address: self.address,
            };
            self.infoWindow = new AMap.InfoWindow({
              content: self.createContent(poi),
              autoMove: true,
              offset: { x: 0, y: -30 },
            });
            self.infoWindow.open(self.map, [longit, latit]);
            self.inputSearch = self.address;
            self.cityCode = result.regeocode.addressComponent.adcode;
            // emit("toponymy", self.formData.address ? self.formData.address : "");
            // emitter.emit("toponymy", [
            //   state.longit,
            //   state.latit,
            //   state.address,
            // ]);
          } else {
            // self.$modal.msgWarning("地址获取失败");
          }
        });
    },
    clickHandler(data) {
      this.map.clearMap();
      let marker = new AMap.Marker({
        position: new AMap.LngLat(data.lnglat.lng, data.lnglat.lat),
      });
      console.log("data", data);
      this.markerClickHandler2(data);
      this.map.add(marker);
    },
    select(e) {
      console.log("e", e);
      let self = this;
      if (e.poi.adcode) {
        self.placeSearch.setCity(e.poi.adcode);
      }
      self.inputSearch = e.poi.name;
      self.placeSearch.search(e.poi.name);
    },
    createContent(poi) {
      //信息窗体内容
      let s = [];
      s.push("地址：" + poi.address);
      return s.join("");
    },
    query() {
      let data = {
        poi: {
          name: this.inputSearch,
          adcode: this.cityCode,
        },
      };
      this.auto.closeResult();
      this.select(data);
    },
    commitMap() {
      if (!this.address || !this.coordinate)
        return this.$message.warning("请选择场地位置");
      this.dialogVisible = false;
      this.formData.address = this.address;
      this.formData.coordinate = this.coordinate;
    },
    resetMap() {
      this.inputSearch = "";
      // this.$emit('resetReceiveLnglat')
      // this.showMap();
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap-container {
  height: 100%;
  overflow-y: auto;
  .main-wrapper {
    width: 600px;
    margin: 0 auto;
    padding: 20px;
    .main-title {
      margin: 0 auto;
      width: 220px;
      height: 22px;
      font-size: 22px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 22px;
      margin-bottom: 30px;
    }
    .search-box {
      position: relative;
      .btn-position {
        position: absolute;
        top: 66px;
        right: -50px;
      }
    }
    .codeBtn {
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4477dc;
      cursor: pointer;
    }
  }
  .footer-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    font-size: 17px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    .passBtn {
      text-align: center;
      width: 380px;
      height: 64px;
      line-height: 64px;
      background: #4477dc;
      border-radius: 8px;
      cursor: pointer;
    }
    .rejectBtn {
      margin-right: 40px;
      text-align: center;
      width: 380px;
      height: 64px;
      line-height: 64px;
      background: #dc2c39;
      border-radius: 8px;
      cursor: pointer;
    }
  }
  .formBtn {
    display: flex;
    justify-content: center;
    width: 100%;
    button {
      width: 100px;
    }
  }
}
.map {
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 600px;
  background-color: #ffffff;
  // top: 76px;
  // left: 0;
  position: relative;
  // margin: -300px 0 0 -400px;
  #myPageTop {
    position: absolute;
    z-index: 10000;
    top: 10px;
    left: 10px;
  }
  #map-container {
    margin: auto;
    width: 100%;
    height: 500px;
    margin-bottom: 20px;
    margin-top: 16px;
    #mapTop {
      position: absolute;
      z-index: 10000;
      top: 0;
    }
  }
}
// ::v-deep(.amap-sug-result) {
//   z-index: 10000 !important;
// }
::v-deep .el-popup-parent--hidden .amap-sug-result {
  z-index: 3000 !important;
}
</style>
