// import useMutation dari '@tanstack/vue-query';
import { useMutation } from "@tanstack/vue-query";

//import service API
import Api from "../../services/api";

//interface UserRequest untuk update
interface UserRequest {
    name: string;
    username: string;
    email: string;
    password?: string; // password optional, karena bisa jadi kita tidak ingin mengubahnya
}

// composable untuk update user
export const useUserUpdate = () => {
    return useMutation({
        // Mutation untuk update user
        mutationFn: async ({ id, data }: { id: number; data: UserRequest }) => {
            // Gunakan service API untuk melakukan update user
            const response = await Api.put(`/api/users/${id}`, data);

            // Mengembalikan response data
            return response.data;
        },
    });
};
