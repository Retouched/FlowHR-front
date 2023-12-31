import styles from "../styles/RequestConfirmation.module.css";
import NavBar from "./NavBar";
import RequestContractCard from "./RequestContractCard";
import RequestDetailsCard from "./RequestDetailsCard";
import RequestWageCard from "./RequestWageCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHireRequest, resetStore } from "@/reducers/hireRequest";
import { useRouter } from "next/router";

import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";
import BtnBack from "./BtnBack";
import BtnConfirmComponent from "./BtnConfirm";

function RequestConfirmation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const hireRequest = useSelector((state) => state.hireRequest.value);
  const user = useSelector((state) => state.user.value);
  console.log("hireRequest: ", hireRequest);
  console.log("user: ", user);

  const handleCancel = () => {
    dispatch(resetStore());
    router.push(`/dashboard/${user.role.toLowerCase()}`);
  };

  // DONNEES POUR AJOUTER UNE DEMANDE
  // FIRST SUBMIT
  const [addGoalRequest, setAddGoalRequest] = useState(hireRequest.goalRequest);
  const [addNameReplacedPerson, setAddNameReplacedPerson] = useState("");
  const [addLastnameReplacedPerson, setAddLastnameReplacedPerson] =
    useState("");
  const [addJob, setAddJob] = useState(hireRequest.job);
  const [addNewJob, setAddNewJob] = useState("");
  const [addClassification, setAddClassification] = useState(
    hireRequest.classification
  );
  const [addFirstnameManager, setAddFirstnameManager] = useState("");
  const [addLastnameManager, setAddLastnameManager] = useState("");
  const [addUserDepartment, setAddUserDepartment] = useState(
    hireRequest.userDepartment
  );
  // SECOND SUBMIT
  const [addPourcentageWorktime, setAddPourcentageWorkTime] = useState(
    hireRequest.pourcentageWorktime || ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input
  // THIRD SUBMIT
  const [addMinimumWage, setAddMinimumWage] = useState(
    hireRequest.addMinimumWage || ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input
  const [addMaximumWage, setAddMaximumWage] = useState(
    hireRequest.addMaximumWage || ""
  ); // ajout du "|| "" " afin d'enlever l'erreur => uncontrolled input

  // ********** FINAL SUBMIT ********** !!!EN COURS!!!
  const handleFinalSubmit = () => {
    //Penser a rajouter les éléments manquants du second et thirs submit
    const datasFinalSubmit = {
      goalRequest: addGoalRequest,
      nameReplacedPerson: addNameReplacedPerson,
      lastnameReplacedPerson: addLastnameReplacedPerson,
      job: addJob,
      newJob: addNewJob,
      classification: addClassification,
      firstnameManager: addFirstnameManager,
      lastnameManager: addLastnameManager,
      userDepartment: addUserDepartment,
      pourcentageWorktime: addPourcentageWorktime,
      minimumWage: addMinimumWage,
      maximumWage: addMaximumWage,
    };

    dispatch(addHireRequest(datasFinalSubmit));
    console.log("datasFinalSubmit: ", datasFinalSubmit);

    fetch("http://localhost:3000/hireRequests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numRequest: hireRequest.numRequest,
        goalRequest: hireRequest.goalRequest,
        nameReplacedPerson: hireRequest.nameReplacedPerson,
        lastnameReplacedPerson: hireRequest.lastnameReplacedPerson,
        job: hireRequest.job,
        newJob: hireRequest.newJob,
        classification: hireRequest.classification,
        firstnameManager: hireRequest.firstnameManager,
        lastnameManager: hireRequest.lastnameManager,
        department: hireRequest.department,
        contractTypes: hireRequest.contractTypes,
        dateHireRequest: hireRequest.dateHireRequest,
        pourcentageWorkTime: hireRequest.pourcentageWorkTime,
        contractReasons: hireRequest.contractReasons,
        startDateContract: hireRequest.startDateContract,
        endDateContract: hireRequest.endDateContract,
        durationContractDay: hireRequest.durationContractDay,
        durationContractMonth: hireRequest.durationContractMonth,
        minimumWage: hireRequest.minimumWage,
        maximumWage: hireRequest.maximumWage,
        monthlyVariableWage: hireRequest.monthlyVariableWage,
        monthlyVariableWageAmount: hireRequest.monthlyVariableWageAmount,
        annualVariableWage: hireRequest.annualVariableWage,
        annualVariableWageAmount: hireRequest.annualVariableWageAmount,
        moveAssist: hireRequest.moveAssist,
        annexDemand: hireRequest.annexDemand,
        dpRequestStatus: hireRequest.dpRequestStatus,
        drhRequestStatus: hireRequest.drhRequestStatus,
        dafRequestStatus: hireRequest.dafRequestStatus,
        pdgRequestStatus: hireRequest.pdgRequestStatus,
        globalRequestStatus: hireRequest.globalRequestStatus,
        dpComment: hireRequest.dpComment,
        drhComment: hireRequest.drhComment,
        dafComment: hireRequest.dafComment,
        pdgComment: hireRequest.pdgComment,
        user: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    // Redirection
    router.push("/requestRedirection");
  };
  console.log("date store: ", hireRequest.startDateContract);
  return (
    <div className={styles.main}>
      <NavBar />
      <div className={styles.cardsContainer}>
        <div className={styles.detailsCard}>
          <RequestDetailsCard hideButtons={true} />
        </div>
        <div className={styles.contractCard}>
          <RequestContractCard hideButtons={true} />
        </div>
        <div className={styles.wageCard}>
          <RequestWageCard hideButtons={true} />
        </div>
      </div>
      <div className={styles.btnContainer}>
        <span onClick={handleCancel}>
          <BtnCancelComponent />
        </span>
        <div className={styles.rightBtns}>
          <span
            onClick={() => {
              dispatch(resetStore());
              router.push(`/requestWage`);
            }}
          >
            <BtnBack />
          </span>
          <span
            className={styles.confirmBtn}
            onClick={() => handleFinalSubmit()}
          >
            <BtnConfirmComponent />
          </span>
        </div>
      </div>
    </div>
  );
}

export default RequestConfirmation;
