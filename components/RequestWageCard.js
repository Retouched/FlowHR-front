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

function RequestWageCard(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const hireRequest = useSelector((state) => state.hireRequest.value);

  // DONNEES POUR AJOUTER UNE DEMANDE
  const [addMinimumWage, setAddMinimumWage] = useState(
    props?.data?.hireRequest?.minimumWage ?? hireRequest.minimumWage ?? ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => unco ntrolled input

  const [addMaximumWage, setAddMaximumWage] = useState(
    props?.data?.hireRequest?.maximumWage ?? hireRequest.maximumWage ?? ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input
  const [addMonthlyVariableWage, setAddMonthlyVariableWage] = useState(
    props?.data?.hireRequest?.monthlyVariableWage ??
      hireRequest.monthlyVariableWage ??
      false
  );
  const [addAnnualVariableWage, setAddAnnualVariableWage] = useState(
    props?.data?.hireRequest?.annualVariableWage ??
      hireRequest.annualVariableWage ??
      false
  );
  const [addMonthlyVariableWageAmount, setAddMonthlyVariableWageAmount] =
    useState(
      props?.data?.hireRequest?.monthlyVariableWageAmount ??
        hireRequest.monthlyVariableWageAmount ??
        ""
    );
  const [addAnnualVariableWageAmount, setAddAnnualVariableWageAmount] =
    useState(
      props?.data?.hireRequest?.annualVariableWageAmount ??
        hireRequest.annualVariableWageAmount ??
        ""
    );
  const [addMoveAssist, setAddMoveAssist] = useState(
    props?.data?.hireRequest?.moveAssist ?? hireRequest.moveAssist ?? false
  );
  const [addAnnexDemand, setAddAnnexDemand] = useState(
    props?.data?.hireRequest?.annexDemand ?? hireRequest.annexDemand ?? ""
  );

  // AU CLIC SUR CHECKBOX & SWITCH
  const handleClickOnMonthlyVariableWage = () => {
    setAddMonthlyVariableWage(!addMonthlyVariableWage);
  };
  const handleClickOnAnnualVariableWage = () => {
    setAddAnnualVariableWage(!addAnnualVariableWage);
  };
  const handleSwitchOnAnnualVariableWage = () => {
    setAddMoveAssist(!addMoveAssist);
  };

  // AU CLIC SUR ETAPE SUIVANTE
  const handleThirdSubmit = () => {
    const datasThirdSubmit = {
      minimumWage: addMinimumWage,
      maximumWage: addMaximumWage,
      monthlyVariableWage: addMonthlyVariableWage,
      annualVariableWage: addAnnualVariableWage,
      monthlyVariableWageAmount: addMonthlyVariableWageAmount,
      annualVariableWageAmount: addAnnualVariableWageAmount,
      moveAssist: addMoveAssist,
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
        readOnly={props?.data?.hireRequest?.minimumWage ? true : false}
        type="text"
        placeholder="Salaire de base mensuel en €"
        value={addMinimumWage}
        onChange={(e) => setAddMinimumWage(e.target.value)}
      ></input>
      <span>€</span>
      <span>Salaire mensuel maximum </span>
      <input
        readOnly={props?.data?.hireRequest?.maximumWage ? true : false}
        type="text"
        placeholder="Salaire de base mensuel en €"
        value={addMaximumWage}
        onChange={(e) => setAddMaximumWage(e.target.value)}
      ></input>
      <span>€</span>
      <div>
        <span>Variable mensuel </span>
        <input
          readOnly={
            props?.data?.hireRequest?.monthlyVariableWage ? true : false
          }
          type="checkbox"
          checked={addMonthlyVariableWage}
          onChange={handleClickOnMonthlyVariableWage}
        />
      </div>
      <input
        readOnly={
          props?.data?.hireRequest?.monthlyVariableWageAmount ? true : false
        }
        type="text"
        placeholder="Variable mensuel en €"
        value={addMonthlyVariableWageAmount}
        onChange={(e) => setAddMonthlyVariableWageAmount(e.target.value)}
      ></input>
      <div>
        <span>Variable annuel </span>
        <input
          readOnly={props?.data?.hireRequest?.annualVariableWage ? true : false}
          type="checkbox"
          checked={addAnnualVariableWage}
          onChange={handleClickOnAnnualVariableWage}
        />
      </div>
      <input
        readOnly={
          props?.data?.hireRequest?.annualVariableWageAmount ? true : false
        }
        type="text"
        placeholder="Variable annuel en €"
        value={addAnnualVariableWageAmount}
        onChange={(e) => setAddAnnualVariableWageAmount(e.target.value)}
      ></input>
      <span>Accompagnement déménagement </span>
      <Switch
        readOnly={props?.data?.hireRequest?.moveAssist ? true : false}
        checked={addMoveAssist}
        onChange={handleSwitchOnAnnualVariableWage}
      />
      <span>Demande annexe </span>
      <input
        readOnly={props?.data?.hireRequest?.addAnnexDemand ? true : false}
        type="text"
        placeholder="Demande annexe"
        value={addAnnexDemand}
        onChange={(e) => setAddAnnexDemand(e.target.value)}
      ></input>
      {!props.hideButtons && (
        <div className={styles.btnContainer}>
          <BtnCancelComponent />
          <span>
            <BtnBack />
          </span>
          <span onClick={() => handleThirdSubmit()}>
            <BtnNextComponent />
          </span>
        </div>
      )}
    </div>
  );
}

export default RequestWageCard;
