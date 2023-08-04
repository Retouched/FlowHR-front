import styles from "@/styles/HomeHR.module.css";
import NavBar from "./NavBar";

function HomeHR() {
  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.title}>HomeHR</h1>
      </main>
    </div>
  );
}

export default HomeHR;
