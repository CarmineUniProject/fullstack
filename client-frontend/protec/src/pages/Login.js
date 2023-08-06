import React, { Component } from 'react';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Navbar from '../components/navbar';

class Login extends Component {
  state = {
    loginMessage: {
      type: '',
      content: '',
    },
  };

  // Funzione per gestire il cambiamento della visibilità della password
  toggleShowPassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleLogin = async (event) => {
    event.preventDefault();

    const form = event.target;
    //const formData = new FormData(form);

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    try {
      const body = {
        email: form.email.value,
        password: form.password.value,
      };

      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({
          loginMessage: { type: 'success', content: 'Login successful!' },
        });

        setTimeout(() => {
          window.location.href = '/machines';
        }, 1500);

      } else {
        this.setState({
          loginMessage: { type: 'error', content: data.message || 'Login failed!' },
        });
      }
    } catch (error) {
      console.error('Error during the login: ', error);
      this.setState({
        loginMessage: { type: 'error', content: 'Internal server error' },
      });
    }
  };

  render() {
    const { loginMessage, showPassword } = this.state;

    return (
      <>
        <Navbar isLoggedIn={false} />
          <div className='container-fluid p-5 bg-dark text-light min-vh-100 d-flex flex-column justify-content-center align-items-center'>
            <h2 className='mb-3'>Login</h2>

              {loginMessage.type && (
                <div className={`alert ${loginMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {loginMessage.content}
                </div>
              )}

              <form className='needs-validation p-4 rounded bg-light shadow' onSubmit={this.handleLogin}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label text-dark">Email</label>
                  <input name="email" id="email" type="email" autoComplete="off" className="form-control" required />
                  <div className="invalid-feedback text-dark">Please enter your email</div>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label text-dark">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      name="password"
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="off"
                      className="form-control"
                      required
                    />
                    <button type="button" className="btn btn-outline-secondary" onClick={this.toggleShowPassword}>
                    {showPassword ? <EyeSlash /> : <Eye />}
                    </button>
                  </div>
                  <div className="invalid-feedback text-dark">Please enter your password</div>
                </div>

                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="check" />
                  <label htmlFor="check" className="form-check-label text-dark">Remember me</label>
                </div>

                <button type="submit" className="btn btn-success w-100 mt-2">Login</button>
              </form>
            </div>
      </>
    );
  }
}

export default Login;
