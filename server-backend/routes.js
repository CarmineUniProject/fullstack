const express = require('express');
const path = require('path');
const util = require('util');
const router = express.Router();
const bcrypt = require('bcrypt');
const { connection } = require('./db');

//Funzione per cryptare la password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
  };

// Middleware per verificare l'autenticazione dell'utente
const verificaAutenticazione = (req, res, next) => {
  //console.log("Richiedo autenticazione " + req.session.user);
  if (req.session.user) {
    //console.log('Dati di sessione:', req.session);
    next();
  } else {
    res.status(401).send('Not authorized.');
  }
};

//GESTIONE DEI VARI ENDPOINT

//Endpoint per il signup
router.post('/signup', async (req, res, next) => {
    try {
        //console.log("Dati ricevuti dal client:", req.body);

        const { firstName, lastName, email, username, password, phone } = req.body;

        const chkEmail = 'SELECT * FROM utente WHERE email = ?';
        connection.query(chkEmail, [email], function (err, emailResult) {
            if (err) {
                //console.log("Error (CHECK EMAIL SIGNUP)", err);
                return res.status(500).json({ error: 'Error (CHECK EMAIL SIGNUP)' });
            }

            if (emailResult && emailResult.length > 0) {
                //console.log("Email already in use");
                return res.status(400).json({ message: 'Email already in use' });
            } else {
                const chkUsername = 'SELECT * FROM utente WHERE username = ?';
                connection.query(chkUsername, [username], async function (err, usernameResult) {
                    if (err) {
                        //console.log("Error (CHECK USERNAME SIGNUP)", err);
                        return res.status(500).json({ error: 'Error (CHECK USERNAME SIGNUP)' });
                    }

                    if (usernameResult && usernameResult.length > 0) {
                        //console.log("Username already in use");
                        return res.status(400).json({ message: 'Username already in use' });
                    } else {
                        const signup = 'INSERT INTO utente (nome, cognome, username, email, password, telefono) VALUES (?, ?, ?, ?, ?, ?)';
                        const hashedPassword = await hashPassword(password);

                        connection.query(signup, [firstName, lastName, username, email, hashedPassword, phone], function (err, data) {
                            if (err) {
                                //console.log("Error (SIGNUP)", err);
                                return res.status(500).json({ error: 'Error (SIGNUP)' });
                            } else {
                                //console.log("Registration was successful!");
                                return res.status(200).json({ message: 'Registration was successful!' });
                            }
                        });
                    }
                });
            }
        });
    } catch (error) {
        //console.log("Error during signup:", error);
        next(error); // Passa l'errore al gestore di errori
    }
});

//Endpoint per il login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //console.log("Dati ricevuti: " + email + ", " + password);

    // Controllo se l'utente è già autenticato
    if (req.session.user) {
      return res.status(400).json({ message: 'Already logged in' });
    }

    const chkUser = 'SELECT password FROM utente WHERE email = ?';

    connection.query(chkUser, [email], async function (err, result) {
      if (err) {
        //console.log("ERROR (CHECK USER LOGIN)");
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!result || result.length === 0) {
        //console.log("User not registered");
        return res.status(401).json({ message: 'User not found' });
      } else {
        const match = await bcrypt.compare(password, result[0].password);

        if (match) {
          // Se il login ha successo imposto le variabili di sessione
          req.session.user = email;
          //console.log("Dati di sessione impostati: " + req.session.user);

          res.status(200).json({ message: 'Login success!' });
        } else {
          res.status(401).json({ message: 'Login failed!' });
        }
      }
    });
  } catch (error) {
    next(error); // Passa l'errore al gestore di errori
  }
});

//Endpoint per il logout
router.get('/logout', async (req, res, next) => {
  try {
    // Controlla se l'utente è autenticato
    if (req.session.user) {
      // Effettua il logout: cancella i dati di sessione e i cookie
      req.session.destroy((err) => {
        if (err) {
          console.error('Error during logout:', err);
          res.status(500).json({ error: 'Error during logout' });
        } else {
          res.clearCookie('connect.sid'); // Sostituisci 'connect.sid' con il nome del tuo cookie di sessione, se diverso
          res.status(200).json({ message: 'Logout successful' });
        }
      });
    } else {
      res.status(401).json({ message: 'User not logged in' });
    }
  } catch (error) {
    next(error); // Passa l'errore al gestore di errori
  }
});

//Endpoint per ottenere i dati degli utenti
router.get('/users', async (req, res, next) => {
    try {
      const query = 'SELECT * FROM utente';
  
      connection.query(query, (err, result) => {
        if (err) {
          //console.log("ERROR (QUERY USER)", err);
          res.status(500).json({ error: 'ERROR (QUERY USER)' });
          return;
        } else {
          res.json(result);
        }
      });
    } catch (error) {
      next(error); // Passa l'errore al gestore di errori
    }
  });

//Endpoint per ottenere i macchinari con dati e percorsi delle immagini dal database
router.get('/machines', verificaAutenticazione, async (req, res, next) => {
  try {
    const query = 'SELECT * FROM macchinario';

    connection.query(query, (err, result) => {
      if (err) {
        //.log("Error (Query)", err);
        res.status(500).json({ error: 'Error (Query)' });
        return;
      } else {
        // Costruisci un array di oggetti con i dati delle macchine e il percorso completo delle immagini
        const machinesData = result.map((machine) => {
        const imagePath = machine.immagine;
        //console.log('Percorso immagine:', imagePath);
        return {
            ...machine,
            immagine: imagePath,
          };
        });
        res.status(200).json(machinesData);
      }
    });
  } catch (error) {
    next(error); // Passa l'errore al gestore di errori
  }
});

//Endpoint per il test del percorso dell'immagine
router.get('/test-image', (req, res) => {
  const imagePath = path.join(__dirname, 'img-prodotti', 'bench_press.png');
  res.sendFile(imagePath);
});

// Endpoint per aggiungere un elemento al carrello
router.post('/addToCart', async (req, res, next) => {
  try {
    const { nomeProdotto, prezzoProdotto } = req.body;
    const emailUtente = req.session.user;

    if (!emailUtente) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    // Controlla se l'articolo è già presente nel carrello dell'utente
    const checkQuery = 'SELECT * FROM carrello WHERE emailUtente = ? AND nomeProdotto = ?';
    connection.query(checkQuery, [emailUtente, nomeProdotto], (err, result) => {
      if (err) {
        //console.log('Error checking cart', err);
        res.status(500).json({ error: 'Error checking cart' });
      } else {
        if (result && result.length > 0) {
          res.status(400).json({ message: 'Item already in the cart' });
        } else {
          const insertQuery = 'INSERT INTO carrello (emailUtente, nomeProdotto, prezzoProdotto) VALUES (?, ?, ?)';
          connection.query(insertQuery, [emailUtente, nomeProdotto, prezzoProdotto], (err, result) => {
            if (err) {
              //console.log('Error adding to the cart', err);
              res.status(500).json({ error: 'Error adding to the cart' });
            } else {
              res.status(200).json({ message: 'Item successfully added to the cart!' });
            }
          });
        }
      }
    });
  } catch (error) {
    next(error); // Passa l'errore al gestore di errori
  }
});

//Endpoint per ottenere il carrello
router.get('/shoppingcart', verificaAutenticazione, async (req, res, next) => {
  try {
    const emailUtente = req.session.user;

    if (!emailUtente) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    const query = `
      SELECT carrello.*, macchinario.prezzo, macchinario.immagine
      FROM carrello
      JOIN macchinario ON carrello.nomeProdotto = macchinario.nomeMacchina
      WHERE emailUtente = ?`;

    try {
      const promisifiedQuery = util.promisify(connection.query).bind(connection);
      const result = await promisifiedQuery(query, [emailUtente]);

      // Costruisci un array di oggetti con i dati delle macchine e il percorso completo delle immagini
      const cartData = result.map((item) => {
        const imagePath = 'http://localhost:8000/api/img-prodotti/' + item.immagine;
        //console.log('Percorso immagine(Shopping cart):', imagePath);
        return {
          ...item,
          immagine: imagePath,
        };
      });

      res.status(200).json(cartData);
    } catch (error) {
      //console.log('Error fetching shopping cart', error);
      res.status(500).json({ error: 'Error fetching shopping cart' });
    }
  } catch (error) {
    next(error); // Passa l'errore al gestore di errori
  }
});

//Endpoint per rimuovere un oggetto dal carrello
router.delete('/removeFromCart', verificaAutenticazione, async (req, res, next) => {
  try {
    const { productName } = req.body; 
    const emailUtente = req.session.user;

    if (!emailUtente) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    const deleteQuery = 'DELETE FROM carrello WHERE nomeProdotto = ? AND emailUtente = ?';

    connection.query(deleteQuery, [productName, emailUtente], (err, result) => {
      if (err) {
        //console.log('Error removing from the cart', err);
        res.status(500).json({ error: 'Error removing from the cart' });
      } else {
        res.status(200).json({ message: 'Item successfully removed from the cart!' });
      }
    });
  } catch (error) {
    next(error); // Passa l'errore al gestore di errori
  }
});

//Endpoint per il checkout
router.delete('/checkout', verificaAutenticazione, async (req, res, next) => {
  try {
    const emailUtente = req.session.user;

    if (!emailUtente) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    const deleteAllQuery = 'DELETE FROM carrello WHERE emailUtente = ?';

    connection.query(deleteAllQuery, [emailUtente], (err, result) => {
      if (err) {
        //console.log('Error removing all items from the cart', err);
        res.status(500).json({ error: 'Error removing all items from the cart' });
      } else {
        res.status(200).json({ message: 'All items successfully removed from the cart!' });
      }
    });
  } catch (error) {
    next(error); // Passa l'errore al gestore di errori
  }
});

module.exports = router;
