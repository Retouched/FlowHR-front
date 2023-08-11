import styles from "@/styles/Home.module.css";
import useToggle from "./use-toggle";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "./Modal";
import { login, logout } from "@/reducers/user";
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
  const [isSignInError, setIsSignInError] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleConnection();
    }
  };

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
        console.log(data);
        if (data.result) {
          dispatch(
            login({
              lastname: signInLastname,
              firstname: data.firstname,
              email: signInEmail,
              token: data.token,
              departement: data.departementName,
              job: data.job.jobName,
              role: data.role.roleName,
            })
          );
          setSignInLastname("");
          setSignInEmail("");
          setSignInPassword("");
          setIsSignInError(false);
          if (data.role.roleName === "Manager") {
            router.push("/dashboard/manager"); // Redirection vers /HomeManager si rôle = manager
          } else if (data.role.roleName === "RH") {
            router.push("/dashboard/rh"); // Redirection vers /HomeRH si rôle = RH
          } else if (data.role.roleName === "Directeur") {
            router.push("/dashboard/directeur"); // Redirection vers /HomeDirecteur si rôle = directeur
          }
        } else {
          setIsSignInError(true); // Nom d'utilisateur ou mot de passe incorrect ou inexistant
        }
      });
  };

  // useEffect(() => {
  //   if (user.token && user.role === "Manager") {
  //     router.push("/dashboard/manager");
  //   } else if (user.token && user.role === "RH") {
  //     router.push("/dashboard/rh");
  //   } else if (user.token && user.role === "Directeur") {
  //     router.push("/dashboard/directeur");
  //   }
  // }, []);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.upperPanel}>
          <Image
            className={styles.logo}
            style={{ backgroundColor: "transparent" }}
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className={styles.title}>FlowHR</h1>
        </div>
        <div className={styles.containerBackground}>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <span className={styles.inputTitle}>Nom</span>
              <input
                className={styles.input}
                placeholder="Dupon"
                type="text"
                id="signInLastname"
                onChange={(e) => setSignInLastname(e.target.value)}
                onKeyDown={handleKeyDown} //quand on press "enter" on lance handleConnection
                value={signInLastname}
              ></input>
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputTitle}>Adresse e-mail</span>
              <input
                className={styles.input}
                placeholder="exemple@entreprise.fr"
                type="email"
                id="signInEmail"
                onChange={(e) => setSignInEmail(e.target.value)}
                onKeyDown={handleKeyDown} //quand on press "enter" on lance handleConnection
                value={signInEmail}
              ></input>
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputTitle}>Mot de passe</span>
              <input
                className={styles.input}
                placeholder="mot de passe à 8 caractères"
                type="password"
                id="signInPassword"
                onChange={(e) => setSignInPassword(e.target.value)}
                onKeyDown={handleKeyDown} //quand on press "enter" on lance handleConnection
                value={signInPassword}
              ></input>
              {isSignInError && (
                <span className={styles.error}>
                  Le nom, l'e-mail ou le mot de passe sont incorrects.
                </span>
              )}
            </div>
            <button
              className={styles.buttonConnection}
              id="connect"
              onClick={() => handleConnection()}
            >
              Connexion
            </button>
            <span></span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
