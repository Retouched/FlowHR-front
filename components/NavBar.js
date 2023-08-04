import styles from "@/styles/NavBar.module.css";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/reducers/user";
import { useRouter } from "next/router";

function NavBar() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/"); // Redirection vers Signin
  };

  const popoverContent = (
    <div className={styles.popoverContent}>
      <div className={styles.optionContainer}>
        <span className="Dashboard">Accueil</span>
      </div>
      {user.role !== "Directeur" && (
        <div className={styles.optionContainer}>
          <span className="Dashboard">Mon Tableau de bord</span>
        </div>
      )}
      {user.role === "RH" && (
        <div className={styles.optionContainer}>
          <span className="Add user">Ajouter un collaborateur</span>
        </div>
      )}
      <div className={styles.optionContainer}>
        <span className="New hire req">Nouvelle demande d'ambauche</span>
      </div>
      <div className={styles.optionContainer} onClick={() => handleLogout()}>
        <span className="Logout">Deconnexion</span>
      </div>
    </div>
  );

  return (
    <nav className={styles.navBar}>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
      <Popover placement="topRight" content={popoverContent} trigger="click">
        <Button
          style={{
            color: "black",
            backgroundColor: "#018786",
            border: "none",
            display: "flex",
          }}
        >
          <FontAwesomeIcon icon={faUser} className={styles.userIcon} />

          {user.lastname}
          <FontAwesomeIcon icon={faCaretDown} className={styles.userArrow} />
        </Button>
      </Popover>
    </nav>
  );
}

export default NavBar;
