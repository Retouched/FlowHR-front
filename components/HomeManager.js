import styles from "@/styles/HomeManager.module.css";
import NavBar from "./NavBar";
import HireRequestCard from "./HireRequestCard";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import hireRequest from "@/reducers/hireRequest";

function HomeManager() {
  // PREVOIR UNE BOUCLE POUR FAIRE APPARAITRE LES 3 DERNIERES HIRE REQUESTS DU MANAGER

  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  const [hireRequestData, setHireRequestData] = useState([]);

  // APPELER LA ROUTE HIREREQUEST
  // SI USER.ID DANS LE STORE A LA CONNEXION = USER ID ENREGISTER LORS DE LA HIRE REQUEST
  // ALORS MAP SUR LES DEMANDES
  // RECUPERER LE FETCH DEJA FAIT DANS CARD DIRECTOR UNDONE

  // RECUPERATION DES DONNEES DES HIRE REQUESTS
  useEffect(() => {
    fetch("http://localhost:3000/hireRequests")
      .then((response) => response.json())
      .then((data) => {
        setHireRequestData(data.allHireRequests);
      });
  }, []);

  //MAP POUR AFFICHER LES DEMANDE CONCERNANT LE MANAGER CONNECTE
  const hireRequests = hireRequestData
    .filter((data) => data.user.token === user.token)
    .map((data, i) => {
      return <HireRequestCard key={i} {...data} />;
    });
  console.log("hireRequests: ", hireRequests);

  // AU CLIC REDIRECTION VERS NOUVELLE DEMANDE
  const handleNewHireRequest = () => {
    router.push("/requestDetails");
  };

  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.titleH1}>Bienvenue {user.lastname}</h1>
        <div className={styles.btnContainer}>
          <button
            className={styles.newHireRequestBtn}
            id="make a new hire request"
            onClick={() => handleNewHireRequest()}
          >
            Demande d'autorisation d'embauche
          </button>
          <button
            className={styles.newEvolutionRequestBtn}
            id="make a new hire request"
          >
            Demande une évolution
          </button>
        </div>
        <h2 className={styles.titleH2}>Aperçu de mon tableau de bord</h2>
        <div className={styles.hireRequestContainer}>
          <div className={styles.letterHead}>
            <div>ETAT</div>
            <div>DEMANDE N°</div>
            <div>DATE</div>
            <div>DETAIL</div>
          </div>
          {hireRequests}
        </div>
        <button
          className={styles.dashboardBtn}
          id="redirection to detail dashboard"
        >
          CONSULTER MON TABLEAU DE BORD DETAILLE
        </button>
      </main>
    </div>
  );
}

export default HomeManager;
