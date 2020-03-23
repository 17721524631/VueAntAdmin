let env = "test"; //build打包前更改  test : 测试环境  prod：正式环境
let baseURL = "https://www.baidu.com/";  //公共域名
if (env === "prod") {
  baseURL = "https://www.baidu.com/";
}

exports.config = {
  baseURL,
  env,
};
