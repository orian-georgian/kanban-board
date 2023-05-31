import Modal from "react-modal";
import { useState, useRef } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  setNewBoardPopupVisibility,
  addNewBoard,
  setActiveBoard,
} from "../../../../redux/boards";
import { statuses } from "../../../../data/statuses";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorInfo from "../../../error-info/error-info";
import {
  faCircle,
  faTimes,
  faPlus,
  faSave,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import usePopupStyles from "../../../../hooks/use-popup-styles";

import "./add-new-board.scss";

export default function AddNewBoard() {
  const showNewBoardPopup = useSelector(
    (state) => state.boards.showNewBoardPopup
  );
  const theme = useSelector((state) => state.layout.theme);
  const boards = useSelector((state) => state.boards.data);
  const [name, setName] = useState("");
  const [columns, setColumns] = useState(statuses);
  const [addModeActive, setAddModeActive] = useState(false);
  const [color, setColor] = useState("#ffff00");
  const [columnName, setColumnName] = useState("");
  const [errors, setErrors] = useState({ name: null, columnName: null });
  const modalStyles = usePopupStyles();
  const dispatch = useDispatch();
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (position) => {
    dragItem.current = position;
  };

  const dragEnter = (position) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    const copyListItems = [...columns];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setColumns(copyListItems);
  };

  function resetNewColumn() {
    setAddModeActive(false);
    setColor("#ffff00");
    setColumnName("");
    setErrors((prevState) => ({
      ...prevState,
      columnName: null,
    }));
  }

  function resetStates() {
    setName("");
    setColumns(statuses);
    setErrors((prevState) => ({
      ...prevState,
      name: null,
    }));
    resetNewColumn();
  }

  function onCloseModal() {
    dispatch(setNewBoardPopupVisibility(false));
    resetStates();
  }

  function onNameChange(e) {
    e.preventDefault();
    setName(e.target.value);
    setErrors((prevState) => ({
      ...prevState,
      name: null,
    }));
  }

  function onColumnNameChange(e) {
    e.preventDefault();
    setColumnName(e.target.value);
    setErrors((prevState) => ({
      ...prevState,
      columnName: null,
    }));
  }

  function onColorChange(e) {
    e.preventDefault();
    setColor(e.target.value);
  }

  function onColumnRemove(e, column) {
    e.preventDefault();

    setColumns((prevState) =>
      prevState.filter(({ value }) => value !== column)
    );
  }

  function onAddNewColumn(e) {
    e.preventDefault();

    setAddModeActive(true);
  }

  function validateField(field, fieldName) {
    if (!field) {
      setErrors((prevState) => ({
        ...prevState,
        [fieldName]: "Column name is required",
      }));

      return false;
    }

    if (field.length > 50) {
      setErrors((prevState) => ({
        ...prevState,
        [fieldName]: "The maximum number of characters is 50",
      }));

      return false;
    }

    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: null,
    }));

    return true;
  }

  function onSave(e) {
    e.preventDefault();

    const isValid = validateField(columnName, "columnName");

    if (!isValid) {
      return;
    }

    setColumns((prevState) => [
      ...prevState,
      { value: columnName?.toUpperCase(), color },
    ]);
    resetNewColumn();
  }

  function onCancel(e) {
    e.preventDefault();

    resetNewColumn();
  }

  function onCreateNewBoard(e) {
    e.preventDefault();

    const isValid = validateField(name, "name");

    if (!isValid) {
      return;
    }

    const newBoard = {
      id: boards.length + 1,
      name,
      columns,
    };

    batch(() => {
      dispatch(addNewBoard(newBoard));
      dispatch(setActiveBoard(newBoard));
      dispatch(setNewBoardPopupVisibility(false));
    });
    resetStates();
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={showNewBoardPopup}
      onRequestClose={onCloseModal}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={false}
      style={modalStyles}
    >
      <div className={`kanban-popup create-board-popup ${theme}-theme`}>
        <div className="kanban-popup__title">
          <span>Create New Board</span>
          <FontAwesomeIcon
            className="close-icon"
            icon={faTimes}
            size="lg"
            onClick={onCloseModal}
          />
        </div>
        <div className="form-item">
          <div className="form-item__label">Name</div>
          <div
            className={`form-item__textbox ${
              !!errors.name ? "input-invalid" : "input-valid"
            }`}
          >
            <input
              type="text"
              autoFocus={true}
              placeholder="e.g. Department Store"
              value={name}
              onChange={onNameChange}
            />
          </div>
          {!!errors.name && <ErrorInfo message={errors.name} />}
        </div>

        <div className="form-item">
          <div className="form-item__label">Columns</div>
          <div className="form-item__textbox">
            {columns.map(({ value, color }, index) => (
              <div
                className="board-column"
                key={value}
                draggable={true}
                onDragStart={() => dragStart(index)}
                onDragEnter={() => dragEnter(index)}
                onDragEnd={drop}
              >
                <FontAwesomeIcon icon={faCircle} color={color} size="xs" />
                <span>{value}</span>
                {!statuses.find((status) => status.value === value) && (
                  <FontAwesomeIcon
                    icon={faTimes}
                    color="#8e96a3"
                    size="lg"
                    onClick={(e) => onColumnRemove(e, value)}
                  />
                )}
              </div>
            ))}
          </div>
          {!addModeActive && (
            <button
              className="add-column-button kanban-button button-default button-100"
              onClick={onAddNewColumn}
            >
              <FontAwesomeIcon icon={faPlus} /> Add New Column
            </button>
          )}
          {addModeActive && (
            <div className="form-item__multi-inputs">
              <div
                className={`form-item__textbox column-name input-left ${
                  !!errors.columnName ? "input-invalid" : "input-valid"
                }`}
              >
                <input
                  type="text"
                  autoFocus={true}
                  placeholder="e.g. Testing"
                  value={columnName}
                  onChange={onColumnNameChange}
                />
              </div>
              <div
                className={`form-item__colorbox input-right ${
                  !!errors.columnName ? "input-invalid" : "input-valid"
                }`}
              >
                <input type="color" value={color} onChange={onColorChange} />
              </div>
            </div>
          )}
          {addModeActive && !!errors.columnName && (
            <ErrorInfo message={errors.columnName} />
          )}
          {addModeActive && (
            <div className="form-item__multi-buttons">
              <button
                className="save-button kanban-button button-primary button-left button-50"
                onClick={onSave}
              >
                <FontAwesomeIcon icon={faSave} />
                <span>Save</span>
              </button>
              <button
                className="save-button kanban-button button-default button-right button-50"
                onClick={onCancel}
              >
                <span>Cancel</span>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          )}
        </div>
        <div className="form-item">
          <button
            className="kanban-button button-primary button-100"
            disabled={addModeActive}
            onClick={onCreateNewBoard}
          >
            <FontAwesomeIcon icon={faTableList} />
            <span>Create New Board</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
