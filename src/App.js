import Content from "./content";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <Content />
    </Provider>
  );
}

export default App;
