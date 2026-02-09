<template>
  <div id="map"  class="map__x"></div>
</template>

<script>
// 引入依赖
import { Map, View } from 'ol';
import XYZ from 'ol/source/XYZ' //xyz
import Tile from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import Image from "ol/layer/Image"
import ImageWMS from 'ol/source/ImageWMS'
export default {
  name: 'study',
  // 挂载
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {

      let url = 'http://t{0-7}.tianditu.com/DataServer?x={x}&y={y}&l={z}'
      url = `${url}&T=vec_c&tk=73f429c4c1d4550cdbac3def1243aa9c`

      var ditu= new Tile({
        title: "底图",
        source: new XYZ({
            url: url,
              projection: 'EPSG:4326'
        })
    });
    var format = 'image/png';

    var source1 = new Tile({
      source: new TileWMS({
                      url: 'http://szjoin.tpddns.cn:7800/geoserver/yg/wms',
                              params: {'FORMAT': format, 
                              'VERSION': '1.1.1',
                              tiled: true,
                              "STYLES": '',
                              "TIME":"2023-06-27",
                              "LAYERS": 'yg:dnb_vess',
                              "exceptions": 'application/vnd.ogc.se_inimage',
                               tilesOrigin: -174.40002 + "," + -69.82792
                        }

        })
    })


    var source2 = new Tile({
      source: new TileWMS({
                      url: 'http://szjoin.tpddns.cn:7800/geoserver/ZZZ/wms',
                              params: {'FORMAT': format, 
                              'VERSION': '1.1.0',
                              tiled: true,
                              "STYLES": '',
                              "LAYERS": 'ZZZ:ew',
                              "exceptions": 'application/vnd.ogc.se_inimage',
                              tilesOrigin: -180 + "," + -90
                                     }

        })
    })

    var source3 = new Tile({
      source: new TileWMS({
                      url: 'http://szjoin.tpddns.cn:7800/geoserver/ZZZ/wms',
                              params: {'FORMAT': format, 
                              'VERSION': '1.1.0',
                              tiled: true,
                              "STYLES": '',
                              "LAYERS": 'ZZZ:nw',
                              "exceptions": 'application/vnd.ogc.se_inimage',
                              tilesOrigin: -180 + "," + -90
                                     }

        })
    })
    

    var source4 = new Tile({
      source: new TileWMS({
                      url: 'http://szjoin.tpddns.cn:7800/geoserver/ZZZ/wms',
                              params: {'FORMAT': format, 
                              'VERSION': '1.1.0',
                              tiled: true,
                              "STYLES": '',
                              "LAYERS": 'ZZZ:gd',
                              "exceptions": 'application/vnd.ogc.se_inimage',
                              tilesOrigin: -180 + "," + -90
                                     }

        })
    })

    var source5 = new Tile({
      source: new TileWMS({
                      url: 'http://szjoin.tpddns.cn:7800/geoserver/ZZZ/wms',
                              params: {'FORMAT': format, 
                              'VERSION': '1.1.0',
                              tiled: true,
                              "STYLES": '',
                              "LAYERS": 'ZZZ:hl_uo',
                              "exceptions": 'application/vnd.ogc.se_inimage',
                              tilesOrigin: -180 + "," + -90
                                     }

        })
    })

    
    var source6 = new Tile({
      source: new TileWMS({
                      url: 'http://szjoin.tpddns.cn:7800/geoserver/ZZZ/wms',
                              params: {'FORMAT': format, 
                              'VERSION': '1.1.0',
                              tiled: true,
                              "STYLES": '',
                              "LAYERS": 'ZZZ:hl_vo',
                              "exceptions": 'application/vnd.ogc.se_inimage',
                              tilesOrigin: -180 + "," + -90
                                     }

        })
    })
    var source7 = new Tile({
      source: new TileWMS({
                      url: 'http://szjoin.tpddns.cn:7800/geoserver/ZZZ/wms',
                              params: {'FORMAT': format, 
                              'VERSION': '1.1.0',
                              tiled: true,
                              "format_options":'antialias:none',
                              "STYLES": '',
                              "LAYERS": 'ZZZ:sstt',
                              "exceptions": 'application/vnd.ogc.se_inimage',
                              tilesOrigin: -180 + "," + -90
                                     }

        })
    })
    var source8 = new Tile({
      source: new TileWMS({
                      url: 'http://szjoin.tpddns.cn:7800/geoserver/ZZZ/wms',
                              params: {'FORMAT': format, 
                              'VERSION': '1.1.0',
                              tiled: true,
                              "STYLES": '',
                              "LAYERS": 'ZZZ:yls',
                              "exceptions": 'application/vnd.ogc.se_inimage',
                              tilesOrigin: -180 + "," + -90
                                     }

        })
    })



    var source9 = new Tile({
      
      distance: 1000, // 要素将被聚合在一起的像素距离，默认为20
        minDistance: 1000, // 聚合块之间的最小像素距离，默认为零
      source: new TileWMS({
                      url: 'http://szjoin.tpddns.cn:7800/geoserver/dwx/wms',
                              params: {'FORMAT': format, 
                              'VERSION': '1.1.0',
                              tiled: true,
                              "STYLES": '',
                              "LAYERS": 'dwx:data_wind',
                              "exceptions": 'application/vnd.ogc.se_inimage',
                              tilesOrigin: -180 + "," + -90
                                     }

        })
    })
    var source = source9
    var map = new Map({
        target: 'map',
        // 设置显示地图的视图
        view: new View({
            center: [122.432097, 30.887123],
            projection: 'EPSG:4326',
            zoom: 2,
        })
      })


      map.addLayer(ditu);
      map.addLayer(source);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* map容器撑开 */
.map__x {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
}
</style>
