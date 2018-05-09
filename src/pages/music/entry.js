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

//从localStorage获取mp3
let mp3Stored = JSON.parse(localStorage.getItem('mp3') || '[]');

const data = observable({
  a: 'perfect is perfect'
});

ipcRenderer.on('scan:mp3', (e, mp3) => {
  let hasNew = false;
  debugger
  mp3.map((item, i) => {
    let included = mp3Stored.some((mp3) => {
      mp3.name === item.name;
    });
    if (!included) {
      mp3Stored.push(item);
      hasNew = true;
    }
  })
  if (hasNew) {
    localStorage.setItem('mp3', JSON.stringify(mp3Stored));
    model.mp3 = mp3Stored;
  }
});

const model = observable({
  mp3: mp3Stored
});

@observer
export default class Music extends React.Component {
  mp3 = null;
  @observable status = 'pause';
  @observable currentPath = '';

  @autobind
  play(path) {
    if(path === this.currentPath) {
      this.mp3.play();
      return;
    }else if(this.mp3){
      this.mp3.pause();
    }
    if(path) {
      this.currentPath = path;
    }
    this.mp3 = new Audio(unescape(`http://127.0.0.1:8888${this.currentPath}`));
    this.mp3.play();
    this.status = 'play';
  }

  @autobind
  replay(){
    this.status = 'play';
    if(this.mp3) {
      this.mp3.play();
    }else{
      this.play();
    }
  }

  @autobind
  pause(){
    this.status = 'pause';
    this.mp3.pause();
  }

  render() {
    return (
      <div>
        <h1>Welcome to my box</h1>
        <h2>This is funny</h2>
        {mobx.toJS(model.mp3).map((item, i) => {
          return (
            <Flexbox key={i}>
              <Block ><Button shape="circle" icon="play-circle-o" onClick={(e) => {
                this.play(item.path);
              }}></Button></Block>
              <Flex>{item.name}</Flex>
            </Flexbox>
          )
        })}
        <Button type="primary" shape="circle" icon="step-backward"></Button>
        {this.status === 'pause' ?
          <Button type="primary" shape="circle" icon="caret-right" onClick={this.replay}></Button>
          : null
        }
        {
          this.status === 'play' ?
            <Button type="primary" shape="circle" icon="pause" onClick={this.pause}></Button>
            : null
        }
        <Button type="primary" shape="circle" icon="step-forward"></Button>
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
