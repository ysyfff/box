import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { Input_, Model } from 'q-antd';
import * as mobx from 'mobx';
import { observer } from 'mobx-react';

const { observable } = mobx;
const data = observable({
  a: 'perfect is perfect'
});
@observer
export default class Music extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to my box</h1>
        <h2>This is funny</h2>
        <Button type="primary">添加</Button>
        <Model model={data}>
          <Input_ duplex="a" />
        </Model>
      </div>
    );
  }
}


ReactDOM.render(<Music />, document.getElementById('content'));

if (module.hot) {
  module.hot.accept();
}
