import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/ManageUsers.module.css";
import User from "./User";
import { faUserPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function ManageUsers() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      // RAJOUTER .populate
      .then((data) => {
        setUsersData(data.data);
      });
  }, []);

  console.log("usersData: ", usersData);

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
          <div className={styles.addUserBtnAndTitle}>
            <button className={styles.addUserBtn} id="addUser">
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
