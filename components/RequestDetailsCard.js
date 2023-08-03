import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/RequestDetailsCard.module.css";
import { useEffect, useState } from "react";

function RequestDetailsCard() {
  // DONNEES POUR AJOUTER UNE DEMANDE
  const [addGoalRequest, setAddGoalRequest] = useState("");
  const [addNameReplacedPerson, setAddNameReplacedPerson] = useState("");
  const [addLastnameReplacedPerson, setAddLastnameReplacedPerson] =
    useState("");
  const [addJob, setAddJob] = useState("placeholder");
  const [addNewJob, setAddNewJob] = useState("");
  const [addClassification, setAddClassification] = useState("");
  const [addFirstnameManager, setAddFirstnameManager] = useState("");
  const [addLastnameManager, setAddLastnameManager] = useState("");
  const [addUserDepartment, setAddUserDepartment] = useState("placeholder");

  // USE STATE POUR RECUPERATION DES LISTES EN BDD (POLES, POSTES, ROLES)
  const [departments, setDepartments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [roles, setRoles] = useState([]);

  // RECUPERATION DES
  // GOAL REQUESTS
  // CLASSIFICATIONS

  // RECUPERATION DES POSTES POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.allJobs);
      });
  }, []);

  const allJobs = jobs.map((data, i) => {
    return (
      <option key={i} value={data._id}>
        {data.jobName}
      </option>
    );
  });

  // RECUPERATION DES POLES POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/departments")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data.allDepartments);
      });
  }, []);

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
      <div className={styles.inputContainer}>
        <span>Raison de la demande :</span>
        <input
          type="text"
          placeholder="Raison de la demande"
          id="goalRequest"
          value={addGoalRequest}
          onChange={(e) => setAddGoalRequest(e.target.value)}
        ></input>
        <span>Identité de la personne remplacée :</span>
        <input
          type="text"
          placeholder="Prénom de la personne remplacée"
          id="nameReplacedPerson"
          value={addNameReplacedPerson}
          onChange={(e) => setAddNameReplacedPerson(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Nom de la personne remplacée"
          id="lastnameReplacedPerson"
          value={addLastnameReplacedPerson}
          onChange={(e) => setAddLastnameReplacedPerson(e.target.value)}
        ></input>
        <span>Poste :</span>
        <select
          name="selectedJob"
          value={addJob}
          onChange={(e) => setAddJob(e.target.value)}
        >
          <option disabled value="placeholder">
            Poste
          </option>
          {allJobs}
        </select>
        <input
          type="text"
          placeholder="Nom du nouveau poste"
          id="newJob"
          value={addNewJob}
          onChange={(e) => setAddNewJob(e.target.value)}
        ></input>
        <select
          name="selectedClassification"
          value={addClassification}
          onChange={(e) => setAddClassification(e.target.value)}
        >
          <option disabled value="placeholder">
            Classification
          </option>
          {}
        </select>
        <span>Prénom du manager :</span>
        <input
          type="text"
          placeholder="Prénom du manager"
          id="firstnameManager"
          value={addFirstnameManager}
          onChange={(e) => setAddFirstnameManager(e.target.value)}
        ></input>
        <span>Nom du manager :</span>
        <input
          type="text"
          placeholder="Nom du nouveau poste"
          id="lastnameManager"
          value={addLastnameManager}
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
      </div>
    </div>
  );
}

export default RequestDetailsCard;
