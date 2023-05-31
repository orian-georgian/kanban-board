import Logo from "./components/logo/logo";
import Menu from "./components/menu/menu";
import ToggleSwitch from "../toggle-switch/toggle-switch";
import { useSelector, useDispatch } from "react-redux";
import { themes } from "../../constants/general";
import { toggleTheme } from "../../redux/layout";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import "./vertical-menu.scss";

export default function VerticalMenu() {
  const theme = useSelector((state) => state.layout.theme);
  const dispatch = useDispatch();
  const isDarkMode = theme === themes.DARK;

  function onToggleTheme(e) {
    dispatch(toggleTheme(e.target.checked ? themes.DARK : themes.LIGHT));
  }

  return (
    <aside className="vertical-menu">
      <Logo />
      <Menu />
      <ToggleSwitch
        leftIcon={faSun}
        rightIcon={faMoon}
        checked={isDarkMode}
        onChange={onToggleTheme}
      />
    </aside>
  );
}
