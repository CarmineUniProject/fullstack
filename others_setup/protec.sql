-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Lug 29, 2023 alle 16:30
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `protec`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `carrello`
--

CREATE TABLE `carrello` (
  `idCarrello` int(255) NOT NULL,
  `emailUtente` char(50) DEFAULT NULL,
  `nomeProdotto` char(255) DEFAULT NULL,
  `prezzoProdotto` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `macchinario`
--

CREATE TABLE `macchinario` (
  `idMacchina` char(10) NOT NULL,
  `nomeMacchina` char(50) NOT NULL,
  `marca` char(50) DEFAULT NULL,
  `prezzo` int(10) DEFAULT NULL,
  `quantita` int(10) DEFAULT NULL,
  `disponibilita` char(2) DEFAULT NULL,
  `immagine` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `macchinario`
--

INSERT INTO `macchinario` (`idMacchina`, `nomeMacchina`, `marca`, `prezzo`, `quantita`, `disponibilita`, `immagine`) VALUES
('6', 'Barbell 10kg', 'Technogym', 130, 1, 'si', 'barbell_10.png'),
('1', 'Bench press', 'Panatta', 550, 3, 'si', 'bench_press.png'),
('5', 'Cable station', 'Panatta', 1500, 1, 'no', 'cable_station.png'),
('3', 'Hack squat', 'Technogym', 575, 1, 'si', 'hack_squat.png'),
('8', 'Lat pulldown machine', 'Technogym', 370, 1, 'si', 'lat_machine.png'),
('2', 'Leg press', 'Technogym', 600, 1, 'si', 'leg_press.png'),
('9', 'Multipower station', 'Panatta', 300, 1, 'si', 'mpw.png'),
('4', 'Pendulum squat', 'Panatta', 850, 1, 'si', 'pendulum_squat.png'),
('10', 'Rack', 'Technogym', 655, 1, 'si', 'rack.png');

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `nome` char(50) DEFAULT NULL,
  `cognome` char(50) DEFAULT NULL,
  `email` char(50) NOT NULL,
  `username` char(50) DEFAULT NULL,
  `password` char(255) DEFAULT NULL,
  `telefono` char(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`nome`, `cognome`, `email`, `username`, `password`, `telefono`) VALUES
('a', 'a', 'a@a', 'a', '$2b$10$c5O4pCvMnM/bbm.dXTzXFOa49nhZ/CwiENkL2y0/A6kwNtmXfMo16', '123'),
('g', 'g', 'g@gmail.com', 'gg', '$2b$10$s1hrHXCzbaR9XpAcJL3oVeQDpBG4bqX6icuE3qLv3dqA3TrqZv3Iq', '1');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `carrello`
--
ALTER TABLE `carrello`
  ADD PRIMARY KEY (`idCarrello`),
  ADD KEY `emailUtente` (`emailUtente`),
  ADD KEY `nomeProdotto` (`nomeProdotto`);

--
-- Indici per le tabelle `macchinario`
--
ALTER TABLE `macchinario`
  ADD PRIMARY KEY (`nomeMacchina`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `carrello`
--
ALTER TABLE `carrello`
  MODIFY `idCarrello` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `carrello`
--
ALTER TABLE `carrello`
  ADD CONSTRAINT `carrello_ibfk_1` FOREIGN KEY (`emailUtente`) REFERENCES `utente` (`email`),
  ADD CONSTRAINT `carrello_ibfk_2` FOREIGN KEY (`nomeProdotto`) REFERENCES `macchinario` (`nomeMacchina`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
