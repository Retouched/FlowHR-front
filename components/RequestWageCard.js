import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/RequestWageCard.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHireRequest } from "@/reducers/hireRequest";
import { useRouter } from "next/router";

import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";
import BtnBack from "./BtnBack";

function RequestWageCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const hireRequest = useSelector((state) => state.hireRequest.value);
  console.log("hireRequest: ", hireRequest);

  // DONNEES POUR AJOUTER UNE DEMANDE
  const [addMinimumWage, setAddMinimumWage] = useState(
    hireRequest.addMinimumWage || ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input
  const [addMaximumWage, setAddMaximumWage] = useState(
    hireRequest.addMaximumWage || ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input

  // AU CLIC SUR ETAPE SUIVANTE
  const handleThirdSubmit = () => {
    const datasThirdSubmit = {
      minimumWage: addMinimumWage,
      maximumWage: addMaximumWage,
    };
    dispatch(addHireRequest(datasThirdSubmit));
    console.log("datasThirdSubmit", datasThirdSubmit);
    router.push("/requestConfirmation");
  };

  return (
    <div className={styles.wageCardContainer}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faEuroSign} size="xl" className={styles.euro} />
        <h2>ELEMENTS DE REMUNERATION</h2>
      </div>
      <span>Fourchette de rémunération mensuelle </span>
      <span>Salaire mensuel minimum </span>
      <input
        type="text"
        placeholder="Salaire de base mensuel en €"
        value={addMinimumWage}
        onChange={(e) => setAddMinimumWage(e.target.value)}
      ></input>
      <span>€</span>
      <span>Salaire mensuel maximum </span>
      <input
        type="text"
        placeholder="Salaire de base mensuel en €"
        value={addMaximumWage}
        onChange={(e) => setAddMaximumWage(e.target.value)}
      ></input>
      <span>€</span>
      <div className={styles.btnContainer}>
        <BtnCancelComponent />
        <span>
          <BtnBack />
        </span>
        <span onClick={() => handleThirdSubmit()}>
          <BtnNextComponent />
        </span>
      </div>
    </div>
  );
}

export default RequestWageCard;
