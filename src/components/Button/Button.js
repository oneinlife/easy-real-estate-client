import preact from 'preact';
import style from 'button.scss';
import classNames from 'classnames';

function Button ({
  disable = false,
  children,
  onClick
}) {
  const className = classNames(
    style.button,
    disable && style.disabled
  );
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
