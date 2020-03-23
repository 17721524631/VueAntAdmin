import service from './request'

//  ---------登录-----------

// 登录--post请求方式
export const login = data => {
  return service({
    url: '/login/in',
    method: 'post',
    data
  })
};

// // 登录--get请求方式
// export const login = params => {
//   return service({
//     url: '/login/in',
//     method: 'post',
//     params
//   })
// };