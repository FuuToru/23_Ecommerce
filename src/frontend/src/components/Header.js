import {Link} from 'react-router-dom';
import {React} from 'react';
import {useContext} from 'react';
import { UserContext, CartContext, CurrencyContext } from '../Context';
import {useState} from 'react';

function Header(props){
  const userContext = useContext(UserContext);
  const {cartData, setcartData} = useContext(CartContext);
  const {CurrencyData, setCurrencyData} = useContext(CurrencyContext);

  if(cartData == null){
    var cartItems = 0;
  }else{
    var cartItems = cartData.length;
  }


  const changeCurrency = (e)=>{
    var _currency = e.target.value;
    localStorage.setItem('currency',_currency);
    setCurrencyData(_currency);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <i className="fa-brands fa-stripe-s ma-5"></i>
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
              <li className="nav-item">
                <Link className="nav-link" href="#" to="/checkout"> <i className="fa-solid fa-cart-shopping"></i>Cart ({cartData!=null && cartData.length})</Link>
              </li>
              <li className="nav-item dropdown">
              {userContext != 'true' &&
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Become a Customer ?
                </a>
              }
              {userContext == 'true' &&
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  My Account
                </a>
              }
                <ul className="dropdown-menu">
                {userContext != 'true' &&
                  <>
                  <li><Link className="dropdown-item" to="/customer/register">Register</Link></li>
                  <li><Link className="dropdown-item" to="/customer/login">Login</Link></li>
                  </>
                }
                {userContext == 'true'  && 
                  <>
                  <li><Link className="dropdown-item" to="customer/dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/customer/logout">Logout</Link></li>
                  </>
                }
                </ul>
              </li>

        <li className='nav-item'>
          <div className='nav-link'>
          <select onChange={changeCurrency}>
            {
              CurrencyData != 'usd' && <>
              <option value='usd'>USD</option>
              <option value='vnd' selected>VND</option>
              </>
            }
            {
              CurrencyData == 'usd' && <>
              <option value='usd' selected>USD</option>
              <option value='vnd'>VND</option>
              </>
            }
            </select>
          </div>

        </li>


            </ul>
          </div>
        </div>
      </nav>

    );

}

export default Header;