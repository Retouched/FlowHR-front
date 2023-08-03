import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/User.module.css";

function User(props) {
  //INVERSE DATA FLOW AFIN D'UTILISER LA FONCTION HANDLE DELETE
  const handleClickOnXmark = () => {
    props.handleDelete(props.email);
  };

  return (
    <>
      <div className={styles.userContainer}>
        <div>AVATAR</div>
        <div className={styles.detailsUser}>
          {props.firstname} {props.lastname} {props.email}{" "}
          {props.department.departmentName}
        </div>
        <div className={styles.roleBtnAndXmark}>
          <div className={styles.roleAndUpdateStatusBtnContainer}>
            <div>{props.role.roleName}</div>
            <button>Mettre à jour son rôle</button>
          </div>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className={styles.circleXmark}
            onClick={() => handleClickOnXmark()}
          />
        </div>
      </div>
    </>
  );
}

export default User;
