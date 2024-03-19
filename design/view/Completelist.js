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
                            <p>已完成任务</p>
                            <p><h5 @click="remove_all">清空所有完成记录</h5></p>
                        </div>
                        
                        <div class="todoList_complete">
                            <h6 v-show="!Completed_data">还未有完成的任务</h6>
                            <div v-for="(item,index) in Completed_data">
                                <div>
                                    <p>{{item.datetime}}</p>
                                </div>
                                
                                <textarea name="" id="" readonly>{{item.content}}</textarea>
                                   
                                <div>
                                    <button @click="remove(item.id)">删除</button>
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
        let Completed_data = ref();
        if(message) axios.defaults.headers.common.Authorization = `Bearer ${message.token}`;
        let load = ()=>{
            axios.get('http://localhost/php/Minecraft/laravel/public/api/todolist')
                .then((response)=>{
                    let arr = response.data.data.item.filter((item)=>{return item.type !== 'Uncompleted'});
                    Completed_data.value = arr.length <=0? false:arr;
                })
                .catch((error)=>{
                    console.log(error);
                })
        }

        let remove = (index) =>{
            axios.delete(`http://localhost/php/Minecraft/laravel/public/api/todolist/${index}`)
                .then((response)=>{
                    load();
                })
                .catch((error)=>{
                    console.log(error);
                })
        }

        let remove_all = ()=>{
            axios.delete('http://localhost/php/Minecraft/laravel/public/api/todo_list/completed/all')
                .then((response)=>{
                    load();
                })
                .catch((error)=>{
                    console.log(error);
                })
        }


        load();
        return {
            message,
            Completed_data,
            remove,
            remove_all,
        }
    }

}