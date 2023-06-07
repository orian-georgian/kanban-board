import Modal from "react-modal";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowNewTaskPopup, addTask } from "../../../../redux/tasks";
import statusesEnum from "../../../../data/statuses";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorInfo from "../../../error-info/error-info";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import usePopupStyles from "../../../../hooks/use-popup-styles";
import useForm from "../../../../hooks/useForm";
import validate from "../../../../utils/create-task-form-validations";

import "./add-new-task.scss";

const initialSubtask = {
  id: Date.now(),
  name: "",
  checked: false,
};

const initialState = {
  title: "",
  description: "",
  subtasks: [],
  status: statusesEnum.TODO,
};

export default function AddNewTask() {
  const showNewTaskPopup = useSelector((state) => state.tasks.showNewTaskPopup);
  const theme = useSelector((state) => state.layout.theme);
  const activeBoard = useSelector((state) => state.boards.activeBoard);
  const {
    errors,
    values,
    handleChange,
    handleListItemChange,
    handleSubmit,
    mutateFormState,
    clearError,
    resetForm,
  } = useForm(initialState, createTask, validate);
  const modalStyles = usePopupStyles();
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setShowNewTaskPopup(false));
    resetForm();
  }

  function addNewSubtask() {
    mutateFormState({
      subtasks: [...values.subtasks, { ...initialSubtask, id: Date.now() }],
    });
  }

  function removeSubtask(subtaskId) {
    mutateFormState({
      subtasks: values.subtasks?.filter(({ id }) => id !== subtaskId),
    });
    clearError(`subtasks${subtaskId}`);
  }

  function createTask() {
    dispatch(
      addTask({
        id: Date.now(),
        boardId: activeBoard.id,
        ...values,
      })
    );
    closeModal();
  }

  function initializeModal() {
    mutateFormState({
      subtasks: [{ ...initialSubtask }],
    });
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={showNewTaskPopup}
      onRequestClose={closeModal}
      onAfterOpen={initializeModal}
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
            onClick={closeModal}
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
              name="title"
              autoFocus={true}
              placeholder="e.g. Take coffee break"
              value={values?.title || ""}
              onChange={handleChange}
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
              name="description"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge your batteries a little."
              value={values?.description || ""}
              onChange={handleChange}
            />
          </div>
          {!!errors.description && <ErrorInfo message={errors.description} />}
        </div>

        <div className="form-item">
          <div className="form-item__label">Subtasks</div>
          {values?.subtasks?.map((subtask) => (
            <div
              key={subtask?.id}
              className={`form-item__textbox subtask-item ${
                !!errors[`subtasks${subtask.id}`]
                  ? "input-invalid"
                  : "input-valid"
              }`}
            >
              <input
                name="subtasks"
                type="text"
                autoFocus={true}
                placeholder="e.g. Make coffee"
                value={subtask.name}
                onChange={(e) => handleListItemChange(e, subtask.id)}
              />
              <FontAwesomeIcon
                className="times-icon"
                icon={faTimes}
                size="lg"
                onClick={() => removeSubtask(subtask.id)}
              />
              {!!errors[`subtasks${subtask.id}`] && (
                <ErrorInfo message={errors[`subtasks${subtask.id}`]} />
              )}
            </div>
          ))}
          <button
            className="add-column-button kanban-button button-default button-100"
            onClick={addNewSubtask}
          >
            <FontAwesomeIcon icon={faPlus} /> Add New Subtask
          </button>
        </div>

        <div className="form-item">
          <div className="form-item__label">Status</div>
          <div className="form-item__selectbox">
            <select
              name="status"
              value={values?.status}
              onChange={handleChange}
            >
              {activeBoard?.columns.map(({ value }) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
          {!!errors.status && <ErrorInfo message={errors.status} />}
        </div>

        <div className="form-item">
          <button
            className="kanban-button button-primary button-100"
            onClick={handleSubmit}
          >
            <span>Create Task</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
