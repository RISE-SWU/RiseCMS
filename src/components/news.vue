<template>
    <div class="news-main">
        <div class="news-header">
            <h3>新闻列表</h3>
            <div>
                <span @click="createNews()"><i class="fas fa-plus"></i><span>创建</span></span>
            </div>
        </div>
        <div class="target">
            <span @click="filterNews(-1)">全部（{{this.currentNews.length}}）</span> |  
            <span @click="filterNews(1)">已发布（{{this.currentNews.filter(i => i.status === 1).length}}）</span> |  
            <span @click="filterNews(0)">未发布（{{this.currentNews.filter(i => i.status === 0).length}}）</span>
        </div>
        <div class="choose">
            <div class="operate-all">
                <el-select v-model="value" placeholder="批量操作" size = "mini">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div><el-button @click ="pathOperate" size="mini">应用</el-button></div>
            <div class="search">
                <el-input
                    placeholder="请输入新闻日期或者分类目录"
                    prefix-icon="el-icon-search"
                    v-model="input" size="mini">
                </el-input>
            </div>
            <div><el-button type ="primary" size="mini" disabled>快速查找</el-button></div>
        </div>
        <div class="table">
            <el-table
                ref="multipleTable"
                :data="news"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop = "title"
                    label="标题"
                    show-overflow-toolti>
                </el-table-column>
                <el-table-column
                    prop = "tag"
                    label="分类"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="180"
                    sortable>
                    <template slot-scope="scope"><el-tag :type="scope.row.status === 1 ? 'success': 'danger'">{{scope.row.status === 1 ? '已发布' : '未发布'}}</el-tag></template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建日期"
                    width="180"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="uploadTime"
                    label="发布日期"
                    width="180"
                    sortable>
                </el-table-column>
                <el-table-column label="操作" header-align="center" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="editNews(scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%">
            <h3 slot="title">提示</h3>
            <span class="dialog-span">{{this.dialogTips}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteConfirm(dialogTips)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { newsList } from '@/http/http';
import { deleteNews, uploadNews } from '@/http/http';
import { sendMessage } from '@/common/func';
import { PATH } from '@/common/config'

export default {
    data() {
        return {
            value: '',
            options: [
                {
                    value: -1,
                    label: '删除'
                },
                {
                    value: 1,
                    label: '发布'
                }
            ],
            news: [],
            input: '',
            currentNews: [],
            selectItem: [],
            dialogVisible: false,
            dialogTips: ''
        }
    },
    watch: {
        input(val) {
            let inp = val.trim();
            if(inp) {
                let filterDate = this.currentNews.filter( i => i.createTime.includes(inp));
                let filterClass = this.currentNews.filter( i=> i.tag.includes(inp));
                this.news = filterDate.length ? filterDate : filterClass.length ? filterClass : [];
            } else {
                this.news = this.currentNews;
            }
        }
    },
    created() {
        newsList().then(res => {
            if(res.data.status === 'success') {
                this.news = res.data.dataList;
                this.currentNews = res.data.dataList;
            } else {
                sendMessage('error', '获取新闻列表错误，请联系管理员', this);
            }
        }).catch(err => {
            sendMessage('error', err, this);
        })
    },
    methods: {
        deleteConfirm(type) {
            this.dialogVisible = false;
            if(type.includes('删除')) {
                deleteNews(this.selectItem).then(res => {
                    if(res.data.status === 'success') {
                        this.currentNews = this.currentNews.filter(j => {
                            return !this.selectItem.some(i => i.id === j.id)
                        });
                        this.news = this.news.filter(j => {
                            return !this.selectItem.some(i => i.id === j.id)
                        });
                        sendMessage('success', '删除成功', this);
                    } else {
                        sendMessage('error', '删除过程中出现错误，请联系管理员', this);
                    }
                }).catch(err => {
                    sendMessage('error', err, this);
                })
            } else {
                uploadNews(this.selectItem).then(res => {
                    if(res.data.status === 'success') {
                        this.selectItem.forEach(i => {
                            this.currentNews.forEach(j => {
                                if(i.id === j.id) {
                                    j.status = 1;
                                }
                            });
                            this.news.forEach(k => {
                                if(i.id === k.id) {
                                    k.status = 1;
                                }
                            })
                        })
                        sendMessage('success', '发布成功', this);
                    } else {
                        sendMessage('error', '发布过程中出现错误，请联系管理员', this);
                    }
                }).catch(err => {
                    sendMessage('error', err, this);
                })
                
            }
        },
        pathOperate() {
            if(!this.value) {
                sendMessage('warning', '请先选择批量操作方式',this);
            } else if(!this.selectItem.length){
                sendMessage('warning', '请选择要批量操作的新闻',this);
            } else {
                if(this.value === -1) {
                    this.dialogVisible = true;
                    this.dialogTips = `是否要删除选中的 ${this.selectItem.length} 条新闻`;
                } else {
                    if(this.selectItem.some(i => i.status === 1)) {
                        sendMessage('error', '选中的新闻中存在已发布的新闻',this);
                    } else {
                        this.dialogVisible = true;
                        this.dialogTips = `是否要发布选中的 ${this.selectItem.length} 条新闻`;
                    }
                }
            }
        },
        handleSelectionChange(val) {
            this.selectItem = val;
        },
        filterNews(num) {
           this.news =  num === -1 ?  this.currentNews : this.currentNews.filter(i => i.status === num);
        },
        search() {
            let inp = this.input.trim();
            if(inp) {
                let filterDate = this.news.filter( i => i.createTime.includes(inp));
                let filterClass = this.news.filter( i=> i.tag.includes(inp));
                this.news = filterDate.length ? filterDate : filterClass.length ? filterClass : this.currentNews;
            }
        },
        createNews() {
            this.$router.push({path: `./edit`, query: {id: -1}})
        },
        editNews(item) {
            this.$router.push({path: './edit', query: {id: item.id}})
        },
        handleDelete(item) {
            let temp = [];
            temp.push(item);
            deleteNews(temp).then(res => {
                if(res.data.status === 'success') {
                    this.currentNews = this.currentNews.filter(j => {
                        return j.id !== item.id;
                    });
                    this.news = this.news.filter(j => {
                        return j.id !== item.id;
                    });
                    sendMessage('success', '删除成功', this);
                } else {
                    sendMessage('error', '删除过程中出现错误，请联系管理员', this);
                }
            }).catch(err => {
                sendMessage('error', err, this);
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '../scss/color.scss';
    .news-header {
        height: 50px;
        border-bottom: 2px solid $index-hover;
        display: flex;
        align-items: center;
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
    .target {
        :hover {
            cursor: pointer;
            color: $theme-color;
        }
        font-size: 14px;
        margin-top: 20px;
    }
    .choose {
        margin-top: 20px;
        display: flex;
        .operate-all {
            width: 120px;
        }
        .search{
            width: 220px;
            margin-left: 20px;
        }
    }
    .table {
        margin-top: 30px;
        .el-checkbox__inne {
            z-index: 0;
        }
        
    }
    .dialog-span {
        font-size: 16px;
    }
</style>
