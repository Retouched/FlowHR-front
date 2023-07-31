import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/ManageUsers.module.css";
import User from "./User";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function ManageUsers() {
  fetch("");

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
            <div className={styles.whiteText}>Texte pour mis en page</div>
          </div>
          <div className={styles.allUsersContainer}>
            <User />
          </div>
          <button className={styles.backBtn} id="back to HR dashboard">
            RETOUR A LA PAGE D'ACCUEIL
          </button>
        </div>
      </div>
    </>
  );
}

export default ManageUsers;
