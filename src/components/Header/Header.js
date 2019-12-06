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
      <div class={s.root}>
        <span>filter</span>
        <span>select</span>
        <span>chats</span>
      </div>
    );
  }
}


export default Header
