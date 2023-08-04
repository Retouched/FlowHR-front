import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/CardDirector.module.css";
import { useEffect, useState } from "react";

function CardDirectorDone(props) {
  //rechercher dans la collection HireRequests
  const [numRequest, setNumRequest] = useState("");
  const [dateHireRequest, setDateHireRequest] = useState("");
  const [lastnameRequester, setLastnameRequester] = useState("");
  const [firstnameRequester, setFirstnameRequester] = useState("");
  const [emailRequester, setEmailRequester] = useState("placeholder");
  const [job, setJob] = useState("");
  const [role, setRole] = useState("");

  //rechercher dans la collection users
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
