// import useMutation dari '@tanstack/vue-query';
import { useMutation } from "@tanstack/vue-query";

//import service API
import Api from "../../services/api";

//interface UserRequest
interface UserRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}

export const useUserCreate = () => {
    return useMutation({
        // mutation untuk create user
        mutationFn: async (data: UserRequest) => {
            //menggunakan service API untuk register
            const response = await Api.post("/api/users", data);
            //mengembalikan response data
            return response.data;
        },
    });
};
