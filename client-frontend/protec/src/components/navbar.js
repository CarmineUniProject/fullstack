import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid" style={{ backgroundColor: '#343a40' }}>
          <Link to="/aboutus" className="navbar-brand mb-0 h1">Protec</Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link">
                  <Link to="/machines" className="text-reset text-decoration-none">Machines</Link>
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  <Link to="/login" className="text-reset text-decoration-none">Login</Link>
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  <Link to="/signup" className="text-reset text-decoration-none">Signup</Link>
                </span>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center ml-auto">
            <div className="mr-1">
              <Link to="/shoppingcart" className="text-reset">
                <FaShoppingCart size={24} className="text-warning" />
              </Link>
            </div>
            <div style={{ width: '15px' }}></div>
            <div>
              <Link to="/logout" className="text-reset">
                <FaSignOutAlt size={24} className="text-light" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
