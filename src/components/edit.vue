<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>新闻编辑</h3>
            </div>
            <div class="edit">
                <div class="title"><el-input v-model="input" placeholder="请输入新闻标题"></el-input></div>
                <div id="div3">
                </div>
                <div class="button">
                    <div class="choose">
                        <el-tag type="danger" style="font-size: 16px;">请选择新闻类型:</el-tag>
                        <el-select v-model="value" placeholder="请选择新闻类型" style="margin-left: 20px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-button  type="primary">保存<i class="el-icon-news el-icon--right"></i></el-button>
                        <el-button  type="primary">发布<i class="el-icon-upload el-icon--right"></i></el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { newsEdit } from '@/http/mock';
import { sendMessage } from '@/common/func';
export default {
    data() {
        return {
            currentId: 0,
            input: '',
            newsData: {
                title: '',
                content: '',
                author: '',
                createTime: '',
                tag: ''
            },
            observeNews: {},
            options: [
                {
                    value: '来访',
                    label: '出访'
                },
                {
                    value: '来访1',
                    label: '来访'
                },
                {
                    value: '来访2',
                    label: '出访'
                },
                {
                    value: '来访3',
                    label: '来访'
                }
            ],
            value: ''
        }
    },
    created() {
        let id = this.$route.query.id;
        if(id > -1) {
           newsEdit(id).then(res => {
               if(res.data.status === 'success') {
                   this.newsData = res.data.news;
                   this.input = this.newsData.title;
               } else {
                   sendMessage('error', '获取数据出错，请联系管理员', this);
               }
           }) .catch(err => {
               sendMessage('error', err, this);
           })
        };
    },
    mounted() {
        let id = this.$route.query.id;
        if(id > -1) {
           newsEdit(id).then(res => {
               if(res.data.status === 'success') {
                   this.newsData = res.data.news;
                   this.input = this.newsData.title;
                   var E = window.wangEditor;
                   var editor = new E('#div3')
                   editor.create();
                   editor.txt.html(this.newsData.content);
                   this.value = this.newsData.tag;
               } else {
                   sendMessage('error', '获取数据出错，请联系管理员', this);
               }
           }) .catch(err => {
               sendMessage('error', err, this);
           })
        } else {
            var E = window.wangEditor;
            var editor = new E('#div3')
            editor.create();
        }
    }
}
</script>
<style lang="scss" scoped>
    .edit {
        .title {
            margin-bottom: 20px;
        }
        .button {
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            .choose {
                display: flex;
                align-items: center;
            }
        }
    }
</style>
