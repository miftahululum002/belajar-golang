// import hook useQuery from vue-query
import { useQuery } from "@tanstack/vue-query";

//import service Api
import Api from "../../services/api";
//interface Book
export interface Book {
    id: number;
    title: string;
    code: string;
    author: string;
    year: number;
    synapsis: string;
}

//composable useBookById dengan parameter id dan return type Book
export const useBookById = (id: number) => {
    return useQuery<Book, Error>({
        //query key, disesuaikan dengan ID user untuk caching
        queryKey: ["book", id],

        //query function
        queryFn: async () => {
            //get user by id from api
            const response = await Api.get(`/api/books/${id}`);

            //return data
            return response.data.data as Book;
        },
    });
};
