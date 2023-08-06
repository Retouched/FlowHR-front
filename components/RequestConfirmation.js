import styles from "../styles/RequestConfirmation.module.css";
import NavBar from "./NavBar";
import RequestContractCard from "./RequestContractCard";
import RequestDetailsCard from "./RequestDetailsCard";
import RequestWageCard from "./RequestWageCard";

function RequestConfirmation() {
  return (
    <div className={styles.main}>
      <NavBar />
      <div>INSERER LA PROGRESSION</div>
      <div className={styles.cardsContainer}>
        <div className={styles.detailsCard}>
          <RequestDetailsCard />
        </div>
        <div className={styles.contractCard}>
          <RequestContractCard />
        </div>
        <div className={styles.wageCard}>
          <RequestWageCard />
        </div>
      </div>
    </div>
  );
}

export default RequestConfirmation;
