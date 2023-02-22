import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: "/login",
        name: "login",
        component: () =>
            import("../views/LoginView.vue"),
    },
    {
        path: "/home",
        name: "home",
        redirect: "home",
        component: () =>
            import("../views/HomeView.vue"),
        children: [{
            path: "/",
            redirect: "/home1",
        },
        // 以完成业务
        {
            path: '/ywcyw',
            name: "ywcyw",
            component: () => import('../views/ywcyw.vue')
        },
        // 主页
        {
            path: '/home1',
            name: 'home1',
            component: () => import('../views/home.vue')
        },
        // 转移登记业务申请
        {
            path: "/zydj",
            name: "zydj",
            component: () =>
                import("../views/zydj/List.vue"),
        },
        // 首次登记业务申请
        {
            path: "/scdj",
            name: "scdj",
            component: () =>
                import("../views/scdj/List.vue"),
        },
        // 查封登记业务申请
        {
            path: "/cfdj",
            name: "cfdj",
            component: () =>
                import("../views/cfdj/list.vue"),
        },
        // 更正登记业务申请
        {
            path: "/gzdj",
            name: "gzdj",
            component: () =>
                import("../views/gzdj/List.vue"),
        },
        // 追溯
        {
            path: '/zs',
            name: 'zs',
            component: () => import('../views/tjfx/zs.vue')
        },
        {
            path: '/zs1',
            name: 'zs1',
            component: () => import('../views/tjfx/zs1.vue')
        },
        // 表单编辑器
        {
            path: "/vform",
            name: "vform",
            component: () =>
                import("../views/Vform.vue"),
        },
        // 提交formJson文件给后端
        {
            path: "/vformUpload",
            name: "vformUpload",
            component: () =>
                import("../views/VformUpload.vue"),
        },
        {
            path: "/sfc",
            name: "sfc",
            component: () =>
                import("../views/Sfc.vue"),
        },
        {
            path: "/homeview2",
            name: "homeview2",
            component: () =>
                import("../views/HomeView2.vue"),
        },
        {
            path: "/ywl",
            name: "ywl",
            component: () =>
                import("../views/ywl.vue"),
            children: [
                // 首次登记收件
                {
                    path: "/scdj/sj",
                    name: "scdjsjsj",
                    component: () =>
                        import("../views/scdj/sj.vue"),
                },
                // 首次登记受理
                {
                    path: "/scdj/sl",
                    name: "scdjsjsl",
                    component: () =>
                        import("../views/scdj/sl.vue"),
                }, // 首次登记初审
                {
                    path: "/scdj/cs",
                    name: "scdjsjcs",
                    component: () =>
                        import("../views/scdj/cs.vue"),
                }, // 首次登记登簿
                {
                    path: "/scdj/db",
                    name: "scdjsjdb",
                    component: () =>
                        import("../views/scdj/db.vue"),
                }, // 首次登记收费
                {
                    path: "/scdj/sf",
                    name: "scdjsjsf",
                    component: () =>
                        import("../views/scdj/sf.vue"),
                }, // 首次登记发证
                {
                    path: "/scdj/fz",
                    name: "scdjsjfz",
                    component: () =>
                        import("../views/scdj/fz.vue"),
                }, // 首次登记归档
                {
                    path: "/scdj/gd",
                    name: "scdjsjgd",
                    component: () =>
                        import("../views/scdj/gd.vue"),
                },
                {
                    path: "/zydj/sj",
                    name: "zydjsj",
                    component: () =>
                        import("../views/zydj/Sj.vue"),
                },
                // 转移登记受理
                {
                    path: "/zydj/sl",
                    name: "zydjsl",
                    component: () =>
                        import("../views/zydj/Sl.vue"),
                },
                // 转移登记收费
                {
                    path: "/zydj/sf",
                    name: "zydjsf",
                    component: () =>
                        import("../views/zydj/Sf.vue"),
                },
                // 转移登记初审
                {
                    path: "/zydj/cs",
                    name: "zydjcs",
                    component: () =>
                        import("../views/zydj/Cs.vue"),
                },
                // 转移登记登簿缮证
                {
                    path: "/zydj/db",
                    name: "zydjdb",
                    component: () =>
                        import("../views/zydj/Dbsz.vue"),
                },
                // 转移登记发证
                {
                    path: "/zydj/fz",
                    name: "zydjfz",
                    component: () =>
                        import("../views/zydj/Fz.vue"),
                },
                // 转移登记归档
                {
                    path: "/zydj/gd",
                    name: "zydjgd",
                    component: () =>
                        import("../views/zydj/Gd.vue"),
                },

                // 查封登记收件
                {
                    path: "/cfdj/sj",
                    name: "cfdjsj",
                    component: () =>
                        import("../views/cfdj/sj.vue"),
                },
                // 查封登记初审
                {
                    path: "/cfdj/cs",
                    name: "cfdjcs",
                    component: () =>
                        import("../views/cfdj/cs.vue"),
                },
                // 查封登记登簿
                {
                    path: "/cfdj/db",
                    name: "cfdjdb",
                    component: () =>
                        import("../views/cfdj/db.vue"),
                },
                // 查封登记归档
                {
                    path: "/cfdj/gd",
                    name: "cfdjgd",
                    component: () =>
                        import("../views/cfdj/gd.vue"),
                },
                // 抵押登记收件
                {
                    path: "/dydj/sj",
                    name: "dydjsj",
                    component: () =>
                        import ("../views/dydj/sj.vue"),
                },
                 // 抵押登记受理
                 {
                    path: "/dydj/sl",
                    name: "dydjsl",
                    component: () =>
                        import ("../views/dydj/sl.vue"),
                },
                 // 抵押登记收费
                 {
                    path: "/dydj/sf",
                    name: "dydjsf",
                    component: () =>
                        import ("../views/dydj/sf.vue"),
                },
                // 抵押登记初审
                {
                    path: "/dydj/cs",
                    name: "dydjcs",
                    component: () =>
                        import ("../views/dydj/cs.vue"),
                },
                // 抵押登记登簿
                {
                    path: "/dydj/dbsz",
                    component: () =>
                        import ("../views/dydj/db.vue"),
                },
                // 抵押登记发证
                {
                    path: "/dydj/fz",
                        name: "dydjfz",
                        component: () =>
                            import ("../views/dydj/fz.vue"),
                },
                // 抵押登记归档
                {
                    path: "/dydj/gd",
                    name: "dydjgd",
                    component: () =>
                        import ("../views/dydj/gd.vue"),
                },
                // 更正登记收件
                {
                    path: "/gzdj/sj",
                    name: "gzdjsj",
                    component: () =>
                        import("../views/gzdj/sj.vue"),
                },
                // 更正登记受理
                {
                    path: "/gzdj/sl",
                    name: "gzdjsl",
                    component: () =>
                        import("../views/gzdj/sl.vue"),
                },
                // 更正登记收费
                {
                    path: "/gzdj/sf",
                    name: "gzdjsf",
                    component: () =>
                        import("../views/gzdj/sf.vue"),
                },
                // 更正登记初审
                {
                    path: "/gzdj/cs",
                    name: "gzdjcs",
                    component: () =>
                        import("../views/gzdj/cs.vue"),
                },
                // 更正登记登簿
                {
                    path: "/gzdj/db",
                    name: "gzdjdb",
                    component: () =>
                        import("../views/gzdj/db.vue"),
                },
                // 更正登记缮证
                {
                    path: "/gzdj/sz",
                    name: "gzdjsz",
                    component: () =>
                        import("../views/gzdj/sz.vue"),
                },
                // 更正登记发证
                {
                    path: "/gzdj/fz",
                    name: "gzdjfz",
                    component: () =>
                        import("../views/gzdj/fz.vue"),
                },
                // 更正登记归档
                {
                    path: "/gzdj/gd",
                    name: "gzdjgd",
                    component: () =>
                        import("../views/gzdj/gd.vue"),
                },
            ],
        },
        ],
    },

    ],
});

router.beforeEach((to, from, next) => {
    if (to.path == "/login") {
        next();
    } else {
        const token = window.localStorage.getItem("token");
        if (token) {
            next();
        } else {
            next("/login");
        }
    }
});

export default router;