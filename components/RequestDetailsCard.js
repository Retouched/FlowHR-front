import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/RequestDetailsCard.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHireRequest } from "@/reducers/hireRequest";
import Link from "next/link";
import { useRouter } from "next/router";

import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";

function RequestDetailsCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const hireRequest = useSelector((state) => state.hireRequest.value);

  // DONNEES POUR AJOUTER UNE DEMANDE
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
    hireRequest.department
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
          name="selectedGoalRequest"
          placeholder="ezez"
          //value={addGoalRequest}
          onChange={(e) => setAddGoalRequest(e.target.value)}
        >
          {allGoalRequests}
        </select>
        <span>Identité de la personne remplacée :</span>
        <input
          type="text"
          placeholder="Prénom de la personne remplacée"
          id="nameReplacedPerson"
          defaultValue={hireRequest.nameReplacedPerson}
          onChange={(e) => {
            setAddNameReplacedPerson(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Nom de la personne remplacée"
          id="lastnameReplacedPerson"
          defaultValue={hireRequest.lastnameReplacedPerson}
          onChange={(e) => setAddLastnameReplacedPerson(e.target.value)}
        ></input>
        <span>Poste :</span>
        <select
          name="selectedJob"
          value={addJob} //Valeur du state
          onChange={(e) => setAddJob(e.target.value)} // mise a jour du state au choix dans la liste
        >
          <option disabled value="placeholder">
            Poste
          </option>
          {allJobs}
        </select>
        <span>Création d'un nouveau poste :</span>
        <input
          type="text"
          placeholder="Nom du nouveau poste"
          id="newJob"
          defaultValue={hireRequest.newJob}
          onChange={(e) => setAddNewJob(e.target.value)}
        ></input>
        <span>Classification :</span>
        <select
          name="selectedClassification"
          value={addClassification}
          onChange={(e) => setAddClassification(e.target.value)}
        >
          <option disabled value="placeholder">
            Classification
          </option>
          {allClassifications}
        </select>
        <span>Prénom du manager :</span>
        <input
          type="text"
          placeholder="Prénom du manager"
          id="firstnameManager"
          defaultValue={hireRequest.firstnameManager}
          onChange={(e) => setAddFirstnameManager(e.target.value)}
        ></input>
        <span>Nom du manager :</span>
        <input
          type="text"
          placeholder="Nom du manager"
          id="lastnameManager"
          defaultValue={hireRequest.lastnameManager}
          onChange={(e) => setAddLastnameManager(e.target.value)}
        ></input>
        <select
          name="selectedDepartment"
          value={addUserDepartment}
          onChange={(e) => setAddUserDepartment(e.target.value)}
        >
          <option disabled value="placeholder">
            Pôle
          </option>
          {allDepartments}
        </select>
        <div className={styles.btnContainer}>
          <BtnCancelComponent />
          <span onClick={() => handleFirstSubmit()}>
            <BtnNextComponent />
          </span>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailsCard;
