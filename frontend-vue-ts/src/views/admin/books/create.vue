<script setup lang="ts">
//import ref dan reactive dari vue
import { ref, reactive } from "vue";

//import useRouter dari vue-router
import { useRouter } from "vue-router";

//import component SidebarMenu
import SidebarMenu from "../../../components/SidebarMenu.vue";

//import composable useBookCreate
import { useBookCreate } from "../../../composables/book/useBookCreate";

// Router instance
const router = useRouter();

// Form state
const title = ref<string>("");
const code = ref<string>("");
const author = ref<string>("");
const year = ref<number>(0);
const synapsis = ref<string>("");

// Validation errors
const errors = reactive<Record<string, string>>({});

// Mutation
const { mutate, isPending } = useBookCreate();

// Handle form submit
const storeBook = (e: Event) => {
    e.preventDefault();

    // Call user create mutation
    mutate(
        {
            title: title.value,
            code: code.value,
            author: author.value,
            year: year.value,
            synapsis: synapsis.value,
        },
        {
            onSuccess: () => {
                // Redirect to books index
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
                    <div class="card-header">Tambah User</div>
                    <div class="card-body">
                        <form @submit="storeBook">
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
