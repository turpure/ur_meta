module.exports = {
  bar: {
    chart: {
      type: "areaspline"
    },
    title: {
      text: "销售额走势$"
    },
    subtitle: {
      text: "数据来源: "
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: "美元 ( $ )"
      },
      labels: {
        formatter: function () {
          return this.value + "$";
        }
      }
    },
    tooltip: {
      shared: true,
      pointFormat: "{series.name}：<b>{point.y:,.2f}</b>"
    },
    credits: {
      enabled: false // 禁用版权信息
    },
    series: [
      {
        name: "公司全部",
        data: []
      }
    ]
  }
}