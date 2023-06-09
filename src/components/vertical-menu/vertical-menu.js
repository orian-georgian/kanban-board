import Logo from "../logo/logo";
import Menu from "./components/menu/menu";
import ToggleSwitch from "./components/toggle-switch/toggle-switch";
import ToggleSidebar from "../toggle-sidebar/toggle-sidebar";
import { useSelector, useDispatch } from "react-redux";
import { themes } from "../../constants/general";
import { toggleTheme } from "../../redux/layout";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import "./vertical-menu.scss";

export default function VerticalMenu({
  showLogo = true,
  showToggleSidebar = true,
}) {
  const theme = useSelector((state) => state.layout.theme);
  const dispatch = useDispatch();
  const isDarkMode = theme === themes.DARK;

  function onToggleTheme(e) {
    dispatch(toggleTheme(e.target.checked ? themes.DARK : themes.LIGHT));
  }

  return (
    <aside className="vertical-menu">
      {showLogo && <Logo />}
      <Menu />
      {showToggleSidebar && <ToggleSidebar />}
      <ToggleSwitch
        leftIcon={faSun}
        rightIcon={faMoon}
        checked={isDarkMode}
        onChange={onToggleTheme}
      />
    </aside>
  );
}
