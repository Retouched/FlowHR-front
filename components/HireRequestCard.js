import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faHourglassHalf,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/HireRequestCard.module.css";

function HireRequestCard() {
  return (
    <div className={styles.hireRequestContainer}>
      <div>ICON</div>
      <div>Demande n°</div>
      <div>jj/mm/aaaa</div>
      <div>"x" validation(s) en attente</div>
    </div>
  );
}

export default HireRequestCard;
