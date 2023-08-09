import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faHourglassHalf,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/HireRequestCard.module.css";

function HireRequestCard(props) {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  }
  function getHireRequestStatus(dpStatus, drhStatus, dafStatus, pdgStatus) {
    const tabStatus = [dpStatus, drhStatus, dafStatus, pdgStatus];
    const nbrOfChoiceLeft = 4;
    for (let i = 0; i < tabStatus.length; i++) {
      if (tabStatus[i] === "") {
        nbrOfChoiceLeft -= 1;
      }
    }
    return nbrOfChoiceLeft;
  }

  return (
    <div className={styles.hireRequestContainer}>
      <div>ICON</div>
      <div>Demande n°{props.numRequest}</div>
      <div>{formatDate(props.dateHireRequest)}</div>
      <div>
        {getHireRequestStatus(
          props.dpRequestStatus,
          props.drhRequestStatus,
          props.dafRequestStatus,
          props.pdgRequestStatus
        )}{" "}
        validation(s) en attente
      </div>
    </div>
  );
}

export default HireRequestCard;
