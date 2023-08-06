import styles from "../styles/RequestConfirmation.module.css";
import NavBar from "./NavBar";
import RequestContractCard from "./RequestContractCard";
import RequestDetailsCard from "./RequestDetailsCard";
import RequestWageCard from "./RequestWageCard";
import { useRouter } from "next/router";

import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";
import BtnBack from "./BtnBack";
import BtnConfirmComponent from "./BtnConfirm";

function RequestConfirmation() {
  const router = useRouter();

  const handleFinalSubmit = () => {
    router.push("/requestRedirection");
  };

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
      <div className={styles.btnContainer}>
        <span>
          <BtnCancelComponent />
        </span>
        <span>
          <BtnBack />
        </span>
        <span onClick={() => handleFinalSubmit()}>
          <BtnConfirmComponent />
        </span>
      </div>
    </div>
  );
}

export default RequestConfirmation;
