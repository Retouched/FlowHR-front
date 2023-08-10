import RequestContractCard from "@/components/RequestContractCard";
import styles from "@/styles/detailedDemand.module.css";
import RequestDetailsCard from "@/components/RequestDetailsCard";
import RequestWageCard from "@/components/RequestWageCard";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@/components/Modal";
import useToggle from "@/components/use-toggle";

function DetailedDemandPage() {
  //Prend les valeurs dans le store de l'user
  const user = useSelector((state) => state.user.value);

  //Ouvre et ferme les modal
  const [isModalAcceptOpen, toggleIsModalAcceptOpen] = useToggle(false);
  const [isModalRefuseOpen, toggleIsModalRefuseOpen] = useToggle(false);

  const router = useRouter();
  const { id } = router.query;

  //Recupère les données de la hireRequest dans le back
  const [hireRequestData, setHireRequestData] = useState(null);
  console.log(hireRequestData);

  //recupère le comment écrit par le user dans le textarea
  const [comment, setComment] = useState("");

  //Au clique dans la modale pour laissé un commentaire et REFUSER la demande
  const handleRefuseAndComment = async () => {
    //ici sera stocké les données du comment et du changement du status selon le job
    // qui seront envoyées dans le back
    const jobSpecificUpdate = {};

    //condition pour stocker les données dans jobSpecificUpdate selon le job
    if (user.job === "PDG") {
      jobSpecificUpdate.pdgComment = comment;
      jobSpecificUpdate.pdgRequestStatus = 0; //<--0 = refusé
    } else if (user.job === "DIRECTEUR POLE") {
      jobSpecificUpdate.dpComment = comment;
      jobSpecificUpdate.dpRequestStatus = 0;
    } else if (user.job === "DIRECTEUR POLE RH") {
      jobSpecificUpdate.drhComment = comment;
      jobSpecificUpdate.drhRequestStatus = 0;
    } else if (user.job === "DIRECTEUR POLE ADMIN ET FINANCES") {
      jobSpecificUpdate.dafComment = comment;
      jobSpecificUpdate.dafRequestStatus = 0;
    }

    //envoie de jobSpecificUpdate dans le back pour METTRE A JOUR
    //les données (comment et requestStatus)
    fetch(`http://localhost:3000/hireRequests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobSpecificUpdate),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.result);
          // ferme la modal
          toggleIsModalRefuseOpen();
          router.push(`/dashboard/directeur`);
        }
      });
  };
  //Au clique dans la modale pour laissé un commentaire et ACCEPTER la demande
  const handleAcceptAndComment = async () => {
    const jobSpecificUpdate = {};

    if (user.job === "PDG") {
      jobSpecificUpdate.pdgComment = comment;
      jobSpecificUpdate.pdgRequestStatus = 2; //<--2 = accepté
    } else if (user.job === "DIRECTEUR POLE") {
      jobSpecificUpdate.dpComment = comment;
      jobSpecificUpdate.dpRequestStatus = 2;
    } else if (user.job === "DIRECTEUR POLE RH") {
      jobSpecificUpdate.drhComment = comment;
      jobSpecificUpdate.drhRequestStatus = 2;
    } else if (user.job === "DIRECTEUR POLE ADMIN ET FINANCES") {
      jobSpecificUpdate.dafComment = comment;
      jobSpecificUpdate.dafRequestStatus = 2;
    }
    fetch(`http://localhost:3000/hireRequests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobSpecificUpdate),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // ferme la modal
          toggleIsModalAcceptOpen();
          router.push(`/dashboard/directeur`);
        }
      });
  };

  //si on a la bon id dans le query (query = apres le ? dans la barre d'adresse)
  //alors on va chercher les données de l'hireRequest avec cet id
  //[id] pour faire un "cleanup" et ne pas aller chercher les données tout le temps mais uniquement quand l'id change
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/hireRequests/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setHireRequestData(data);
        });
    }
  }, [id]);

  console.log(hireRequestData?.hireRequest?.pdgRequestStatus);

  return (
    <div className={styles.main}>
      <NavBar />

      {/* MODAL POUR ACCEPTER */}
      {isModalAcceptOpen && (
        <Modal
          title="AcceptHireRequest"
          handleDismiss={toggleIsModalAcceptOpen}
        >
          <div className={styles.containerModal}>
            <span className={styles.title}>
              Vous pouvez laisser un commentaire:
            </span>
            <textarea
              rows="8"
              className={styles.comment}
              placeholder="Commentaire"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className={styles.modalBtnContainer}>
              <button
                className={styles.btnBack}
                onClick={toggleIsModalAcceptOpen}
              >
                Retour
              </button>
              <button
                className={styles.btnAccept}
                onClick={handleAcceptAndComment}
              >
                Accepter et laisser un commentaire
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL POUR REFUSER */}
      {isModalRefuseOpen && (
        <Modal
          title="RefuseHireRequest"
          handleDismiss={toggleIsModalRefuseOpen}
        >
          <div className={styles.containerModal}>
            <span className={styles.title}>
              Vous pouvez laisser un commentaire:
            </span>
            <textarea
              className={styles.comment}
              placeholder="Commentaire"
              rows="8"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className={styles.modalBtnContainer}>
              <button
                className={styles.btnBack}
                onClick={toggleIsModalRefuseOpen}
              >
                Retour
              </button>
              <button
                className={styles.btnRefuse}
                onClick={handleRefuseAndComment}
              >
                Refuser et laisser un commentaire
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className={styles.container}>
        {/* SI ON A BIEN LES DONNEES DU BACK, ON AFFICHE */}
        {hireRequestData && (
          <>
            <div className={styles.content}>
              <div className={styles.detailsCard}>
                {/* ON DISTIBUE LES DONNEES DE hireRequestData DANS LA CARD */}
                <RequestDetailsCard data={hireRequestData} hideButtons={true} />
              </div>
              <div className={styles.contractCard}>
                <RequestContractCard
                  data={hireRequestData}
                  // ON CACHE LES BOUTON DE CONFIRMATION, PRECEDENT ET SUIVANT
                  hideButtons={true}
                />
              </div>
              <div className={styles.wageCard}>
                <RequestWageCard data={hireRequestData} hideButtons={true} />
              </div>
            </div>
            <div className={styles.containerBtns}>
              <button
                className={styles.btnBack}
                onClick={() => {
                  router.push(`/dashboard/${user.role.toLowerCase()}`);
                }}
              >
                RETOUR
              </button>
              <div className={styles.rightBtns}>
                {/* CONDITION POUR SOIT AFFICHER LES BOUTONS SOIT LE 
                COMMENTAIRE LAISSÉ SELON SI C'EST DANS DONE OU UNDONE ET SELON LE JOB */}
                {user.job === "DIRECTEUR POLE" &&
                hireRequestData.hireRequest.dpRequestStatus !== 1 ? (
                  <div className={styles.commentDisplay}>
                    <span className={styles.commentText}>
                      {hireRequestData.hireRequest.dpComment}
                    </span>
                  </div>
                ) : user.job === "DIRECTEUR POLE RH" &&
                  hireRequestData.hireRequest.drhRequestStatus !== 1 ? (
                  <div className={styles.commentDisplay}>
                    <span className={styles.commentText}>
                      {hireRequestData.hireRequest.drhComment}
                    </span>
                  </div>
                ) : user.job === "DIRECTEUR POLE ADMIN ET FINANCES" &&
                  hireRequestData.hireRequest.dafRequestStatus !== 1 ? (
                  <div className={styles.commentDisplay}>
                    <span className={styles.commentText}>
                      {hireRequestData.hireRequest.dafComment}
                    </span>
                  </div>
                ) : user.job === "PDG" &&
                  hireRequestData.hireRequest.pdgRequestStatus !== 1 ? (
                  <div className={styles.commentDisplay}>
                    <span className={styles.commentText}>
                      {hireRequestData.hireRequest.pdgComment}
                    </span>
                  </div>
                ) : (
                  ((user.job === "PDG" &&
                    hireRequestData.hireRequest.pdgRequestStatus === 1) ||
                    (user.job === "DIRECTEUR POLE ADMIN ET FINANCES" &&
                      hireRequestData.hireRequest.dafRequestStatus === 1) ||
                    (user.job === "DIRECTEUR POLE RH" &&
                      hireRequestData.hireRequest.drhRequestStatus === 1) ||
                    (user.job === "DIRECTEUR POLE" &&
                      hireRequestData.hireRequest.dpRequestStatus === 1)) && (
                    <>
                      <button
                        className={styles.btn}
                        id="Refuse and comment"
                        onClick={toggleIsModalRefuseOpen}
                      >
                        REFUSER ET LAISSER UN COMMENTAIRE
                      </button>
                      <button
                        className={styles.btn}
                        id="Accept and comment"
                        onClick={toggleIsModalAcceptOpen}
                      >
                        ACCEPTER ET LAISSER UN COMMENTAIRE
                      </button>
                    </>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailedDemandPage;
