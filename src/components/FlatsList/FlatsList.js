import {h, Component} from 'preact';
import { observer, inject } from 'mobx-preact';
import s from './FlatsList.scss';
import { toNumericStringWithDivider } from 'utils/helpers';

@inject('flatsStore')
@observer
class FlatsList extends Component {

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
                <span class={s.small}>{flat.rooms}-комн. квартира</span>
                <span class={s.dot}>•</span>
                <span class={s.small}>{flat.square} м<sup>2</sup></span>
                <span class={s.dot}>•</span>
                <span class={s.small}>{flat.floor} этаж</span>
              </div>
              <div class={s.line}><span class={s.small}>ул. {flat.street}</span></div>
              <div class={s.line}><span class={s.small}>{flat.district}</span></div>
            </div>
            <div class={s.tell}>Позвонить</div>
          </div>
        ))}
      </div>
    );
  }
}

export default FlatsList;
