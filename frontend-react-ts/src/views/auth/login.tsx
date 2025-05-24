/* eslint-disable @typescript-eslint/no-explicit-any */
// import FC from react
import { type FC, type FormEvent, useState, useContext } from 'react';

//import hook useNavigate from react router
import { useNavigate } from "react-router";

//import custom  hook useLogin from hooks
import { useLogin } from "../../hooks/auth/useLogin";

//import js-cookie
import Cookies from 'js-cookie'

//import context
import { AuthContext } from '../../context/AuthContext';
import InputLabel from '../../components/moleculles/InputLabel';
import ErrorAlert from '../../components/moleculles/ErrorAlert';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

export const Login: FC = () => {

    //initialize navigate
    const navigate = useNavigate();

    //initialize useLogin
    const { mutate, isPending } = useLogin();

    //destruct auth context "setIsAuthenticated"
    const { setIsAuthenticated } = useContext(AuthContext)!;

    //define state
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state for errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Handle submit form
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        // Call the login mutation
        mutate({
            username,
            password
        }, {
            onSuccess: (data: any) => {

                //set token to cookie
                Cookies.set('token', data.data.token);

                //set user to cookie
                Cookies.set('user', JSON.stringify({
                    id: data.data.id,
                    name: data.data.name,
                    username: data.data.username,
                    email: data.data.email
                }));

                //set isAuthenticated to true
                setIsAuthenticated(true);

                // Redirect to dashboard page
                navigate('/admin/dashboard');
            },
            onError: (error: any) => {

                //set errors to state "errors"
                setErrors(error.response.data.errors);
            }
        })
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-4">
                <div className="card border-0 rounded-4 shadow-sm">
                    <div className="card-body">
                        <h4 className='fw-bold text-center'>Login</h4>
                        <hr />
                        {errors.Error && <div className="alert alert-danger mt-2 rounded-4">Username or Password is incorrect</div>}
                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-3">
                                <InputLabel htmlFor="username" label="Username" isRequired={true} />
                                <input type="text" value={username} id="username" onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" autoFocus />
                                {errors.Username && <ErrorAlert error={errors.Username} />}
                            </div>

                            <div className="form-group mb-3">
                                <InputLabel htmlFor="password" label="Password" isRequired={true} />
                                <input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                                {errors.Password && <ErrorAlert error={errors.Password} />}
                            </div>
                            <button type="submit" className="btn btn-primary btn-md w-100" disabled={isPending}>
                                {isPending ? 'Loading...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;