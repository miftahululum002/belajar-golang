//import FC from react
import { type FC } from "react";

//import SidebarMenu
import SidebarMenu from '../../../components/SidebarMenu';

//import Link from react-route
import { Link } from "react-router";

//import custom hook useUsers and interface User
import { useUsers, type User } from "../../../hooks/user/useUsers";

import { useUserDelete } from "../../../hooks/user/useUserDelete";
import { useQueryClient } from "@tanstack/react-query";

const UsersIndex: FC = () => {

    // get users from useUsers
    const { data: users, isLoading, isError, error } = useUsers();

    const queryClient = useQueryClient();

    //initialize useUserDelete
    const { mutate, isPending } = useUserDelete();
    //handle delete user
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this user?")) {

            //call useUserDelete
            mutate(id, {
                onSuccess: () => {
                    //refetch data
                    queryClient.invalidateQueries({ queryKey: ['users'] });
                }
            });
        }
    }
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-0 shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span>Data User</span>
                            <Link to="/admin/users/create" className="btn btn-sm btn-primary shadow-sm border-0">Tambah Data</Link>
                        </div>
                        <div className="card-body">

                            {/* Loading State */}
                            {isLoading && (
                                <div className="alert alert-info text-center">Loading...</div>
                            )}

                            {/* Error State */}
                            {isError && (
                                <div className="alert alert-danger text-center">
                                    Error: {error.message}
                                </div>
                            )}

                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Nama</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col" style={{ width: "20%" }}>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users?.map((user: User) => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td className="text-center">
                                                    <div className="btn-group">
                                                        <Link to={`/admin/users/edit/${user.id}`} className="btn btn-sm btn-primary shadow-sm border-0">Edit</Link>
                                                        <button onClick={() => handleDelete(user.id)} disabled={isPending} className="btn btn-sm btn-danger shadow-sm border-0">
                                                            {isPending ? 'Sedang Menghapus...' : 'Hapus'}
                                                        </button>
                                                    </div>

                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersIndex