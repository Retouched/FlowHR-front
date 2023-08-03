import NavBar from "./NavBar";
import RequestDetailsCard from "./RequestDetailsCard";
import BtnCancelComponent from "./BtnCancel";
import BtnNextComponent from "./BtnNext";

function RequestDetails() {
  return (
    <div>
      <NavBar />
      <div>INSERER LA PROGRESSION</div>
      <RequestDetailsCard />
      <BtnCancelComponent />
      <BtnNextComponent />
    </div>
  );
}

export default RequestDetails;
