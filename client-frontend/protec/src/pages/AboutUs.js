import React, { Component } from 'react';
import Navbar from '../components/navbar';

// Definiamo uno stile personalizzato per i riquadri
const boxStyle = {
  backgroundColor: '#333', // Colore di sfondo più scuro per i riquadri
  color: '#f2f2f2', // Colore del testo chiaro per i riquadri
  padding: '20px',
  borderRadius: '5px',
  marginBottom: '10px', // Margine inferiore più piccolo
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Effetto ombra leggera
};

class AboutUs extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container-fluid p-5 bg-dark text-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
          <div className="row">
            <div className="col-md-8">
              <h2>About the Project</h2>
              <p>
                Progetto realizzato a cura di Gualtieri Carmine per il corso di Tecnologie Internet
              </p>
              <p>
                Le specifiche riguardo le tecnologie utilizzate per la realizzazione del progetto sono le seguenti:
              </p>
              <ul>
                <li>Front-end:</li>
                <ul>
                  <li>React (JSX) + Bootstrap per quanto riguarda i vari componenti grafici</li>
                  <li>HTML + JSON + Bootstrap per quanto riguarda l'impaginazione dei componenti</li>
                </ul>
                <li>Back-end:</li>
                <ul>
                  <li>Node.js con server Express.js</li>
                  <li>API di tipo RESTful per il passaggio di dati tra client e server (e viceversa)</li>
                  <li>MySQL e XAMPP per quanto riguarda la gestione dei dati</li>
                </ul>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-column">
                <div style={boxStyle} className="mb-3">
                  <h3>Contacts</h3>
                  <p>
                    <b>Matricola:</b> 317741 (IET)
                  </p>
                  <p>
                    <b>Email:</b> carmine.gualtieri@studenti.unipr.it
                  </p>
                  <p>
                    <b>Phone:</b> +39 123-456-7890
                  </p>
                  <hr className="my-4" />

                  {/* Riquadro frase motivazionale */}
                  <div style={boxStyle}>
                    <h4 className="mb-3">Become the best version of yourself</h4>
                    <p>Embrace growth and challenges to become the person you aspire to be.</p>
                  </div>
                </div>

                {/* Riquadro nome del sito */}
                <div style={boxStyle}>
                  <h4 className="mb-0">Protec</h4>
                  <p className="mb-0">Your Safety, Our Priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AboutUs;
