import styles from "@/styles/HomeHR.module.css";
import NavBar from "./NavBar";
import HireRequestCard from "./HireRequestCard";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import hireRequest from "@/reducers/hireRequest";

function HomeHR() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  const [hireRequestData, setHireRequestData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/hireRequests")
      .then((response) => response.json())
      .then((data) => {
        setHireRequestData(data.allHireRequests);
      });
  }, []);

  // AU CLIC REDIRECTION VERS NOUVELLE DEMANDE
  const handleNewHireRequest = () => {
    router.push("/requestDetails");
  };

  //MAP POUR AFFICHER LES DEMANDE CONCERNANT LE MANAGER CONNECTE
  const hireRequests = hireRequestData.map((data, i) => {
    return <HireRequestCard key={i} {...data} />;
  });

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
            <div className={styles.etat}>ETAT</div>
            <div className={styles.demande}>DEMANDE N°</div>
            <div className={styles.date}>DATE</div>
            <div className={styles.detail}>DETAIL</div>
          </div>
          <div className={styles.hireRequestToScroll}>{hireRequests}</div>
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

export default HomeHR;
