<template>
    <section class="toolbar">
        <el-tabs v-model="activeName"
                 type="card"
                 @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in this.allMenu"
                         :label="item.name"
                         :name="item.name"
                         :key="index">
            </el-tab-pane>
        </el-tabs>
        <div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import { } from '../../api/product'
    import { getMenu } from '../../api/login'
    export default {
        data() {
            return {
                allMenu:[],
                activeName: 'Joom对比Wish价格'
            }
        },
        methods: {
            handleClick(tab, event) {
                if (tab.label === 'Wish账号字典') {
                    this.$router.push({
                        path: '/v1/basic-info/ebay-suffix',
                    })
                }
                if (tab.label === 'eBay账号字典') {
                    this.$router.push({
                        path: '/v1/basic-info/ebay',
                    })
                }
                if (tab.label === 'Joom账号字典') {
                    this.$router.push({
                        path: '/v1/basic-info/joom',
                    })
                }
                if (tab.label === 'eBay运输方式') {
                    this.$router.push({
                        path: '/v1/basic-info/ys',
                    })
                }
                if (tab.label === 'Joom对比Wish价格') {

                }
                if (tab.label === '开发采购美工对应关系') {
                    this.$router.push({
                        path: '/v1/basic-info/art',
                    })
                }
            },
        },
        mounted() {
            getMenu().then(response => {
                const res = response.data.data
                const menu = res.filter(e => e.name === '产品中心')
                this.allMenu = menu[0].children[4].tabs
            })
        }
    }
</script>

<style lang="scss" scoped>
</style>
