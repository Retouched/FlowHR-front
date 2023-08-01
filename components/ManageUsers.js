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
  const [addUserDepartment, setAddUserDepartment] = useState("");
  const [addUserJob, setAddUserJob] = useState("");
  const [addUserRole, setAddUserRole] = useState("");

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
        console.log(data);
      });
  };

  // MAP POUR AFFICHER L'ENSEMBLE DES USERS
  const users = usersData.map((data, i) => {
    console.log("data: ", data);
    return <User key={i} {...data} />;
  });
  console.log("users: ", users);
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
                <select name="selectedDepartment">
                  <option value="apple">Apple</option>
                  <option value="banana">Banana</option>
                  <option value="orange">Orange</option>
                </select>
                <select name="selectedJob">
                  <option value="apple">Apple</option>
                  <option value="banana">Banana</option>
                  <option value="orange">Orange</option>
                </select>
                <select name="selectedRole">
                  <option value="apple">Apple</option>
                  <option value="banana">Banana</option>
                  <option value="orange">Orange</option>
                </select>
                <div className={styles.btnContainer}>
                  <button onClick={toggleIsModalAddUserOpen}>ANNULER</button>
                  <button onClick={handleAddUser()}>
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
