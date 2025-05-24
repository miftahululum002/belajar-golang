/* eslint-disable @typescript-eslint/no-explicit-any */
//import FC from react
import { type FC, useState, type FormEvent } from "react";

//import SidebarMenu
import SidebarMenu from '../../../components/SidebarMenu';

//import useNavigate and Link from react-router
import { useNavigate, Link } from 'react-router';

//import custom hook useUserCreate
import { useUserCreate } from '../../../hooks/user/useUserCreate';
import InputLabel from "../../../components/moleculles/InputLabel";
import ErrorAlert from "../../../components/moleculles/ErrorAlert";

//interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

const UserCreate: FC = () => {

    //initialize useNavigate
    const navigate = useNavigate();

    //define state user
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Inisialisasi useUserCreate
    const { mutate, isPending } = useUserCreate();

    // Handle submit form
    const storeUser = async (e: FormEvent) => {
        e.preventDefault();

        // Call the user create mutation
        mutate({
            name,
            username,
            email,
            password
        }, {
            onSuccess: () => {

                // Redirect to users index
                navigate('/admin/users');
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
                            <form onSubmit={storeUser}>
                                <div className="form-group mb-3">
                                    <InputLabel htmlFor="name" label="Nama" isRequired={true} />
                                    <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Nama" />
                                    {errors.Name && <ErrorAlert error={errors.Name} />}
                                </div>
                                <div className="form-group mb-3">
                                    <InputLabel htmlFor="username" label="Username" isRequired={true} />
                                    <input type="text" value={username} id="username" onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" />
                                    {errors.Username && <ErrorAlert error={errors.Username} />}
                                </div>
                                <div className="form-group mb-3">
                                    <InputLabel htmlFor="email" label="Email" isRequired={true} />
                                    <input type="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                                    {errors.Email && <ErrorAlert error={errors.Email} />}
                                </div>
                                <div className="form-group mb-3">
                                    <InputLabel htmlFor="password" label="Password" isRequired={true} />
                                    <input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                                    {errors.Password && <ErrorAlert error={errors.Password} />}
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

export default UserCreate