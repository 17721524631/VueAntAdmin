// 登录页
const Login = () =>
    import(/* webpackChunkName: "Login" */ "../views/Login/Login.vue");

// 侧边栏导航
const HomePage = () =>
    import(/* webpackChunkName: "HomePage" */ "../views/HomePage/HomePage.vue");
const Subpage = () =>
    import(/* webpackChunkName: "Subpage" */ "../views/Subpage/Subpage.vue");

export default [
    {
        path: "/",
        redirect: "/login",
        meta: {
            title: '重定向',
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title: '登录',
        }
    },
    {
        path: "/home-page",
        name: "home-page",
        component: HomePage,
        meta: {
            title: '主页',
            requireLogin: true
        },
        redirect: "/subpage",
        children: [
            {
                path: "/subpage",
                name: "/subpage",
                component: Subpage,
                meta: {
                    title: '主页下的子页面',
                    requireLogin: true
                }
            },
        ]
    },
    // {
    //     path: "*",
    //     redirect: "/tips"
    // }
];