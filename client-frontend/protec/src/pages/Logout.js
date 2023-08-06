import React, { Component } from 'react';
import Navbar from '../components/navbar';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        this.setState({ message: 'Logout successful.' });
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        this.setState({ message: 'Unable to perform logout.' });
      }
    } catch (error) {
      console.error('Error during logout:', error);
      this.setState({ message: 'Something went wrong during logout.' });
    }
  };

  render() {
    return (
      <>
        <Navbar />
        <div className="container-fluid p-5 bg-dark text-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="mb-4">Logout Page</h2>
          <div className="alert alert-info">{this.state.message}</div>
          <button
            className="btn btn-primary mt-3"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        </div>
      </>
    );
  }
}

export default Logout;
