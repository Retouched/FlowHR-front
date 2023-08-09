import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faHourglassHalf,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/HireRequestCard.module.css";

import { useEffect, useState } from "react";

function HireRequestCard(props) {
  const [isDone, setIsDone] = useState(false);
  const [nbrOfChoiceLeft, setNbrOfChoiceLeft] = useState(0);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  }

  useEffect(() => {
    getHireRequestStatus(
      props.dpRequestStatus,
      props.drhRequestStatus,
      props.dafRequestStatus,
      props.pdgRequestStatus
    );
  }, []);

  // FONCTION AFIN DE RECUPERER LE NBR DE CHOIX RESTANTS
  function getHireRequestStatus(dpStatus, drhStatus, dafStatus, pdgStatus) {
    const tabStatus = [dpStatus, drhStatus, dafStatus, pdgStatus];
    const nbrOfChoiceLeft = tabStatus.length;
    for (let i = 0; i < tabStatus.length; i++) {
      console.log("tabStatus: ", tabStatus);
      if (tabStatus[i] === true) {
        nbrOfChoiceLeft -= 1;
        console.log("nbr: ", nbrOfChoiceLeft);
        if (nbrOfChoiceLeft === 0) {
          setIsDone(true);
        }
      }
    }
    setNbrOfChoiceLeft(nbrOfChoiceLeft);
  }

  return (
    <div className={styles.hireRequestContainer}>
      {isDone && (
        <div className={styles.error}>
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
      )}
      {!isDone && <FontAwesomeIcon icon={faHourglassHalf} size="xl" />}
      <div>Demande n°{props.numRequest}</div>
      <div>{formatDate(props.dateHireRequest)}</div>
      <div>
        {nbrOfChoiceLeft}
        validation(s) en attente
      </div>
    </div>
  );
}

export default HireRequestCard;
