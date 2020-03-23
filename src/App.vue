<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
export default {
  name: "app",
  data() {
    return {
      zh_CN
    };
  }
};
</script>

<style>
#app {
  height: 100%;
}
.blue {
  color: rgb(110, 119, 234);
  cursor: pointer;
}
.red {
  color: red;
  cursor: pointer;
}
</style>
