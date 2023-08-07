import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/RequestWageCard.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHireRequest } from "@/reducers/hireRequest";
import { useRouter } from "next/router";

import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";
import BtnBack from "./BtnBack";
import { Checkbox, Switch } from "antd";

function RequestWageCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const hireRequest = useSelector((state) => state.hireRequest.value);

  // DONNEES POUR AJOUTER UNE DEMANDE
  const [addMinimumWage, setAddMinimumWage] = useState(
    hireRequest.addMinimumWage || ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input
  const [addMaximumWage, setAddMaximumWage] = useState(
    hireRequest.addMaximumWage || ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input
  const [addMonthlyVariableWage, setAddMonthlyVariableWage] = useState(false);
  const [addAnnualVariableWage, setAddAnnualVariableWage] = useState(false);
  const [addMonthlyVariableWageAmount, setAddMonthlyVariableWageAmount] =
    useState(hireRequest.monthlyVariableWageAmount || "");
  const [addAnnualVariableWageAmount, setAddAnnualVariableWageAmount] =
    useState(hireRequest.annualVariableWageAmount || "");
  const [addMooveAssist, setAddMooveAssist] = useState(false);
  const [addAnnexDemand, setAddAnnexDemand] = useState("");

  // AU CLIC SUR CHECKBOX & SWITCH
  const handleClickOnMonthlyVariableWage = () => {
    setAddMonthlyVariableWage(!addMonthlyVariableWage);
  };
  const handleClickOnAnnualVariableWage = () => {
    setAddAnnualVariableWage(!addAnnualVariableWage);
  };
  const handleSwitchOnAnnualVariableWage = () => {
    setAddMooveAssist(!addMooveAssist);
  };

  // AU CLIC SUR ETAPE SUIVANTE
  const handleThirdSubmit = () => {
    const datasThirdSubmit = {
      minimumWage: addMinimumWage,
      maximumWage: addMaximumWage,
      monthlyVariableWage: addMonthlyVariableWage,
      annualVariableWage: addAnnualVariableWage,
      mooveAssist: addMooveAssist,
      annexDemand: addAnnexDemand,
    };
    dispatch(addHireRequest(datasThirdSubmit));
    console.log("datasThirdSubmit", datasThirdSubmit);
    router.push("/requestConfirmation");
  };

  return (
    <div className={styles.wageCardContainer}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faEuroSign} size="xl" className={styles.euro} />
        <h2>ELEMENTS DE REMUNERATION</h2>
      </div>
      <span>Fourchette de rémunération mensuelle </span>
      <span>Salaire mensuel minimum </span>
      <input
        type="text"
        placeholder="Salaire de base mensuel en €"
        defaultValue={hireRequest.minimumWage}
        onChange={(e) => setAddMinimumWage(e.target.value)}
      ></input>
      <span>€</span>
      <span>Salaire mensuel maximum </span>
      <input
        type="text"
        placeholder="Salaire de base mensuel en €"
        defaultValue={hireRequest.maximumWage}
        onChange={(e) => setAddMaximumWage(e.target.value)}
      ></input>
      <span>€</span>
      <div>
        <span>Variable mensuel </span>
        <input
          type="checkbox"
          checked={addMonthlyVariableWage}
          onChange={handleClickOnMonthlyVariableWage}
        />
      </div>
      <input
        type="text"
        placeholder="Variable mensuel en €"
        defaultValue={hireRequest.monthlyVariableWageAmount}
        onChange={(e) => setAddMonthlyVariableWageAmount(e.target.value)}
      ></input>
      <div>
        <span>Variable annuel </span>
        <input
          type="checkbox"
          checked={addAnnualVariableWage}
          onChange={handleClickOnAnnualVariableWage}
        />
      </div>
      <input
        type="text"
        placeholder="Variable annuel en €"
        defaultValue={hireRequest.annualVariableWageAmount}
        onChange={(e) => setAddAnnualVariableWageAmount(e.target.value)}
      ></input>
      <span>Accompagnement déménagement </span>
      <Switch
        checked={addMooveAssist}
        onChange={handleSwitchOnAnnualVariableWage}
      />
      <span>Demande annexe </span>
      <input
        type="text"
        placeholder="Demande annexe"
        defaultValue={hireRequest.annexDemand}
        onChange={(e) => setAddAnnexDemand(e.target.value)}
      ></input>
      <div className={styles.btnContainer}>
        <BtnCancelComponent />
        <span>
          <BtnBack />
        </span>
        <span onClick={() => handleThirdSubmit()}>
          <BtnNextComponent />
        </span>
      </div>
    </div>
  );
}

export default RequestWageCard;
