import loader from "../../assets/images/loader.gif";
import "./loader.scss";

export default function Loader({ message }) {
  return (
    <div className="kanban-loader">
      <img src={loader} alt={message} />
      {!!message && <div className="message">{message || "Loading..."}</div>}
    </div>
  );
}
