import Logo from "./components/logo/logo";
import Menu from "./components/menu/menu";

import "./vertical-menu.scss";

export default function VerticalMenu() {
  return (
    <aside className="vertical-menu">
      <Logo />
      <Menu />
    </aside>
  );
}
