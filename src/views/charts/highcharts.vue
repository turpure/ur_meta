<template>
  <div class="x-bar">
    <div :id="id" :option="option"></div>
  </div>
</template>

<script>
import HighchartsVue from "highcharts-vue";

export default {
  props: {
    id: {
      type: String,
      default: "chart"
    },
    option: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
</style>