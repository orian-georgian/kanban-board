import Tasks from "../data/tasks";

export function loadTasksApi(boardId) {
  const tasks = Tasks.filter((task) => task.boardId === boardId);

  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          isOk: true,
          data: tasks,
        }),
      1000
    )
  );
}
