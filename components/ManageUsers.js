import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/ManageUsers.module.css";
import User from "./User";
import { faUserPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import useToggle from "./use-toggle";

function ManageUsers() {
  const [isModalAddUserOpen, toggleIsModalAddUserOpen] = useToggle(false);

  const [addUserFirstname, setAddUserFirstname] = useState(null);
  const [addUserLastname, setAddUserLastname] = useState(null);
  const [addUserPassword, setAddUserPassword] = useState(null);
  const [addUserEmail, setAddUserEmail] = useState(null);
  const [addUserDepartment, setAddUserDepartment] = useState(null);
  const [addUserJob, setAddUserJob] = useState(null);
  const [addUserRole, setAddUserRole] = useState(null);

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data.data);
      });
  }, []);

  console.log("usersData: ", usersData);

  // AU CLIC SUR AJOUTER UN COLLABORATEUR
  const handleAddUser = () => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: addUserFirstname,
        lastname: addUserLastname,
        //password: ,
        //email: ,
        //department: ,
        //job: ,
        //role: ,
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
                  onChange={(e) => setAddUserFirstname(e)}
                ></input>
                <input
                  type="text"
                  placeholder="lastname"
                  id="addUserLastname"
                  onChange={(e) => setAddUserLastname(e)}
                ></input>
                <input
                  type="text" // a changer en password pour mise en production
                  placeholder="password"
                  id="addUserPassword"
                  onChange={(e) => setAddUserPassword(e)}
                ></input>
                <input
                  type="text"
                  placeholder="email"
                  id="addUserEmail"
                  onChange={(e) => setAddUserEmail(e)}
                ></input>
                <input
                  type="text"
                  placeholder="Pôle"
                  id="addUserDepartment"
                  onChange={(e) => setAddUserDepartment(e)}
                ></input>
                <input
                  type="text"
                  placeholder="Poste"
                  id="addUserJob"
                  onChange={(e) => setAddUserJob(e)}
                ></input>
                <input
                  type="text"
                  placeholder="Role"
                  id="addUserRole"
                  onChange={(e) => setAddUserRole(e)}
                ></input>
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
