import {h, Component} from 'preact';
import { observer, inject } from 'mobx-react';
import { toNumericStringWithDivider } from 'utils/helpers';
import s from './FlatsList.scss';

const imgs = [
  'https://i.pinimg.com/400x300/11/7c/9d/117c9d022240fb494f5d31afe34523fb.jpg',
  'https://rialto.by/wp-content/uploads/2019/08/PAA-Baths-Silkstone-DECO-RIM-1660x815-with-towel-holder-ANTONIO-LUPI-mixer-interior-WEB-400x300-c-default.jpg',
  'https://rialto.by/wp-content/uploads/2019/08/craft-cisa_craft_living_ground-400x300-c-default.jpg',
  'https://i.pinimg.com/400x300/f8/30/e0/f830e0767c868aaa367aac6a365ea08b.jpg',
  'https://i.pinimg.com/400x300/03/ac/1a/03ac1af155ae99bef4b4c195de7c5ce1.jpg',
  'https://i.pinimg.com/400x300/59/a9/3e/59a93e4491a6b020838a25c73e4e5f4c.jpg',
  'https://rialto.by/wp-content/uploads/2019/08/Fascia-tozz-foto-1340x880-400x300-c-default.jpg',
  'https://rialto.by/wp-content/uploads/2019/08/salini-alba-image1-400x300-c-default.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgM4vWWjV6L5dw33aAad9SYBN7oqvumMtq1ZokCmzqQFZE5Vo&s',
  'https://i.pinimg.com/400x300/9f/86/22/9f86220e279bc2fc933e787f61f295c0.jpg',

];
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
        {flats && flats.map((flat, index) => (
          <div class={s.card}>
            <div>
              <img src={imgs[index]} style={'width: 100%;'} />
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
