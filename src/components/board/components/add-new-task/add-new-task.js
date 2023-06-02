import Modal from "react-modal";
import { useState, useRef } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { setShowNewTaskPopup } from "../../../../redux/tasks";
import { statuses } from "../../../../data/statuses";
import statusesEnum from "../../../../data/statuses";

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

import "./add-new-task.scss";

const initialSubtask = {
  id: 0,
  name: "",
  checked: false,
};

export default function AddNewTask() {
  const showNewTaskPopup = useSelector((state) => state.tasks.showNewTaskPopup);
  const theme = useSelector((state) => state.layout.theme);
  const activeBoard = useSelector((state) => state.boards.activeBoard);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(statusesEnum.TODO);
  const [subtasks, setSubtasks] = useState([initialSubtask]);
  const [errors, setErrors] = useState({
    title: null,
    description: null,
    status: null,
  });
  const modalStyles = usePopupStyles();
  const dispatch = useDispatch();

  function onCloseModal() {
    dispatch(setShowNewTaskPopup(false));
  }

  function onTitleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
    setErrors((prevState) => ({
      ...prevState,
      title: null,
    }));
  }

  function onDescriptionChange(e) {
    e.preventDefault();
    setDescription(e.target.value);
    setErrors((prevState) => ({
      ...prevState,
      description: null,
    }));
  }

  function onStatusChange(e) {
    e.preventDefault();
    setStatus(e.target.value);
    setErrors((prevState) => ({
      ...prevState,
      status: null,
    }));
  }

  function onAddNewSubtask() {
    setSubtasks((prevState) => [
      ...prevState,
      { ...initialSubtask, id: prevState.length + 1 },
    ]);
  }

  function onSubtaskRemove(subtaskId) {
    setSubtasks((prevState) => prevState.filter(({ id }) => id !== subtaskId));
  }

  function onCreateTask() {}

  return (
    <Modal
      ariaHideApp={false}
      isOpen={showNewTaskPopup}
      onRequestClose={onCloseModal}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={false}
      style={modalStyles}
    >
      <div className={`kanban-popup add-task-popup ${theme}-theme`}>
        <div className="kanban-popup__title">
          <span>Add New Task</span>
          <FontAwesomeIcon
            className="times-icon"
            icon={faTimes}
            size="lg"
            onClick={onCloseModal}
          />
        </div>
        <div className="form-item">
          <div className="form-item__label">Title</div>
          <div
            className={`form-item__textbox ${
              !!errors.title ? "input-invalid" : "input-valid"
            }`}
          >
            <input
              type="text"
              autoFocus={true}
              placeholder="e.g. Take coffee break"
              value={title}
              onChange={onTitleChange}
            />
          </div>
          {!!errors.title && <ErrorInfo message={errors.title} />}
        </div>
        <div className="form-item">
          <div className="form-item__label">Description</div>
          <div
            className={`form-item__textbox ${
              !!errors.description ? "input-invalid" : "input-valid"
            }`}
          >
            <textarea
              type="text"
              autoFocus={true}
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge your batteries a little."
              value={description}
              onChange={onDescriptionChange}
            />
          </div>
          {!!errors.description && <ErrorInfo message={errors.description} />}
        </div>

        <div className="form-item">
          <div className="form-item__label">Subtasks</div>
          {subtasks.map((subtask) => (
            <div key={subtask?.id} className="form-item__textbox subtask-item">
              <input
                type="text"
                autoFocus={true}
                placeholder="e.g. Make coffee"
                value={subtask.name}
              />
              <FontAwesomeIcon
                className="times-icon"
                icon={faTimes}
                size="lg"
                onClick={() => onSubtaskRemove(subtask.id)}
              />
            </div>
          ))}
          <button
            className="add-column-button kanban-button button-default button-100"
            onClick={onAddNewSubtask}
          >
            <FontAwesomeIcon icon={faPlus} /> Add New Subtask
          </button>
        </div>

        <div className="form-item">
          <div className="form-item__label">Status</div>
          <div className="form-item__selectbox">
            <select value={status} onChange={onStatusChange}>
              {activeBoard?.columns.map(({ value }) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-item">
          <button
            className="kanban-button button-primary button-100"
            onClick={onCreateTask}
          >
            <span>Create Task</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
