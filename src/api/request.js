import axios from 'axios'
import { Message } from 'element-ui'
import router from "../router"

export function request(config){
    let token = window.localStorage.getItem("token")
    const instance = axios.create({
        baseURL:process.env.VUE_APP_WEB_URL,
        // timeout:10000,
        headers: {
            'token':token
        },
    })
    // 请求拦截
    instance.interceptors.request.use(config =>{
        /*
        使用
            1、比如config中的一些信息不符合服务器要求
            2、发送网络请求时，显示请求图标
            3、某些网络请求，必须携带token
        */
        return config
    },err=>{
        console.log(err + '请求拦截报错')
    })
    // 响应结果拦截，把没有必要axios自带的结果拦截，只返回data。
    instance.interceptors.response.use(response =>{
        const res = response.data
        if(res.code != 1){
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 3 * 1000
            })
            // 未登录
            // if(res.code == 5 ){
            //     router.replace('/database')
            //     window.localStorage.removeItem("token")
            // }
            // return Promise.reject(new Error(res.msg || 'Error'))
        }else {
            return res
        }
    },err =>{
        console.log(err + '响应拦截报错')
    })
    // 发送网络请求
    return instance(config)

}