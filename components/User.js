import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/User.module.css";

function User(props) {
  return (
    <>
      <div className={styles.userContainer}>
        <div>PHOTO</div>
        <div className={styles.detailsUser}>
          {props.firstname} {props.lastname} {props.email}{" "}
          {props.department.departmentName}
        </div>
        <div className={styles.roleBtnAndXmark}>
          <div className={styles.roleAndUpdateStatusBtnContainer}>
            <div>{props.role}</div>
            <button>Mettre à jour son rôle</button>
          </div>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className={styles.circleXmark}
          />
        </div>
      </div>
    </>
  );
}

export default User;
