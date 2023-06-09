import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

import { toggleSidebar } from "../../redux/layout";

import "./toggle-sidebar.scss";

export default function ToggleSidebar() {
  const isSideBarVisible = useSelector(
    (state) => state.layout.isSideBarVisible
  );
  const dispatch = useDispatch();
  const label = isSideBarVisible ? "Hide Sidebar" : "Show Sidebar";

  function onToggleSidebar() {
    dispatch(toggleSidebar());
  }

  return (
    <div className="kanban-toggle-sidebar" onClick={onToggleSidebar}>
      <FontAwesomeIcon icon={isSideBarVisible ? faEyeSlash : faEye} size="1x" />
      <span>{label}</span>
    </div>
  );
}
