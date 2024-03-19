let {ref} = Vue;
const {useRouter} = VueRouter;
export default {
    template:`
        <header>
        <article class="head mx-wd">
            <div class="logo">
                <p><router-link to="/">Minecraft</router-link></p>
            </div>

            <div class="user" @click="bool = !bool">
                <img v-bind:src="url" alt="">
            </div>
            
        </article>
        
            <div class="user_message" :class='{back:bool}'>
                      <p v-if="message">{{data?.nickname}}</p>
                      <p v-else>未登录</p>
                      
                     <div>
                        <router-link v-if="token" to="/login">用户登录</router-link>
                        <router-link v-else to="/Personal">个人中心</router-link>
                     </div>
                     
                     <div @click="logout">
                         <p><router-link to="/login">登出</router-link></p>
                    </div>
            </div>
    </header>
    `,
    setup(){
        let arr = ['pic143.png','pic151.png','pic152.png','pic159.png','pic163.png'];
        let str = "assets/images/user/";
        let random = Math.ceil(Math.random()*arr.length-1);
        let bool = ref(false);

        let message = JSON.parse(sessionStorage.getItem('message'));
        let url = `${str}${message? arr[random]:'user.png'}`;
        let token = ref(message? false:true);


        let logout = ()=> {
            axios.defaults.headers.common.Authorization = `Bearer ${message.token}`;
            axios.get('http://localhost/php/Minecraft/laravel/public/api/logout')
                .then((response) => {
                    token.value = true;
                    sessionStorage.removeItem('message');
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        let data = ref();
        let user_load = ()=>{
            if(message) axios.defaults.headers.common.Authorization = `Bearer ${message.token}`;
            if(message){
                axios.post('http://localhost/php/Minecraft/laravel/public/api/get_self')
                    .then((response)=>{
                        data.value = response.data.data;
                    }).catch((error)=>{
                    console.log(error);
                })
            }
        }

        setTimeout(()=>{
            user_load();
        },200)
        return{
            bool,
            token,
            logout,
            url,
            message,
            data
        }
    }
}