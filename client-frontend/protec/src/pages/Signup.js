import React, { Component } from 'react';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Navbar from '../components/navbar';

class Signup extends Component {
  state = {
    isSubmitted: false,
    showPassword: false,
    errorMessage: '',
    fieldErrors: {
      email: '',
      username: '',
      password: '',
    },
  };

  // Funzione per controllare se la password rispetta le normative di sicurezza
  verificaPassword = (password) => {
    if (password.length < 8) {
      return 'La password deve contenere almeno 8 caratteri.';
    }

    if (!/[A-Z]/.test(password)) {
      return 'La password deve contenere almeno una lettera maiuscola.';
    }

    if (!/[a-z]/.test(password)) {
      return 'La password deve contenere almeno una lettera minuscola.';
    }

    if (!/\d/.test(password)) {
      return 'La password deve contenere almeno un numero.';
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return 'La password deve contenere almeno un carattere speciale tra: ! @ # $ % ^ & *.';
    }

    return '';
  };

  // Funzione per gestire il cambiamento della visibilità della password
  toggleShowPassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    //Controllo dei dati inviati dall'utente
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    try {
      const body = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        username: form.username.value,
        password: form.password.value,
        phone: form.phone.value,
      };

      // Controllo della password prima di inviare la richiesta
      const passwordError = this.verificaPassword(body.password);
      if (passwordError) {
        this.setState({
          errorMessage: passwordError,
          fieldErrors: {
            ...this.state.fieldErrors,
            password: passwordError,
          },
        });
        return;
      }

      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ isSubmitted: true });
      } else if (response.status === 400) {
        const { message } = data;
        this.setState({
          errorMessage: message,
          fieldErrors: {
            email: message.includes('Email') ? message : '',
            username: message.includes('Username') ? message : '',
            password: message.includes('Password') ? message : '',
          },
        });
      } else {
        this.setState({ errorMessage: 'Error during registration' });
      }
    } catch (error) {
      console.error('Error during registration: ', error);
      this.setState({ errorMessage: 'Internal server error' });
    }
  };

  render() {
    const { isSubmitted, errorMessage, fieldErrors, showPassword } = this.state;

    return (
      <>
        <Navbar />
        <div className='container-fluid p-5 bg-dark text-light min-vh-100 d-flex flex-column justify-content-center align-items-center'>
          <h2 className='mb-3'>Signup</h2>

            {isSubmitted ? (
              <div className='alert alert-success' role='alert'>
                Registration successful!
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className='alert alert-danger' role='alert'>
                    {errorMessage}
                  </div>
                )}

                <form className='needs-validation p-4 rounded bg-light shadow' onSubmit={this.handleSubmit}>
                  <div className='row'>
                    <div className={`form-group col-md-6 mb-2 ${fieldErrors.firstName ? 'has-error' : ''}`}>
                      <label htmlFor='firstName' className='form-label text-dark'>
                        First name
                      </label>
                      <input
                        name='firstName'
                        id='firstName'
                        type='text'
                        autoComplete='off'
                        className='form-control'
                        required
                      />
                      <div className='invalid-feedback text-dark'>Please enter your first name</div>
                    </div>
                    <div className={`form-group col-md-6 mb-2 ${fieldErrors.lastName ? 'has-error' : ''}`}>
                      <label htmlFor='lastName' className='form-label text-dark'>
                        Last name
                      </label>
                      <input
                        name='lastName'
                        id='lastName'
                        type='text'
                        autoComplete='off'
                        className='form-control'
                        required
                      />
                      <div className='invalid-feedback text-dark'>Please enter your last name</div>
                    </div>
                  </div>

                  <div className={`form-group mb-2 ${fieldErrors.username ? 'has-error' : ''}`}>
                    <label htmlFor='username' className='form-label text-dark'>
                      Username
                    </label>
                    <input name='username' id='username' type='text' autoComplete='off' className='form-control' required />
                    <div className='invalid-feedback text-dark'>Please enter your username</div>
                  </div>

                  <div className={`form-group mb-2 ${fieldErrors.email ? 'has-error' : ''}`}>
                    <label htmlFor='email' className='form-label text-dark'>
                      Email
                    </label>
                    <input name='email' id='email' type='email' autoComplete='off' className='form-control' required />
                    <div className='invalid-feedback text-dark'>{fieldErrors.email}</div>
                  </div>

                  <div className={`form-group mb-2 ${fieldErrors.password ? 'has-error' : ''}`}>
                    <label htmlFor='password' className='form-label text-dark'>
                      Password
                    </label>
                    <div className='input-group'>
                      <input
                        name='password'
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='off'
                        className='form-control'
                        required
                      />
                      <button type='button' className='btn btn-outline-secondary' onClick={this.toggleShowPassword}>
                        {showPassword ? <EyeSlash /> : <Eye />}
                      </button>
                    </div>
                    <div className='invalid-feedback text-dark'>Please enter your password</div>
                    </div>

                  <div className={`form-group mb-2 ${fieldErrors.phone ? 'has-error' : ''}`}>
                    <label htmlFor='phone' className='form-label text-dark'>
                      Phone
                    </label>
                    <input name='phone' type='tel' id='phone' autoComplete='off' className='form-control' required />
                    <div className='invalid-feedback text-dark'>Please enter your phone</div>
                  </div>

                  <button type='submit' className='btn btn-success w-100 mt-2'>
                    Signup
                  </button>
                </form>
              </>
            )}
          </div>
      </>
    );
  }
}

export default Signup;
