import preact, { h } from 'preact';

function Deliver (props) {
  const {width, height, vertical = false} = props;
  const style = {
    width: width,
    height: height,
    display: vertical ? 'block' : 'inline-block'
  };
  return (
    <div style={style}></div>
  );
}

export default Deliver;
