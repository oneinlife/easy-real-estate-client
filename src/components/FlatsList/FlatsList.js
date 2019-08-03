import { h, Component } from 'preact';
import { observer, inject } from 'mobx-preact';
import s from './FlatsList.scss';

@inject('flatsStore')
@observer
class FlatsList extends Component {
  componentWillMount() {
    this.removeCss = s._insertCss();
  }

  componentWillUnmount() {
    this.removeCss();
  }

  componentDidMount() {
    this.props.flatsStore.load();
  }

  render({ flatsStore }) {
    const { flats } = flatsStore;
    console.log(s)
    return (
      <div>
        {flats && flats.map(flat => (
          <div class={s.card}>
            <div>
              <img src={flat.photo} style={'width: 100%;'} />
            </div>
            <div class={s.characteristic}>
              <div class={s.price}>{flat.price} ₽</div>
              <div>{flat.rooms}-комн</div>
              <div>{flat.floor}</div>
              <div>{flat.square}</div>
              <div>ул. {flat.street}</div>
              <div>{flat.district}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default FlatsList;
