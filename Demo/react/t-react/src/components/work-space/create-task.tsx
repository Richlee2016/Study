/** 全员激励 创建任务 */
import React from 'react';
import ReactQuill from 'react-quill';
import './index.less';
import 'react-quill/dist/quill.snow.css';
export interface IProps {}

export interface IState {
  text: string;
}

class Editor extends React.Component<IProps, IState> {
  public modules = {
    toolbar: [['image']],
  };
  public editRef: React.RefObject<ReactQuill> = React.createRef();
  public state: IState = {
    text: '',
  };
  handleChange = (data: string) => {
    console.log(data);
  };
  addImage = () => {
    console.log(321);
    console.log(this.editRef.current);
    this.setState({ text: '<div>321<div>' });
  };
  render() {
    const { text } = this.state;
    return (
      <div>
        <ReactQuill
          className="task-edit"
          ref={this.editRef}
          value={text}
          onChange={this.handleChange}
          modules={this.modules}></ReactQuill>
        <button onClick={this.addImage}>321321</button>
      </div>
    );
  }
}

export default Editor;
