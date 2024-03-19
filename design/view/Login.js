let {ref} = Vue;
const {useRouter} = VueRouter;
export default {

    template: `
        <div class="login">
        
            <div class="login_container">
                    <div class="login_top">
                        <img src="assets/images/user/pic152.png" alt="">
                    </div>
                <div>
                    <h1>Login</h1>
                </div>
                <div>
                    <label for="">Nickname</label>
                    <input v-model="user.name" type="text">
                </div>
                
                <div>
                    <label for="">Password</label>
                    <input v-model="user.password" type="password">
                </div>
                    
                <button @click="submit">Submit</button>
                
                <button><router-link to="/register">Register</router-link></button>
            </div>
        </div>
    `,
    setup() {
        const user = ref({
            name: "",
            password: "",
        })
        const router = useRouter();
        let submit = ()=> {
            axios.post("http://localhost/php/Minecraft/laravel/public/api/login", user.value)
                .then((response) => {
                    sessionStorage.setItem('message',JSON.stringify({token:response.data.data.token}));
                    router.push('/');
                })
                .catch((error) => {
                    alert("没有此账号 !");
                    console.log(error);
                })
        }
        return {
            user,
            submit
        }
    }
}