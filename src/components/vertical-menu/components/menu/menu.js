import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import AddNewBoard from "../../../board/components/add-new-board/add-new-board";

import {
  setActiveBoard,
  setNewBoardPopupVisibility,
} from "../../../../redux/boards";

import "./menu.scss";

export default function Menu() {
  const boards = useSelector((state) => state.boards.data);
  const activeBoard = useSelector((state) => state.boards.activeBoard);
  const dispatch = useDispatch();

  function onBoardSelected(e, board) {
    e.preventDefault();

    dispatch(setActiveBoard(board));
  }

  function onAddNewBoardClick(e) {
    e.preventDefault();

    dispatch(setNewBoardPopupVisibility(true));
  }

  useEffect(() => {
    if (!activeBoard) {
      dispatch(setActiveBoard(boards[0]));
    }
  }, [activeBoard, boards, dispatch]);

  return (
    <div className="kanban-menu">
      <div className="kanban-menu__summary">ALL BOARDS ({boards.length})</div>
      <ul className="kanban-menu__list">
        {boards.map((board) => (
          <li
            key={board.id}
            className={`menu-item ${
              activeBoard?.id === board.id ? "active" : "inactive"
            }`}
            onClick={(e) => onBoardSelected(e, board)}
          >
            <FontAwesomeIcon icon={faTableList} />
            <span>{board.name}</span>
          </li>
        ))}
        <li className="menu-item add-board" onClick={onAddNewBoardClick}>
          <FontAwesomeIcon icon={faTableList} />
          <span>+ Create New Board</span>
        </li>
      </ul>
      <AddNewBoard />
    </div>
  );
}
