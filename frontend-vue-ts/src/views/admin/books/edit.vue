<script setup lang="ts">
//import ref, reactive dan watchEffect dari vue
import { ref, reactive, watchEffect } from "vue";

//import useRoute dan useRouter dari vue-router
import { useRoute, useRouter } from "vue-router";

//import component SidebarMenu
import SidebarMenu from "../../../components/SidebarMenu.vue";

//import composable useBookById
import { useBookById } from "../../../composables/book/useBookById";

//import composable useBookUpdate
import { useBookUpdate } from "../../../composables/book/useBookUpdate";

// inisialisasi route dan router
const route = useRoute();
const router = useRouter();

// Ambil ID dari route param
const id = Number(route.params.id);

// Form state
const title = ref<string>("");
const code = ref<string>("");
const author = ref<string>("");
const year = ref<number>(0);
const synapsis = ref<string>("");

// Validation errors
const errors = reactive<Record<string, string>>({});

// Fetch book by ID
const { data: book } = useBookById(id);

// Isi form dari data user
watchEffect(() => {
    if (book.value) {
        title.value = book.value.title;
        code.value = book.value.code;
        author.value = book.value.author;
        year.value = book.value.year;
        synapsis.value = book.value.synapsis;
    }
});

// Mutation
const { mutate, isPending } = useBookUpdate();

// Handle form submit
const updateBook = (e: Event) => {
    e.preventDefault();

    // Call user update mutation
    mutate(
        {
            id,
            data: {
                title: title.value,
                code: code.value,
                author: author.value,
                year: year.value,
                synapsis: synapsis.value,
            },
        },
        {
            onSuccess: () => {
                // Redirect to users index
                router.push("/admin/books");
            },
            onError: (error: any) => {
                // Assign validation errors to the errors object
                Object.assign(errors, error.response.data.errors);
            },
        }
    );
};
</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-3">
                <SidebarMenu />
            </div>
            <div class="col-md-9">
                <div class="card border-0 rounded-4 shadow-sm">
                    <div class="card-header">Edit User</div>
                    <div class="card-body">
                        <form @submit="updateBook">
                            <div class="form-group mb-3">
                                <label class="mb-1 fw-bold">Judul</label>
                                <input
                                    type="text"
                                    v-model="title"
                                    class="form-control"
                                    placeholder="Judul"
                                />
                                <div
                                    v-if="errors.Title"
                                    class="alert alert-danger mt-2"
                                >
                                    {{ errors.Title }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="mb-1 fw-bold">Kode</label>
                                <input
                                    type="text"
                                    v-model="code"
                                    class="form-control"
                                    placeholder="Kode"
                                />
                                <div
                                    v-if="errors.Code"
                                    class="alert alert-danger mt-2"
                                >
                                    {{ errors.Code }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="mb-1 fw-bold">Penulis</label>
                                <input
                                    type="text"
                                    v-model="author"
                                    class="form-control"
                                    placeholder="Penulis"
                                />
                                <div
                                    v-if="errors.Author"
                                    class="alert alert-danger mt-2"
                                >
                                    {{ errors.Author }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="mb-1 fw-bold">Tahun</label>
                                <input
                                    type="number"
                                    v-model="year"
                                    class="form-control"
                                    placeholder="Tahun"
                                />
                                <div
                                    v-if="errors.Year"
                                    class="alert alert-danger mt-2"
                                >
                                    {{ errors.Year }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="mb-1 fw-bold">Sinapsis</label>
                                <input
                                    type="text"
                                    v-model="synapsis"
                                    class="form-control"
                                    placeholder="Sinapsis"
                                />
                                <div
                                    v-if="errors.Synapsis"
                                    class="alert alert-danger mt-2"
                                >
                                    {{ errors.Synapsis }}
                                </div>
                            </div>
                            <div class="btn-group">
                                <button
                                    type="submit"
                                    class="btn btn-sm btn-primary shadow-sm border-0"
                                    :disabled="isPending"
                                >
                                    {{
                                        isPending
                                            ? "Sedang Menyimpan..."
                                            : "Simpan"
                                    }}
                                </button>

                                <router-link
                                    to="/admin/books"
                                    class="btn btn-sm btn-secondary shadow-sm border-0"
                                >
                                    Batal
                                </router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
