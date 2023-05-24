import { useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { loadBoardsApi } from "./apis/boards";
import { loadBoards, setLoading } from "./redux/boards";

import VerticalMenu from "./components/vertical-menu/vertical-menu";
import TopBar from "./components/top-bar/top-bar";
import Board from "./components/board/board";
import Loader from "./components/loader/loader";

export default function Content() {
  const loading = useSelector((state) => state.boards.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { isOk, data } = await loadBoardsApi();
      if (isOk) {
        batch(() => {
          dispatch(loadBoards(data));
          dispatch(setLoading(false));
        });
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="kanban-container">
        <Loader message="Kanban is loading..." />
      </div>
    );
  }

  return (
    <div className="kanban-app">
      <section className="kanban-app__item menu">
        <VerticalMenu />
      </section>
      <section className="kanban-app__item board">
        <TopBar />
        <Board />
      </section>
    </div>
  );
}
