let {ref} = Vue;
const {useRouter} = VueRouter;
export default {

    template: `
        <router-head></router-head>
        
        <div class="todoList pos">
            
            <div class="todoList_container">
                <div>
                     <div class="todoList_aside">
                                 <div @click="change_bool" v-show="bool" class="video">
                                    <video id="video" src="assets/images/video.mp4" loop></video>
                                </div>
                        <div>
                                <div>
                                <img src="assets/images/pic14.png" alt="">
                                <router-link to="/InfoUpdate">个人资料</router-link>
                                </div>
                        </div>
                        
                        <div>
                                <div>
                                <img src="assets/images/pic22.png" alt="">
                                <router-link to="/UnCompleteList">未完成任务</router-link>
                                </div>
                        </div>
                        
                        <div>
                                <div>
                                <img src="assets/images/pic44.png" alt="">
                                <router-link to="/CompleteList">已完成任务</router-link>
                                </div>
                        </div>
                        
                        <div>
                                <div @click="change_bool">
                                <img src="assets/images/pic25.png" alt="">
                                    <a>视频演说</a>
                                </div>
                        </div>
                    </div>
                    
                    <div class="todoList_message">
                        
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        const user = ref({
            content: "",
        })

        let bool = ref(false);
        let submit = () => {

        }

        let change_bool = () => {
            let dom = document.getElementById("video");
            bool.value = !bool.value;
            if (bool.value) return dom.play();
            dom.pause();
        }
        return {
            user,
            bool,
            submit,
            change_bool,
        }
    }

}