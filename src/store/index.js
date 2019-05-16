import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        account: {
            token: '',
            uid: '',
            name: '',
        },
        logined : false
    },
    mutations: {
        setAccount(state, ac) {
            state.account = ac
        },
        setLogined(state, logined) {
            state.logined = logined
        }
    },
    actions: {
        setAccount(context, ac) {
            context.commit("setAccount", ac)
        },
        Login(context, data) {
            if (data.id === "") {
                self.$Message.error("帐号不能为空!")
               return
            }
            if (data.nickname === "") {
               self.$Message.error("昵称不能为空!")
                return
            }
            if (data.password === "") {
               self.$Message.error("密码不能为空!")
                return
            }

            axios
            .post(process.env.BASE_API + '/v1/signin', JSON.stringify(data))
            .then(res => {
                context.commit("setAccount", res.data)
                context.commit("setLogined", true)
                localStorage.setItem("account", JSON.stringify(res.data))
                localStorage.setItem("logined", true)
                console.log("Login Successfully")
            })
            .catch(err => {
                //this.$Message.error("User not exist of password error!")
                console.log(err)
            })
        },
    },
    getters: {
        getAccount(state) {
            return state.account
        }
    }
})

export default store