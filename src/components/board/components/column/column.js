import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import Task from "../task/task";

import "./column.scss";

export default function Column({ name, color }) {
  const tasks = useSelector((state) =>
    state.tasks.data.filter((task) => task.status === name)
  );

  return (
    <div className="kanban-tasks-column">
      <div className="kanban-tasks-column__title">
        <FontAwesomeIcon icon={faCircle} size="xs" color={color} />
        <span>{`${name} (${tasks.length})`}</span>
      </div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
