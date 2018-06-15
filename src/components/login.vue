<template>
    <transition name = 'fade'>  
      <div class="logo-img"  v-bind:class="{ bg: type === 1 }">
        <div>
            <p><img src="@/assets/logo.png" ></p>
            <div class="login-input" ><span class="login-icon"><i class="fas fa-user"></i></span> <el-input style="width: 300px;" v-model="user" placeholder="请输入用户名"></el-input></div>
            <div class="login-input" ><span class="login-icon"><i class="fas fa-key"></i>&nbsp;</span><el-input style="width: 300px;"  type="password" v-model="pass" placeholder="请输入密码"></el-input></div>
            <div class="radio">
                <input class ="pointer"  @click="type = 0" checked type="radio" name="type"/>管理员
                <input class ="pointer" @click="type = 1" type="radio" name="type"/>教师及学生入口
            </div>
            <div class="login-btn">
                <div class="pointer" @click="valid"><i class="fas fa-sign-in-alt"></i></div>
            </div>
        </div>
      </div>
    </transition>       
</template>
<script>
import { validAdmin } from '@/http/http.js';
import { Base64 } from 'js-base64';
import { sendMessage } from '@/common/func.js' ;
import { PATH } from '@/common/config';
export default {
    name: 'App',
    data() {
        return {
          input:'',
          user: '',
          pass: '',
          target: true,
          type: 0,
        }
    },
    methods: {
        valid() {
            if(this.target){
                if(!this.user || !this.pass) {
                    sendMessage('error', '请输入账号和密码', this);  
                } else {
                    this.target = false;
                    let [covUser, covPass] = [this.user, Base64.encode(this.pass)];
                    validAdmin(covUser, covPass, this.type).then(res => {
                        this.target = true;
                        if(res.data.type === 'success') {
                            sendMessage('success', '登录成功', this);
                            //登录成功之后将登录状态保存在sessionStorage中,并根据不同的type跳转到不同的管理界面
                            sessionStorage.setItem('status', this.type);
                            sessionStorage.setItem('userName', this.user);
                            this.$router.push({path: `/cms/main`});
                        } else if(res.data.status === 0) {
                            sendMessage('error', '账号和密码不匹配', this);
                        } else {
                            sendMessage('error', '账号不存在，请联系管理员', this);
                        }
                    }).catch(err => {
                        sendMessage('error', err, this);
                    });
                }
            } else {
                 sendMessage('warning', '登录中，请稍后', this);
            }
                             
        },
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/color.scss';
  
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    input:-webkit-autofill {  
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;  
    }  
    .logo-img {
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $theme-color; 
      transition: background-color 2s;
      -moz-transition: background-color 2s; /* Firefox 4 */
      -webkit-transition: background-color 2s; /* Safari 和 Chrome */
      -o-transition: background-color 2s; /* Opera */  
      text-align: center;
      color: #2c3e50;
    }
    .bg {
        background-color: rgb(92, 92, 194);
    }
    .radio {
      margin-top: 20px;
      color: #fff;
      input {
        margin: 10px;
      }
    }
    .login-input {
        margin-bottom: 20px; 
        text-align: center;
        width: 330px;
        display: flex;
        margin: 0 auto;
        margin-top: 20px;
        align-items: center;
        justify-content: space-between;
    }
    .login-icon {
        color:white; 
        font-size: 20px;
    }
    .login-btn {
        text-align: center; 
        color: white; 
        margin-top: 20px; 
        font-size: 50px;
    }
    .pointer {
        cursor: pointer;
    }

</style>
