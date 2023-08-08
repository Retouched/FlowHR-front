import styles from "@/styles/HomeManager.module.css";
import NavBar from "./NavBar";
import HireRequestCard from "./HireRequestCard";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function HomeManager() {
  // PREVOIR UNE BOUCLE POUR FAIRE APPARAITRE LES 3 DERNIERES HIRE REQUESTS DU MANAGER

  const user = useSelector((state) => state.user.value);

  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.titleH1}>Bienvenue {user.lastname}</h1>
        <div className={styles.btnContainer}>
          <button
            className={styles.newHireRequestBtn}
            id="make a new hire request"
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
          <HireRequestCard />
          <HireRequestCard />
          <HireRequestCard />
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
