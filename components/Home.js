import styles from "../styles/Home.module.css";
import useToggle from "./use-toggle";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "./Modal";
import { login, logout } from "../reducers/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [isModalSignUpOpen, toggleIsModalSignUpOpen] = useToggle(false);
  const [isModalSignInOpen, toggleIsModalSignInOpen] = useToggle(false);
  const [signInLastname, setSignInLastname] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [isUserExisting, setIsUserExisting] = useState(false);
  const [isSignInError, setIsSignInError] = useState(false);

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastname: signInLastname,
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ lastname: signInLastname, token: data.token }));
          setSignInLastname("");
          setSignInEmail("");
          setSignInPassword("");
          setIsSignInError(false);
          if (data.role === "Manager") {
            router.push("/HomeManager"); // Redirection vers /HomeManager si rôle = manager
          } else if (data.role === "RH") {
            router.push("/HomeRH"); // Redirection vers /HomeRH si rôle = RH
          } else if (data.role === "Directeur") {
            router.push("/HomeDirecteur"); // Redirection vers /HomeDirecteur si rôle = directeur
          }
        } else {
          setIsSignInError(true); // Nom d'utilisateur ou mot de passe incorrect ou inexistant
        }
      });
  };
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.upperPanel}></div>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <span className={styles.inputTitle}></span>
            <input className={styles.input} placeholder="Dupon"></input>
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.inputTitle}></span>
            <input
              className={styles.input}
              placeholder="exemple@entreprise.fr"
            ></input>
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.inputTitle}></span>
            <input
              className={styles.input}
              placeholder="mot de passe à 8 caractères"
            ></input>
            {isSignInError && (
              <span className={styles.error}>
                Le nom, l'e-mail ou le mot de passe sont inccorect.
              </span>
            )}
          </div>
          <button className={styles.buttonConnexion}></button>
          <span></span>
        </div>
      </main>
    </div>
  );
}

export default Home;
