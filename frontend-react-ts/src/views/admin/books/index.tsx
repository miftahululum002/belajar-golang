//import FC from react
import { type FC } from "react";

//import SidebarMenu
import SidebarMenu from '../../../components/SidebarMenu';

//import Link from react-route
import { Link } from "react-router";

//import custom hook useUsers and interface User
import { useBooks, type Book } from "../../../hooks/book/useBooks";

import { useBookDelete } from "../../../hooks/book/useBookDelete";
import { useQueryClient } from "@tanstack/react-query";

const BooksIndex: FC = () => {

    // get books from useBooks
    const { data: books, isLoading, isError, error } = useBooks();

    const queryClient = useQueryClient();

    //initialize useUserDelete
    const { mutate, isPending } = useBookDelete();
    //handle delete user
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this book?")) {
            //call useUserDelete
            mutate(id, {
                onSuccess: () => {
                    //refetch data
                    queryClient.invalidateQueries({ queryKey: ['books'] });
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
                            <span>Data Buku</span>
                            <Link to="/admin/books/create" className="btn btn-sm btn-primary shadow-sm border-0">Tambah Data</Link>
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
                                        <th scope="col">Judul</th>
                                        <th scope="col">Kode</th>
                                        <th scope="col">Penulis</th>
                                        <th scope="col">Tahun</th>
                                        <th scope="col">Sinapsis</th>
                                        <th scope="col" style={{ width: "20%" }}>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        books?.map((object: Book) => (
                                            <tr key={object.id}>
                                                <td>{object.title}</td>
                                                <td>{object.code}</td>
                                                <td>{object.author}</td>
                                                <td>{object.year}</td>
                                                <td>{object.synapsis}</td>
                                                <td className="text-center">
                                                    <div className="btn-group">
                                                        <Link to={`/admin/books/edit/${object.id}`} className="btn btn-sm btn-primary shadow-sm border-0">Edit</Link>
                                                        <button onClick={() => handleDelete(object.id)} disabled={isPending} className="btn btn-sm btn-danger shadow-sm border-0">
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

export default BooksIndex