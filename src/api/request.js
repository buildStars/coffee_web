//对axios二次封装
import axios from "axios"
import store from "@/store";
import router from "@/router";
import Vue from 'vue';
import {
    Toast
} from 'vant';

Vue.use(Toast);
// Toast.allowMultiple();
let toast1 = null
//1.create 创建一个axios实例
const requests = axios.create({
    //基础路径
    baseURL: 'http://www.kangliuyong.com:10002',
    timeout: 50000,
})

//请求拦截器 发出请求前操作
requests.interceptors.request.use((config) => {
    //config 配置对象 对象里面一个属性很重要 header请求头

    toast1 && toast1.clear()
    toast1 = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        lock:true,
        loadingType: 'spinner',
    });
    if (config.method == "get") {

        let str = '?'

        let data = Object.entries(config.data)
        if (data.length < 1) {
            str = ''
        } else {
            data.forEach((item) => {
                str += item[0] + '=' + item[1] + '&'
            })
            str = str.slice(0, -1)
        }
        config.url += str
    }

    if (config.method == "post") {
        let str = ''
        let data = Object.entries(config.data)
        data.forEach((item) => {

            str += item[0] + '=' + item[1] + '&'
        })

        str = str.slice(0, -1)

        config.data = str
    }
    return config;
}, (err) => {
    //请求失败回调
    return Promise.reject(new Error('请求fail'))
})


//响应拦截器 
requests.interceptors.response.use((res) => {
    //成功回调 服务器响应回来数据  响应拦截器可以检测到，做一些操作
    toast1.clear();

    if (res.data.code == 700) {
        store.commit('CLEARACCOUNTINFO')
        router.push('/login')
        toast1=Toast({message:res.data.msg});
    }
    return res.data;
}, (err) => {
    //失败回调
    return Promise.reject(new Error('响应fail'))
})

export default requests