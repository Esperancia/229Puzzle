-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le : Mar 19 Novembre 2013 à 14:39
-- Version du serveur: 5.5.20
-- Version de PHP: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `229tourisme`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE IF NOT EXISTS `categorie` (
  `IdCat` int(11) NOT NULL AUTO_INCREMENT,
  `LibCat` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`IdCat`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `categorie`
--

INSERT INTO `categorie` (`IdCat`, `LibCat`) VALUES
(1, 'Places historiques / Historic places'),
(2, 'Places publiques / Public places'),
(3, 'Institutions'),
(4, 'Places à notoriété / Places to fame');

-- --------------------------------------------------------

--
-- Structure de la table `fichiers_systeme`
--

CREATE TABLE IF NOT EXISTS `fichiers_systeme` (
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `fichiers_systeme`
--

INSERT INTO `fichiers_systeme` (`url`) VALUES
('../ressources/systeme/accueil.docx'),
('../ressources/systeme/apropos.docx'),
('../ressources/systeme/instructions.docx'),
('../ressources/systeme/remerciements.docx');

-- --------------------------------------------------------

--
-- Structure de la table `lieux`
--

CREATE TABLE IF NOT EXISTS `lieux` (
  `IdLieu` int(11) NOT NULL AUTO_INCREMENT,
  `Image` text NOT NULL,
  `ResumDesc` text NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY (`IdLieu`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Contenu de la table `lieux`
--

INSERT INTO `lieux` (`IdLieu`, `Image`, `ResumDesc`, `Description`) VALUES
(1, 'ressources/lieux/assembleenationale.jpg', 'ressources/resume/assembleenationale.txt', 'ressources/description/assembleenationale.txt'),
(2, 'ressources/lieux/bulgarie.jpg', 'ressources/resume/bulgarie.txt', 'ressources/description/bulgarie.txt'),
(3, 'ressources/lieux/cic.fw.png', 'ressources/resume/cic.txt', 'ressources/description/cic.txt'),
(4, 'ressources/lieux/ganvie.jpg', 'ressources/resume/ganvie.txt', 'ressources/description/ganvie.txt'),
(5, 'ressources/lieux/jubile.jpg', 'ressources/resume/jubile.txt', 'ressources/description/jubile.txt'),
(6, 'ressources/lieux/martyrs.jpg', 'ressources/resume/martyrs.txt', 'ressources/description/martyrs.txt'),
(7, 'ressources/lieux/palaiscongres.fw.png', 'ressources/resume/palaiscongres.txt', 'ressources/description/palaiscongres.txt'),
(8, 'ressources/lieux/Parakou_PlaceBioGuerra.jpg', 'ressources/resume/Parakou_PlaceBioGuerra.txt', 'ressources/description/Parakou_PlaceBioGuerra.txt'),
(9, 'ressources/lieux/portenonretour.jpg', 'ressources/resume/portenonretour.txt', 'ressources/description/portenonretour.txt'),
(10, 'ressources/lieux/reconciliation.jpg', 'ressources/resume/reconciliation.txt', 'ressources/description/reconciliation.txt'),
(11, 'ressources/lieux/tatasomba.jpg', 'ressources/resume/tatasomba.txt', 'ressources/description/tatasomba.txt'),
(12, 'ressources/lieux/toussaintlouverture.jpg', 'ressources/resume/toussaintlouverture.txt', 'ressources/description/toussaintlouverture.txt'),
(13, 'ressources/lieux/vueganhi.fw.png', 'ressources/resume/vueganhi.txt', 'ressources/description/vueganhi.txt');

-- --------------------------------------------------------

--
-- Structure de la table `parties`
--

CREATE TABLE IF NOT EXISTS `parties` (
  `IdPar` int(11) NOT NULL AUTO_INCREMENT,
  `IdLieu` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `datejeu` date NOT NULL,
  `score` varchar(250) NOT NULL,
  PRIMARY KEY (`IdPar`),
  KEY `IdLieu` (`IdLieu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `regrouper`
--

CREATE TABLE IF NOT EXISTS `regrouper` (
  `IdCat` int(11) NOT NULL,
  `IdLieu` int(11) NOT NULL,
  PRIMARY KEY (`IdCat`,`IdLieu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `regrouper`
--

INSERT INTO `regrouper` (`IdCat`, `IdLieu`) VALUES
(1, 2),
(1, 6),
(1, 8),
(1, 9),
(1, 10),
(1, 12),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 12),
(3, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(4, 10),
(4, 11),
(4, 12),
(4, 13);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `parties`
--
ALTER TABLE `parties`
  ADD CONSTRAINT `parties_ibfk_1` FOREIGN KEY (`IdLieu`) REFERENCES `lieux` (`IdLieu`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
