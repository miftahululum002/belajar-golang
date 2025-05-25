// import useMutation dari '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

//import service API
import Api from '../../services/api';

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

        // mutation untuk create product
        mutationFn: async (data: BookRequest) => {
            const response = await Api.post('/api/books', data);

            //mengembalikan response data
            return response.data;
        }
    });
};