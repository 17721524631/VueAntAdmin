// request.js
import axios from "axios";
// import store from '../store';
import router from '../router/index';
import { message } from 'ant-design-vue';

const GlobalConfig = require("@/config").config;
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "错误请求",
  401: "未授权，请重新登录",
  403: "拒绝访问",
  404: "请求错误,未找到该资源",
  406: "请求的格式不可得",
  410: "请求的资源被永久删除",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器端出错",
  502: "网络错误",
  503: "服务不可用",
  504: "网络超时"
};

/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: GlobalConfig.baseURL,  // api的base_url
  timeout: 60 * 1000,  // 请求超时时间
});

service.interceptors.request.use(
  config => {
    // 在请求头上加token的方法
    // let token = store.state.loginInfo.token
    // config.headers['X-Token'] = token;

    // 给所有post接口加上参数的方法
    // if (config.method == 'post') {
    //   config.data = {
    //     ...config.data,
    //     token: store.state.loginInfo.token
    //   }
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => {  //成功请求到数据 
    //这里根据后端提供的数据进行对应的处理
    // 对响应数据做点什么
    if (response.status >= 200 && response.status <= 300) {
      if (response.data.code == -102 || response.data.code == -103 || response.data.code == -111) {
        message.error(response.data.msg)
        router.push('login')
      }
      return response.data;
    }
    return response;
  },
  error => {
    if (axios.isCancel(error)) {
      console.log("中断请求", error.message);
    } else {
      // 处理错误
      if (error && error.response) {
        error.message =
          codeMessage[error.response.status] ||
          `连接错误${error.response.status}`;
      } else {
        error.message = "连接到服务器失败";
      }
    }
    return Promise.reject(error.message);
  }
)

export default service;
