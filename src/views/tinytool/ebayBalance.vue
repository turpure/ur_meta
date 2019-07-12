<template>
  <div>
    <div>
      <el-table :data="tabdate" :height="tableHeight" class="elTable">
        <el-table-column type="index" fixed align="center" header-align="center"></el-table-column>
        <el-table-column label="账号名称" header-align="center">
          <el-table-column prop="accountName" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="余额" header-align="center">
          <el-table-column prop="balance" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="货币" header-align="center">
          <el-table-column prop="currency" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="更新时间" header-align="center">
          <el-table-column prop="updatedDate" :render-header="renderHeaderPic" align="center"></el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.reccondition.page"
        :page-sizes="[20, 30, 40]"
        :page-size="this.reccondition.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { APIEbayBalance } from "../../api/product";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 95,
      total: 0,
      time1: null,
      tabdate:[],
      reccondition: {
        pageSize: 20,
        page: 1,
        accountName: null,
        balance	: null,
        currency: null,
        updatedDate: []
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      this.reccondition.pageSize = val;
      this.getPic();
    },
    handleCurrentChange(val) {
      this.reccondition.page = val;
      this.getPic();
    },
    getPic() {
      APIEbayBalance(this.reccondition).then(response => {
        this.tabdate = response.data.data.items;
        this.total = response.data.data._meta.totalCount;
        this.reccondition.pageSize = response.data.data._meta.perPage;
        this.reccondition.page = response.data.data._meta.currentPage;
      });
    },
    formatTen(num) {
      return num > 9 ? num + "" : "0" + num;
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    },
    filter() {
      if (this.time1 !== null && this.time1.length !== 0) {
        this.reccondition.updatedDate = [
          this.formatDate(this.time1[0]),
          this.formatDate(this.time1[1])
        ];
      } else {
        this.reccondition.updatedDate = [];
      }
      this.getPic();
    },
    renderHeaderPic(h, { column, $index }) {
      if ($index === 0) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.reccondition.accountName,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.accountName = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 1) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.reccondition.balance,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.balance = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 2) {
        return h(
          "div",
          {
            style: {
              height: "30px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.reccondition.currency,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.reccondition.currency = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.filter();
                }
              }
            })
          ]
        );
      } else if ($index === 3) {
        return h("el-date-picker", {
          props: {
            value: this.time1,
            size: "mini",
            type: "daterange"
          },
          style: {
            width: "180px",
            padding: "2px"
          },
          on: {
            input: value => {
              this.time1 = value;
              this.$emit("input", value);
            },
            change: value => {
              this.filter();
            }
          }
        });
      }
    }
  },
  mounted() {
    this.getPic();
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 8rem auto;
  width: 40rem;
  padding: 6rem 2rem 2rem 4.5rem;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .el-form-item {
    margin-bottom: 4rem;

    .el-input {
      width: 18rem;
    }

    .el-button {
      margin-left: 3rem;
    }
  }
}
.clasRed1 {
  color: #f56c6c;
  border: rgba(245, 108, 108, 0.2) solid 1px;
  background: rgba(245, 108, 108, 0.1);
  width: 50%;
  margin: auto;
  line-height: 32px;
  display: block;
  border-radius: 5px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.clasGreen1 {
  color: #0e9a00;
  border-radius: 5px;
  width: 50%;
  margin: auto;
  line-height: 32px;
  display: block;
  border: rgba(3, 82, 38, 0.2) solid 1px;
  background: rgba(33, 170, 95, 0.1);
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>

