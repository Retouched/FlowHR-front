import styles from "../styles/RequestRedirection.module.css";
import NavBar from "./NavBar";

import { useRouter } from "next/router";

function RequestRedirection() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <NavBar />
      <div className={styles.imageAndTexts}>
        <img src="/smiley.png" alt="Smiley" className={styles.smiley} />
        <h1>DEMANDE ENREGISTREE !</h1>
        <span>
          N'hésitez pas à consulter votre tableau de bord afin de suivre le
          traitement de votre demande par les différents acteurs !
        </span>
        <div className={styles.btnContainer}>
          <button className={styles.btn}>Consulter mon tableau de bord</button>
          <span>ou</span>
          <button className={styles.btn}>Effectuer une autre demande</button>
        </div>
      </div>
    </div>
  );
}

export default RequestRedirection;
