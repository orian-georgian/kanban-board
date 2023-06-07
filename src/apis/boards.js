import Boards from "../data/boards";

export function loadBoardsApi() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          isOk: true,
          data: Boards,
        }),
      500
    )
  );
}
