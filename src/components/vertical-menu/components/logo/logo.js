import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./logo.scss";

export default function Logo() {
  return (
    <div className="kanban-logo">
      <FontAwesomeIcon icon={faBars} transform={{ rotate: 90 }} />
      <span>kanban</span>
    </div>
  );
}
