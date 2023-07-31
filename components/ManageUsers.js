import styles from "../styles/ManageUsers.module.css";
import User from "./User";

function ManageUsers() {
  fetch("");

  return (
    <>
      <div>NAVBAR</div>
      <div>Gestion des utilisateurs</div>
      <div>Liste des users</div>
      <div className={styles.allUsersContainer}>
        <User />
      </div>
    </>
  );
}

export default ManageUsers;
