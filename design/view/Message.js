let {ref} = Vue;
const {useRouter} = VueRouter;
export default {

    template: `
        <router-head></router-head>
        
        <div class="message">
            <div>
                <div class="message_container">
                    <div class="post post--send">
                            <textarea v-model="user.content" placeholder="请输入留言" rows="5" required></textarea>
                            <button @click.prevent="submit" class="btn">发表留言</button>
                    </div>
                    
                    <div class="post" v-for="(item,index) in arr">
                        <div class="post__header">
                            <img src="assets/images/user/pic152.png" alt="">
                            <div>
                                <span>{{item.nickname}}</span>
                                <span>{{item.datetime}}</span>
                            </div>
                            <span class="floors">{{index+=1}}<sup>F</sup></span>
                        </div>
                        <p class="post__content">
                            {{item.content}}
                        </p>
                        
                        <div class="delete_btn">
                            <button @click="remove_message(item.id)">删除</button>
                        </div>
                    </div>
                </div>
                
                <div class="aside">
                    <div v-for="(item,index) in per_page">
 
                        <span @click="change(index+1)" :class="{'active' : who === index+1}">{{index+1}}</span>
                    </div>   
                    
                    <div class="aside_ctrl">
                        <div @click="prev"> &lt </div>
                        <div @click="next"> > </div>
                    </div>      
                </div>
            </div>
        </div>
    `,
    setup() {
        const user = ref({
            content: "",
        })

        let index=  ref(1);

        let who = ref(1);

        let per_page = ref();

        let arr = ref();

        const domain = 'localhost/php'

        let token = JSON.parse(sessionStorage.getItem("message"));
        if(token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        let submit = () =>{
            axios.post(`http://${domain}/Minecraft/laravel/public/api/message`,user.value)
                .then((response)=>{
                    change(index.value);
                    user.value.content = ref("");
                })
                .catch((error)=>{
                    alert("请先登录");
                })
        }


        // let load = () =>{
        //     axios.get('http://localhost/php/Minecraft/laravel/public/api/message_all')
        //         .then((response)=>{
        //             arr.value = response.data.data.data;
        //             per_page.value =  Math.ceil(response.data.data.meta.pagination.ever / response.data.data.meta.pagination.per_page);
        //         })
        //         .catch((error)=>{
        //             console.log(error);
        //         })
        // }

        let remove_message = (num) =>{
            axios.delete(`http://localhost/php/Minecraft/laravel/public/api/message/${num}`)
                .then((response)=>{
                    change(index.value);
                })
                .catch((error)=>{
                    console.log(error);
                    if(error.response.data.msg == "not found") alert("你没有权限别人的评论");
                })
        }

        let next = () =>{
            index.value >= per_page.value? alert("已经是最后一页了"):index.value++;
            change(index.value);
        }

        let prev = () =>{
            index.value<=1? alert("已经是第一页了"):index.value--;
            change(index.value);
        }

        let change = (num)=>{
            index.value = num;
            who.value = index.value;
            axios.get(`http://${domain}/Minecraft/laravel/public?page=${num}`)
                .then((response)=>{
                    arr.value = response.data.data.data;
                    per_page.value =  Math.ceil(response.data.data.meta.pagination.ever / response.data.data.meta.pagination.per_page);
                })
                .catch((error)=>{
                    console.log(error);
                })
        }

        // load();
        change(1);


        return {
            user,
            submit,
            arr,
            remove_message,
            prev,
            next,
            change,
            per_page,
            who
        }
    }
}