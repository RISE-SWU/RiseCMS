## RISE实验室中文网站管理后台RISE-CMS前端项目

### 线上体验地址（账号及其密码请联系z-xiaolong（小龙），不建议移动设备体验）
```
http://www.swu-rise.net.cn/cms/
```

### 功能及其特性

* 网站管理员系统 + 教师及学生信息管理系统
<hr />

* 用户登录
    <img  src="http://www.swu-rise.net.cn/img/login.png" />
    <img  src="http://www.swu-rise.net.cn/img/login1.png" />
<hr />

* 登录首页
    <img  src="http://www.swu-rise.net.cn/img/welcome.png" />
<hr />

* 账号管理
    <img  src="http://www.swu-rise.net.cn/img/account.jpg" />
<hr />

* 导航配置(未完成)
    <img  src="http://www.swu-rise.net.cn/img/set.png" />
<hr />

* 新闻管理
    <img  src="http://www.swu-rise.net.cn/img/news.png" />
<hr />

* 新闻发布
    <img  src="http://www.swu-rise.net.cn/img/editNews.png" />
<hr />

* 头图管理 （未完成）
<hr />

* 访问统计 （未完成）
<hr />

* 监控日志 （未完成）
<hr />

### 项目开发

step1: 项目克隆到本地
```
git clone git@github.com:xiaoSais/RiseCMS.git 
```
step2: 进入到项目根目录

```
cd /username/xxx/RiseCMS
```

step3: 安装相应的模块 （需要安装Node.js）

```
npm install 
```

step4: 启动开发环境

```
npm run serve
```

step5: 打开调试环境（热更新）

```
浏览器中输入 localhost:8080/cms
```
### 项目发布

step1: 项目打包
```
npm run build
```

step2: 项目发布

将打包之后的，项目根目录下的文件复制到网站服务器根目录/cms文件夹下


### 开发工具

* VSCode

* Element

* Vue.js + VueRouter

* Scss

* Axios

* Webpack

### ToDoList

* 头图管理 （未完成）


* 访问统计 （未完成）


* 监控日志 （未完成）

