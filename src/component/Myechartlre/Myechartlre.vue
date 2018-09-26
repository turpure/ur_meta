<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="24">
        <div id="areaStack" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import echarts from "echarts";

export default {
  props: {
    options: Object
  },
  data() {
    return {
      areaStack: null
    };
  },

  methods: {
    drawareaStack(opt) {
      this.areaStack = echarts.init(document.getElementById("areaStack"));
      this.areaStack.setOption(opt, true);
    },
    drawCharts() {
      //   this.drawAreaStack();
    }
  },

  mounted: function() {
    this.drawCharts();
  },
  updated: function() {
    this.drawCharts();
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  float: left;
}
.el-col {
  padding: 0px 20px;
}
</style>

