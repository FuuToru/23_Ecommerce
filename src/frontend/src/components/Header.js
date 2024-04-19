import {Link} from 'react-router-dom';
function Header(){
    return (
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <i class="fa-brands fa-stripe-s ma-5"></i>
            <Link className="navbar-brand" to="/">oasis</Link>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to = "/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#" to="/categories">Categories</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    );

}

export default Header;