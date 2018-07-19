<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from "highcharts-vue";

export default {
  props: ["options", "styles"],
  name: "highcharts",
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      console.log(this.$el);
      this.$el.style.width = (this.styles.width || 800) + "px";
      this.$el.style.height = (this.styles.height || 400) + "px";
      this.chart = new Highcharts.Chart(this.$el, this.options);
    }
  }
};
</script>

<style lang="scss">
.highcharts-container {
  width: 800px;
  height: 400px;
}
</style>