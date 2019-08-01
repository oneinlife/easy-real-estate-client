import {h, Component} from 'preact';
import { observer, inject } from 'mobx-preact';
import Deliver from 'components/Deliver';
import Button from 'components/Button';

@inject('countStore')
@observer
class Count extends Component {
  render () {
    const {countStore} = this.props;
    const {increasing, count, increase, doubleAsync, reset} = countStore;
    return (
      <div>
        <div>Count: {count}</div>
        <Deliver height="10px" vertical/>
        <Button disable={increasing} onClick={increase}>increase</Button>
        <Deliver width="10px" />
        <Button disable={increasing} onClick={doubleAsync}>double async</Button>
        <Deliver width="10px" />
        <Button disable={increasing} onClick={reset}>reset</Button>
      </div>
    );
  }
}

export default Count;
