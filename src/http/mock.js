import Mock from 'mockjs';
import { Base64 } from 'js-base64';

//账号列表Mock
let accountIndexData = Mock.mock({
    "array|1-50": [
        {
            "id|+1": 1,
            "user": () => {
                return Mock.Random.word(5, 10)
            },
            'password': () => {
                return Base64.encode(Mock.Random.word(5, 10))
            },
            'type': () => {
                return Math.random() > .5 ? 1 : 0;
            },
            'createTime': () => {
                return Mock.Random.date('yyyy-MM-dd')
            }   
        },
    ]
})

//后台管理系统首页信息展示
let insD = Mock.mock({
    "inspect|5":[{
        'type': () => {
            return Math.random() - .5 > 0 ? 1 : 0;
        },
        'userName': () => {
            return Mock.Random.word(5, 10);
        },
        'date': () => {
            return Mock.Random.date('yyyy-MM-dd')
        },
        'time': () => {
            return Mock.Random.date('HH:mm:ss')
        }
    }]
})

//新闻列表Mock
let news = Mock.mock({
    "array|12": [
        {
            "id|+1":1, 
            "title": () => {
                return Mock.Random.cword(8, 15);
            },
            "author": () => {
                return Mock.Random.word(5, 10);
            },
            "tag": () => {
                return Mock.Random.cword(2);
            }, 
            "status": () => {
                return Math.random() > .5 ? 1 : 0;
            },
            "createTime": () => {
                return Mock.Random.date('yyyy-MM-dd');
            },
            "uploadTime": () => {
                return Mock.Random.date('yyyy-MM-dd');
            }
        }
    ]
}) 
let indexData = {
    total: Mock.mock({
        'news': () => {
            return Mock.Random.natural(1, 100)
        },
        'admin': () => {
            return Mock.Random.natural(1, 5)
        },
        'account': () => {
            return Mock.Random.natural(1, 100)
        },
        'picture': () => {
            return Mock.Random.natural(1, 10)
        }
    }),
    "inspect": insD.inspect, 
    "activity": news.array
}
//console.log(indexData)

//后台首页数据获取
export function getIndex() {
    return new Promise(resolve => {
        resolve({
            data: {
                status: 'success',
                dataList: indexData
            }
        })
    })
}


//账户管理首页数据
export function accountIndex() {
    return new Promise(resolve => {
       resolve({
           data: {
               status: 'success',
               dataList: accountIndexData.array
           }
       }) 
    })
}


//新闻列表首页
export function newsList() {
    return new Promise(resolve => {
        resolve({
           data: {
               status: 'success',
               dataList: news.array
           }
        })
    })
}

//文章编辑页面的数据获取Get

export function newsEdit(id) {
    return new Promise(resolve => {
        resolve({
            data: {
                status: 'success',
                news: {
                    title: 'xxxxx',
                    author: 'rise_admin',
                    tag: '出访',
                    createTime: '2015-12-03',
                    content: `<p style="color: red">一条大财后</p>`
                }
            }
        })
    })
}
