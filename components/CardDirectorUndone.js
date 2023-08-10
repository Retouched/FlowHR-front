import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/CardDirector.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
}

function CardDirectorUndone() {
  const [hireRequestData, setHireRequestData] = useState([]);
  const user = useSelector((state) => state.user.value);
  console.log("user: ", user);

  const router = useRouter();

  //METTRE DANS "Traité" OU DANS "À traiter"
  //si hireRequest.dpRequestStatus = true alors mettre dans Traité, si il est false, le mettre dans A traiter.

  useEffect(() => {
    fetch("http://localhost:3000/hireRequests")
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        setHireRequestData(data.allHireRequests);
      });
  }, []);
  console.log("hire:", hireRequestData);

  // PDG - DATAS
  const pdgHireRequests = hireRequestData
    .filter((data) => data.pdgRequestStatus === 1)
    .map((data, i) => {
      return (
        <div
          key={i}
          {...data}
          className={styles.userContainer}
          onClick={() => {
            router.push({
              pathname: "/dashboard/directeur/detailedDemand",
              query: { id: data._id },
            });
          }}
        >
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
                {data.user?.lastname} {data.user?.firstname} {data.user?.email}:{" "}
                {data.job?.jobName}
              </span>
              <button className={styles.button}>Accéder à la demande</button>
            </div>
          </div>
        </div>
      );
    });

  // DAF - DATAS
  const dafHireRequests = hireRequestData
    .filter((data) => data.dafRequestStatus === 1)
    .map((data, i) => {
      return (
        <div
          key={i}
          {...data}
          className={styles.userContainer}
          onClick={() => {
            router.push({
              pathname: "/dashboard/directeur/detailedDemand",
              query: { id: data._id },
            });
          }}
        >
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
                {data.user?.lastname} {data.user?.firstname} {data.user?.email}:{" "}
                {data.job?.jobName}
              </span>
              <button className={styles.button}>Accéder à la demande</button>
            </div>
          </div>
        </div>
      );
    });

  // DRH - DATAS
  const drhHireRequests = hireRequestData
    .filter((data) => data.drhRequestStatus === 1)
    .map((data, i) => {
      return (
        <div
          key={i}
          {...data}
          className={styles.userContainer}
          onClick={() => {
            router.push({
              pathname: "/dashboard/directeur/detailedDemand",
              query: { id: data._id },
            });
          }}
        >
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
                {data.user?.lastname} {data.user?.firstname} {data.user?.email}:{" "}
                {data.job?.jobName}
              </span>
              <button className={styles.button}>Accéder à la demande</button>
            </div>
          </div>
        </div>
      );
    });

  // DP - DATAS
  const dpHireRequests = hireRequestData
    .filter((data) => data.dpRequestStatus === 1)
    .map((data, i) => {
      return (
        <div
          key={i}
          {...data}
          className={styles.userContainer}
          onClick={() => {
            router.push({
              pathname: "/dashboard/directeur/detailedDemand",
              query: { id: data._id },
            });
          }}
        >
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
                {data.user?.lastname} {data.user?.firstname} {data.user?.email}:{" "}
                {data.job?.jobName}
              </span>
              <button className={styles.button}>Accéder à la demande</button>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className={styles.allRequestContainer}>
      {user.job === "PDG" && <div>{pdgHireRequests}</div>}
      {user.job === "DIRECTEUR POLE ADMIN ET FINANCES" && (
        <div>{dafHireRequests}</div>
      )}
      {user.job === "DIRECTEUR POLE RH" && <div>{drhHireRequests}</div>}
      {user.job === "DIRECTEUR POLE" && <div>{dpHireRequests}</div>}
    </div>
  );
}

export default CardDirectorUndone;
