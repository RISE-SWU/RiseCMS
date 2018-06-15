<template>
    <div>
        <div>
            <vo-basic :data="chartData"></vo-basic>
        </div>
    </div>
</template>
<script>
import { VoBasic } from 'vue-orgchart'
export default {
    components: { VoBasic },
    created () {
        this.chartData = {
        name: 'CMS系统导航配置',
            children: [
                { name: '首页' },
                { name: '新闻' },
                { name: '成员' },
                { 
                    name: '科研' ,
                    children: [{ name: '发表文章' }, {name: '科研项目'}]
                },
                { name: '研讨会' },
                {
                    name: '会议',
                    children: [{ name: '国内会议' }, {name: '国际会议'}]
                },
                { 
                    name: '交流' ,
                    children: [{ name: '出访' }, {name: '来访'}]
                },
                {
                    name: '关于',
                },
                {
                    name: '更多',
                    children: [{ name: '新增1' }, {name: '新增2'}]
                }
            ]
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../scss/color.scss';
    
</style>
