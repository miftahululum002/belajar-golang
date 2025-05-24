// import FC from react
import type { FC } from 'react';

//import router
import AppRoutes from './routes';

//import Link from react router
import { Link } from "react-router";
import Logo from "./assets/logo.png";

const App: FC = () => {

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={Logo} className="img-fluid" style={{ height: 40 }} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a href="https://codopro.id" target="_blank" className="nav-link active" aria-current="page">CODOPRO.ID</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <AppRoutes />
      </div>
    </div>
  )
}

export default App;