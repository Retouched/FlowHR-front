import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/RequestDetailsCard.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHireRequest, resetStore } from "@/reducers/hireRequest";
import Link from "next/link";
import { useRouter } from "next/router";

import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";

function RequestDetailsCard(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const hireRequest = useSelector((state) => state.hireRequest.value);
  const user = useSelector((state) => state.user.value);

  const handleCancel = () => {
    dispatch(resetStore());
    router.push(`/dashboard/${user.role.toLowerCase()}`);
  };

  // DONNEES POUR AJOUTER UNE DEMANDE
  const [addGoalRequest, setAddGoalRequest] = useState(
    props?.data?.hireRequest?.goalRequest ?? hireRequest.goalRequest ?? ""
  );

  const [addNameReplacedPerson, setAddNameReplacedPerson] = useState(
    props?.data?.hireRequest?.nameReplacedPerson ??
      hireRequest.nameReplacedPerson ??
      ""
  );
  const [addLastnameReplacedPerson, setAddLastnameReplacedPerson] = useState(
    props?.data?.hireRequest?.lastnameReplacedPerson ??
      hireRequest.lastnameReplacedPerson ??
      ""
  );
  const [addJob, setAddJob] = useState(
    props?.data?.hireRequest?.job ?? hireRequest.job ?? ""
  );
  const [addNewJob, setAddNewJob] = useState(
    props?.data?.hireRequest?.newJob ?? hireRequest.newJob ?? ""
  );
  const [addClassification, setAddClassification] = useState(
    props?.data?.hireRequest?.classification ?? hireRequest.classification ?? ""
  );
  const [addFirstnameManager, setAddFirstnameManager] = useState(
    props?.data?.hireRequest?.firstnameManager ??
      hireRequest.firstnameManager ??
      ""
  );
  const [addLastnameManager, setAddLastnameManager] = useState(
    props?.data?.hireRequest?.lastnameManager ??
      hireRequest.lastnameManager ??
      ""
  );
  const [addUserDepartment, setAddUserDepartment] = useState(
    props?.data?.hireRequest?.department ?? hireRequest.department ?? ""
  );

  const handleFirstSubmit = () => {
    const datasFirstSubmit = {
      goalRequest: addGoalRequest,
      nameReplacedPerson: addNameReplacedPerson,
      lastnameReplacedPerson: addLastnameReplacedPerson,
      job: addJob,
      newJob: addNewJob,
      classification: addClassification,
      firstnameManager: addFirstnameManager,
      lastnameManager: addLastnameManager,
      department: addUserDepartment,
    };
    dispatch(addHireRequest(datasFirstSubmit));
    console.log("datasFirstSubmit", datasFirstSubmit);
    // Redirection
    router.push("/requestContract");
  };

  // USE STATE POUR RECUPERATION DES LISTES EN BDD (POLES, POSTES, CLASSIFICATIONS, GOALREQUESTS...)
  const [departments, setDepartments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [goalRequests, setGoalRequests] = useState([]);
  const [classifications, setClassifications] = useState([]);

  // RECUPERATION DES GOAL REQUESTS POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/goalRequests")
      .then((response) => response.json())
      .then((data) => {
        setGoalRequests(data.allGoalRequests);
        if (!hireRequest.goalRequest) {
          setAddGoalRequest(data.allGoalRequests[0]._id);
        }
      });
  }, []);

  const allGoalRequests = goalRequests.map((data, i) => {
    return (
      <option key={i} value={data._id}>
        {data.goalRequestName}
      </option>
    );
  });

  // RECUPERATION DES POSTES POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.allJobs);
        if (!hireRequest.addJob) {
          setAddJob(data.allJobs[0]._id);
        }
      });
  }, []);

  const allJobs = jobs.map((data, i) => {
    return (
      <option key={i} value={data._id}>
        {data.jobName}
      </option>
    );
  });

  // RECUPERATION DES CLASSIFICATIONS POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/classifications")
      .then((response) => response.json())
      .then((data) => {
        setClassifications(data.allClassifications);
        if (!hireRequest.addClassification) {
          setAddClassification(data.allClassifications[0]._id);
        }
      });
  }, []);

  const allClassifications = classifications.map((data, i) => {
    return (
      <option key={i} value={data._id}>
        {data.classification}
      </option>
    );
  });

  // RECUPERATION DES POLES POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/departments")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data.allDepartments);
        if (!hireRequest.addUserDepartment) {
          setAddUserDepartment(data.allDepartments[0]._id);
        }
      });
  }, []);
  console.log(addJob);

  const allDepartments = departments.map((data, i) => {
    return (
      <option key={i} value={data._id}>
        {data.departmentName}
      </option>
    );
  });

  // ************ //
  // ************ //

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <FontAwesomeIcon
          icon={faMessage}
          size="xl"
          className={styles.message}
        />
        <h2>DETAILS DE LA DEMANDE</h2>
      </div>
      <div className={styles.inputContainer}>
        <span>Raison de la demande :</span>
        <select
          disabled={
            props?.data?.hireRequest?.goalRequest ||
            router.pathname.includes("/requestConfirmation")
              ? true
              : false
          }
          name="selectedGoalRequest"
          placeholder="Raison de la demande"
          value={addGoalRequest}
          onChange={(e) => setAddGoalRequest(e.target.value)}
        >
          {allGoalRequests}
        </select>
        <span>Identité de la personne remplacée :</span>
        <div className={styles.replacedPerson}>
          <input
            disabled={
              props?.data?.hireRequest?.nameReplacedPerson ||
              router.pathname.includes("/requestConfirmation")
                ? true
                : false
            }
            type="text"
            placeholder="Prénom de la personne remplacée"
            id="nameReplacedPerson"
            value={addNameReplacedPerson}
            onChange={(e) => {
              setAddNameReplacedPerson(e.target.value);
            }}
            className={styles.firstnameReplaced}
          ></input>
          <input
            disabled={
              props?.data?.hireRequest?.lastnameReplacedPerson ||
              router.pathname.includes("/requestConfirmation")
                ? true
                : false
            }
            type="text"
            placeholder="Nom de la personne remplacée"
            id="lastnameReplacedPerson"
            value={addLastnameReplacedPerson}
            onChange={(e) => setAddLastnameReplacedPerson(e.target.value)}
            className={styles.lastnameReplaced}
          ></input>
        </div>
        <div className={styles.poste}>
          <span>Poste :</span>
          <select
            className={styles.selectedJob}
            disabled={
              props?.data?.hireRequest?.job ||
              router.pathname.includes("/requestConfirmation")
                ? true
                : false
            }
            name="selectedJob"
            value={addJob} //Valeur du state
            onChange={(e) => setAddJob(e.target.value)} // mise a jour du state au choix dans la liste
          >
            {allJobs}
          </select>
        </div>
        <span>Création d'un nouveau poste :</span>
        <input
          disabled={
            props?.data?.hireRequest?.newJob ||
            router.pathname.includes("/requestConfirmation")
              ? true
              : false
          }
          type="text"
          placeholder="Nom du nouveau poste"
          id="newJob"
          value={addNewJob}
          onChange={(e) => setAddNewJob(e.target.value)}
        ></input>
        <span>Classification :</span>
        <select
          disabled={
            props?.data?.hireRequest?.classification ||
            router.pathname.includes("/requestConfirmation")
              ? true
              : false
          }
          name="selectedClassification"
          value={addClassification}
          onChange={(e) => setAddClassification(e.target.value)}
        >
          {allClassifications}
        </select>
        <span>Manager :</span>
        <div className={styles.managerProfil}>
          <input
            disabled={
              props?.data?.hireRequest?.firstnameManager ||
              router.pathname.includes("/requestConfirmation")
                ? true
                : false
            }
            type="text"
            placeholder="Prénom du manager"
            id="firstnameManager"
            value={addFirstnameManager}
            onChange={(e) => setAddFirstnameManager(e.target.value)}
          ></input>
          <input
            disabled={
              props?.data?.hireRequest?.lastnameManager ||
              router.pathname.includes("/requestConfirmation")
                ? true
                : false
            }
            type="text"
            placeholder="Nom du manager"
            id="lastnameManager"
            value={addLastnameManager}
            onChange={(e) => setAddLastnameManager(e.target.value)}
          ></input>
        </div>
        <select
          disabled={
            props?.data?.hireRequest?.department ||
            router.pathname.includes("/requestConfirmation")
              ? true
              : false
          }
          name="selectedDepartment"
          value={addUserDepartment}
          onChange={(e) => setAddUserDepartment(e.target.value)}
        >
          {allDepartments}
        </select>
      </div>
      {!props.hideButtons && (
        <div className={styles.btnContainer}>
          <span className={styles.cancelBtn} onClick={handleCancel}>
            <BtnCancelComponent />
          </span>
          <span className={styles.nextBtn} onClick={() => handleFirstSubmit()}>
            <BtnNextComponent />
          </span>
        </div>
      )}
    </div>
  );
}

export default RequestDetailsCard;
