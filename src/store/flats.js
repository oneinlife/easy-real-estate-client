import bind from 'autobind-decorator';
import { observable, action } from 'mobx';
import axios from 'axios';

@bind
class FlatsStore {
  @observable flats = [];

  @action
  load() {
    axios.get('http://localhost:3000')
    .then(({ data }) => {
      this.flats = data.flats;
    })
  }
}

export default FlatsStore;
