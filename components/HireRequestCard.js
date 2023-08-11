import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faHourglassHalf,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/HireRequestCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function HireRequestCard(props) {
  const user = useSelector((state) => state.user.value);

  const [isDone, setIsDone] = useState(false);
  const [nbrOfChoiceLeft, setNbrOfChoiceLeft] = useState(0);
  const [hrProfil, setHrProfil] = useState(false);
  //const [dpStatus, setDpStatus] = useState(props.dpRequestStatus)

  useEffect(() => {
    if (user.role === "RH") {
      setHrProfil(true);
    }
  }, []);

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
      if (tabStatus[i] !== 1) {
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
          <FontAwesomeIcon icon={faCircleCheck} size="xl" />
        </div>
      )}
      {!isDone && <FontAwesomeIcon icon={faHourglassHalf} size="xl" />}
      <div>Demande n°{props.numRequest}</div>
      <div>{formatDate(props.dateHireRequest)}</div>
      {!hrProfil && <div>{nbrOfChoiceLeft} validation(s) en attente</div>}
      {hrProfil && (
        <div className={styles.rhDetailsContainer}>
          {props.dpRequestStatus === 1 && (
            <span>
              Choix du DP:
              <FontAwesomeIcon icon={faHourglassHalf} />
            </span>
          )}
          {props.dpRequestStatus === 2 && (
            <span>
              Choix du DP:
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>
          )}
          {props.dpRequestStatus === 0 && (
            <span>
              Choix du DP:
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          )}

          {props.drhRequestStatus === 1 && (
            <span>
              Choix du DRH:
              <FontAwesomeIcon icon={faHourglassHalf} />
            </span>
          )}
          {props.drhRequestStatus === 2 && (
            <span>
              Choix du DRH:
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>
          )}
          {props.drhRequestStatus === 0 && (
            <span>
              Choix du DRH:
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          )}
          {props.dafRequestStatus === 1 && (
            <span>
              Choix DAF:
              <FontAwesomeIcon icon={faHourglassHalf} />
            </span>
          )}
          {props.dafRequestStatus === 2 && (
            <span>
              Choix du DAF:
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>
          )}
          {props.dafRequestStatus === 0 && (
            <span>
              Choix du DAF:
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          )}
          {props.pdgRequestStatus === 1 && (
            <span>
              Choix du PDG:
              <FontAwesomeIcon icon={faHourglassHalf} />
            </span>
          )}
          {props.pdgRequestStatus === 2 && (
            <span>
              Choix du PDG:
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>
          )}
          {props.pdgRequestStatus === 0 && (
            <span>
              Choix du PDG:
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default HireRequestCard;
