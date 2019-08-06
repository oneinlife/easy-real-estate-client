import {h, Component} from 'preact';
import { observer, inject } from 'mobx-preact';
import { toNumericStringWithDivider } from 'utils/helpers';
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

  render ({ flatsStore }) {
    const { flats } = flatsStore;
    return (
      <div class={s.root}>
        {flats && flats.map(flat => (
          <div class={s.card}>
            <div>
              <img src={flat.photo} style={'width: 100%;'} />
            </div>
            <div class={s.characteristic}>
              <div class={s.price}>
                <span class={s.priceSpan}>{toNumericStringWithDivider(flat.price)} ₽</span>
                <span class={`${s.squarePice} ${s.small}`}>
                  {toNumericStringWithDivider(Math.floor(flat.price/flat.square))} руб. за м<sup>2</sup>
                </span>
              </div>
              <div class={`${s.line} ${s.bold}`}>
                {flat.rooms}-комн. квартира
                <span class={s.dot}>•</span>
                {flat.square} м<sup>2</sup>
                <span class={s.dot}>•</span>
                {flat.floor} этаж
              </div>
              <div class={s.line}>ул. {flat.street}</div>
              <div class={s.line}>{flat.district}</div>
            </div>
            <div class={s.tell}>Позвонить</div>
          </div>
        ))}
      </div>
    );
  }
}

export default FlatsList;
