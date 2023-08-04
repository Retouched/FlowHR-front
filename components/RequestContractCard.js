import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/RequestContractCard.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHireRequest } from "@/reducers/hireRequest";

import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";
import BtnBack from "./BtnBack";

function RequestContractCard() {
  const dispatch = useDispatch();
  const hireRequest = useSelector((state) => state.hireRequest.value);
  console.log("hireRequest: ", hireRequest);

  // DONNEES POUR AJOUTER UNE DEMANDE
  const [addPourcentageWorktime, setAddPourcentageWorkTime] = useState(
    hireRequest.pourcentageWorktime || ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input

  // AU CLIC SUR ETAPE SUIVANTE
  const handleSecondSubmit = () => {
    const datasSecondSubmit = {
      pourcentageWorktime: addPourcentageWorktime,
    };
    dispatch(addHireRequest(datasSecondSubmit));
    console.log("datasSecondSubmit", datasSecondSubmit);
  };

  return (
    <div>
      <span>Temps de travail </span>
      <input
        type="text"
        placeholder="en pourcentage"
        value={addPourcentageWorktime}
        onChange={(e) => setAddPourcentageWorkTime(e.target.value)}
      ></input>
      <span>%</span>
      <div className={styles.btnContainer}>
        <BtnCancelComponent />
        <span>
          <BtnBack />
        </span>
        <span onClick={() => handleSecondSubmit()}>
          <BtnNextComponent />
        </span>
      </div>
    </div>
  );
}

export default RequestContractCard;
