import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/ManageUsers.module.css";
import User from "./User";
import { faUserPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import useToggle from "./use-toggle";

function ManageUsers() {
  const [isModalAddUserOpen, toggleIsModalAddUserOpen] = useToggle(false);

  const [addUserFirstname, setAddUserFirstname] = useState("");
  const [addUserLastname, setAddUserLastname] = useState("");
  const [addUserPassword, setAddUserPassword] = useState("");
  const [addUserEmail, setAddUserEmail] = useState("");
  const [addUserDepartment, setAddUserDepartment] = useState("placeholder");
  const [addUserJob, setAddUserJob] = useState("placeholder");
  const [addUserRole, setAddUserRole] = useState("placeholder");

  // USE STATE POUR RECUPERATION DES LISTES EN BDD (POLES, POSTES, ROLES)
  const [departments, setDepartments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [roles, setRoles] = useState([]);

  // USE STATE POUR AFFICHER UN MESSAGE SI LE SALARIE EXISTE DEJA
  const [addUserError, setAddUserError] = useState(false);

  // USE STATE AFIN D'AFFICHER TOUS LES USERS DEJA EXISTANTS VIA .MAP
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data.data);
      });
  }, []);

  // AU CLIC SUR AJOUTER UN COLLABORATEUR
  const handleAddUser = () => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: addUserFirstname,
        lastname: addUserLastname,
        password: addUserPassword,
        email: addUserEmail,
        department: addUserDepartment,
        job: addUserJob,
        role: addUserRole,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          setAddUserError(true);
        }
        console.log(data);
      });
  };

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

  // RECUPERATION DES ROLES POUR INSERTION DANS UNE LISTE
  useEffect(() => {
    fetch("http://localhost:3000/roles")
      .then((response) => response.json())
      .then((data) => {
        setRoles(data.allRoles);
        console.log(data.allRoles);
      });
  }, []);

  const allRoles = roles.map((data, i) => {
    return (
      <option key={i} value={data._id}>
        {data.roleName}
      </option>
    );
  });

  // MAP POUR AFFICHER L'ENSEMBLE DES USERS
  const users = usersData.map((data, i) => {
    return <User key={i} {...data} />;
  });

  return (
    <>
      <div className={styles.mainManageUsersContainer}>
        <div>NAVBAR</div>
        <div className={styles.mainManagerUsers}>
          {isModalAddUserOpen && (
            <Modal title="Add user" handleDismiss={toggleIsModalAddUserOpen}>
              <div className={styles.modalContainer}>
                <div>Creation d'un collaborateur</div>
                <input
                  type="text"
                  placeholder="firstname"
                  id="addUserFirstname"
                  value={addUserFirstname}
                  onChange={(e) => setAddUserFirstname(e.target.value)}
                ></input>
                <input
                  type="text"
                  placeholder="lastname"
                  id="addUserLastname"
                  value={addUserLastname}
                  onChange={(e) => setAddUserLastname(e.target.value)}
                ></input>
                <input
                  type="text" // a changer en password pour mise en production
                  placeholder="password"
                  id="addUserPassword"
                  value={addUserPassword}
                  onChange={(e) => setAddUserPassword(e.target.value)}
                ></input>
                <input
                  type="text"
                  placeholder="email"
                  id="addUserEmail"
                  value={addUserEmail}
                  onChange={(e) => setAddUserEmail(e.target.value)}
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
                <select
                  name="selectedJob"
                  value={addUserJob}
                  onChange={(e) => setAddUserJob(e.target.value)}
                >
                  <option disabled value="placeholder">
                    Poste
                  </option>
                  {allJobs}
                </select>
                <select
                  name="selectedRole"
                  value={addUserRole}
                  onChange={(e) => setAddUserRole(e.target.value)}
                >
                  <option disabled value="placeholder">
                    Rôle
                  </option>
                  {allRoles}
                </select>
                {addUserError && (
                  <span className={styles.error}>
                    L'utilisateur existe déjà.
                  </span>
                )}
                <div className={styles.btnContainer}>
                  <button onClick={toggleIsModalAddUserOpen}>ANNULER</button>
                  <button onClick={() => handleAddUser()}>
                    CREER LE COLLABORATEUR
                  </button>
                </div>
              </div>
            </Modal>
          )}
          <div className={styles.addUserBtnAndTitle}>
            <button
              className={styles.addUserBtn}
              id="addUser"
              onClick={toggleIsModalAddUserOpen}
            >
              <FontAwesomeIcon
                icon={faUserPlus}
                size="xl"
                className={styles.userPlusIcon}
              />
              Ajouter un collaborateur
            </button>
            <div className={styles.title}>Gestion des utilisateurs</div>
            <div className={styles.whiteText}>Texte pour mise en page</div>
          </div>
          <div className={styles.allUsersContainer}>{users}</div>
          <button className={styles.backBtn} id="back to HR dashboard">
            RETOUR A LA PAGE D'ACCUEIL
          </button>
        </div>
      </div>
    </>
  );
}

export default ManageUsers;
