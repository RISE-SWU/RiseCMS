import axios from "axios";
import { HOST } from "@/common/config"
//axios.defaults.withCredentials = true
//验证后台管理员的账号和密码是否正确
export function validAdmin(user, pass, type) {
    return axios.post(`${HOST}/api/validAdmin`,{
        userName: user,
        password: pass,
        type: type
    },{ withCredentials: true })
}

//后台信息首页
export function getIndex() {
    return axios.get(`${HOST}/api/getIndex`)
}

//后台账号管理首页
export function accountIndex() {
    return axios.get(`${HOST}/api/account`);
}

//账户管理，涉及到用户的增加、修改和删除，添加用户
export function accountAdd(user, pass, type, createTime) {
    return axios.post(`${HOST}/api/account/add`, {
        userName: user,
        password: pass,
        type: type, 
        createTime: createTime
    },{ withCredentials: true })
}

//账户管理，变更用户密码
export function accountUpdate(id, password) {
    return axios.post(`${HOST}/api/account/update`, {
        id: id,
        password: password
    },{ withCredentials: true })
}

//账户管理，删除用户
export function accountDelete(id) {
    return axios.post(`${HOST}/api/account/delete`, {
        id: id
    },{ withCredentials: true }) 
}

//新闻列表页
export function newsList() {
    return axios.get(`${HOST}/api/news`)
}

//新闻列表的批量操作，批量删除
export function deleteNews(news) {
    return axios.post(`${HOST}/api/news/delete`, {
        news: news
    },{ withCredentials: true }) 
}

//新闻列表的批量操作，批量发布
export function uploadNews(news) {
    return axios.post(`${HOST}/api/news/upload`, {
        news: news
    },{ withCredentials: true }) 
}

//新闻编辑页面
export function editNews(id) {
    return axios.get(`${HOST}/api/news/edit?id=${id}`)
}