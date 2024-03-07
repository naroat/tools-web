import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from '@/store/modules/user'
//store
import pinia from '../store'    //这里需要引入pinia
const userStore = useUserStore(pinia)
//创建axios实例
let request = axios.create({
    baseURL: import.meta.env.VITE_IS_MOCK == 'true' ? import.meta.env.VITE_APP_BASE_API :  import.meta.env.VITE_SERVE + import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})
//创建一个存储CancelToken源的映射，用于管理请求和取消操作  
const cancelSources = new Map();  
//mock环境下无法使用的接口
const mockBanUrl: string[] = [
    '/login',
    '/user/info',
    '/get/tool/collects',
    '/send/forget/password/code',
    '/send/register/code',
    '/forget/password',
    '/register',
    '/logout'
];
//请求拦截器
request.interceptors.request.use(config => {
    if (import.meta.env.VITE_IS_MOCK == 'true' && config.url != undefined && mockBanUrl.includes(config.url)) {
        //mock环境不能使用登录后相关功能
        const source = axios.CancelToken.source()
        //将source与请求的url或某种唯一标识符关联起来  
        cancelSources.set(config.url, source);  
        config.cancelToken = source.token;
        //取消
        source.cancel('Request canceled by the user.');
    } else {
        //获取token
        if (userStore.token) {
            // config.headers.token = userStore.token
            config.headers.Authorization = 'Bearer ' + userStore.token
        }
    }
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    if (response.data.code == 401) {
        //登录过期
        localStorage.setItem('TOKEN', '')
        location.reload()
    }
    return response.data;
}, (error) => {
    if (error.code == 'ERR_CANCELED') {
        //拒绝响应
        return Promise.race([]);
    }
    //处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            //msg = "token过期";
            msg = "登录过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;