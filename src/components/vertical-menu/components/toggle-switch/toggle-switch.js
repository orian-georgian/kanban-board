import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./toggle-switch.scss";

export default function ToggleSwitch({
  leftIcon,
  rightIcon,
  checked,
  onChange,
}) {
  return (
    <div className="kanban-toggle-switch">
      {leftIcon && (
        <div className="kanban-toggle-switch__left-icon">
          <FontAwesomeIcon icon={leftIcon} size="lg" />
        </div>
      )}
      <input
        className="kanban-toggle-switch__input"
        type="checkbox"
        id="switch"
        checked={checked}
        onChange={onChange}
      />
      <label className="kanban-toggle-switch__label" htmlFor="switch" />
      {rightIcon && (
        <div className="kanban-toggle-switch__right-icon">
          <FontAwesomeIcon icon={rightIcon} size="lg" />
        </div>
      )}
    </div>
  );
}
