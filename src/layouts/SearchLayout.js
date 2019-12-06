import { h } from 'preact';
import useStyles from 'isomorphic-style-loader/useStyles'
import s from 'styles/search-layout.scss';

function SearchLayout () {
  useStyles(s);

  return (
    <div className={s.root}>
      тут карточка
    </div>
  );
}

export default SearchLayout
