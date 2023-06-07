import Modal from "react-modal";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  setSelectedTask,
  updateSubtaskState,
  updateStatus,
  removeTask,
} from "../../../../redux/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import usePopupStyles from "../../../../hooks/use-popup-styles";
import { colors } from "../../../../constants/general";

import "./task-details-popup.scss";

export default function TaskDetailsPopup() {
  const selectedTask = useSelector((state) => state.tasks.selectedTask);
  const activeBoard = useSelector((state) => state.boards.activeBoard);
  const theme = useSelector((state) => state.layout.theme);
  const checkedSubtasks =
    selectedTask?.subtasks.filter(({ checked }) => checked)?.length ?? 0;
  const dispatch = useDispatch();
  const modalStyles = usePopupStyles();

  function closeModal() {
    dispatch(setSelectedTask(null));
  }

  function onItemChecked(e, { id, checked }) {
    e.preventDefault();

    dispatch(updateSubtaskState({ id, checked: !checked }));
  }

  function onStatusChange(e) {
    e.preventDefault();

    batch(() => {
      dispatch(updateStatus({ id: selectedTask.id, status: e.target.value }));
      dispatch(setSelectedTask(null));
    });
  }

  function onDeleteTask() {
    dispatch(removeTask(selectedTask.id));
    closeModal();
  }

  if (!selectedTask) return null;

  return (
    <Modal
      ariaHideApp={false}
      isOpen={!!selectedTask}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={modalStyles}
    >
      <div className={`kanban-popup ${theme}-theme`}>
        <div className="kanban-popup__title">
          <span>{selectedTask.title}</span>
          <FontAwesomeIcon
            className="times-icon"
            icon={faTimes}
            size="lg"
            onClick={closeModal}
          />
        </div>
        <div className="kanban-popup__description">
          {selectedTask.description}
        </div>
        {selectedTask.subtasks.length > 0 && (
          <div className="form-item">
            <div className="form-item__label">{`Subtasks (${checkedSubtasks} of ${selectedTask.subtasks.length})`}</div>
            {selectedTask.subtasks.map(({ id, name, checked }) => (
              <div
                className={`form-item__checkbox ${
                  checked ? "checked" : "unchecked"
                }`}
                key={id}
                onClick={(e) => onItemChecked(e, { id, checked })}
              >
                <div className="form-item__checkbox-box">
                  {checked && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      color={colors.ALL_WHITE}
                      size="2xs"
                    />
                  )}
                </div>
                <span className="form-item__checkbox-name">{name}</span>
              </div>
            ))}
          </div>
        )}
        <div className="form-item">
          <div className="form-item__label">Status</div>
          <div className="form-item__selectbox">
            <select value={selectedTask.status} onChange={onStatusChange}>
              {activeBoard.columns.map(({ value }) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-item">
          <button
            className="kanban-button button-default button-100"
            onClick={onDeleteTask}
          >
            <FontAwesomeIcon icon={faTrash} size="lg" onClick={closeModal} />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
