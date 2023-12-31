import styles from "@/styles/HomeDirector.module.css";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import CardDirectorDone from "./CardDirectorDone";
import CardDirectorUndone from "./CardDirectorUndone";

function HomeDirector() {
  const user = useSelector((state) => state.user.value);

  const items = [
    {
      key: "1",
      label: "À traiter",
      children: <CardDirectorUndone />,
    },
    {
      key: "2",
      label: "Traité",
      children: <CardDirectorDone />,
    },
  ];

  const onChange = (key) => {};

  return (
    <div>
      <main className={styles.main}>
        <NavBar />
        <h1 className={styles.welcome}>Bienvenue {user.lastname} </h1>
        <div className={styles.Container}>
          <div className={styles.componentsContainer}>
            <span className={styles.title}>Demandes d'autorisation</span>
            <Tabs
              defaultActiveKey="1"
              items={items}
              type="card"
              className={styles.tabs}
              onChange={onChange}
              tabBarStyle={{
                backgroundColor: "#018786",
                borderRadius: "15px 15px 0 0",
              }}
            />
          </div>
          {/* FONCTION FUTURE POUR FAIRE UNE DEMANDE D'ÉVOLUTION */}
          {/* <div className={styles.componentsContainer}>
            <span className={styles.title}>Demandes d'évolution</span>
          </div> */}
        </div>
      </main>
    </div>
  );
}

export default HomeDirector;
