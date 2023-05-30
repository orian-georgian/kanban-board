import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import "./top-bar.scss";

export default function TopBar() {
  const activeBoard = useSelector((state) => state.boards.activeBoard);
  const loading = useSelector((state) => state.tasks.loading);

  return (
    <header className="top-bar">
      <div className="top-bar__name">{activeBoard?.name}</div>
      {!loading && (
        <button className="top-bar__add-button kanban-button button-primary">
          <FontAwesomeIcon icon={faPlus} /> Add New Task
        </button>
      )}
      {!loading && (
        <FontAwesomeIcon className="ellipses-icon" icon={faEllipsisV} />
      )}
    </header>
  );
}
