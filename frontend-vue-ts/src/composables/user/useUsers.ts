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

//composable useUsers dengan return type User
export const useUsers = () => {
    return useQuery<User[], Error>({
        //query key
        queryKey: ["users"],

        //query function
        queryFn: async () => {
            //get users from api
            const response = await Api.get("/api/users");

            //return data
            return response.data.data as User[];
        },
    });
};
