// import useMutation dari '@tanstack/vue-query';
import { useMutation } from "@tanstack/vue-query";

// import service API
import Api from "../../services/api";
// composable untuk delete user
export const useBookDelete = () => {
    return useMutation({
        // Mutation function untuk delete user
        mutationFn: async (id: number) => {
            // Lakukan request DELETE ke endpoint API
            const response = await Api.delete(`/api/books/${id}`);

            // Kembalikan response
            return response.data;
        },
    });
};
