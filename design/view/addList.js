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
                            <p>未完成任务 > 添加任务</p>
   
                        </div>
                        
                        <div class="create_todoList">
                            <div>
                                <p>开始时间:</p>
                                <input v-model="user.datetime" type="date">
                            </div>
                            
                            <div>
                                <p>内容描述:</p>
                                <textarea v-model="user.content" name="" id="" cols="30" rows="5"></textarea>
                            </div>
                            
                            <div>
                                <button @click="submit">提交</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        let message = JSON.parse(sessionStorage.getItem('message'));
        if(message) axios.defaults.headers.common.Authorization = `Bearer ${message.token}`;
        let user = ref({
            datetime:"",
            content:"",
        });

        let router = useRouter();
        let submit = () =>{
            axios.post(`http://localhost/php/Minecraft/laravel/public/api/todolist`,user.value)
                .then((response)=>{
                    router.push('/UnCompleteList');
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
        return {
            message,
            submit,
            user
        }
    }

}