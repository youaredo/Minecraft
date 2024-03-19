const {ref} = Vue;
const {useRouter} = VueRouter;
export default {

    template: `
        <div class="login">
        
            <div class="login_container">
                   <div class="login_top">
                        <img src="assets/images/user/pic143.png" alt="">
                    </div>
                <div>
                    <h1>Register</h1>
                </div>
                <div>
                    <label for="">Nickname</label>
                    <input v-model="user.name" type="text">
                </div>
                
                <div>
                    <label for="">Password</label>
                    <input v-model="user.password" type="password">
                </div>
                
                <div>
                    <label for="">Birth</label>
                    <input v-model="user.birth" type="date">
                </div>
                    
                <button @click="submit">Submit</button>
                
                <button><router-link to="/login">Login</router-link></button>
            </div>
        </div>
    `,
    setup() {
        const user = ref({
            name: "",
            password: "",
            birth:'',
        })
        const router = useRouter();
        let submit = ()=>{
            axios.post('http://localhost/php/Minecraft/laravel/public/api/register',user.value)
            .then((response)=>{
                router.push('/login');
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        return {
            user,
            submit
        }
    }
}