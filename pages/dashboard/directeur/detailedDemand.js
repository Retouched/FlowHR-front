import RequestContractCard from "@/components/RequestContractCard";
import styles from "@/styles/RequestConfirmation.module.css";
import RequestDetailsCard from "@/components/RequestDetailsCard";
import RequestWageCard from "@/components/RequestWageCard";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function DetailedDemandPage() {
  const router = useRouter();
  const { id } = router.query;
  const [hireRequestData, setHireRequestData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/hireRequests/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setHireRequestData(data);
        });
    }
  }, [id]);

  return (
    <div className={styles.main}>
      <NavBar />
      <div>INSERER LA PROGRESSION</div>
      <div className={styles.cardsContainer}>
        {hireRequestData && (
          <>
            <div className={styles.detailsCard}>
              <RequestDetailsCard data={hireRequestData} hideButtons={true} />
            </div>
            <div className={styles.contractCard}>
              <RequestContractCard data={hireRequestData} hideButtons={true} />
            </div>
            <div className={styles.wageCard}>
              <RequestWageCard data={hireRequestData} hideButtons={true} />
            </div>
          </>
        )}
      </div>
      <div className={styles.btnContainer}>
        {/* <span>
          <BtnBack />
        </span> */}
        {/* <span onClick={() => handleFinalSubmit()}>
        </span> */}
      </div>
    </div>
  );
}

export default DetailedDemandPage;
