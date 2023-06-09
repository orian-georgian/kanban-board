import ToggleSidebar from "../toggle-sidebar/toggle-sidebar";
import Logo from "../logo/logo";
import VerticalMenu from "../vertical-menu/vertical-menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsisV,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

import { setShowNewTaskPopup } from "../../redux/tasks";
import { toggleSidebar } from "../../redux/layout";

import useDimensions from "../../hooks/use-dimensions";
import { useSelector, useDispatch } from "react-redux";

import "./top-bar.scss";

export default function TopBar() {
  const activeBoard = useSelector((state) => state.boards.activeBoard);
  const isSideBarVisible = useSelector(
    (state) => state.layout.isSideBarVisible
  );
  const loading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();
  const { isMobileView } = useDimensions();

  function onShowAddTaskPopup() {
    dispatch(setShowNewTaskPopup(true));
  }

  function onToggleMenu(event) {
    event.stopPropagation(true);

    dispatch(toggleSidebar());
  }

  return (
    <header className="top-bar">
      {isMobileView && <Logo hasText={false} />}
      <div className="top-bar__name">{activeBoard?.name}</div>
      {isMobileView && (
        <FontAwesomeIcon
          onClick={onToggleMenu}
          className="top-bar__arrow-icon"
          icon={isSideBarVisible ? faChevronUp : faChevronDown}
          size="lg"
        />
      )}
      {isMobileView && isSideBarVisible && (
        <div className="top-bar__mobile-menu">
          <VerticalMenu showLogo={false} />
        </div>
      )}
      {!isSideBarVisible && !isMobileView && <ToggleSidebar />}
      {!loading && (
        <button
          className="top-bar__add-button kanban-button button-primary"
          onClick={onShowAddTaskPopup}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add New Task</span>
        </button>
      )}
      {!loading && (
        <FontAwesomeIcon className="ellipses-icon" icon={faEllipsisV} />
      )}
    </header>
  );
}
