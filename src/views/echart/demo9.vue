<template>
  <div class="bg">
    <div class="title_time">
      <p class="tit">债券市场存量概览</p>
      <p class="time">{{ nowDate + " " + nowTime + " " + nowWeek }}</p>
    </div>
    <div class="box1">
      <div class="mod1">
        <!-- <div class="selectBox">
          <el-select class="ccbSelect" v-model="valueSelect" placeholder="请选择" @change="getJGH">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>-->
        <p class="title">信用债总量变化</p>
        <div class="pie1" id="pie1"></div>
      </div>
      <div class="mod2">
        <p class="title">信用债到期情况</p>
        <div class="pie2" id="pie2"></div>
      </div>
      <div class="mod2 mod2_1">
        <p class="title">信用债发行情况</p>
        <div class="pie3" id="pie3"></div>
      </div>
    </div>
    <div class="box2">
      <div class="modBox1">
        <div class="modBox1_tit">
          <p class="p1">存量规模</p>
          <p class="p2">100,000,000,000,000.00</p>
        </div>
        <ul class="modBox1_ul">
          <li>
            <div class="txtBox1 c1">
              <p class="tit c1">利率债</p>
              <p class="txt">
                <span>50.00</span>
                <span>万亿</span>
              </p>
            </div>
          </li>
          <li>
            <div class="txtBox1 c2">
              <p class="tit c2">地方债</p>
              <p class="txt">
                <span>30.00</span>
                <span>万亿</span>
              </p>
            </div>
          </li>
          <li>
            <div class="txtBox1 c3">
              <p class="tit c3">信用债</p>
              <p class="txt">
                <span>40.00</span>
                <span>万亿</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="pie4" id="pie4"></div>
      </div>
      <div class="modBox2">
        <p class="title">信用债利差变化（AAA）</p>
        <div class="pie8" id="pie8"></div>
      </div>
    </div>
    <div class="box3">
      <div class="modr1">
        <div class="selectBox">
          <el-select class="ccbSelect" v-model="selectPie5" placeholder="请选择" @change="getJGHpie5">
            <el-option
              v-for="item in optionsPie5"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <p class="title">信用债行业分布</p>
        <div class="pie5" id="pie5"></div>
      </div>
      <div class="modr2">
        <div class="selectBox">
          <el-select class="ccbSelect" v-model="selectPie6" placeholder="请选择" @change="getJGHpie6">
            <el-option
              v-for="item in optionsPie6"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <p class="title">已违约信用债概览</p>
        <!-- <div class="pie6" id="pie6"></div> -->
        <ul class="box3_modr2_ul">
          <li>
            <p class="p1">已违约发行体数目：</p>
            <p class="p2">199</p>
          </li>
          <li>
            <p class="p1">已违约债券数目：</p>
            <p class="p2">199</p>
          </li>
          <li>
            <p class="p1">已违约债券规模：</p>
            <p class="p2">199</p>
            <p class="p3">亿元</p>
          </li>
        </ul>
      </div>
      <div class="modr3">
        <p class="title">月度违约及发行体统计</p>
        <div class="pie7" id="pie7"></div>
      </div>
    </div>
  </div>
</template>
<script>
import "echarts/map/js/china.js";
import "echarts-liquidfill/src/liquidFill.js";
export default {
  name: "demo9",
  data() {
    return {
      //默认参数
      nowDate: "", // 当前日期
      nowTime: "", // 当前时间
      nowWeek: "", // 当前星期
      selectPie5: "0",
      selectPie6: "0",
      optionsPie5: [
        {
          label: "行业",
          value: "0"
        },
        {
          label: "评级",
          value: "1"
        }
      ],
      optionsPie6: [
        {
          label: "概览",
          value: "0"
        },
        {
          label: "行业",
          value: "1"
        },
        {
          label: "区域",
          value: "2"
        }
      ]
    };
  },
  computed: {},
  methods: {
    // 当前日期
    currentTime() {
      setInterval(this.getDate, 500);
    },
    getDate: function() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let week = new Date().getDay();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      if (week == 1) {
        this.nowWeek = "星期一";
      } else if (week == 2) {
        this.nowWeek = "星期二";
      } else if (week == 3) {
        this.nowWeek = "星期三";
      } else if (week == 4) {
        this.nowWeek = "星期四";
      } else if (week == 5) {
        this.nowWeek = "星期五";
      } else if (week == 6) {
        this.nowWeek = "星期六";
      } else {
        this.nowWeek = "星期日";
      }
      _this.nowTime = hh + ":" + mf;
      _this.nowDate = yy + "/" + mm + "/" + dd;
    },
    // 中国地图
    DrawMap() {
      let map1 = this.$echarts.init(document.getElementById("map1")); //图1
      var data = [
        // {
        //   name: "北京移动数据中心-马连道机房",
        //   value: ["116.489356", "39.94083"],
        //   date: "2019-10-01",
        //   city: "北京市"
        // }
      ];
      var data2 = [
        { name: "北京", value: 177 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 66 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 67 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 }
      ];
      map1.setOption({
        tooltip: {
          show: false,
          trigger: "item",
          triggerOn: "click",
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: "#000",
            decoration: "none"
          }
          // formatter: function(params) {
          //   console.log(params);
          //   const { data } = params;
          //   const type = data.type;
          //   let typeName = "数据中心";
          //   const tipHtml = ` <div style="width: 280px; background: rgba(22, 80, 158, 0.8); border: 1px solid rgba(7, 166, 255, 0.7);">
          //                       <div style="color: #fff; padding: 10px; font-size: 16px; border-bottom: 2px solid #0c8bdd;">${data.name}</div>
          //                       <p style="color: #fff;padding: 5px 10px;font-size: 14px;">建设位置：${data.city}</p>
          //                       <p style="color: #fff;padding: 5px 10px;font-size: 14px;">建设时间：${data.date}</p>
          //                       <p style="color: #fff;padding: 5px 10px;font-size: 14px;">设施类型：${typeName}</p>
          //                     </div>`;
          //   return tipHtml;
          // }
        },
        visualMap: {
          show: true,
          min: 0,
          // max: 200,
          left: "5%",
          top: "bottom",
          itemWidth: this.setFontsize(0.2),
          itemHeight: this.setFontsize(1.2),
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // color: ["#04387b", "#467bc0"] // 蓝
            color: ["#00467F", "#A5CC82"] // 蓝绿
          },
          textStyle: {
            color: "#fff",
            fontSize: this.setFontsize(0.14)
          }
        },
        geo: {
          show: true,
          map: "china",
          label: {
            normal: {
              show: true,
              color: "#fff",
              fontSize: this.setFontsize(0.14)
            },
            emphasis: {
              color: "#fff",
              fontSize: this.setFontsize(0.24),
              show: true
            }
          },
          roam: true,
          scaleLimit: {
            min: 1.2,
            max: 15
          },
          zoom: 1.2,
          itemStyle: {
            normal: {
              borderWidth: this.setFontsize(0.01), // 区域边框宽度
              borderColor: "#1180c7", // 区域边框颜色
              areaColor: "#023677" // 区域颜色
              // borderColor: "#3B5077", // 区域边框颜色
              // areaColor: "#031525" // 区域颜色
            },
            emphasis: {
              // areaColor: "#4499d0"
              areaColor: "#2B91B7"
            }
          }
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: data,
            symbol: "pin",
            symbolSize: 30,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "#33C481"
              },
              emphasis: {
                color: "#f00"
              }
            }
          },
          {
            type: "map",
            map: "china",
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: "scale",
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            animation: false,
            data: data2
          }
        ]
      });
    },
    //   设置字体
    setFontsize(res) {
      let docEl = document.documentElement,
        clientWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
    // echarts视图
    piedemo() {
      let pie1 = this.$echarts.init(document.getElementById("pie1")); //图1
      let pie2 = this.$echarts.init(document.getElementById("pie2")); //图2
      let pie3 = this.$echarts.init(document.getElementById("pie3")); //图3
      let pie4 = this.$echarts.init(document.getElementById("pie4")); //图4
      let pie5 = this.$echarts.init(document.getElementById("pie5")); //图5
      // let pie6 = this.$echarts.init(document.getElementById("pie6")); //图6
      let pie7 = this.$echarts.init(document.getElementById("pie7")); //图7
      let pie8 = this.$echarts.init(document.getElementById("pie8")); //图8
      // pie1
      var datas = [76.3, 46.4, 37.5, 95.6, 88.1, 94.8, 49.6];
      pie1.setOption({
        title: {
          text: "",
          textStyle: {
            fontWeight: "normal",
            fontSize: this.setFontsize(0.12),
            color: "#F1F1F3"
          },
          left: "6%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#57617B"
            }
          }
        },
        // legend: {
        //   icon: "rect",
        //   itemWidth: 14,
        //   itemHeight: 5,
        //   itemGap: 13,
        //   data: ["党费"],
        //   right: "4%",
        //   textStyle: {
        //     fontSize: 12,
        //     color: "#F1F1F3"
        //   }
        // },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          top: "14%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            data: [
              "2021Q3",
              "2021Q4",
              "2022Q1",
              "2022Q2",
              "2022Q3",
              "2022Q4",
              "2023Q1"
            ],
            axisLabel: {
              interval: 0,
              rotate: 0,
              textStyle: {
                fontSize: this.setFontsize(0.14)
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            interval: 30,
            // max: 120,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.12)"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: this.setFontsize(0.14)
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.12)"
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: this.setFontsize(0.16),
            xAxisIndex: [0],
            bottom: "2%",
            start: 0,
            end: 50,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5"
            },
            textStyle: {
              show: false,
              color: "#fff",
              fontSize: this.setFontsize(0.12)
            },
            borderColor: "#90979c"
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: "金额（万亿）",
            type: "line",
            smooth: false,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            // areaStyle: {
            //   normal: {
            //     // color: "#856BF8",
            //     // shadowColor: "#856BF8",
            //     // shadowBlur: 10
            //   }
            // },
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "#856BF8"
              }
            },
            data: datas
          }
        ]
      });
      // pie2
      pie2.setOption({
        baseOption: {
          // timeline: {
          //   axisType: "category",
          //   autoPlay: false,
          //   playInterval: 3000,
          //   data: ["2020Q2", "2020Q3", "2020Q4", "2021Q1", "2021Q2", "2021Q3"],
          //   label: {
          //     formatter: function(s) {
          //       return s + "";
          //     }
          //   },
          //   lineStyle: {
          //     color: "#316BF3"
          //   }
          // },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // type: 'shadow'
            }
          },
          grid: {
            top: "15%",
            right: "5%",
            left: "10%",
            bottom: "25%"
          },
          xAxis: [
            {
              type: "category",
              data: [
                "2021Q3",
                "2021Q4",
                "2022Q1",
                "2022Q2",
                "2022Q3",
                "2022Q4",
                "2023Q1"
              ],
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              },
              axisLabel: {
                // margin: 10,
                interval: 0,
                color: "#e2e9ff",
                textStyle: {
                  fontSize: this.setFontsize(0.14)
                }
              }
            }
          ],
          yAxis: [
            {
              // name: '单位：万元',
              // interval: 20,
              axisLabel: {
                formatter: "{value}",
                color: "#e2e9ff",
                fontSize: this.setFontsize(0.14)
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,255,255,1)"
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              }
            }
          ],
          dataZoom: [
            {
              show: true,
              height: this.setFontsize(0.16),
              xAxisIndex: [0],
              bottom: "2%",
              start: 0,
              end: 50,
              handleIcon:
                "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
              handleSize: "110%",
              handleStyle: {
                color: "#d3dee5"
              },
              textStyle: {
                show: false,
                color: "#fff",
                fontSize: this.setFontsize(0.12)
              },
              borderColor: "#90979c"
            },
            {
              type: "inside",
              show: true,
              height: 15,
              start: 1,
              end: 35
            }
          ],
          series: [
            {
              type: "bar",
              barWidth: this.setFontsize(0.28),
              itemStyle: {
                normal: {
                  color: "#8369F4"
                  // barBorderRadius: [30, 30, 30, 30],
                  // shadowColor: "rgba(0,160,221,1)",
                  // shadowBlur: 4
                }
              },
              data: [1, 2, 3, 4, 5, 6, 7, 8]
            }
          ]
        },
        options: [
          // {
          //   series: [{ data: [1, 2, 3, 4, 5, 6] }]
          // },
          // {
          //   series: [{ data: [3, 2, 1, 5, 6, 4] }]
          // }
        ]
      });
      // pie3
      pie3.setOption({
        baseOption: {
          timeline: {
            axisType: "category",
            autoPlay: false,
            playInterval: 3000,
            x: "5%",
            y2: "7%",
            width: "80%",
            height: this.setFontsize(0.45),
            data: ["日", "月", "季", "年"],
            label: {
              formatter: function(s) {
                return s + "";
              }
            },
            lineStyle: {
              color: "#8369F4",
              width: this.setFontsize(0.04)
            },
            label: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#fff",
                fontSize: this.setFontsize(0.14)
              }
            },
            controlStyle: {
              normal: {
                color: "#fff",
                fontSize: this.setFontsize(0.1)
              }
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // type: 'shadow'
            }
          },
          grid: {
            top: "15%",
            right: "5%",
            left: "10%",
            bottom: "40%"
          },
          xAxis: [
            {
              type: "category",
              data: [
                "2021Q3",
                "2021Q4",
                "2022Q1",
                "2022Q2",
                "2022Q3",
                "2022Q4",
                "2023Q1"
              ],
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              },
              axisLabel: {
                // margin: 10,
                color: "#e2e9ff",
                interval: 0,
                // rotate: 10,
                textStyle: {
                  fontSize: this.setFontsize(0.12)
                }
              }
            }
          ],
          yAxis: [
            {
              // name: '单位：万元',
              // interval: 20,
              axisLabel: {
                formatter: "{value}",
                color: "#e2e9ff",
                fontSize: this.setFontsize(0.14)
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,255,255,1)"
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              }
            }
          ],
          dataZoom: [
            {
              show: true,
              height: this.setFontsize(0.14),
              xAxisIndex: [0],
              bottom: "2%",
              start: 0,
              end: 50,
              handleIcon:
                "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
              handleSize: "110%",
              handleStyle: {
                color: "#d3dee5"
              },
              textStyle: {
                show: false,
                color: "#fff",
                fontSize: this.setFontsize(0.12)
              },
              borderColor: "#90979c"
            },
            {
              type: "inside",
              show: true,
              height: 15,
              start: 1,
              end: 35
            }
          ],
          series: [
            {
              type: "bar",
              barWidth: this.setFontsize(0.28),
              itemStyle: {
                normal: {
                  color: "#8369F4"
                  // barBorderRadius: [30, 30, 30, 30],
                  // shadowColor: "rgba(0,160,221,1)",
                  // shadowBlur: 4
                }
              }
              // data: [8, 7, 6, 5, 4, 3, 2, 1]
            }
          ]
        },
        options: [
          {
            series: [{ data: [8, 7, 6, 5, 4, 3, 2] }]
          },
          {
            series: [{ data: [7, 6, 5, 4, 3, 2, 1] }]
          },
          {
            series: [{ data: [8, 7, 6, 5, 4, 3, 2] }]
          },
          {
            series: [{ data: [6, 5, 4, 5, 4, 6, 2] }]
          }
        ]
      });
      // pie4
      var legendData = [
        { value: 14, name: "同业存单" },
        { value: 35, name: "短期融资券" },
        { value: 10, name: "中期票据" },
        { value: 74, name: "定向工具" },
        { value: 24, name: "公司债" },
        { value: 34, name: "企业债" },
        { value: 7, name: "商业银行债" },
        { value: 24, name: "商业银行次级债" },
        { value: 24, name: "证券机构债" },
        { value: 29, name: "保险公司债" },
        { value: 14, name: "其他金融机构债" },
        { value: 64, name: "政府支持机构债" },
        { value: 24, name: "国际机构债" },
        { value: 29, name: "资产支持证券" }
      ];
      pie4.setOption({
        tooltip: {
          // formatter: '{c} 万亿',
          trigger: "item"
        },
        grid: {
          top: "15%",
          right: "10%",
          left: "10%",
          bottom: "15%"
        },
        color: [
          "#4992ff",
          "#7cffb2",
          "#fddd60",
          "#ff6e76",
          "#58d9f9",
          "#f97d58"
        ],
        legend: {
          orient: "vertical",
          right: "20%",
          y: "center",
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 2,
          data: legendData,
          textStyle: {
            color: "rgba(255,255,255,.9)",
            fontSize: this.setFontsize(0.16)
            // padding: [0, 0, 0, 10]
          }
        },
        series: [
          {
            name: "金额（万亿）",
            type: "pie",
            radius: ["40%", "80%"],
            center: ["30%", "50%"],
            data: legendData,
            label: {
              show: false,
              position: "outside"
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      // pie5
      pie5.setOption({
        baseOption: {
          // timeline: {
          //   axisType: "category",
          //   autoPlay: false,
          //   playInterval: 3000,
          //   data: ["2020Q2", "2020Q3", "2020Q4", "2021Q1", "2021Q2", "2021Q3"],
          //   label: {
          //     formatter: function(s) {
          //       return s + "";
          //     }
          //   },
          //   lineStyle: {
          //     color: "#316BF3"
          //   }
          // },
          tooltip: {
            trigger: "item",
            formatter: "{b}:{c}%"
          },
          grid: {
            top: "2%",
            right: "2%",
            left: "2%",
            bottom: "2%"
          },
          xAxis: [
            {
              type: "category",
              axisLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              },
              axisLabel: {
                show: false,
                // margin: 10,
                color: "#e2e9ff",
                textStyle: {
                  fontSize: this.setFontsize(0.12)
                }
              }
            }
          ],
          yAxis: [
            {
              // name: '单位：万元',
              // interval: 20,
              axisLabel: {
                show: false,
                formatter: "{b}:{value}%",
                color: "#e2e9ff",
                fontSize: this.setFontsize(0.14)
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,255,255,1)"
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              }
            }
          ],
          series: [
            {
              type: "treemap",
              roam: false,
              nodeClick: false,
              breadcrumb: {
                show: false
              },
              itemStyle: {
                color: ["#584CAA"]
              },
              levels: [
                {
                  itemStyle: {
                    // borderColor: "#fff",
                    borderWidth: 0,
                    gapWidth: 0
                  }
                },
                {
                  colorSaturation: [0.8, 0.5],
                  itemStyle: {
                    color: ["#584CAA"],
                    gapWidth: 2,
                    borderWidth: 0,
                    borderColor: "#012264"
                  }
                }
              ],
              label: {
                fontSize: this.setFontsize(0.18),
                // formatter: "{b}:{c}%"
                formatter: function(value) {
                  var html = value.name + ":" + value.value + "%";
                  return html;
                }
              },
              data: [
                {
                  children: [
                    {
                      name: "公用事业",
                      value: 60
                    },
                    {
                      name: "金融",
                      value: 10
                    },
                    {
                      name: "能源",
                      value: 5
                    },
                    {
                      name: "工业",
                      value: 5
                    },
                    {
                      name: "房地产",
                      value: 15
                    },
                    {
                      name: "信息技术",
                      value: 5
                    }
                  ]
                }
              ]
            }
          ]
        }
      });

      // pie7
      pie7.setOption({
        baseOption: {
          legend: {
            icon: "rect",
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ["债券数目", "发行体数目", "债券规模（亿）"],
            left: "4%",
            textStyle: {
              fontSize: this.setFontsize(0.16),
              color: "#F1F1F3"
            }
          },
          // timeline: {
          //   axisType: "category",
          //   autoPlay: false,
          //   playInterval: 3000,
          //   data: ["2020Q2", "2020Q3", "2020Q4", "2021Q1", "2021Q2", "2021Q3"],
          //   label: {
          //     formatter: function(s) {
          //       return s + "";
          //     }
          //   },
          //   lineStyle: {
          //     color: "#316BF3"
          //   }
          // },
          dataZoom: [
            {
              show: true,
              height: this.setFontsize(0.14),
              xAxisIndex: [0],
              bottom: "2%",
              start: 0,
              end: 50,
              handleIcon:
                "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
              handleSize: "110%",
              handleStyle: {
                color: "#d3dee5"
              },
              textStyle: {
                show: false,
                color: "#fff",
                fontSize: this.setFontsize(0.12)
              },
              borderColor: "#90979c"
            },
            {
              type: "inside",
              show: true,
              height: 15,
              start: 1,
              end: 35
            }
          ],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // type: 'shadow'
            }
          },
          grid: {
            top: "15%",
            right: "10%",
            left: "10%",
            bottom: "25%"
          },
          xAxis: [
            {
              type: "category",
              data: [
                "2021-03",
                "2021-04",
                "2022-01",
                "2022-02",
                "2022-03",
                "2022-04"
              ],
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              },
              axisLabel: {
                // margin: 10,
                interval: 0,
                color: "#e2e9ff",
                textStyle: {
                  fontSize: this.setFontsize(0.14)
                }
              }
            }
          ],
          yAxis: [
            {
              // name: '单位：万元',
              // interval: 20,
              axisLabel: {
                formatter: "{value}",
                color: "#e2e9ff",
                fontSize: this.setFontsize(0.14)
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,255,255,1)"
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              }
            },
            {
              type: "value",
              // interval: 40,
              nameTextStyle: {
                color: "#fff"
              },
              position: "right",
              splitLine: {
                show: false
              },
              axisTick: {
                show: true
              },
              axisLine: {
                show: true
              },
              axisLabel: {
                formatter: "{value} 亿", //右侧Y轴文字显示
                textStyle: {
                  color: "#fff",
                  fontSize: this.setFontsize(0.14)
                }
              }
            }
          ],
          series: [
            {
              name: "债券数目",
              type: "bar",
              barWidth: this.setFontsize(0.18),
              itemStyle: {
                normal: {
                  color: "#8369F4"
                  // barBorderRadius: [30, 30, 30, 30],
                  // shadowColor: "rgba(0,160,221,1)",
                  // shadowBlur: 4
                }
              },
              data: [1, 2, 3, 4, 5, 6]
            },
            {
              name: "发行体数目",
              type: "bar",
              barWidth: this.setFontsize(0.18),
              itemStyle: {
                normal: {
                  color: "#1CBFCF"
                  // barBorderRadius: [30, 30, 30, 30],
                  // shadowColor: "rgba(0,160,221,1)",
                  // shadowBlur: 4
                }
              },
              data: [1, 2, 3, 4, 5, 6]
            },
            {
              name: "债券规模（亿）",
              type: "line",
              yAxisIndex: 1,
              barWidth: this.setFontsize(0.28),
              itemStyle: {
                normal: {
                  color: "#AF495B"
                  // barBorderRadius: [30, 30, 30, 30],
                  // shadowColor: "rgba(0,160,221,1)",
                  // shadowBlur: 4
                }
              },
              data: [1, 2, 3, 4, 5, 6]
            }
          ]
        },
        options: [
          // {
          //   series: [{ data: [1, 2, 3, 4, 5, 6] }]
          // },
          // {
          //   series: [{ data: [3, 2, 1, 5, 6, 4] }]
          // }
        ]
      });
      // pie8
      pie8.setOption({
        baseOption: {
          timeline: {
            axisType: "category",
            autoPlay: false,
            playInterval: 3000,
            x: "5%",
            width: "80%",
            height: this.setFontsize(0.45),
            data: ["AAA", "AA+", "AA"],
            label: {
              formatter: function(s) {
                return s + "";
              }
            },
            lineStyle: {
              color: "#8369F4",
              width: this.setFontsize(0.04)
            },
            label: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#fff",
                fontSize: this.setFontsize(0.14)
              }
            },
            controlStyle: {
              normal: {
                color: "#fff",
                fontSize: this.setFontsize(0.12)
              }
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // type: 'shadow'
            }
          },
          grid: {
            top: "15%",
            right: "5%",
            left: "10%",
            bottom: "35%"
          },
          xAxis: [
            {
              type: "category",
              data: [
                "2021-3",
                "2021-4",
                "2022-1",
                "2022-2",
                "2022-3",
                "2022-4",
                "2023-1"
              ],
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              },
              axisLabel: {
                // margin: 10,
                color: "#e2e9ff",
                interval: 0,
                // rotate: 10,
                textStyle: {
                  fontSize: this.setFontsize(0.12)
                }
              }
            }
          ],
          yAxis: [
            {
              // name: '单位：万元',
              // interval: 20,
              axisLabel: {
                formatter: "{value}bps",
                color: "#e2e9ff",
                fontSize: this.setFontsize(0.14)
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "rgba(255,255,255,1)"
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)"
                }
              }
            }
          ],
          series: [
            {
              type: "line",
              barWidth: this.setFontsize(0.28),
              itemStyle: {
                normal: {
                  color: "#8369F4"
                  // barBorderRadius: [30, 30, 30, 30],
                  // shadowColor: "rgba(0,160,221,1)",
                  // shadowBlur: 4
                }
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#8369F4"
                      },
                      {
                        offset: 0.8,
                        color: "rgba(82, 191, 255, 0)"
                      }
                    ],
                    false
                  ),
                  shadowColor: "rgba(228, 139, 76, 0.1)",
                  shadowBlur: 10
                }
              }
              // data: [8, 7, 6, 5, 4, 3, 2, 1]
            }
          ]
        },
        options: [
          {
            series: [{ data: [1, 2, 4, 5, 4, 3, 2] }]
          },
          {
            series: [{ data: [7, 6, 5, 4, 3, 2, 1] }]
          },
          {
            series: [{ data: [2, 7, 4, 3, 4, 3, 2] }]
          }
        ]
      });
    }
  },
  mounted() {
    this.currentTime();
    this.piedemo();
    this.DrawMap();
    window.onresize = () => {
      return (() => {
        this.$router.go(0);
      })();
    };
  },
  watch: {},
  created() {
    let yy = new Date().getFullYear();
    let toYear = yy.toString();
    let toYear1 = (yy - 1).toString();
    let toYear2 = (yy - 2).toString();
    this.options1 = [
      {
        value: "选项0",
        label: toYear
      },
      {
        value: "选项1",
        label: toYear1
      },
      {
        value: "选项2",
        label: toYear
      },
      {
        value: "选项3",
        label: toYear
      }
    ];
  },
  beforeDestroy: function() {
    if (this.getDate) {
      console.log("销毁定时器");
      clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
    }
  }
};
</script>
<style lang="scss" scoped>
// 风险视图Echarts css
.box3_modr2_ul {
  padding: 0px;
  margin: 40px;
  li {
    display: flex;
    flex-direction: row;
    font-size: 24px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    margin-bottom: 20px;
    .p1 {
      width: 60%;
    }
    .p2 {
      font-size: 36px;
      color: #d7b29c;
      margin-right: 20px;
    }
  }
}
.modBox1_tit {
  color: #fff;
  display: flex;
  flex-direction: row;
  font-size: 32px;
  margin: 10px auto;
  text-align: center;
  .p1 {
    border-right: 5px solid #6e42e4;
    padding-right: 20px;
    margin-right: 20px;
  }
  .p2 {
    letter-spacing: 1px;
  }
}
.map1 {
  width: 100%;
  height: 100%;
}
.pie4 {
  width: 100%;
  height: 70%;
}
.pie5 {
  width: 100%;
  height: 80%;
}
.pie6 {
  width: 100%;
  height: 80%;
}
.pie7 {
  width: 100%;
  height: 80%;
}
.pie8 {
  width: 100%;
  height: 85%;
}
.modBox1_ul {
  padding: 0px;
  margin: 0px;
  width: 100%;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  li {
    width: calc(33% - 10px);
    height: 80px;
    margin: 0px 5px;
    color: #fff;
    background: rgba(1, 54, 108, 0.8);
    .txtBox1 {
      padding: 5px 10px 5px 10px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      .tit {
        padding-top: 5px;
        padding-bottom: 5px;
        border-bottom: 5px solid #7043eb;
      }
      .txt {
        font-size: 22px;
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }
  }
}
.pie1 {
  width: 100%;
  height: 80%;
}
.pie2 {
  width: 100%;
  height: 80%;
}
.pie3 {
  width: 100%;
  height: 80%;
}
// 新增css
.ybpname {
  width: 94%;
  left: 3%;
  position: absolute;
  display: flex;
  bottom: 20px;
  p {
    color: #fff;
    width: 25%;
    text-align: center;
    font-size: 20px;
  }
}
.xjTitle {
  position: absolute;
  display: flex;
  left: 15px;
  top: 55px;
  flex-direction: column;
  color: #fff;
  padding: 0px;
  li {
    color: #fff;
    font-size: 12px;
    margin-bottom: 30px;
  }
}
.xxxl {
  height: 80%;
  overflow: auto;
}
.jiedian_tit {
  position: absolute;
  left: -9%;
  font-weight: 700;
  top: 5%;
  color: #fff;
  font-size: 16px;
}
.ccbSelect {
  width: 100%;
  height: 100%;
}
.selectBox {
  position: absolute;
  z-index: 999;
  width: 25%;
  top: 5px;
  height: 50px;
  right: 0%;
  display: flex;
  flex-direction: row;
  z-index: 999;
  .box4_tab {
    width: 40%;
    height: 50%;
    margin-top: 3%;
    display: flex;
    flex-direction: row;
  }
  .title_all {
    color: #d2d2d3;
    padding: 3% 3% 3% 3%;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    &.active {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      border: 1px solid #6088b1;
      padding: 2% 3% 2% 3%;
      border-radius: 5px;
    }
  }
}
.box4 {
  width: 90%;
  height: 18%;
  position: absolute;
  padding: 0.5%;
  bottom: 5%;
  left: 5%;
  border: 1px solid rgba(40, 114, 159, 0.2);
  box-shadow: 0px 1px 2px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  .box4Pie {
    width: 135%;
    height: 140%;
    position: absolute;
    transform: scale(0.7);
    right: -20.5%;
    top: -20%;
  }
  .box4_tab {
    width: 5%;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
  .title_all {
    color: #d2d2d3;
    padding: 1px;
    padding-bottom: 2px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
    cursor: pointer;
    &.active {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 2px solid #409eff;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .title_cll {
    color: #d2d2d3;
    font-size: 14px;
    font-weight: 700;
    margin-top: 4%;
    margin-left: 2%;
    cursor: pointer;
    &.active {
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      margin-top: 3%;
      border-bottom: 1px solid #409eff;
    }
  }
}
.zrBox {
  width: 230%;
  height: 200%;
  position: absolute;
  bottom: -60%;
  left: -60%;
  transform: scale(0.4);
  .zrPie {
    width: 100%;
    height: 100%;
  }
}
.sq_txt {
  position: absolute;
  color: #fff;
  font-size: 16px;
  bottom: 10%;
  left: 20%;
  font-weight: 700;
}

.ybpPie {
  width: 200%;
  height: 170%;
  position: absolute;
  left: -50%;
  top: -33%;
  transform: scale(0.5);
}
//
.loading {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999999;
  left: 0px;
  top: 0px;
}
p {
  padding: 0px;
  margin: 0px;
}
ul {
  li {
    list-style: none;
  }
}
.bg {
  .title_time {
    .time {
      color: #fff;
      font-size: 16px;
      margin-top: 15px;
      height: 30%;
    }
    width: 24%;
    height: 12%;
    left: 50%;
    margin-left: -12%;
    top: 0px;
    position: absolute;
    text-align: center;
    .tit {
      font-size: 38px;
      margin-top: 20px;
      letter-spacing: 2px;
      height: 30%;
      line-height: 30px;
      color: #e3ed12;
    }
  }
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // user-select: none;
  display: flex;
  flex-direction: row;
  background: #00065b url("../../assets/img/bg.jpg");
  background-size: 100vw 100vh;
  background-position: center;
  background-repeat: no-repeat;
  padding: 3%;
  position: relative;
  .box1 {
    width: 28%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .mod1 {
      width: 100%;
      height: 32%;
      margin-bottom: 3%;
      border: 1px solid #093e90;
      background-color: rgba(1, 54, 108, 0.6);
      position: relative;
      .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        background-color: #2b4a81;
        // font-weight: 700;
      }
    }
    .mod2 {
      width: 100%;
      height: 32%;
      margin-bottom: 3%;
      border: 1px solid #093e90;
      background-color: rgba(1, 54, 108, 0.6);
      position: relative;
      &.mod2_1 {
        margin-bottom: 0px;
      }
      .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        background-color: #2b4a81;
        // font-weight: 700;
      }
    }
  }
  .box2 {
    width: calc(44% - 20px);
    margin: 0px 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .modBox1 {
      height: 61%;
      border: 1px solid #093e90;
      background-color: rgba(1, 54, 108, 0.6);
      position: relative;
      margin-top: 5%;
      display: flex;
      flex-direction: column;
      padding: 10px;
    }
    .modBox2 {
      margin-top: 2%;
      height: 32%;
      border: 1px solid #093e90;
      background-color: rgba(1, 54, 108, 0.6);
      .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        background-color: #2b4a81;
        // font-weight: 700;
      }
    }
  }
  .box3 {
    width: 28%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .modr1 {
      width: 100%;
      height: 32%;
      margin-bottom: 3%;
      border: 1px solid #093e90;
      background-color: rgba(1, 54, 108, 0.6);
      position: relative;
      .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        background-color: #2b4a81;
        // font-weight: 700;
      }
    }
    // 裕农通风险管理
    .modr2 {
      width: 100%;
      height: 32%;
      margin-bottom: 3%;
      border: 1px solid #093e90;
      background-color: rgba(1, 54, 108, 0.6);
      position: relative;
      .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        letter-spacing: 2px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        background-color: #2b4a81;
        // font-weight: 700;
      }
    }
    .modr3 {
      width: 100%;
      height: 32%;
      border: 1px solid #093e90;
      background-color: rgba(1, 54, 108, 0.6);
      position: relative;
      .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        background-color: #2b4a81;
        // font-weight: 700;
      }
    }
  }
}
// 无限旋转
.trans {
  border-radius: 50%;
  overflow: hidden;
  animation: rotate 3s linear infinite; // 意思就是匀速的运动   infinite// 就是无限滚动的意思
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
// 链接导航
.loginOut {
  width: 15px;
  height: 35px;
  line-height: 35px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  position: fixed;
  right: 0px;
  top: 10px;
  background-color: #034c6a;
  cursor: pointer;
}
.buttonBox {
  padding: 20px;
}
.button1 {
  margin: 10px;
}
.piebox {
  height: 100%;
  position: relative;
  .t1 {
    width: 45%;
    height: 45%;
    position: absolute;
    top: 0px;
    left: 0px;
    .title {
      color: #70c5ff;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 3%;
    }
    ul {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5%;
      padding: 5%;
      margin: 0px;
      li {
        p {
          color: #fff;
          font-size: 14px;
          padding: 0px;
          float: left;
        }
        span {
          color: #ffb956;
          font-size: 14px;
          float: right;
        }
        margin-bottom: 5%;
      }
    }
  }
  .t2 {
    width: 45%;
    height: 45%;
    position: absolute;
    right: 0px;
    top: 0px;
    .title {
      color: #70c5ff;
      font-size: 16px;
      text-align: right;
      font-weight: 700;
      margin-bottom: 3%;
    }
    ul {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5%;
      padding: 5%;
      margin: 0px;
      li {
        p {
          color: #fff;
          font-size: 14px;
          padding: 0px;
          float: left;
        }
        span {
          color: #ffb956;
          font-size: 14px;
          float: right;
        }
        margin-bottom: 5%;
      }
    }
  }
  .t3 {
    .title {
      color: #70c5ff;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 3%;
    }
    ul {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5%;
      padding: 5%;
      margin: 0px;
      li {
        p {
          color: #fff;
          font-size: 14px;
          padding: 0px;
          float: left;
        }
        span {
          color: #ffb956;
          font-size: 14px;
          float: right;
        }
        margin-bottom: 5%;
      }
    }
    width: 45%;
    height: 45%;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
  .t4 {
    .title {
      color: #70c5ff;
      font-size: 16px;
      text-align: right;
      font-weight: 700;
      margin-bottom: 3%;
    }
    ul {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5%;
      padding: 5%;
      margin: 0px;
      li {
        p {
          color: #fff;
          font-size: 14px;
          padding: 0px;
          float: left;
        }
        span {
          color: #ffb956;
          font-size: 14px;
          float: right;
        }
        margin-bottom: 5%;
      }
    }
    width: 45%;
    height: 45%;
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
}
.yuanhuan {
  width: 200%;
  height: 150%;
  position: absolute;
  left: -47%;
  top: -23%;
  transform: scale(0.25);
}
.sjx {
  width: 20%;
  top: 41%;
  left: 55%;
  margin-left: -12%;
  position: absolute;
  animation: rotate 5s linear infinite;
}
.seamless-warp {
  width: 95%;
  margin: 0px auto;
  height: 100%;
  overflow: hidden;

  .itemhua {
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 100%;
      margin-top: 2%;
      // background: rgba(255, 255, 255, 0.1);
      .tit {
        color: #fff;
        font-size: 18px;
        margin-top: 2%;
        margin-left: 5%;
        margin-bottom: 5%;
      }
      .txt {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 5%;
        .box {
          width: 33.33%;
          font-size: 18px;
          text-align: center;
          color: #fff;
          .t1 {
            color: #77c8ff;
            margin-bottom: 5%;
          }
          .t2 {
            color: #ffb956;
          }
        }
      }
    }
  }
}

.el-carousel__item:nth-child(2n) {
  // background-color: #072769;
  background: rgba(53, 87, 154, 0.5);
  border-radius: 10px;
}
.el-carousel__item:nth-child(2n + 1) {
  // background-color: #1e325a;
  background: rgba(30, 50, 90, 0.5);
  border-radius: 10px;
}
.el-carousel__item:nth-child(2n).is-active {
  background: rgba(53, 87, 154, 0.95);
}
.el-carousel__item:nth-child(2n + 1).is-active {
  background: rgba(30, 50, 90, 0.95);
}

.topClose {
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}
@media screen and (max-width: 1280px) {
  .zrBox {
    // width: 200%;
    // left: -49%;
    // transform: scale(0.35);
  }
  .sq_txt {
    bottom: 2%;
  }
  .clBox .jdt .jdt_list {
    margin-top: 0px;
  }
}
@media screen and (max-width: 1100px) {
  .bg .box3 .modr3 .titleBox .title_all {
    margin-left: 3%;
  }
  .bg .box3 .modr1 .yjBox {
    height: 170%;
  }
  .sq_txt {
    left: 18%;
  }

  .box4 .box4Pie {
    width: 94%;
  }
  .box4 .box4_tab {
    width: 6%;
  }
  .box4 .title_all {
    font-size: 12px;
  }
}
</style>
<style lang="scss">
.jdt_box_1 {
  .el-progress-bar__inner {
    background-color: #ffd52e !important;
  }
}
.jdt {
  .el-progress-bar__outer {
    background-color: #0d0a23;
  }
}

.ssYijihan {
  .el-input__inner {
    background-color: transparent;
    border: 0px;
    border-radius: 0px;
    color: #fff;
  }
  &:focus {
  }
  width: 250px;
  position: absolute;
  right: 60px;
  top: 30px;
  background-color: transparent;
}
.seamless-warp {
  .el-carousel__mask {
    opacity: 1;
    background-color: transparent;
  }
}
.topBox {
  .itemhua {
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 420px;
    margin-top: 20px;
    li {
      width: 48%;
      height: 170px;
      margin-bottom: 15px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      padding: 10px;
      .tit {
        color: #fff;
        font-size: 24px;
        margin-bottom: 15px;
        display: flex;
        flex-direction: row;
      }
      .txt {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        height: 100px;
        .paihan {
          width: 100px;
          height: 100px;

          border: 1px solid #2988c1;
          font-size: 24px;
          border-radius: 5px;
          color: #ffb956;
          text-align: center;
          line-height: 100px;
          background: rgba(255, 255, 255, 0.1);
        }
        .boxP {
          width: 70%;
          display: flex;
          flex-direction: column;
          .box {
            width: 100%;
            font-size: 16px;
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            height: 33.3%;
            margin-bottom: 2px;
            line-height: 30px;
            padding-left: 10px;
            color: #fff;
            border-left: 1px solid #2988c1;
            .t1 {
              color: #fff;
              float: left;
            }
            .t2 {
              color: #ffb956;
              float: right;
              margin-right: 15px;
            }
          }
        }
      }
    }
  }
  .el-dialog__title {
    color: #70c5ff;
  }
  .el-dialog__headerbtn:focus .el-dialog__close,
  .el-dialog__headerbtn:hover .el-dialog__close {
    color: #fff;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .el-dialog {
    background: rgba(5, 26, 71, 0.95);
    background-image: url("../../assets/img/box2mod2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 70%;
  }
  .el-dialog__header {
    padding: 40px 20px 10px;
  }
  .el-dialog__body {
    padding: 20px 20px;
  }
}
.ccbSelect {
  .el-select-dropdown__item.selected {
    color: #fff;
  }
  .el-select-dropdown__item {
    color: #fff;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #637ea7;
  }
  .el-select-dropdown {
    border: 1px solid #6088b1;
    background-color: #2b4a81;
  }
  .el-input__inner {
    background-color: #2b4a81;
    border: 1px solid #6088b1;
    height: 30px;
    line-height: 30px;
    color: #fff;
  }
  .el-input__icon {
    line-height: normal;
  }
}
</style>