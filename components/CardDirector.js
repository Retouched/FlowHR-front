import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/CardDirector.module.css";

function CardDirector(props) {
  return (
    <>
      <div className={styles.userContainer}>
        <div className={styles.topCard}>
          <div className={styles.numHire}>demande d'autorisation n001</div>
          <div className={styles.date}>Recus: 29/3/2023</div>
        </div>
        <div className={styles.bottomCard}>
          <FontAwesomeIcon icon={faUser} size="xl" className={styles.icon} />
          <div className={styles.containerInfos}>
            <div className={styles.infos}></div>
            <button className={styles.button}></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDirector;
