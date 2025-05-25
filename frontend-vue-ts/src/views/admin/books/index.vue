<script setup lang="ts">
//import useQueryClient dari '@tanstack/vue-query'
import { useQueryClient } from "@tanstack/vue-query";
// import composable useBooks
import { useBooks } from "../../../composables/book/useBooks";

// import composable useBookDelete
import { useBookDelete } from "../../../composables/book/useBookDelete";

// import SidebarMenu component
import SidebarMenu from "../../../components/SidebarMenu.vue";

// initialize query client
const queryClient = useQueryClient();

// Get books
const { data: books, isLoading, isError, error } = useBooks();

// // User delete composable
const { mutate, isPending } = useBookDelete();

// Handle delete
const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
        // Call delete user mutation
        mutate(id, {
            onSuccess: () => {
                // Invalidate users query to refresh the list
                queryClient.invalidateQueries({ queryKey: ["books"] });
            },
        });
    }
};
</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-3">
                <SidebarMenu />
            </div>
            <div class="col-md-9">
                <div class="card border-0 shadow-sm">
                    <div
                        class="card-header d-flex justify-content-between align-items-center"
                    >
                        <span>Data Buku</span>
                        <router-link
                            to="/admin/books/create"
                            class="btn btn-sm btn-primary shadow-sm border-0"
                        >
                            Tambah Data
                        </router-link>
                    </div>
                    <div class="card-body">
                        <div
                            v-if="isLoading"
                            class="alert alert-info text-center"
                        >
                            Loading...
                        </div>

                        <div
                            v-if="isError"
                            class="alert alert-danger text-center"
                        >
                            Error: {{ error?.message }}
                        </div>

                        <table v-if="books" class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th>Judul</th>
                                    <th>Kode</th>
                                    <th>Penulis</th>
                                    <th>Tahun</th>
                                    <th>Sinapsis</th>
                                    <th style="width: 20%">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="book in books" :key="book.id">
                                    <td>{{ book.title }}</td>
                                    <td>{{ book.code }}</td>
                                    <td>{{ book.author }}</td>
                                    <td>{{ book.year }}</td>
                                    <td>{{ book.synapsis }}</td>
                                    <td class="text-center">
                                        <div class="btn-group">
                                            <router-link
                                                :to="`/admin/books/edit/${book.id}`"
                                                class="btn btn-sm btn-warning shadow-sm border-0"
                                            >
                                                Edit
                                            </router-link>
                                            <button
                                                @click="handleDelete(book.id)"
                                                :disabled="isPending"
                                                class="btn btn-sm btn-danger shadow-sm border-0"
                                            >
                                                {{
                                                    isPending
                                                        ? "Sedang menghapus..."
                                                        : "Hapus"
                                                }}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
