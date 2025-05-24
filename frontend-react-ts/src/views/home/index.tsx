// import FC from react
import type { FC } from 'react';

// import Link from react-router
import { Link } from 'react-router';

const Home: FC = () => {
    return (
        <div className="p-5 mb-4 bg-light rounded-5 shadow-sm">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Fullstack Developer</h1>
                <p className="col-md-12 fs-4">Belajar FullStack Developer dengan Golang dan React TypeScript di codopro.id</p>
                <hr />
                <Link to="/register" className="btn btn-primary me-1">Register</Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
        </div>
    )
}

export default Home;