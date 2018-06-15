<template>
    <div class="hello">
        <div class="index-header">
            <div class="quickOp">
                <div class="item">
                <div><img src="@/assets/riseLogo.png"></div>
                </div>
                <div class="item">
                <div><i class="fas fa-home"></i><span style="font-size: 12px;">首页</span></div>
                </div>
                <div class="item">
                <div><i class="fas fa-plus"></i><span style="font-size: 12px;">新建</span></div>
                </div>
            </div>
            <div class="userInfo">
                <div class="user">
                    嗨，{{this.user}}
                </div>
                <div class="item">
                <div style="margin-left: 20px" @click = "loginOut"><i class="fas fa-sign-out-alt"></i><span style="font-size: 12px;">登出</span></div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="menu">
                <el-menu
                    default-active="0"
                    class="el-menu-vertical-demo"
                    background-color="#23282D"
                    text-color="#fff"
                    active-text-color="#00B9EB"
                    style="height: 100%;">
                    <el-menu-item index="-1" disabled class="menu-0">
                    <span slot="title"><i class="fas fa-cog"></i>控制台<i class="fas fa-cog"></i></span>
                    </el-menu-item>
                    <el-menu-item index="0">
                        <i class="far fa-eye i"></i>
                        <span slot="title" @click ="toRouter('message')">消息概况</span>
                    </el-menu-item>
                    <el-menu-item index="1">
                        <i class="fas fa-user-alt i"></i>
                        <span slot="title" @click ="toRouter('account')">账号管理</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="fas fa-wrench i"></i>
                        <span slot="title" @click ="toRouter('menuSetting')">导航配置</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="fas fa-newspaper i"></i>
                        <span slot="title" @click ="toRouter('news')">新闻管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="fas fa-image i"></i>
                        <span slot="title" @click ="toRouter('picture')">头图管理</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="fas fa-window-maximize i"></i>
                        <span slot="title" @click ="toRouter('picture')">访问统计</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <i class="fab fa-phabricator i"></i>
                        <span slot="title" @click ="toRouter('picture')">监控日志</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="content">
                <div class="content-main">
                    <transition name = 'fade'>
                    <router-view></router-view>
                </transition></div>
            </div>
            
        </div>
        <div class="footer">
            <div>
                2016-2017<i class="far fa-copyright"></i> <a href="http://www.swu-rise.net.cn">RISE</a> <span>|</span> 
                <i class="fas fa-map-marker"></i>西南大学25教1001 <span>|</span> 
                <i class="fab fa-github"></i><a href="https://github.com/RISE-SWU/">Github</a>
            </div>
        </div>  
  </div>
</template>

<script>
import { session } from '@/common/func';
import { PATH } from '@/common/config'
export default {
  name: 'Index',
  data () {
    return {
        user: ''    
    }
  },
  created() {
      let loginInfo = session();
      if(!loginInfo) {
          this.$router.push(`/${PATH}`);
      } else {
          this.user = loginInfo.user;
      }
  },
  methods: {
      loginOut() {
          sessionStorage.clear();
          this.$router.push({path: `/${PATH}`});
      },
      toRouter(type) {
            switch (type) {
                case 'message':
                    this.$router.push({path: `/${PATH}/main/`});
                    break;
                case 'account': 
                    this.$router.push({path: `/${PATH}/main/account`});
                    break;
                case 'menuSetting':
                    this.$router.push({path: `/${PATH}/main/setting`});
                    break;
                case 'news':
                    this.$router.push({path: `/${PATH}/main/news`});
                    break;
                case 'picture':
                    this.$router.push({path: `/${PATH}/main/picture`});
                    break;
                default:
                    break;
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"
          scoped>
    @import '../scss/color.scss';
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .index-header {
        height: 30px;
        background-color: $index-color;
        border-bottom: 1px solid #fff; 
        width: 100%;
        position: fixed;
        display: flex;
        justify-content: space-between;
        z-index: 2;
        border-bottom: 2px solid $theme-color;
        .quickOp {
           display: flex;
        }
        .userInfo {
            display: flex;
            align-items: center;
            padding-right: 50px;
           .user {
               font-size: 14px;
               color: #fff;
            }
        }
        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #9CA1A6;
            height: 100%;
            :hover {
                background-color: $index-hover;
                color: $index-active;
            }
            div {
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 10px;
            }
            i {
              font-size: 18px;
              padding-right: 10px;
            }
            img {
              width: 50px;
              height: 25px;
            }
        }
    }
    .main {
        display: flex;
        background-color: $index-color;
        .menu, .content {
          position: relative;
          top: 32px;
          width: 250px;
          height: calc(100% - 30px);
          .i {
            padding: 8px;
          }
        }
        .menu {
            position: fixed;
            z-index: 2;
            .menu-0 {
                cursor: pointer;
                opacity:1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                border-bottom: 2px solid $theme-color; 
                span, i{
                    color: skyblue;
                    font-weight: bold;
                    padding: 0 5px; 
                }
            }
        }
        .content {
            margin-left: 250px;
            background-color: $index-content-bg;
            height: 100%;
            width: 100%;
            .content-main {
                margin-bottom: 80px;
                padding: 20px;
            }
        }
    }
    .footer {
        background-color: $index-hover;
        margin-left: 0;
        position: fixed;
        bottom: 0px;
        left: 249px;
        z-index: 100;
        width: 90%;
        height: 30px;
        padding: 10px 0;
        text-align: center;
        line-height: 30px;
        color: #fff;
        div {
            font-size: 14px;
            i {
                padding-right: 5px;
            }
            a {
                color: #fff;
            }
            span {
                padding: 0 10px;
            }
        }
    }
</style>
