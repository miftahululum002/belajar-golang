// import vue router
import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";

//import js cookies
import Cookie from "js-cookie";

// Utility to get the token
const getToken = () => Cookie.get("token");

// define routes with proper type
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/home/index.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/auth/register.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/login.vue"),
    },
    {
        path: "/admin/dashboard",
        name: "dashboard",
        component: () => import("../views/admin/dashboard/index.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/admin/users",
        name: "admin.users.index",
        component: () => import("../views/admin/users/index.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/admin/users/create",
        name: "admin.users.create",
        component: () => import("../views/admin/users/create.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/admin/users/edit/:id",
        name: "admin.users.edit",
        component: () => import("../views/admin/users/edit.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/admin/books",
        name: "admin.books.index",
        component: () => import("../views/admin/books/index.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/admin/books/create",
        name: "admin.books.create",
        component: () => import("../views/admin/books/create.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/admin/books/edit/:id",
        name: "admin.books.edit",
        component: () => import("../views/admin/books/edit.vue"),
        meta: { requiresAuth: true },
    },
];

// create router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Global navigation guard
router.beforeEach((to, _from, next) => {
    // Ambil token otentikasi pengguna
    const token = getToken();

    // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
    if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
        // Alihkan pengguna ke halaman login
        next({ name: "login" });
    }
    // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
    else if ((to.name === "login" || to.name === "register") && token) {
        // Alihkan pengguna ke halaman dashboard
        next({ name: "dashboard" });
    }
    // Jika tidak ada kondisi khusus, izinkan navigasi ke rute tujuan
    else {
        next();
    }
});

export default router;
