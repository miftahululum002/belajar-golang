// import useMutation dari '@tanstack/vue-query';
import { useMutation } from "@tanstack/vue-query";

//import service API
import Api from "../../services/api";

//interface BookRequest
interface BookRequest {
    title: string;
    code: string;
    author?: string;
    year?: number;
    synapsis?: string;
}

export const useBookCreate = () => {
    return useMutation({
        // mutation untuk create user
        mutationFn: async (data: BookRequest) => {
            //menggunakan service API untuk register
            const response = await Api.post("/api/books", data);
            //mengembalikan response data
            return response.data;
        },
    });
};
