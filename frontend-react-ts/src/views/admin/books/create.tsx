/* eslint-disable @typescript-eslint/no-explicit-any */
//import FC from react
import { type FC, useState, type FormEvent } from "react";

//import SidebarMenu
import SidebarMenu from '../../../components/SidebarMenu';

//import useNavigate and Link from react-router
import { useNavigate, Link } from 'react-router';

//import custom hook useBookCreate
import { useBookCreate } from '../../../hooks/book/useBookCreate';
import InputLabel from "../../../components/moleculles/InputLabel";
import ErrorAlert from "../../../components/moleculles/ErrorAlert";

//interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

const BookCreate: FC = () => {

    //initialize useNavigate
    const navigate = useNavigate();

    //define state user
    const [title, setTitle] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [year, setYear] = useState<number>(0);
    const [synapsis, setSynapsis] = useState<string>('');

    //define state errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Inisialisasi useBookCreate
    const { mutate, isPending } = useBookCreate();

    // Handle submit form
    const storeBook = async (e: FormEvent) => {
        e.preventDefault();

        // Call the user create mutation
        mutate({
            title,
            code,
            author,
            year,
            synapsis
        }, {
            onSuccess: () => {

                // Redirect to books index
                navigate('/admin/books');
            },
            onError: (error: any) => {

                //set errors to state "errors"
                setErrors(error.response.data.errors);
            }
        })
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-header bg-white">
                            Tambah Data
                        </div>
                        <div className="card-body">
                            <form onSubmit={storeBook}>
                                <div className="form-group mb-3">
                                    <InputLabel htmlFor="title" label="Judul" isRequired={true} />
                                    <input type="text" value={title} id="name" onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Judul" />
                                    {errors.Title && <ErrorAlert error={errors.Title} />}
                                </div>
                                <div className="form-group mb-3">
                                    <InputLabel htmlFor="code" label="Kode" isRequired={true} />
                                    <input type="text" value={code} id="code" onChange={(e) => setCode(e.target.value)} className="form-control" placeholder="Kode" />
                                    {errors.Code && <ErrorAlert error={errors.Code} />}
                                </div>
                                <div className="form-group mb-3">
                                    <InputLabel htmlFor="author" label="Penulis" isRequired={false} />
                                    <input type="text" value={author} id="author" onChange={(e) => setAuthor(e.target.value)} className="form-control" placeholder="Penulis" />
                                    {errors.Author && <ErrorAlert error={errors.Author} />}
                                </div>
                                <div className="form-group mb-3">
                                    <InputLabel htmlFor="year" label="Tahun" isRequired={false} />
                                    <input type="number" value={year} id="year" onChange={(e) => setYear(Number(e.target.value))} className="form-control" placeholder="Tahun" />
                                    {errors.Year && <ErrorAlert error={errors.Year} />}
                                </div>
                                <div className="form-group mb-3">
                                    <InputLabel htmlFor="synapsis" label="Sinapsis" isRequired={false} />
                                    <input type="text" value={synapsis} id="synapsis" onChange={(e) => setSynapsis(e.target.value)} className="form-control" placeholder="Sinapsis" />
                                    {errors.Synapsis && <ErrorAlert error={errors.Synapsis} />}
                                </div>
                                <div className="btn-group">
                                    <button type="submit" className="btn btn-sm btn-primary shadow-sm border-0" disabled={isPending}>
                                        {isPending ? 'Sedang Menyimpan...' : 'Simpan'}
                                    </button>
                                    <Link to="/admin/users" className="btn btn-sm btn-secondary shadow-sm border-0">Batal</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BookCreate