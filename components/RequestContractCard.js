import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/RequestContractCard.module.css";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHireRequest } from "@/reducers/hireRequest";
import { useRouter } from "next/router";

import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";
import BtnBack from "./BtnBack";

function RequestContractCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const hireRequest = useSelector((state) => state.hireRequest.value);

  // DONNEES POUR AJOUTER UNE DEMANDE
  const [addPourcentageWorktime, setAddPourcentageWorkTime] = useState(
    props?.data?.hireRequest?.pourcentageWorktime ??
      hireRequest.pourcentageWorktime ??
      ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input
  const [addContractType, setAddContractType] = useState(
    props?.data?.hireRequest?.contractType ?? hireRequest.contractType ?? ""
  );
  const [addContractReason, setAddContractReason] = useState(
    props?.data?.hireRequest?.contractReason ?? hireRequest.contractReason ?? ""
  );
  const [addStartDateContract, setAddStartDateContract] = useState(
    props?.data?.hireRequest?.startDateContract ??
      hireRequest.startDateContract ??
      ""
  );
  const [addEndDateContract, setAddEndDateContract] = useState(
    props?.data?.hireRequest?.endDateContract ??
      hireRequest.endDateContract ??
      ""
  );
  const [addDurationContractDay, setAddDurationContractDay] = useState(
    props?.data?.hireRequest?.durationContractDay ??
      hireRequest.durationContractDay ??
      null
  );
  const [addDurationContractMonth, setAddDurationContractMonth] = useState(
    props?.data?.hireRequest?.durationContractMonth ??
      hireRequest.durationContractMonth ??
      null
  );

  // USE STATE POUR RECUPERATION DES LISTES EN BDD (TYPE CONTRAT, MOTIF CONTRAT)
  const [contractType, setContractType] = useState([]);
  const [contractReason, setContractReason] = useState([]);

  // FONCTION NBR MOIS ENTRE DEUX DATES
  function getMonthsBetweenTwoDates(addStartDateContract, addEndDateContract) {
    const nbrMonths =
      (new Date(addEndDateContract).getFullYear() -
        new Date(addStartDateContract).getFullYear()) *
        12 -
      new Date(addStartDateContract).getMonth() +
      new Date(addEndDateContract).getMonth();

    setAddDurationContractMonth(nbrMonths);
  }
  // Déclanchement de la fonction lorsqu'on modifie les dates
  useEffect(() => {
    getMonthsBetweenTwoDates(addStartDateContract, addEndDateContract);
  }, [addStartDateContract, addEndDateContract]);

  // RECUPERATION DES CONTRACT TYPES POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/contractTypes")
      .then((response) => response.json())
      .then((data) => {
        setContractType(data.allContractTypes);
        if (!hireRequest.addContractType) {
          setAddContractType(data.allContractTypes[0]._id);
        }
      });
  }, []);

  const allContractTypes = contractType.map((data, i) => {
    return (
      <option key={i} value={data._id}>
        {data.contractTypeName}
      </option>
    );
  });
  console.log("date: ", addStartDateContract);

  // RECUPERATION DES CONTRACT REASONS POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/contractReasons")
      .then((response) => response.json())
      .then((data) => {
        setContractReason(data.allContractReasons);
        if (!hireRequest.addContractReason) {
          setAddContractReason(data.allContractReasons[0]._id);
        }
      });
  }, []);

  const allContractReasons = contractReason.map((data, i) => {
    return (
      <option key={i} value={data._id}>
        {data.contractReasonName}
      </option>
    );
  });

  // AU CLIC SUR ETAPE SUIVANTE
  const handleSecondSubmit = () => {
    const datasSecondSubmit = {
      pourcentageWorktime: addPourcentageWorktime,
      contractType: addContractType,
      contractReason: addContractReason,
      startDateContract: addStartDateContract,
      endDateContract: addEndDateContract,
      durationContractDay: addDurationContractDay,
      durationContractMonth: addDurationContractMonth,
    };
    dispatch(addHireRequest(datasSecondSubmit));
    console.log("datasSecondSubmit", datasSecondSubmit);
    // Redirection
    router.push("/requestWage");
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <FontAwesomeIcon
          icon={faFileContract}
          size="xl"
          className={styles.contract}
        />
        <h2>TYPE DE CONTRAT</h2>
      </div>
      <span>Choisir le type de contrat </span>
      <select
        readOnly={props?.data?.hireRequest?.contractType ? true : false}
        name="selectedContractType"
        value={addContractType}
        onChange={(e) => setAddContractType(e.target.value)}
      >
        {allContractTypes}
      </select>
      <span>Temps de travail </span>
      <input
        readOnly={props?.data?.hireRequest?.pourcentageWorktime ? true : false}
        type="text"
        placeholder="en pourcentage"
        value={addPourcentageWorktime}
        onChange={(e) => setAddPourcentageWorkTime(e.target.value)}
      ></input>
      <span>%</span>
      <span>Choisir le motif de contrat </span>
      <select
        readOnly={props?.data?.hireRequest?.contractReason ? true : false}
        name="selectedContractReason"
        value={addContractReason}
        onChange={(e) => setAddContractReason(e.target.value)}
      >
        {allContractReasons}
      </select>
      <span>Date de début de contrat </span>
      <input
        readOnly={props?.data?.hireRequest?.startDateContract ? true : false}
        type="date"
        placeholder="jj/mm/aaaa"
        value={addStartDateContract}
        onChange={(e) => {
          setAddStartDateContract(e.target.value);
        }}
      ></input>
      <span>Date de fin de contrat </span>
      <input
        readOnly={props?.data?.hireRequest?.endDateContract ? true : false}
        type="date"
        placeholder="jj/mm/aaaa"
        value={addEndDateContract}
        onChange={(e) => {
          setAddEndDateContract(e.target.value);
        }}
      ></input>
      <span>Durée du contrat</span>
      <span>{addDurationContractMonth} mois</span>
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
