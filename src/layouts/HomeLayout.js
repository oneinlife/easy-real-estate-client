import { h } from 'preact';
import style from 'styles/home-layout.scss';
import { Link } from 'preact-router';

function HomeLayout ({children}) {
  return (
    <div className={style.wrapper}>
      <header><img src="/static/preact.svg"/></header>
      <main>
        <div className={style.tabs}>
          <Link href="/count" onlyActiveOnIndex activeClassName={style.active}>Counter</Link>
          <Link href="/about" activeClassName={style.active}>About</Link>
        </div>
        {children}
      </main>
    </div>
  );
}

export default HomeLayout
