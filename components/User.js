import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/User.module.css";

function User(props) {
  // AU CLIC SUR LA CROIX ON SUPPRIME UN COLLABORATEUR DE LA BDD
  const handleDelete = (email) => {
    console.log("email: ", email);
    fetch("http://localhost:3000/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: props.email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

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
            <div>{props.role.roleName}</div>
            <button>Mettre à jour son rôle</button>
          </div>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className={styles.circleXmark}
            onClick={() => handleDelete(props.email)}
          />
        </div>
      </div>
    </>
  );
}

export default User;
