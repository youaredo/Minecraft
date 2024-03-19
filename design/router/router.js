
let {ref} = Vue;
let app = Vue.createApp({
    setup(){


        return{

        }
    }
})

import head from '../components/head.js';
import Todolist from '../view/Todolist.js';
import Message from '../view/Message.js';
import Register from '../view/Register.js';
import Login from '../view/Login.js';
import InfoUpdate from '../view/InfoUpdate.js';
import CompleteList from '../view/Completelist.js';
import UnCompleteList from  '../view/UnCompletelist.js'
import Personal from  '../view/Personal.js'
import PersonalMenu from  '../components/PersonalManu.js'
import addList from  '../view/addList.js'

let routes = [
    {path:'/',component:Message},
    {path:'/Register',component:Register},
    {path:'/Login',component:Login},
    {path:'/InfoUpdate',component:InfoUpdate},
    {path:'/CompleteList',component:CompleteList},
    {path:'/UnCompleteList',component:UnCompleteList},
    {path:'/Todolist',component:Todolist},
    {path:'/head',component:head},
    {path:'/Personal',component:Personal},
    {path:'/PersonalMenu',component:PersonalMenu},
    {path:'/addList',component:addList},
]

let router = VueRouter.createRouter({
    history:VueRouter.createWebHashHistory(),
    routes,
})

app.use(router);
app.component("router-head",head);
app.component("router-message",Message);
app.component("router-Personal",PersonalMenu);
app.mount("#app");
