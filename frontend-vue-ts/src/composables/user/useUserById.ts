// import hook useQuery from vue-query
import { useQuery } from "@tanstack/vue-query";

//import service Api
import Api from "../../services/api";
//interface User
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

//composable useUserById dengan parameter id dan return type User
export const useUserById = (id: number) => {
    return useQuery<User, Error>({
        //query key, disesuaikan dengan ID user untuk caching
        queryKey: ["user", id],

        //query function
        queryFn: async () => {
            //get user by id from api
            const response = await Api.get(`/api/users/${id}`);

            //return data
            return response.data.data as User;
        },
    });
};
