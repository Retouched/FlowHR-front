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
    hireRequest.pourcentageWorktime || ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input
  const [addContractType, setAddContractType] = useState(
    hireRequest.contractType
  );
  const [addContractReason, setAddContractReason] = useState(
    hireRequest.contractReason
  );
  const [addStartDateContract, setAddStartDateContract] = useState(new Date());
  const [addEndDateContract, setAddEndDateContract] = useState(new Date());
  const [addDurationContractDay, setAddDurationContractDay] = useState(null);
  const [addDurationContractMonth, setAddDurationContractMonth] =
    useState(null);

  // USE STATE POUR RECUPERATION DES LISTES EN BDD (TYPE CONTRAT, MOTIF CONTRAT)
  const [contractType, setContractType] = useState([]);
  const [contractReason, setContractReason] = useState([]);

  // RECUPERATION DES CONTRACT TYPES POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/contractTypes")
      .then((response) => response.json())
      .then((data) => {
        setContractType(data.allContractTypes);
      });
  }, []);

  const allContractTypes = contractType.map((data, i) => {
    return (
      <option key={i} value={data._id}>
        {data.contractTypeName}
      </option>
    );
  });

  // RECUPERATION DES CONTRACT REASONS POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/contractReasons")
      .then((response) => response.json())
      .then((data) => {
        setContractReason(data.allContractReasons);
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
        name="selectedContractType"
        value={addContractType}
        onChange={(e) => setAddContractType(e.target.value)}
      >
        <option disabled value="placeholder">
          Raison de la demande
        </option>
        {allContractTypes}
      </select>
      <span>Temps de travail </span>
      <input
        type="text"
        placeholder="en pourcentage"
        value={addPourcentageWorktime}
        onChange={(e) => setAddPourcentageWorkTime(e.target.value)}
      ></input>
      <span>%</span>
      <span>Choisir le motif de contrat </span>
      <select
        name="selectedContractReason"
        value={addContractReason}
        onChange={(e) => setAddContractReason(e.target.value)}
      >
        <option disabled value="placeholder">
          Motif du contrat
        </option>
        {allContractReasons}
      </select>
      <span>Date de début de contrat </span>
      <input
        type="date"
        placeholder="jj/mm/aaaa"
        onChange={(e) => {
          setAddStartDateContract(e.target.value);
        }}
      ></input>
      <span>Date de fin de contrat </span>
      <input
        type="date"
        placeholder="jj/mm/aaaa"
        onChange={(e) => {
          setAddEndDateContract(e.target.value);
        }}
      ></input>
      <span>Durée du contrat</span>
      <input
        type="text"
        placeholder="Durée du contrat"
        //A rajouter : nbr mois et nbr jours en automatique
      ></input>
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
