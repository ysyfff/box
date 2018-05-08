import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { Input_, Model } from 'q-antd';
import * as mobx from 'mobx';
import { observer } from 'mobx-react';
const electron = require('electron'); //electron 属于node

const { ipcRenderer } = electron;
const { observable } = mobx;
const data = observable({
  a: 'perfect is perfect'
});

ipcRenderer.on('scan:mp3', (e, mp3) => {
  model.mp3 = mp3;
});

const model = observable({
  mp3: []
});

@observer
export default class Music extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to my box</h1>
        <h2>This is funny</h2>
        {mobx.toJS(model.mp3).map((item, i) => {
          return (
            <div>
              {item.name}
              <video src={item.path} controls width={100} height={50}></video>
            </div>
          )
        })}
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
