// import hook useQuery from react-query
import { useQuery } from '@tanstack/react-query';

//import service Api
import Api from '../../services/api';
//interface Book
export interface Book {
    id: number;
    title: string;
    code: string;
    author: string;
    year: number;
    synapsis: string;
}

//hook useBooks dengan return type Product
export const useBooks = () => {

    return useQuery<Book[], Error>({

        //query key
        queryKey: ['books'],

        //query function
        queryFn: async () => {

            //get token from cookies
            // const token = Cookies.get('token');

            //get users from api
            const response = await Api.get('/api/books');

            //return data
            return response.data.data as Book[];
        },

    });
}