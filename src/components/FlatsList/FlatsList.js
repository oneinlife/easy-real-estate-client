import {h, Component} from 'preact';
import { observer, inject } from 'mobx-preact';

@inject('flatsStore')
@observer
class FlatsList extends Component {

  componentDidMount() {
    this.props.flatsStore.load();
  }

  render ({ flatsStore }) {
    const { flats } = flatsStore;
    return (
      <div>
        {flats && flats.map(flat => (
          <div>
            <div>{flat.price}</div>
            <div>{flat.rooms}</div>
            <div>{flat.floor}</div>
            <div>{flat.square}</div>
            <div>{flat.street}</div>
            <div>{flat.district}</div>
            <div>{flat.photo}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default FlatsList;
