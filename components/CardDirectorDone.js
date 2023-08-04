import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/CardDirector.module.css";
import { useEffect, useState } from "react";

function CardDirectorDone(props) {
  //rechercher dans la collection HireRequests via un fetch
  const [numRequest, setNumRequest] = useState(""); //hireRequest.numRequest
  const [dateHireRequest, setDateHireRequest] = useState(""); //hireRequest.dateHireRequest
  const [lastnameRequester, setLastnameRequester] = useState(""); //hireRequest.user_id.lastname
  const [firstnameRequester, setFirstnameRequester] = useState(""); //hireRequest.user_id.firstname
  const [emailRequester, setEmailRequester] = useState("placeholder"); //hireRequest.user_id.email
  const [job, setJob] = useState(""); //hireRequest.jobs.jobName

  //rechercher dans la collection users via le store
  const [dplRequestStatus, setDpRequestStatus] = useState(false);
  const [daflRequestStatus, setDafRequestStatus] = useState(false);
  const [pdglRequestStatus, setPdgRequestStatus] = useState(false);
  const [drhlRequestStatus, setDrhRequestStatus] = useState(false);

  useEffect(() => {
    if (job === "DIRECTEUR POLE ADMIN ET FINANCES") {
      setDafRequestStatus(true);
    } else if (
      job === "DIRECTEUR POLE R&D" ||
      "DIRECTEUR POLE FRANCE" ||
      "DIRECTEUR POLE INTERNATIONAL"
    ) {
      setDpRequestStatus(true);
    } else if (job === "PDG") {
      setPdgRequestStatus(true);
    } else if (job === "DIRECTEUR POLE RH") {
      setDrhRequestStatus(true);
    }
  }, []);

  return (
    <>
      <div className={styles.userContainer}>
        <div className={styles.topCard}>
          <span className={styles.numHire}>
            demande d'autorisation n°{numRequest}
          </span>
          <span className={styles.date}>Reçu le: {dateHireRequest}</span>
        </div>
        <div className={styles.bottomCard}>
          <FontAwesomeIcon
            icon={faCircleUser}
            size="xl"
            className={styles.icon}
          />
          <div className={styles.containerInfos}>
            <span className={styles.infos}>
              {lastnameRequester} {firstnameRequester} {emailRequester}: {job}
            </span>
            <button className={styles.button}>Accéder à la demande</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDirectorDone;
