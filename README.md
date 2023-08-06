# Tecnologie_Internet
# fullstack
Matricola 317741 corso IET

COME FAR FUNZIONARE IL PROGETTO

-- DATABASE --

Utilizzare XAMPP control panel
Avviare Apache e MySQL

Importare il database con le rispettive tabelle dal file 'protec.sql'

-- SETUP CARTELLA PROGETTO --
Creare una nuova cartella che conterrà sia la parte server che la parte client (es. fullstack)
Setup server -> All' interno della cartella 'fullstack' inserire i file presenti nello zip 'server-backend.zip'
Il server dovrebbe essere configurato, per farlo paartire basta aprire il cmd nel percorso della cartella server (es C:\Users\Carmine\Desktop\fullstack\server-backend)
ed inserire il comando 'npm start' il server sarà in ascolto sulla porta 8000 (la porta si può cambiare a piacimento) -> 'http://localhost:8000/etc...'

Setup client -> Dovremo andare a creare l'app react (npx create-react-app protec) ed andare a sostituire le cartelle che si creano con quelle nel file 'File essenziali client.zip'
(Nello specifico dovremo sostituire la cartella 'src' e 'public' che si andranno a creare con quelle nel file .zip)
Il client dovrebbe essere configurato, per farlo paartire basta aprire il cmd nel percorso della cartella server (es C:\Users\Carmine\Desktop\fullstack\client-frontend\protec)
ed inserire il comando 'npm start' il client sarà in esecuzione sull porta 3000 -> 'http://localhost:3000'

Ricapitolando la gerarchia delle cartelle dovrebbe essere la seguente:
  Fullstack
    Server-backend
    Client-frontend
      Protec
        src
        public
        ...(Vari file e cartelle)

Se tutti i passaggi sono corretti avremo un e-commerce funzionante a nostra disposizione
