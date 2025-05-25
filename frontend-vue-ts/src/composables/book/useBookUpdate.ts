// import useMutation dari '@tanstack/vue-query';
import { useMutation } from "@tanstack/vue-query";

//import service API
import Api from "../../services/api";

//interface BookRequest untuk update
interface BookRequest {
    title: string;
    code: string;
    author?: string;
    year?: number;
    synapsis?: string;
}

// composable untuk update book
export const useBookUpdate = () => {
    return useMutation({
        // Mutation untuk update user
        mutationFn: async ({ id, data }: { id: number; data: BookRequest }) => {
            // Gunakan service API untuk melakukan update user
            const response = await Api.put(`/api/books/${id}`, data);
            // Mengembalikan response data
            return response.data;
        },
    });
};
