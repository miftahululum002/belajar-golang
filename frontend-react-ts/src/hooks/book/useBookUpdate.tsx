// import useMutation dari '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

//import service API
import Api from '../../services/api';


//interface BookRequest untuk update
interface BookRequest {
    title: string;
    code: string;
    author?: string;
    year?: number; // password optional, karena bisa jadi kita tidak ingin mengubahnya
    synapsis?: string; // synapsis juga optional
}

// Hook untuk update user
export const useBookUpdate = () => {
    return useMutation({
        // Mutation untuk update user
        mutationFn: async ({ id, data }: { id: number, data: BookRequest }) => {
            // Gunakan service API untuk melakukan update user
            const response = await Api.put(`/api/books/${id}`, data);
            // Mengembalikan response data
            return response.data;
        }
    });
};