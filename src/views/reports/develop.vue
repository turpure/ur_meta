<template>
  <!-- <div>开发毛利润报表</div>     -->
  <div>
    <div class="demo-block demo-box demo-zh-CN demo-transition" @mouseover="changeActive" @mouseout="removeActive">
      <transition name="el-fade-in-linear">
        <el-form :model="condition" :inline="true" ref="condition" label-width="68px" class="demo-form-inline" v-show="show">
          <el-form-item label="部门" class="input">
            <el-select v-model="formInline.region" multiple collapse-tags placeholder="部门" @change="choosed">
              <el-button plain type="info" @click="selectalld">全选</el-button>
              <el-button plain type="info" @click="noselectd">取消</el-button>
              <el-option v-for="(item,index) in department" :index="index" :key="item.department" :label="item.department" :value="item.department"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开发员" class="input">
            <el-select v-model="condition.member" filterable multiple collapse-tags placeholder="开发员">
              <el-button plain type="info" @click="selectallm">全选</el-button>
              <el-button plain type="info" @click="noselectm">取消</el-button>
              <el-option v-for="(item,index) in member" :index="index" :key="item.username" :label="item.username" :value="item.username"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间类型" class="input" prop="dateType">
            <el-radio-group v-model="condition.dateType">
              <el-radio border v-for="(item,index) in dateType" :index="index" :key="item.id" :label="item.id" :value="item.id">{{item.type}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日期" class="input" prop="dateRange" :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
            <el-date-picker v-model="condition.dateRange" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(condition)">查询</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <div class="demo-block-control" @click="handleChange" style="left:0px;">
        <transition>
          <i :class="{'el-icon-caret-bottom':isA,'el-icon-caret-top':!isA}" class="transition-i">
          </i>
        </transition>
        <transition>
          <span v-show="show1" class="transition-span">{{text}}</span>
        </transition>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="2" :offset="18">
        <el-input clearable placeholder="search" v-model="searchValue" @change="handleSearch"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="float:left;" type="default" @click="exportExcel">导出Excel
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            属性选择
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox v-model="checked1" @change="handleCheck1">业绩归属人</el-checkbox><br>
            <el-checkbox v-model="checked2" @change="handleCheck2">时间段（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked3" @change="handleCheck3">销售额$（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked4" @change="handleCheck4">销售额￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked5" @change="handleCheck5">商品成本￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked6" @change="handleCheck6">交易费汇总$ (0-6月)</el-checkbox><br>
            <el-checkbox v-model="checked7" @change="handleCheck7">交易费汇总￥ (0-6月)</el-checkbox><br>
            <el-checkbox v-model="checked8" @change="handleCheck8">包装成本￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked9" @change="handleCheck9">运费成本￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked10" @change="handleCheck10">死库处理￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked11" @change="handleCheck11">运营杂费￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked12" @change="handleCheck12">毛利润￥（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked13" @change="handleCheck13">毛利率%（0-6月）</el-checkbox><br>
            <el-checkbox v-model="checked14" @change="handleCheck14">时间段（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked15" @change="handleCheck15">销售额$（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked16" @change="handleCheck16">销售额￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked17" @change="handleCheck17">商品成本￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked18" @change="handleCheck18">交易费汇总$ (6-12月)</el-checkbox><br>
            <el-checkbox v-model="checked19" @change="handleCheck19">交易费汇总￥ (6-12月)</el-checkbox><br>
            <el-checkbox v-model="checked20" @change="handleCheck20">包装成本￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked21" @change="handleCheck21">运费成本￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked22" @change="handleCheck22">死库处理￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked23" @change="handleCheck23">运营杂费￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked24" @change="handleCheck24">毛利润￥（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked25" @change="handleCheck25">毛利率%（6-12月）</el-checkbox><br>
            <el-checkbox v-model="checked26" @change="handleCheck26">时间段（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked27" @change="handleCheck27">销售额$（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked28" @change="handleCheck28">销售额￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked29" @change="handleCheck29">商品成本￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked30" @change="handleCheck30">交易费汇总$ (12月以上)</el-checkbox><br>
            <el-checkbox v-model="checked31" @change="handleCheck31">交易费汇总￥ (12月以上)</el-checkbox><br>
            <el-checkbox v-model="checked32" @change="handleCheck32">包装成本￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked33" @change="handleCheck33">运费成本￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked34" @change="handleCheck34">死库处理￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked35" @change="handleCheck35">运营杂费￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked36" @change="handleCheck36">毛利润￥（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked37" @change="handleCheck37">毛利率%（12月以上）</el-checkbox><br>
            <el-checkbox v-model="checked38" @change="handleCheck38">销售额￥（汇总）</el-checkbox><br>
            <el-checkbox v-model="checked39" @change="handleCheck39">毛利润￥（汇总）</el-checkbox><br>
            <el-checkbox v-model="checked40" @change="handleCheck40">毛利率%（汇总）</el-checkbox>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="业绩归属1人表" name="first">
        <el-table :data="tableData01" id="sale-table01" size="medium" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" v-show="show2" :height="tableHeight" :max-height="tableHeight" :highlight-current-row="true" style="width: 100%;zoom:0.6">
          <el-table-column v-if="this.checked1" min-width="150px" prop="salernameZero" label="业绩归属人" :formatter="empty" sortable></el-table-column>
          <el-table-column v-if="this.checked2" min-width="180px" prop="timegroupZero" label="时间段（0-6月）"></el-table-column>
          <el-table-column v-if="this.checked3" min-width="220px" prop="salemoneyrmbusZero" label="销售额$（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked4" min-width="220px" prop="salemoneyrmbznZero" label="销售额￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked5" min-width="250px" prop="costmoneyrmbZero" label="商品成本￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked6" min-width="250px" prop="ppebayusZero" label="交易费汇总$（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked7" min-width="260px" prop="ppebayznZero" label="交易费汇总￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked8" min-width="240px" prop="inpackagefeermbZero" label="包装成本￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked9" min-width="240px" prop="expressfarermbZero" label="运费成本￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked10" min-width="240px" prop="devofflinefeeZero" label="死库处理￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked11" min-width="240px" prop="devOpeFeeZero" label="运营杂费￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked12" min-width="220px" prop="netprofitZero" label="毛利润￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked13" min-width="220px" prop="netrateZero" label="毛利率%（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked14" min-width="200px" prop="timegroupSix" label="时间段（6-12月）"></el-table-column>
          <el-table-column v-if="this.checked15" min-width="220px" prop="salemoneyrmbusSix" label="销售额$（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked16" min-width="230px" prop="salemoneyrmbznSix" label="销售额￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked17" min-width="250px" prop="costmoneyrmbSix" label="商品成本￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked18" min-width="260px" prop="ppebayusSix" label="交易费汇总$（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked19" min-width="270px" prop="ppebayznSix" label="交易费汇总￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked20" min-width="260px" prop="inpackagefeermbSix" label="包装成本￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked21" min-width="260px" prop="expressfarermbSix" label="运费成本￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked22" min-width="260px" prop="devofflinefeeSix" label="死库处理￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked23" min-width="260px" prop="devOpeFeeSix" label="运营杂费￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked24" min-width="230px" prop="netprofitSix" label="毛利润￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked25" min-width="230px" prop="netrateSix" label="毛利率%（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked26" min-width="210px" prop="timegroupTwe" label="时间段（12月以上）"></el-table-column>
          <el-table-column v-if="this.checked27" min-width="240px" prop="salemoneyrmbusTwe" label="销售额$（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked28" min-width="250px" prop="salemoneyrmbznTwe" label="销售额￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked29" min-width="270px" prop="costmoneyrmbTwe" label="商品成本￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked30" min-width="280px" prop="ppebayusTwe" label="交易费汇总$（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked31" min-width="290px" prop="ppebayznTwe" label="交易费汇总￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked32" min-width="270px" prop="inpackagefeermbTwe" label="包装成本￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked33" min-width="280px" prop="expressfarermbTwe" label="运费成本￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked34" min-width="280px" prop="devofflinefeeTwe" label="死库处理￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked35" min-width="270px" prop="devOpeFeeTwe" label="运营杂费￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked36" min-width="250px" prop="netprofitTwe" label="毛利润￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked37" min-width="250px" prop="netrateTwe" label="毛利率%（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked38" min-width="220px" prop="salemoneyrmbtotal" label="销售额￥（汇总）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked39" min-width="220px" prop="netprofittotal" label="毛利润￥（汇总）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked40" min-width="220px" prop="netratetotal" label="毛利率%（汇总）" :formatter="empty" sortable="custom"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="业绩归属2人表" name="second">
        <el-table :data="tableData02" id="sale-table02" size="medium" v-loading="listLoading" @sort-change="sortNumber" show-summary :summary-method="getSummaries" v-show="show2" :height="tableHeight" :max-height="tableHeight" :highlight-current-row="true" style="width: 100%;zoom:0.6">
          <el-table-column v-if="this.checked1" min-width="150px" prop="salernameZero" label="业绩归属人" :formatter="empty" sortable></el-table-column>
          <el-table-column v-if="this.checked2" min-width="200px" prop="timegroupZero" label="时间段（0-6月）" sortable></el-table-column>
          <el-table-column v-if="this.checked3" min-width="210px" prop="salemoneyrmbusZero" label="销售额$（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked4" min-width="220px" prop="salemoneyrmbznZero" label="销售额￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked5" min-width="240px" prop="costmoneyrmbZero" label="商品成本￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked6" min-width="250px" prop="ppebayusZero" label="交易费汇总$（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked7" min-width="260px" prop="ppebayznZero" label="交易费汇总￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked8" min-width="260px" prop="inpackagefeermbZero" label="包装成本￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked9" min-width="260px" prop="expressfarermbZero" label="运费成本￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked10" min-width="260px" prop="devofflinefeeZero" label="死库处理￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked11" min-width="260px" prop="devOpeFeeZero" label="运营杂费￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked12" min-width="260px" prop="netprofitZero" label="毛利润￥（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked13" min-width="260px" prop="netrateZero" label="毛利率%（0-6月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked14" min-width="260px" prop="timegroupSix" label="时间段（6-12月）"></el-table-column>
          <el-table-column v-if="this.checked15" min-width="260px" prop="salemoneyrmbusSix" label="销售额$（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked16" min-width="260px" prop="salemoneyrmbznSix" label="销售额￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked17" min-width="260px" prop="costmoneyrmbSix" label="商品成本￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked18" min-width="260px" prop="ppebayusSix" label="交易费汇总$（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked19" min-width="270px" prop="ppebayznSix" label="交易费汇总￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked20" min-width="260px" prop="inpackagefeermbSix" label="包装成本￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked21" min-width="260px" prop="expressfarermbSix" label="运费成本￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked22" min-width="260px" prop="devofflinefeeSix" label="死库处理￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked23" min-width="260px" prop="devOpeFeeSix" label="运营杂费￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked24" min-width="260px" prop="netprofitSix" label="毛利润￥（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked25" min-width="260px" prop="netrateSix" label="毛利率%（6-12月）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked26" min-width="210px" prop="timegroupTwe" label="时间段（12月以上）"></el-table-column>
          <el-table-column v-if="this.checked27" min-width="260px" prop="salemoneyrmbusTwe" label="销售额$（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked28" min-width="260px" prop="salemoneyrmbznTwe" label="销售额￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked29" min-width="270px" prop="costmoneyrmbTwe" label="商品成本￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked30" min-width="280px" prop="ppebayusTwe" label="交易费汇总$（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked31" min-width="290px" prop="ppebayznTwe" label="交易费汇总￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked32" min-width="270px" prop="inpackagefeermbTwe" label="包装成本￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked33" min-width="270px" prop="expressfarermbTwe" label="运费成本￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked34" min-width="270px" prop="devofflinefeeTwe" label="死库处理￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked35" min-width="270px" prop="devOpeFeeTwe" label="运营杂费￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked36" min-width="260px" prop="netprofitTwe" label="毛利润￥（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked37" min-width="260px" prop="netrateTwe" label="毛利率%（12月以上）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked38" min-width="260px" prop="salemoneyrmbtotal" label="销售额￥（汇总）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked39" min-width="260px" prop="netprofittotal" label="毛利润￥（汇总）" :formatter="empty" sortable="custom"></el-table-column>
          <el-table-column v-if="this.checked40" min-width="260px" prop="netratetotal" label="毛利率%（汇总）" :formatter="empty" sortable="custom"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getMyToken } from "../../api/api";
import { getSection, getMember, getDevelop } from "../../api/profit";
import { compareUp, compareDown } from "../../api/tools";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: true,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      checked9: false,
      checked10: false,
      checked11: false,
      checked12: true,
      checked13: true,
      checked14: false,
      checked15: false,
      checked16: true,
      checked17: false,
      checked18: false,
      checked19: false,
      checked20: false,
      checked21: false,
      checked22: false,
      checked23: false,
      checked24: true,
      checked25: true,
      checked26: false,
      checked27: false,
      checked28: true,
      checked29: false,
      checked30: false,
      checked31: false,
      checked32: false,
      checked33: false,
      checked34: false,
      checked35: false,
      checked36: true,
      checked37: true,
      checked38: true,
      checked39: true,
      checked40: true,
      tableHeight: 0,
      allMember: [],
      isA: true,
      text: "显示输入框",
      show: true,
      show1: false,
      show2: false,
      activeName: "first",
      tableData01: [],
      tableData02: [],
      searchTableFirst: [],
      searchTableSecond: [],
      searchValue: "",
      listLoading: false,
      department: [],
      member: [],
      dateRange: [],
      dateType: [{ id: 1, type: "发货时间" }, { id: 0, type: "交易时间" }],
      formInline: {
        region: []
      },
      condition: {
        member: [],
        dateType: 1,
        dateRange: []
      },
      tableMap: {
        first: {
          tableData: "tableData01",
          searchTable: "searchTableFirst"
        },
        second: {
          tableData: "tableData02",
          searchTable: "searchTableSecond"
        }
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              const end = new Date();
              const y = end.getFullYear();
              let m = end.getMonth() + 1;
              if (m < 10) {
                m = "0" + m;
              }
              const firstday = y + "-" + m + "-" + "01";
              const start = new Date();
              const sy = start.getFullYear();
              let sm = start.getMonth() + 1;
              const sd = start.getDate();
              if (sm < 10) {
                sm = "0" + sm;
              }
              const sfirstday = sy + "-" + sm + "-" + sd;
              picker.$emit("pick", [firstday, sfirstday]);
            }
          },
          {
            text: "上个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              const y = start.getFullYear();
              let m = start.getMonth();
              let lastday;
              let firstday;
              if (
                m == 1 ||
                m == 3 ||
                m == 5 ||
                m == 7 ||
                m == 8 ||
                m == 10 ||
                m == 12
              ) {
                lastday = y + "-" + ("0" + m) + "-" + "31";
              } else if (m == 4 || m == 6 || m == 9 || m == 11) {
                lastday = y + "-" + ("0" + m) + "-" + "30";
              } else if (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)) {
                lastday = y + "-" + "02" + "-" + "29";
              } else {
                lastday = y + "-" + "02" + "-" + "28";
              }
              firstday = y + "-" + ("0" + m) + "-" + "01";
              picker.$emit("pick", [firstday, lastday]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    handleCheck1() {
      this.checked1 != this.checked1;
    },
    handleCheck2() {
      this.checked2 != this.checked2;
    },
    handleCheck3() {
      this.checked3 != this.checked3;
    },
    handleCheck4() {
      this.checked4 != this.checked4;
    },
    handleCheck5() {
      this.checked5 != this.checked5;
    },
    handleCheck6() {
      this.checked6 != this.checked6;
    },
    handleCheck7() {
      this.checked7 != this.checked7;
    },
    handleCheck8() {
      this.checked8 != this.checked8;
    },
    handleCheck9() {
      this.checked9 != this.checked9;
    },
    handleCheck10() {
      this.checked10 != this.checked10;
    },
    handleCheck11() {
      this.checked11 != this.checked11;
    },
    handleCheck12() {
      this.checked12 != this.checked12;
    },
    handleCheck13() {
      this.checked13 != this.checked13;
    },
    handleCheck14() {
      this.checked14 != this.checked14;
    },
    handleCheck15() {
      this.checked15 != this.checked15;
    },
    handleCheck16() {
      this.checked16 != this.checked16;
    },
    handleCheck17() {
      this.checked17 != this.checked17;
    },
    handleCheck18() {
      this.checked18 != this.checked18;
    },
    handleCheck19() {
      this.checked19 != this.checked19;
    },
    handleCheck20() {
      this.checked20 != this.checked20;
    },
    handleCheck21() {
      this.checked21 != this.checked21;
    },
    handleCheck22() {
      this.checked22 != this.checked22;
    },
    handleCheck23() {
      this.checked23 != this.checked23;
    },
    handleCheck24() {
      this.checked24 != this.checked24;
    },
    handleCheck25() {
      this.checked25 != this.checked25;
    },
    handleCheck26() {
      this.checked26 != this.checked26;
    },
    handleCheck27() {
      this.checked27 != this.checked27;
    },
    handleCheck28() {
      this.checked28 != this.checked28;
    },
    handleCheck29() {
      this.checked29 != this.checked29;
    },
    handleCheck30() {
      this.checked30 != this.checked30;
    },
    handleCheck31() {
      this.checked31 != this.checked31;
    },
    handleCheck32() {
      this.checked32 != this.checked32;
    },
    handleCheck33() {
      this.checked33 != this.checked33;
    },
    handleCheck34() {
      this.checked34 != this.checked34;
    },
    handleCheck35() {
      this.checked35 != this.checked35;
    },
    handleCheck36() {
      this.checked36 != this.checked36;
    },
    handleCheck37() {
      this.checked37 != this.checked37;
    },
    handleCheck38() {
      this.checked38 != this.checked38;
    },
    handleCheck39() {
      this.checked39 != this.checked39;
    },
    handleCheck40() {
      this.checked40 != this.checked40;
    },
    selectalld() {
      const allValues = [];
      for (const item of this.department) {
        allValues.push(item.department);
      }
      this.formInline.region = allValues;
      this.member = this.allMember;
    },
    noselectd() {
      this.formInline.region = [];
      this.member = this.allMember;
    },
    selectallm() {
      const allValues = [];
      for (const item of this.member) {
        allValues.push(item.username);
      }
      this.condition.member = allValues;
    },
    noselectm() {
      this.condition.member = [];
    },
    choosed() {
      let res = [];
      this.member = [];
      this.condition.member = [];
      let val = this.formInline.region;
      res = this.allMember;
      let per = [];
      if (val != "") {
        for (let i = 0; i < val.length; i++) {
          per = res.filter(
            ele => ele.department == val[i] && ele.position == "开发"
          );
          this.member = this.member.concat(per);
        }
      } else {
        this.member = res;
      }
    },
    handleChange() {
      this.show = !this.show;
      this.isA = !this.isA;
      if (this.show == false) {
        this.text = "显示输入框";
        let height = document.getElementById("app").clientHeight;
        this.tableHeight = height + 315 + "px";
      } else if (this.show == true) {
        this.text = "隐藏输入框";
        let height = document.getElementById("app").clientHeight;
        this.tableHeight = height + 210 + "px";
      }
    },
    changeActive() {
      this.show1 = true;
    },
    removeActive() {
      this.show1 = false;
    },
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
    onSubmit(form) {
      let myform = JSON.parse(JSON.stringify(form));
      let height = document.getElementById("app").clientHeight;
      this.tableHeight = height + 210 + "px";
      let posseman1Data;
      let posseman2Data;
      let ret;
      this.show2 = true;
      this.$refs.condition.validate(valid => {
        if (valid) {
          this.listLoading = true;
          if (
            this.formInline.region.length !== 0 &&
            this.condition.member.length === 0
          ) {
            let val = this.formInline.region;
            let res = [];
            let person = [];
            res = this.allMember;
            for (let i = 0; i < val.length; i++) {
              person = res.filter(
                ele => ele.department == val[i] && ele.position == "开发"
              );
              this.member.concat(person);
            }
            myform.member = this.member.map(m => {
              return m.username;
            });
            getDevelop(myform).then(response => {
              this.listLoading = false;
              ret = response.data.data;
              posseman1Data = ret.filter(ele => ele.tableType == "归属1人表");
              posseman2Data = ret.filter(ele => ele.tableType == "归属2人表");
              this.tableData01 = this.searchTableFirst = posseman1Data;
              this.tableData02 = this.searchTableSecond = posseman2Data;
            });
          } else if (this.condition.member.length > 0) {
            this.listLoading = true;
            myform.member = this.condition.member;
            getDevelop(myform).then(response => {
              this.listLoading = false;
              ret = response.data.data;
              posseman1Data = ret.filter(ele => ele.tableType == "归属1人表");
              posseman2Data = ret.filter(ele => ele.tableType == "归属2人表");
              this.tableData01 = this.searchTableFirst = posseman1Data;
              this.tableData02 = this.searchTableSecond = posseman2Data;
            });
          } else {
            this.listLoading = true;
            getDevelop(myform).then(response => {
              this.listLoading = false;
              ret = response.data.data;
              posseman1Data = ret.filter(ele => ele.tableType == "归属1人表");
              posseman2Data = ret.filter(ele => ele.tableType == "归属2人表");
              this.tableData01 = this.searchTableFirst = posseman1Data;
              this.tableData02 = this.searchTableSecond = posseman2Data;
            });
          }
        } else {
          return false;
        }
      });
    },
    handleSearch() {
      let searchValue = this.searchValue && this.searchValue.toLowerCase();
      let activeTable = this.activeName;
      let data = this[this.tableMap[activeTable]["searchTable"]];
      if (searchValue) {
        this[this.tableMap[activeTable]["tableData"]] = data.filter(function(
          row
        ) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(searchValue) > -1
            );
          });
        });
      } else {
        this[this.tableMap[activeTable]["tableData"]] = data;
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const fileds = columns.map(item => item.property);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item =>
          Number(item[column.property] ? item[column.property] : "unkonwn")
        );
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = Math.round(sums[index] * 100) / 100;
        } else {
          sums[index] = "N/A";
        }
      });
      //退款率和利润率核算
      sums[fileds.indexOf("netrateZero")] =
        Math.round(
          sums[fileds.indexOf("netprofitZero")] *
            10000 /
            sums[fileds.indexOf("salemoneyrmbznZero")]
        ) / 100;
      sums[fileds.indexOf("netrateSix")] =
        Math.round(
          sums[fileds.indexOf("netprofitSix")] *
            10000 /
            sums[fileds.indexOf("salemoneyrmbznSix")]
        ) / 100;
      sums[fileds.indexOf("netrateTwe")] =
        Math.round(
          sums[fileds.indexOf("netprofitTwe")] *
            10000 /
            sums[fileds.indexOf("salemoneyrmbznTwe")]
        ) / 100;
      sums[fileds.indexOf("netratetotal")] =
        Math.round(
          sums[fileds.indexOf("netprofittotal")] *
            10000 /
            sums[fileds.indexOf("salemoneyrmbtotal")]
        ) / 100;
      return sums;
    },
    //数字排序
    sortNumber(column, prop, order) {
      let activeTable = this.activeName;
      let data = this[this.tableMap[activeTable]["tableData"]];
      if (column.order === "descending") {
        this.tableData = data.sort(compareDown(data, column.prop));
      } else {
        this.tableData = data.sort(compareUp(data, column.prop));
      }
    },
    //格式化数字
    empty(row, column, cellValue, index) {
      return cellValue ? cellValue : "--";
    },
    //导出
    exportExcel() {
      const th = [
        "业绩归属人",
        "时间段(0-6月)",
        "销售额$(0-6月)",
        "销售额￥(0-6月)",
        "商品成本￥(0-6月)",
        "交易费汇总$(0-6月)",
        "交易费汇总￥(0-6月)",
        "包装成本￥(0-6月)",
        "运费成本￥(0-6月)",
        "死库处理￥(0-6月)",
        "运营杂费￥(0-6月)",
        "毛利润￥(0-6月)",
        "毛利率%(0-6月)",
        "时间段(6-12月)",
        "销售额$(6-12月)",
        "销售额￥(6-12月)",
        "商品成本￥(6-12月)",
        "交易费汇总$(6-12月)",
        "交易费汇总￥(6-12月)",
        "包装成本￥(6-12月)",
        "运费成本￥(6-12月)",
        "死库处理￥(6-12月)",
        "运营杂费￥(6-12月)",
        "毛利润￥(6-12月)",
        "毛利率%(6-12月)",
        "时间段(12月以上)",
        "销售额$(12月以上)",
        "销售额￥(12月以上)",
        "商品成本￥(12月以上)",
        "交易费汇总$(12月以上)",
        "交易费汇总￥(12月以上)",
        "包装成本￥(12月以上)",
        "运费成本￥(12月以上)",
        "死库处理￥(12月以上)",
        "运营杂费￥(12月以上)",
        "毛利润￥(12月以上)",
        "毛利率%(12月以上)",
        "销售额￥(汇总)",
        "毛利润￥(汇总)",
        "毛利率%(汇总)"
      ];
      const filterVal = [
        "salernameZero",
        "timegroupZero",
        "salemoneyrmbusZero",
        "salemoneyrmbznZero",
        "costmoneyrmbZero",
        "ppebayusZero",
        "ppebayznZero",
        "inpackagefeermbZero",
        "expressfarermbZero",
        "devofflinefeeZero",
        "devOpeFeeZero",
        "netprofitZero",
        "netrateZero",
        "timegroupSix",
        "salemoneyrmbusSix",
        "salemoneyrmbznSix",
        "costmoneyrmbSix",
        "ppebayusSix",
        "ppebayznSix",
        "inpackagefeermbSix",
        "expressfarermbSix",
        "devofflinefeeSix",
        "devOpeFeeSix",
        "netprofitSix",
        "netrateSix",
        "timegroupTwe",
        "salemoneyrmbusTwe",
        "salemoneyrmbznTwe",
        "costmoneyrmbTwe",
        "ppebayusTwe",
        "ppebayznTwe",
        "inpackagefeermbTwe",
        "expressfarermbTwe",
        "devofflinefeeTwe",
        "devOpeFeeTwe",
        "netprofitTwe",
        "netrateTwe",
        "salemoneyrmbtotal",
        "netprofittotal",
        "netratetotal"
      ];
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      let Filename =
        "开发毛利润报表" + year + month + strDate + hour + minute + second;
      if (this.activeName == "first") {
        const data = this.tableData01.map(v => filterVal.map(k => v[k]));
        const [fileName, fileType, sheetName] = [Filename, "xlsx"];
        this.$toExcel({ th, data, fileName, fileType, sheetName });
      } else if (this.activeName == "second") {
        const data = this.tableData02.map(v => filterVal.map(k => v[k]));
        const [fileName, fileType, sheetName] = [Filename, "xlsx"];
        this.$toExcel({ th, data, fileName, fileType, sheetName });
      }
    }
  },
  mounted() {
    getSection().then(response => {
      this.department = response.data.data;
    });
    getMember().then(response => {
      let res = response.data.data;
      this.allMember = this.member = res.filter(ele => ele.position == "开发");
    });
  }
};
</script>

<style lang="scss">
.container .main .content-container[data-v-0ff1e341] {
  margin: 0px;
  padding: 1px;
  .demo-block.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
  .demo-block {
    border: 0px solid #ebebeb;
    border-radius: 3px;
    transition: height 0.2s;
    .demo-block-control:hover {
      color: #409eff;
      background-color: #f9fafc;
    }
    .demo-block-control {
      border-bottom: 1px solid #eaeefb;
      border-top: 1px solid #eaeefb;
      height: 44px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      position: relative;
      i {
        font-size: 16px;
        line-height: 44px;
        transition: 0.3s;
      }
      i.hovering {
        transform: translateX(-40px);
      }
      [class^="el-icon-"] {
        font-family: element-icons !important;

        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .demo-block-control > span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 44px;
        transition: 0.3s;
      }
    }
    form {
      margin-left: 5px;
      background-color: #fafafa;
      transition: 0.2s 0.2s;
      .el-input__inner {
        height: 30px !important;
      }
      .el-date-editor .el-range__icon {
        line-height: 1px;
      }
      .el-date-editor .el-range-separator {
        line-height: 20px;
      }
    }
  }
}
.el-dropdown {
  font-size: 16px;
  margin-top: 8px;
  cursor: pointer;
}
.el-dropdown-menu {
  max-height: 300px;
  padding: 5px 5px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
}
</style>
