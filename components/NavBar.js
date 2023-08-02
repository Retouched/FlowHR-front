import styles from "../styles/NavBar.module.css";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((state) => state.user.value);

  const popoverContent = (
    <>
      <div className={styles.popoverContent}>Mon tableau de bord</div>
      {user.role === "RH" && (
        <div className={styles.popoverContent}>Ajouter un collaborateur</div>
      )}
      <div className={styles.popoverContent}>Nouvelle demande d'ambauche</div>
      <div className={styles.popoverContent}>Deconnexion</div>
    </>
  );

  return (
    <nav className={styles.navBar}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.dropdownContainer}>
        <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
        <Popover
          placement="topRight"
          title="User Menu"
          content={popoverContent}
          className={styles.popover}
          trigger="click"
        >
          <Button
            style={{
              color: "black",
              backgroundColor: "inherit",
              border: "none",
            }}
          >
            {user.lastname}
          </Button>
          <FontAwesomeIcon icon={faCaretDown} className={styles.userArrow} />
        </Popover>
      </div>
    </nav>
  );
}

export default NavBar;
