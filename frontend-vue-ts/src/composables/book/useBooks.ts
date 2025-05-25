// import hook useQuery from vue-query
import { useQuery } from "@tanstack/vue-query";

//import service Api
import Api from "../../services/api";
//interface User
export interface Book {
    id: number;
    title: string;
    code: string;
    author: string;
    year: number;
    synapsis: string;
}

//composable useBooks dengan return type Book
export const useBooks = () => {
    return useQuery<Book[], Error>({
        //query key
        queryKey: ["books"],

        //query function
        queryFn: async () => {
            //get users from api
            const response = await Api.get("/api/books");

            //return data
            return response.data.data as Book[];
        },
    });
};
