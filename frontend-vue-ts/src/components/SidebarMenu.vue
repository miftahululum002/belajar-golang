<script setup lang="ts">
//import composable useLogout
import { useLogout } from "../composables/auth/useLogout";

//initialize useLogout
const logout = useLogout();
</script>

<template>
    <div class="card border-0 shadow-sm">
        <div class="card-header">Menu</div>
        <div class="card-body">
            <div class="list-group">
                <router-link
                    to="/admin/dashboard"
                    class="list-group-item list-group-item-action"
                    >Dashboard</router-link
                >
                <router-link
                    to="/admin/users"
                    class="list-group-item list-group-item-action"
                    >Data User</router-link
                >
                <router-link
                    to="/admin/books"
                    class="list-group-item list-group-item-action"
                    >Data Buku</router-link
                >
                <a
                    href="#"
                    @click="logout"
                    class="list-group-item list-group-item-action"
                    >Logout</a
                >
            </div>
        </div>
    </div>
</template>
