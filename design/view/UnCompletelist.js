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
                            <p>未完成任务</p>
                            <p><router-link to="/addList">添加</router-link></p>
                        </div>
                        
                        <div class="todoList_complete">
                            <h6 v-show="!unCompleted">还未有完成的任务</h6>
                            <div v-for="(item,index) in unCompleted">
                                <div>
                                    <p>{{item.datetime}}</p>
                                </div>
                                
                                <textarea name="" id="" readonly>{{item.content}}</textarea>
                                
                                <div>
                                    <button @click="submit(item.id)">完成</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        let message = JSON.parse(sessionStorage.getItem('message'));
        let data = ref({});
        let unCompleted = ref();
        if(message) axios.defaults.headers.common.Authorization = `Bearer ${message.token}`;
        let load = ()=>{
            axios.get('http://localhost/php/Minecraft/laravel/public/api/todolist')
                .then((response)=>{
                    let arr = response.data.data.item.filter((item)=>{return item.type === 'Uncompleted'});
                    unCompleted.value = arr.length <=0? false:arr;
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
        load();

        let submit = (index) =>{
            axios.get(`http://localhost/php/Minecraft/laravel/public/api/todo_list/check/${index}`)
                .then((response)=>{
                    load();
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
        return {
            message,
            data,
            unCompleted,
            submit
        }
    }

}