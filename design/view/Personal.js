let {ref} = Vue;
const {useRouter} = VueRouter;
export default {

    template: `
        <router-head></router-head>
        
        <div class="todoList pos">
            
            <div class="todoList_container">
                <div>
                    <router-Personal></router-Personal>
                    
                    <div class="todoList_message">
                        <div class="space-bet">
                            <p>个人资料</p>
                            
                            <p><router-link to="/InfoUpdate">编辑</router-link></p>
                        </div>
                        
                        <div class="article__main">
                            <div>
                                <p>姓名 :</p>
                                <h4>{{data?.nickname}}</h4>
                            </div>
                            
                            <div>
                                <p>出生日期 :</p>
                                <h4>{{data?.birth}}</h4>
                            </div>
                                                        
                            <div>
                                <p>年龄 :</p>
                                <h4>{{data?.age}}</h4>
                            </div>
                            
                            <div>
                                <p>简介 :</p>
                                <h4>{{data?.content == null? "未编辑内容":data?.content}}</h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        let message = JSON.parse(sessionStorage.getItem('message'));
        let data = ref();
        let user_load = ()=>{
            if(message) axios.defaults.headers.common.Authorization = `Bearer ${message.token}`;
            axios.post('http://localhost/php/Minecraft/laravel/public/api/get_self')
            .then((response)=>{
                data.value = response.data.data;
            }).catch((error)=>{
                console.log(error);
            })
        }
        setTimeout(()=>{
            user_load();
        },200)
        return {
            message,
            data
        }
    }

}