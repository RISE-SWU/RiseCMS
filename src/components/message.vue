<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>消息概况</h3>
            </div>
            <div class="card-container">
                <div class="card-item">
                    <p class="welcome">欢迎使用RISE实验室的CMS管理系统！</p>
                    <p class="link">我们准备了几个链接供您开始：</p>
                </div>
                <div class="card-item c">
                    <h4 class="title">接下来</h4>
                    <p><i class="fas fa-pen-square"></i><router-link to="">发布网站的第一篇新闻</router-link></p>
                    <p><i class="fas fa-plus-square"></i><router-link :to="accountPath">添加管理员、教师、学生账户</router-link></p>
                    <p><i class="fab fa-xing-square"></i><a href="http://www.swu-rise.net.cn" target="blank">查看站点</a></p>
                </div>
                <div class="card-item c">
                    <h4 class="title">更多操作</h4>
                    <p><i class="fas fa-list-alt"></i><router-link to="">菜单配置</router-link></p>
                    <p><i class="fas fa-calendar-check"></i><router-link :to="newsPath">管理、删除新闻</router-link></p>
                    <p><i class="fas fa-database"></i><a href="http://www.swu-rise.net.cn" target="blank">访问统计</a></p>
                </div>
            </div>
        </el-card>
        <div class="pack">
            <div class="pack-container">
                <div>
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix">
                            <h4>概要</h4>
                            <img src="@/assets/dz.png" alt="" />
                        </div>
                        <el-row class="pack-row">
                            <el-col class="pack-col" :span="12"><i class="fas fa-paperclip"></i><router-link :to="newsPath">{{ indexData.total.news }}篇新闻</router-link></el-col>
                            <el-col class="pack-col" :span="12"><i class="fas fa-user-tie"></i><router-link :to="accountPath">{{ indexData.total.admin }}个管理员账户</router-link></el-col>
                        </el-row>
                        <el-row class="pack-row">
                            <el-col class="pack-col" :span="12"><i class="fas fa-file-image"></i><router-link to="">{{ indexData.total.picture }}个轮播图</router-link></el-col>
                            <el-col class="pack-col" :span="12"><i class="fas fa-user"></i><router-link :to="accountPath">{{ indexData.total.account }}个教师及学生账户</router-link></el-col>
                        </el-row>
                    </el-card>
                    <el-card class="box-card" shadow="hover" style="margin-top: 20px;">
                        <div slot="header" class="clearfix">
                            <h4>监测</h4>
                            <img src="@/assets/dz.png" alt="" />
                        </div>
                        <el-row class="pack-row">
                            <div class="inspect" v-for="(item,index) in indexData.inspect" :key="index">
                                {{ item.type === 0 ? '管理员账户' : '用户账户' }} {{ item.userName }} 于 {{ item.operationTime}} 登录
                            </div>
                        </el-row>
                    </el-card>
                </div>
                <div style="margin: 0px 15px;">
                    <el-card class="box-card" shadow="hover" >
                        <div slot="header" class="clearfix">
                            <h4>活动</h4>
                            <img src="@/assets/dz.png" alt="" />
                        </div>
                        <el-row class="pack-row">
                                <div class="inspect" v-for="(item,index) in indexData.activity" :key="index">
                                     {{ item.author }} 于 {{ item.uploadTime }} 日发布了新闻<a href="http://www.swu-rise.net.cn">《{{ item.title }}》</a>
                                </div>
                        </el-row>
                    </el-card>
                </div>
                <div>
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix">
                            <h4>开发文档</h4>
                            <img src="@/assets/dz.png" alt="" />
                        </div>
                        <el-row class="pack-row">
                            <div class="inspect">
                                <a href="https://github.com/RISE-SWU/Guide">西南大学软件研究与创新中心网站开发指南</a>
                            </div>
                            <div class="inspect">
                                <a href="https://github.com/RISE-SWU">西南大学软件研究与创新中心网站开发组Github首页</a>
                            </div>
                            <div class="inspect">
                                <a href="https://github.com/RISE-SWU/RiseLabFE">西南大学软件研究与创新中心英文版网站项目仓库</a>
                            </div>
                            <div class="inspect">
                                <a href="https://github.com/RISE-SWU/RiseLabFE">西南大学软件研究与创新中心英文版网站GraphQL服务项目仓库</a>
                            </div>
                            <div class="inspect">
                                <a href="https://github.com/RISE-SWU/Guide/tree/master/API">西南大学软件研究与创新中心中文版网站API文档</a>
                            </div>
                        </el-row>
                    </el-card>
                    <el-card class="box-card" shadow="hover" style="margin-top: 20px;">
                        <div slot="header" class="clearfix">
                            <h4>开发者</h4>
                            <img src="@/assets/dz.png" alt="" />
                        </div>
                        <el-row class="pack-row">
                            <el-col class="pack-col" :span="12"><i class="fab fa-github"></i><a href="https://github.com/xiaosais">xiaoSai</a></el-col>
                            <el-col class="pack-col" :span="12"><i class="fab fa-github"></i><a href="https://github.com/xiaosais">z-xiaolong(小龙)</a></el-col>
                        </el-row>
                        <el-row class="pack-row">
                            <el-col class="pack-col" :span="12"><i class="fab fa-github"></i><a href="https://github.com/magichan">magichan(玉堃)</a></el-col>
                            <el-col class="pack-col" :span="12"><i class="fab fa-github"></i><a href="https://github.com/CQZYQ1994">CQZYQ1994(云谦)</a></el-col>
                        </el-row>
                        <el-row class="pack-row">
                            <el-col class="pack-col" :span="12"><i class="fab fa-github"></i><a href="https://github.com/LLian7">LLian7(雪莲)</a></el-col>
                            <el-col class="pack-col" :span="12"><i class="fab fa-github"></i><a href="https://github.com/xionglong58">xionglong58(熊龙)</a></el-col>
                        </el-row>
                    </el-card>
                </div>
            </div>
        </div>
    </div>  
</template>


<script>
import { PATH } from '@/common/config';
import { getIndex } from '@/http/http';
import { sendMessage } from '@/common/func';
export default {
    data() {
        return {
            accountPath: `/${PATH}/main/account`,
            newsPath: `/${PATH}/main/news`,
            indexData: {
                total: {}
            }
        }
    },
    created () {
        getIndex().then(res => {
            if(res.data.status === 'success') {
                this.indexData = res.data;
            } else {
                sendMessage('error', '获取数据出错，请联系管理员', this)
            }
        }).catch(err => {
            sendMessage('error', err, this)
        })
    }
}
</script>
<style lang="scss" scoped>
    @import '../scss/color.scss';
    .card-container {
        display: flex;
        align-items: center;
        justify-content: center;
        .card-item {
            flex: 1;
            text-align: center;
            .welcome {
                font-size: 20px;
            }
            .link {
                color: grey;
                margin-top: 10px;
            }
        }
        .c {
            text-align: left;
            i {
                font-size: 18px;
                width: 20px;
                color: gray;
                padding-right: 10px;
            }
            p {
                display: flex;
                align-items: center;
                font-size: 14px;
                margin: 10px 0px;
                a {
                    color: $theme-color;
                    text-decoration: none;
                    :hover {
                        color: black;
                    }
                }
            }
        }
        
    }
    .pack {
        .pack-container {
            display: flex;
            div {
                flex: 1;
                
            }
            justify-content: space-between;
        }
        .clearfix {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        img {
            width: 20px;
            height: 20px;
        }
        margin-top: 20px;
        .pack-col {
            display: flex;
            align-items: center;
        }
        .pack-row {
            margin-top: 15px;
            i {
                color: gray;
                padding-right: 5px;
            }
            a {
                color: $theme-color;
                text-decoration: none;
                font-size: 14px;
            }
            .inspect {
                font-size: 14px;
                margin-bottom: 10px;
            }
        }
    }
</style>
