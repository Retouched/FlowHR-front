import styles from "../styles/RequestDetails.module.css";
import NavBar from "./NavBar";
import RequestDetailsCard from "./RequestDetailsCard";
import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";

function RequestDetails() {
  return (
    <div className={styles.main}>
      <NavBar />
      <div>INSERER LA PROGRESSION</div>
      <RequestDetailsCard />
    </div>
  );
}

export default RequestDetails;
