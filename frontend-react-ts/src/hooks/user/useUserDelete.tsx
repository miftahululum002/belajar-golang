// import useMutation dari '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

// import service API
import Api from '../../services/api';

// Hook untuk delete user
export const useUserDelete = () => {

    return useMutation({
        // Mutation function untuk delete user
        mutationFn: async (id: number) => {

            // Lakukan request DELETE ke endpoint API
            const response = await Api.delete(`/api/users/${id}`);

            // Kembalikan response
            return response.data;
        }
    });

};