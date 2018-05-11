import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { Input_, Model, Flexbox } from 'q-antd';
const { Flex, Block } = Flexbox;
import * as mobx from 'mobx';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import { generate } from 'fast-glob/out/managers/tasks';
const electron = require('electron'); //electron 属于node

const { ipcRenderer } = electron;
const { observable } = mobx;
/**
 * TODO
 * 缓存已经扫描过的音乐List done
 * 列表循环播放            done
 * 可选择播放模式          
 * 播放列表展示，包括删除，添加，清空
 * 随机播放(记录随机过得数字，在整个列表别随机完之前，不能第二次随机同一首歌)
 */

//从localStorage获取mp3
let mp3Stored = JSON.parse(localStorage.getItem('mp3') || '[]');

const data = observable({
  a: 'perfect is perfect'
});

ipcRenderer.on('scan:mp3', (e, mp3) => {
  let hasNew = false;

  mp3.map((item, i) => {
    let included = mp3Stored.some((mp3) => {
      return mp3.name === item.name;
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
  mp3: mp3Stored,
  playList: mp3Stored
});

function getNextIndex(index, length) {
  return (index + 1) % length;
}
function getPrevIndex(index, length) {
  return index === 0 ? length - 1 : (index - 1) % length;
}

@observer
export default class Music extends React.Component {
  mp3 = null;
  playModeList = [
    { label: '单曲循环', value: 'single-loop' },
    { label: '列表循环', value: 'list-loop' },
    { label: '随机播放', value: 'random' },
  ]

  @observable status = 'pause'; //pause play eneded
  @observable currentPath = '';
  @observable playList = [];
  @observable playIndex = 0;
  @observable playModeIndex = 0;
  @observable randomList = []; //记录已经random过得playIndex


  @autobind
  handlePlayMode() {
    // this.playModeIndex = (this.playModeIndex + 1) % this.playModeList.length;
    this.playModeIndex = getNextIndex(this.playModeIndex, this.playModeList.length);
  }

  @autobind
  playNext() {
    this.playIndex = getNextIndex(this.playIndex, model.playList.length);
    if (this.mp3) {
      this.mp3.pause();
    }
    this.play();
  }

  @autobind
  playPrev() {
    this.playIndex = getPrevIndex(this.playIndex, model.playList.length);
    if (this.mp3) {
      this.mp3.pause();
    }
    this.play();
  }
  /**
   * 根据播放模式，产生下一首播放的index
   */
  @autobind
  resetPlayIndex() {
    
    if (this.playModeList[this.playModeIndex].value === 'list-loop') {
      this.playIndex = getNextIndex(this.playIndex, model.playList.length);
    }
    if (this.playModeList[this.playModeIndex].value === 'random') {

    }
    this.play();
  }

  @autobind
  onended() {
    this.status = 'ended';
    this.resetPlayIndex();

  }

  @autobind
  play(path) {
    if (path === this.currentPath) {
      this.mp3.play();
      return;
    } else if (this.mp3) {
      this.mp3.pause();
    }
    if (path) {
      this.currentPath = path;
      model.playList.map((item, i) => {
        if (item.path === path) {
          this.playIndex = i;
        }
      })
    } else {
      //如果没有path，默认使用playList的第一个
      this.currentPath = model.playList[this.playIndex] && model.playList[this.playIndex].path;
    }
    this.mp3 = new Audio(unescape(`http://127.0.0.1:8888${this.currentPath}`));
    this.mp3.onended = this.onended;
    window.mp3 = this.mp3;
    this.mp3.play();
    this.status = 'play';
  }

  @autobind
  replay() {
    this.status = 'play';
    if (this.mp3) {
      this.mp3.play();
    } else {
      this.play();
    }
  }

  @autobind
  pause() {
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
        <Button type="primary" shape="circle" icon="step-backward" onClick={this.playPrev}></Button>
        {this.status === 'pause' || this.status === 'ended' ?
          <Button type="primary" shape="circle" icon="caret-right" onClick={this.replay}></Button>
          : null
        }
        {
          this.status === 'play' ?
            <Button type="primary" shape="circle" icon="pause" onClick={this.pause}></Button>
            : null
        }
        <Button type="primary" shape="circle" icon="step-forward" onClick={this.playNext}></Button>
        <Button ghost type="primary" size="small" onClick={this.handlePlayMode}>{this.playModeList[this.playModeIndex].label}</Button>
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
