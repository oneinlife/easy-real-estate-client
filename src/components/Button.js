import preact, { h } from 'preact';
import style from 'styles/button.less';
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
