import { h } from 'preact';
//import style from 'styles/home-layout.scss';
import FlatsList from '../components/FlatsList/FlatsList';

function HomeLayout () {
  return (
    <div className={'style.wrapper'}>
      <FlatsList />
    </div>
  );
}

export default HomeLayout
