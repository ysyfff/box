import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { Input_, Model, Flexbox } from 'q-antd';
const { Flex, Block } = Flexbox;
import * as mobx from 'mobx';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
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

  @autobind
  startPlay(path){
    debugger
    let mp3 = new Audio(unescape(`http://127.0.0.1:8888${path}`));
    mp3.play();
  }

  render() {
    return (
      <div>
        <h1>Welcome to my box</h1>
        <h2>This is funny</h2>
        {mobx.toJS(model.mp3).map((item, i) => {
          return (
            <Flexbox key={i}>
              <Flex>{item.name}</Flex>
              <Block><Button type="primary" icon="play-circle-o" onClick={(e) => {
                this.startPlay(item.path);
              }}>播放</Button></Block>
            </Flexbox>
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
