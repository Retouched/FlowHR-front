import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/User.module.css";

function User() {
  return (
    <>
      <div className={styles.userContainer}>
        <div>PHOTO</div>
        <div className={styles.detailsUser}>
          Prénom NOM / email / Pole / Poste
        </div>
        <div className={styles.roleBtnAndXmark}>
          <div className={styles.roleAndUpdateStatusBtnContainer}>
            <div>Role</div>
            <div>Button</div>
          </div>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={styles.circleXmark}
          />
        </div>
      </div>
    </>
  );
}

export default User;
