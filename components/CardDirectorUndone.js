import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/CardDirector.module.css";
import { useEffect, useState } from "react";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
}

function CardDirectorUndone() {
  const [hireRequestData, setHireRequestData] = useState([]);

  //METTRE DANS "Traité" OU DANS "À traiter"
  //si hireRequest.dpRequestStatus = true alors mettre dans Traité, si il est false, le mettre dans A traiter.

  useEffect(() => {
    fetch("http://localhost:3000/hireRequests")
      .then((response) => response.json())
      .then((data) => {
        setHireRequestData(data.allHireRequests);
      });
  }, []);

  const hireRequests = hireRequestData
    .filter((data) => data.dpRequestStatus === false)
    .map((data, i) => {
      return (
        <div key={i} {...data} className={styles.userContainer}>
          <div className={styles.topCard}>
            <span className={styles.numHire}>
              demande d'autorisation n°{data.numRequest}
            </span>
            <span className={styles.date}>
              Reçu le: {formatDate(data.dateHireRequest)}
            </span>
          </div>
          <div className={styles.bottomCard}>
            <FontAwesomeIcon
              icon={faCircleUser}
              size="xl"
              className={styles.icon}
            />
            <div className={styles.containerInfos}>
              <span className={styles.infos}>
                {data.user.lastname} {data.user.firstname} {data.user.email}:{" "}
                {data.job.jobName}
              </span>
              <button className={styles.button}>Accéder à la demande</button>
            </div>
          </div>
        </div>
      );
    });

  return <>{hireRequests}</>;
}

export default CardDirectorUndone;
