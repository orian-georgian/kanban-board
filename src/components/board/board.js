import { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";

import { loadTasksApi } from "../../apis/tasks";
import { loadTasks, setLoading } from "../../redux/tasks";

import Column from "./components/column/column";
import Loader from "../loader/loader";
import TaskDetailsPopup from "./components/task-details-popup/task-details-popup";

import "./board.scss";

export default function Board() {
  const activeBoard = useSelector((state) => state.boards.activeBoard);
  const loading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!activeBoard) {
      dispatch(setLoading(true));
      (async () => {
        const { isOk, data } = await loadTasksApi(activeBoard.id);
        if (isOk) {
          batch(() => {
            dispatch(loadTasks(data));
            dispatch(setLoading(false));
          });
        }
      })();
    }
  }, [activeBoard?.id]);

  return (
    <main className="kanban-board">
      {loading ? (
        <Loader message="Board is loading..." />
      ) : (
        activeBoard?.columns.map(({ value, color }) => (
          <Column key={value} name={value} color={color} />
        ))
      )}
      <TaskDetailsPopup />
    </main>
  );
}
