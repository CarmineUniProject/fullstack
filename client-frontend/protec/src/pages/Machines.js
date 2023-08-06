  import React, { Component } from 'react';
  import Navbar from '../components/navbar';
  import Card from '../components/card';

  class Machines extends Component {
    state = {
      machinesData: [],
      isLoading: true,
      error: null,
      userEmail: '',
      searchQuery: '',
    };

    //Metodo per ottenere i dati delle macchine dal server Express
    async fetchMachinesData() {
      try {
        const response = await fetch('http://localhost:8000/api/machines', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Not authorized, please login first');
        }
        const data = await response.json();

        this.setState({ machinesData: data, isLoading: false });
      } catch (error) {
        this.setState({ error: error.message, isLoading: false });
      }
    }

    componentDidMount() {
      this.fetchMachinesData();
      const userEmail = document.cookie.split(';').find((cookie) => cookie.includes('user='));
      if (userEmail) {
        this.setState({ userEmail: userEmail.split('=')[1] });
      }
    }

    handleSearch = (event) => {
      event.preventDefault();
      const searchTerm = event.target.search.value.toLowerCase();
      this.setState({ searchQuery: searchTerm });
      if (searchTerm === 'forza azzurre') {
        alert(
          'Fortissime queste azzurre della nazionale italiana di calcio femminile guidate dalla CT Milena Bertolini'
        );
      }
    };

    render() {
      const { machinesData, isLoading, error, userEmail, searchQuery } = this.state;
    
      // Filtra le macchine in base alla ricerca
      const filteredMachines = machinesData.filter((machine) =>
        machine.nomeMacchina.toLowerCase().includes(searchQuery)
      );
    
      return (
        <>
          <Navbar />
          <div className="container mt-4">
            <div className="row mb-3">
              <div className="col">
                <form onSubmit={this.handleSearch}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      name="search"
                      autoComplete='off'
                    />
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : filteredMachines.length === 0 ? (
              <p>No available machines.</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredMachines.map((machine) => {
                  //console.log("Percorso immagine:", '/img-prodotti/' + machine.immagine);
                  return (
                    <div key={machine.idMacchina} className="col mb-4 p-4 rounded">
                      <Card
                        name={machine.nomeMacchina}
                        price={machine.prezzo}
                        image={'/img-prodotti/' + machine.immagine}
                        userEmail={userEmail}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      );
    }
  }

  export default Machines;
