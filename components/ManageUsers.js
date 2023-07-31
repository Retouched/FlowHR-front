import styles from "../styles/ManageUsers.module.css";
import User from "./User";

function ManageUsers() {
  fetch("");

  return (
    <>
      <div className={styles.mainManageUsersContainer}>
        <div>NAVBAR</div>
        <div className={styles.mainManagerUsers}>
          <div className={styles.addUserBtnAndTitle}>
            <button className={styles.addUserBtn} id="addUser">
              Ajouter un collaborateur
            </button>
            <div className={styles.title}>Gestion des utilisateurs</div>
          </div>
          <div className={styles.allUsersContainer}>
            <User />
          </div>
          <button className={styles.backBtn} id="">
            Retour à la page d'accueil
          </button>
        </div>
      </div>
    </>
  );
}

export default ManageUsers;
