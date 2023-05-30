import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import "./error-info.scss";

export default function ErrorInfo({ message }) {
  return (
    <div className="kanban-error">
      <FontAwesomeIcon
        className="kanban-error__icon"
        icon={faTriangleExclamation}
        size="xs"
      />
      <span className="kanban-error__message">{message}</span>
    </div>
  );
}
