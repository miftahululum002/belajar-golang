// import useMutation dari '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

// import service API
import Api from '../../services/api';

// Hook untuk delete product
export const useBookDelete = () => {

    return useMutation({
        // Mutation function untuk delete product
        mutationFn: async (id: number) => {

            // Lakukan request DELETE ke endpoint API
            const response = await Api.delete(`/api/books/${id}`);

            // Kembalikan response
            return response.data;
        }
    });

};