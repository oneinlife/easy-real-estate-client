import { h, Component } from 'preact';
import s from './Header.scss';

class Header extends Component {

  componentWillMount() {
    this.removeCss = s._insertCss();
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    return (
      <div class={s.root} >
        <span class={s.title}>Воздух Недвижимость</span>
        <div>
          <span>Поиск</span>
        </div>
      </div>
    );
  }
}


export default Header
