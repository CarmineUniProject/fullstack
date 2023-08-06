  const express = require('express');
  const session = require('express-session');
  const path = require('path');
  const app = express();
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const multer = require('multer');
  const routes = require('./routes');
  const { connection } = require('./db');

  // Configurazione del middleware cors
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  app.use(cors(corsOptions));

  // Configura il middleware per gestire i file statici (riguarda le immagini)
  const imgProdottiPath = path.join(__dirname, 'img-prodotti');
  app.use('/api/img-prodotti', express.static(imgProdottiPath));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Configura il middleware di sessione
  app.use(session({
    secret: 'Qh2p9&@$mf0jSk', // Chiave segreta per firmare il cookie della sessione
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, // 1 ora (in millisecondi)
    // Configurazione delle opzioni della sessione
  }));

  app.use(multer().none()); // Utilizzo di multer come middleware per analizzare dati multipart

  // Gestione delle varie routes
  app.use('/api', routes);

  const port = 8000;
  app.listen(port, () => {
    console.log('- Server listening on port ' + port + ' -');
  });

  // Gestione degli errori
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
