import styles from "@/styles/HomeDirector.module.css";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import CardDirector from "./CardDirector";

const { TabPane } = Tabs;

function HomeDirector() {
  const user = useSelector((state) => state.user.value);

  // RECUPERATION DES POLES POUR INSERTION DANS UNE LISTE
  // useEffect(() => {
  //   fetch("http://localhost:3000/departments")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDepartments(data.allDepartments);
  //     });
  // }, []);

  return (
    <div>
      <main className={styles.main}>
        <NavBar />
        <h1 className={styles.welcome}>Bienvenue {user.lastname} </h1>
        <div className={styles.Container}>
          <div className={styles.leftContainer}>
            <span className={styles.title}>Demandes d'autorisation</span>
            <Tabs defaultActiveKey="1" type="card" className={styles.tabs}>
              <TabPane tab="A traiter" key="1" className={styles.tab1}>
                <CardDirector />
              </TabPane>
              <TabPane tab="Traité" key="2" className={styles.tab2}>
                <p>Tab content for "Traité" goes here.</p>
              </TabPane>
            </Tabs>
          </div>
          <div className={styles.rightContainer}>
            <span className={styles.title}>Demandes d'évolution</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomeDirector;
