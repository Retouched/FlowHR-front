import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/RequestWageCard.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHireRequest, resetStore } from "@/reducers/hireRequest";
import { useRouter } from "next/router";

import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";
import BtnBack from "./BtnBack";
import { Checkbox, Switch } from "antd";

function RequestWageCard(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const hireRequest = useSelector((state) => state.hireRequest.value);
  const user = useSelector((state) => state.user.value);

  const handleCancel = () => {
    dispatch(resetStore());
    router.push(`/dashboard/${user.role.toLowerCase()}`);
  };

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
    <div className={styles.main}>
      <div className={styles.title}>
        <FontAwesomeIcon
          className={styles.message}
          icon={faEuroSign}
          size="xl"
        />
        <h2>ELEMENTS DE REMUNERATION</h2>
      </div>
      <div className={styles.inputContainer}>
        <span>Fourchette de rémunération mensuelle </span>
        <div className={styles.wageContainer}>
          <div className={styles.wageColumn}>
            <span>Salaire mensuel minimum (€) </span>
            <input
              disabled={
                props?.data?.hireRequest?.minimumWage ||
                router.pathname.includes("/requestConfirmation")
                  ? true
                  : false
              }
              type="text"
              placeholder="Salaire de base mensuel en €"
              value={addMinimumWage}
              onChange={(e) => setAddMinimumWage(e.target.value)}
            ></input>
          </div>
          <div className={styles.wageColumn}>
            <span>Salaire mensuel maximum (€) </span>
            <input
              disabled={
                props?.data?.hireRequest?.maximumWage ||
                router.pathname.includes("/requestConfirmation")
                  ? true
                  : false
              }
              type="text"
              placeholder="Salaire de base mensuel en €"
              value={addMaximumWage}
              onChange={(e) => setAddMaximumWage(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <span>Variable mensuel </span>
          <input
            disabled={
              props?.data?.hireRequest?.monthlyVariableWage ||
              router.pathname.includes("/requestConfirmation")
                ? true
                : false
            }
            type="checkbox"
            checked={addMonthlyVariableWage}
            onChange={handleClickOnMonthlyVariableWage}
          />
        </div>
        <input
          disabled={
            props?.data?.hireRequest?.monthlyVariableWageAmount ||
            router.pathname.includes("/requestConfirmation")
              ? true
              : false
          }
          type="text"
          placeholder="Variable mensuel en €"
          value={addMonthlyVariableWageAmount}
          onChange={(e) => setAddMonthlyVariableWageAmount(e.target.value)}
        ></input>
        <div>
          <span>Variable annuel </span>
          <input
            disabled={
              props?.data?.hireRequest?.annualVariableWage ||
              router.pathname.includes("/requestConfirmation")
                ? true
                : false
            }
            type="checkbox"
            checked={addAnnualVariableWage}
            onChange={handleClickOnAnnualVariableWage}
          />
        </div>
        <input
          disabled={
            props?.data?.hireRequest?.annualVariableWageAmount ||
            router.pathname.includes("/requestConfirmation")
              ? true
              : false
          }
          type="text"
          placeholder="Variable annuel en €"
          value={addAnnualVariableWageAmount}
          onChange={(e) => setAddAnnualVariableWageAmount(e.target.value)}
        ></input>
        <span>Accompagnement déménagement </span>
        <Switch
          disabled={
            props?.data?.hireRequest?.moveAssist ||
            router.pathname.includes("/requestConfirmation")
              ? true
              : false
          }
          checked={addMoveAssist}
          onChange={handleSwitchOnAnnualVariableWage}
        />
        <span>Demande annexe </span>
        <input
          disabled={
            props?.data?.hireRequest?.addAnnexDemand ||
            router.pathname.includes("/requestConfirmation")
              ? true
              : false
          }
          type="text"
          placeholder="Demande annexe"
          value={addAnnexDemand}
          onChange={(e) => setAddAnnexDemand(e.target.value)}
        ></input>
      </div>
      {!props.hideButtons && (
        <div className={styles.btnContainer}>
          <span onClick={handleCancel}>
            <BtnCancelComponent />
          </span>
          <div className={styles.rightBtns}>
            <span
              onClick={() => {
                router.push(`/requestContract`);
              }}
            >
              <BtnBack />
            </span>
            <span
              className={styles.nextBtn}
              onClick={() => handleThirdSubmit()}
            >
              <BtnNextComponent />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestWageCard;
