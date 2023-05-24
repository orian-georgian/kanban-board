import { memo } from "react";
import { useDispatch } from "react-redux";

import { setSelectedTask } from "../../../../redux/tasks";

import "./task.scss";

const Task = memo(({ task }) => {
  const finishedSubtasks =
    task.subtasks.filter(({ checked }) => checked)?.length ?? 0;
  const dispatch = useDispatch();

  function onTitleClick(e) {
    e.preventDefault();
    dispatch(setSelectedTask(task));
  }

  return (
    <div className="kanban-task">
      <div onClick={onTitleClick} className="kanban-task__title">
        {task.name}
      </div>
      <div className="kanban-task__subtasks">{`${finishedSubtasks} of ${task.subtasks.length} subtasks`}</div>
    </div>
  );
});

export default Task;
