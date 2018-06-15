import { PATH } from '@/common/config'
import VueRouter from 'vue-router'
import Main from '@/components/main'
import Account from '@/components/account'
import Login from '@/components/login'
import Settting from '@/components/setting'
import News from '@/components/news'
import Message from '@/components/message'
import Picture from '@/components/picture'
import Edit from '@/components/edit'
const routes = [
    {
        path: `/${PATH}`,
        name: 'login',
        component: Login,
    },
    {
        path: `/${PATH}/main`,
        name: 'main',
        component: Main,
        children: [
            {
                name: 'message',
                path: '',
                component: Message,
            },
            {
                name: 'account',
                path: 'account',
                component: Account,
            },
            {
                name: 'setting',
                path: 'setting',
                component: Settting,
            },
            {
                name: 'news',
                path: 'news',
                component: News
            }, 
            {
                name: 'picture',
                path: 'picture',
                component: Picture
            },
            {
                name: 'edit',
                path: 'edit',
                component: Edit
            }
        ]
    },
]
export default new VueRouter({
    mode: 'history',
    routes, 
})