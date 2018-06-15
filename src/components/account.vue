<template>
    <div class="main-container" v-loading.fullscreen.lock = "loading"
        element-loading-text="拼命加载中">
        <div class="admin">
            <div class="header">
                <h3>管理员账号</h3>
                <div>
                    <span @click="createUser('admin')"><i class="fas fa-plus"></i><span>创建</span></span>
                </div>
            </div>
            <div class="table">
                <el-table
                    :data="adminData"
                    stripe
                    style="width: 100%;">
                    <el-table-column
                        prop="id"
                        label="编号"
                        header-align="center" 
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="用户名"
                        header-align="center" 
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="密码"
                        header-align="center" 
                        align="center">
                        <template slot-scope="scope">
                            {{'********' || scope.row.password}}
                        </template>    
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        header-align="center" 
                        align="center">
                    </el-table-column>
                    <el-table-column label="操作" header-align="center" align="center" width="150">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="createUser('updateAdmin', scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="account">
            <div class="header">
                <h3>教师及学生账号</h3>
                <div>
                    <span @click="createUser('account')"><i class="fas fa-plus"></i><span>创建</span></span>
                </div>
            </div>
            <div class="table">
                <el-table
                    :data="accountData"
                    stripe
                    style="width: 100%;">
                    <el-table-column
                        prop="id"
                        label="编号"
                        header-align="center" 
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="用户名"
                        header-align="center" 
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="密码"
                        header-align="center" 
                        align="center">
                        <template slot-scope="scope">
                            {{'********' || scope.row.password}}
                        </template>    
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        header-align="center" 
                        align="center">
                    </el-table-column>
                    <el-table-column label="操作" header-align="center" align="center" width="150">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="createUser('updateAccount', scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%">
            <h3 slot="title">{{this.dialogTitle}}</h3>
            <div class="create">
                <el-row>
                    <el-col :span="3">
                        <div class="user-control"><p>用户名：</p></div>
                    </el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="addUser" :disabled="userDisabled"  placeholder="请输入用户名"></el-input>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px;">
                    <el-col :span="3">
                        <div class="user-control"><p>密 &nbsp;&nbsp;码：</p></div>
                    </el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="addPass" :type="inputType" placeholder="请输入密码"></el-input>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="postCreate">{{this.dialogTitle.substring(0,2)}}</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :visible.sync="deleteVisible"
            width="30%">
            <h3 slot="title">警告</h3>
            <span style="font-size: 16px;">是否要删除用户 <b>{{this.deleteItem.userName}}</b></span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { accountIndex } from '@/http/http';
import { accountAdd, accountUpdate, accountDelete } from '@/http/http';
import { sendMessage, formatDate } from '@/common/func';
import { Base64 } from 'js-base64';
export default {
    data() {
        return {
            adminData: [],
            accountData: [],
            dialogVisible: false,
            dialogTitle: '',
            addUser: '',
            addPass: '',
            userDisabled: false,
            inputType: 'password',
            editItem: {},
            deleteVisible: false,
            deleteItem: {},
            loading: true
        }
    },
    created() {
        accountIndex().then(res => {
            if(res.data.status === 'success') {
                this.adminData = res.data.dataList.filter(i => i.type === 0);
                this.accountData = res.data.dataList.filter(i => i.type === 1);
                this.loading = false; 
            }
        }).catch(err => { 
            sendMessage('error', err, this);
        })
    },
    methods: {
        handleDelete(data) {
            this.deleteVisible = true;
            this.deleteItem = data;
        },
        deleteConfirm() {
            accountDelete(this.deleteItem.id).then(rs => {
                if(rs.data.status === 'success') {
                    sendMessage('success', '删除成功', this);
                    this.adminData = this.adminData.filter(i => i.id !== this.deleteItem.id);
                    this.accountData = this.accountData.filter(i => i.id !== this.deleteItem.id);
                    this.deleteVisible = false;
                } else {
                    sendMessage('error', '删除失败，请联系管理员', this);
                    this.deleteVisible = false;
                }
            }).catch(err => {
                sendMessage('error', err, this);
                this.deleteVisible = false;
            })
        },
        createUser(type, data) {
            this.addUser = '',
            this.addPass = '',
            this.dialogVisible = true;
            switch (type) {
                case 'admin':
                    if(this.adminData.length > 5) {
                        this.dialogVisible = false;
                        sendMessage('warning', '只能创建5个管理员账号', this)
                    } else {
                        this.inputType = 'password',
                        this.userDisabled = false;
                        this.dialogTitle = '创建管理员账号'
                    }
                    
                break;
                case 'account':
                    this.inputType = 'password',
                    this.userDisabled = false;
                    this.dialogTitle = '创建教师或者学生账号'
                break;
                case 'updateAdmin':
                    this.userDisabled = true;
                    this.inputType = '';
                    this.editItem = data;
                    this.addUser = data.userName;
                    this.addPass = Base64.decode(data.password);
                    this.dialogTitle = '修改管理员账号密码'
                break;
                case 'updateAccount':
                this.userDisabled = true;
                    this.inputType = '';
                    this.editItem = data;
                    this.addUser = data.userName;
                    this.addPass = Base64.decode(data.password);
                    this.dialogTitle = '修改教师或者学生账号密码'
                break;
                
            }
        },
        postCreate() {
            let reg = /^\w+$/;
            if(!reg.test(this.addUser)) {
                sendMessage('error', '请输入正确的用户名格式，数字、字母或者下划线的组合', this);
            } else if(!reg.test(this.addPass)) {
                sendMessage('error', '请输入正确的密码格式，数字、字母或者下划线的组合', this);
            } else {
                if(this.dialogTitle === '创建管理员账号' || this.dialogTitle === '创建教师或者学生账号') {
                    let type = this.dialogTitle === '创建管理员账号' ? 0 : 1;
                    let date = formatDate();
                    accountAdd(this.addUser, Base64.encode(this.addPass), type, date).then(rs => {
                        if(rs.data.status === 'success') {
                            sendMessage('success', '账号创建成功', this);
                            this.dialogVisible = false;
                            this.addUser = '';
                            this.addPass = '';
                            this.dialogTitle === '创建管理员账号' ? this.adminData.push(rs.data.newData) : this.accountData.push(rs.data.newData);
                        } else {
                            sendMessage('error', '账号创建失败，请联系管理员', this)
                        }
                        
                    }).catch(err => {
                        sendMessage('error', err, this)
                    })
                } else {
                    accountUpdate(this.editItem.id, Base64.encode(this.addPass)).then(rs => {
                        if(rs.data.status === 'success') {
                            sendMessage('success', '密码修改成功', this);
                            this.dialogVisible = false;
                            if(this.dialogTitle === '修改管理员账号密码') {
                                this.adminData.forEach(i => {
                                    i.id === this.editItem.id ? i.password = Base64.encode(this.addPass) : i;
                                })
                            } else {
                                this.accountData.forEach(i => {
                                    i.id === this.editItem.id ? i.password = Base64.encode(this.addPass) : i;
                                })
                            }
                        } else {
                            sendMessage('error', '账号创建失败，请联系管理员', this);
                            this.dialogVisible = false;
                        }
                    }).catch(err => {
                        sendMessage('error', err, this);
                        this.dialogVisible = false;
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/color.scss';
    .main-container {
        display: flex;
        .admin, .account {
            flex: 1;
        }
        .header{
            display: flex;
            align-items: center;
            height: 50px;
            border-bottom: 2px solid $index-hover;
            div {
                font-size: 14px;
                padding-left: 10px;
                cursor: pointer;
                color:  $theme-color;
                span {
                    padding-left: 5px;
                }
                :hover {
                    color: $index-active;
                }
            }
        }
        .account {
            margin-left: 10px;
        }
        .create {
            padding-left: 50px;
            
        }
        .user-control {
            display: flex;
            align-items: center;
            p {
                line-height: 32px;
            }
        }
    }
</style>
