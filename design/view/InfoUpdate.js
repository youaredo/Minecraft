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
                            <p>个人资料 > 编辑资料</p>
                            
                            <p @click="submit">
                                <router-link to="/Personal">点击提交</router-link>
                            </p>
                        </div>
                        
                        <div class="article__main">
                            <div>
                                <p>姓名 :</p>
                                <input v-model="user.name" type="text">
                            </div>
                            
                            <div>
                                <p>出生日期 :</p>
                                <input  v-model="user.birth" type="date">
                            </div>
                            
                            <div>
                                <p>简介 :</p>
                                <textarea v-model="user.content" name="" id="" cols="80" rows="8.5"></textarea>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const user = ref({
            name:"",
            birth: "",
            content: "",
        })

        let user_true = ref({});

        let bool = ref(false);
        let message = JSON.parse(sessionStorage.getItem('message'));
        let submit = ()=>{
            for(let i in user.value){
                user.value[i]? user_true.value[i] = user.value[i]:"";
            }
            if(message) axios.defaults.headers.common.Authorization = `Bearer ${message.token}`;
            axios.patch('http://localhost/php/Minecraft/laravel/public/api/updateUser',user_true.value)
            .then((response)=>{
            }).catch((error)=>{
                console.log(error);
            })
        }

        return{
            submit,
            user,
            bool
        }
    }

}