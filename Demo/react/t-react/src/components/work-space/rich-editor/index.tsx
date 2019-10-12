import React from 'react';
import './index.less';
interface IProps {
  // 内容回调
  onTextChange: (text: string) => void;
}

interface IState {
  showDialog: boolean;
  // 文本
  linkText: string;
  // 链接 / appid
  linkUrl: string;
  // 路径
  linkPath: string;
  // 校验
  checkTip: string;
  // 错误
  isError: boolean;
  // 文本长度
  contentLen: number;
}

interface LinkUrl {
  id: string;
  linkUrl: string;
  linkPath: string;
  text: string;
}
export default class App extends React.Component<IProps, IState> {
  public editorArea: HTMLElement | null = null;
  public addContentType: 'link' | 'pro' | '' = '';
  public linkId: string = '';
  public LINK_TEXT = '';
  public LINK_URL = '';
  public MAX_CONTENT_LEN = 300;
  public selection = window.getSelection();

  public state: IState = {
    showDialog: false,
    linkText: this.LINK_TEXT,
    linkUrl: this.LINK_URL,
    linkPath: '',
    checkTip: '',
    isError: false,
    contentLen: 0,
  };
  //
  selfUpdate() {
    this.props.onTextChange &&
      this.props.onTextChange(this.editorArea ? this.editorArea.innerHTML : '');
  }
  // 点击输入框
  handleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.selection) {
      const range = this.selection && this.selection.getRangeAt(0);
    }
  };
  // 插入作品
  handleInnerApp = () => {
    // const selObj = window.getSelection();
    // const range = selObj && selObj.getRangeAt(0);
    // console.log(selObj, range);
    const start = this.editorArea ? this.editorArea.innerHTML.length : 0;
    const id = '_' + String(Math.random()).slice(2);
    const url = '';
    const text = '插入作品';
    const aTag = `<a id="${id}" data-app-id="321321321321" href="${321321321}">${text}</>`;
    this.editorArea!.innerHTML += aTag;
  };

  // 创建 正则替换
  createTagReg = (type: 'pro' | 'link' | 'app') => {
    let regStr = '';
    if (type === 'pro') {
      regStr = `(id="${this.linkId}".*?href=").*?(".*?>).*?(</)`;
    } else if (type === 'link') {
      regStr = `(id="${this.linkId}".*?data-miniprogram-appid=").*?(".*?data-miniprogram-path=").*?(".*?>).*?(</)`;
    } else if (type === 'app') {
      regStr = `(id="${this.linkId}".*?data-app-id=").*?(".*?data-app-code=").*?(".*?>).*?(</)`;
    }
    return new RegExp(regStr);
  };

  replaceAppText = (data: Record<string, any>, cb?: () => void) => {
    const reg = this.createTagReg('app');
    const contentId = data.data.contentId;
    const code = data.style.code;
    const contentName = data.data.contentName;
    if (this.editorArea) {
      console.log(reg, this.editorArea.innerHTML);
      this.editorArea.innerHTML = this.editorArea.innerHTML.replace(
        reg,
        `$1${contentId}$2${code}$3${contentName}$4`
      );
      this.setState({ contentLen: this.editorArea.innerText.length }, () => {
        console.log('设置链接');
        this.selfUpdate();
      });
      cb && cb();
    }
  };

  createEditGroup = (data: LinkUrl) => {
    return [
      {
        type: 'pro',
        html: `<a id="${data.id}" data-miniprogram-appid="${data.linkUrl}" data-miniprogram-path="${data.linkPath}" href="#">${data.text}</a>`,
        tag: () =>
          this.createLinkTag(data.id, data.text, tag => {
            tag.setAttribute('data-miniprogram-appid', data.linkUrl);
            tag.setAttribute('data-miniprogram-path', data.linkPath);
          }),
      },
      {
        type: 'link',
        html: `<a id="${data.id}" href="${data.linkUrl}">${data.text}</a>`,
        tag: () =>
          this.createLinkTag(data.id, data.text, tag => {
            tag.href = data.linkUrl;
          }),
      },
      {
        type: 'app',
        html: `<a id=${data.id} data-app-id="${data.linkUrl}" data-app-code="${data.linkPath}">${data.text}</a>`,
        tag: () =>
          this.createLinkTag(data.id, data.text, tag => {
            tag.setAttribute('data-app-id', data.linkUrl);
            tag.setAttribute('data-app-code', data.linkPath);
          }),
      },
    ];
  };

  createLinkTag(
    id: string,
    text: string,
    cb: (atag: HTMLAnchorElement) => void
  ) {
    const tag = document.createElement('a') as any;
    tag.id = id;
    tag.innerHTML = text;
    cb(tag);
    return tag;
  }

  // 插入外部链接
  handleInnerLink = () => {
    this.addContentType = 'link';
    this.initDialog('', '', '', () => {});
  };

  // 插入小程序
  handleInnerMiniApp = () => {
    this.addContentType = 'pro';
    this.initDialog('', '', '', () => {});
  };

  // 初始化弹窗
  initDialog = (
    linkText: string,
    linkUrl: string,
    linkPath: string,
    cb?: () => void
  ) => {
    this.setState(
      {
        showDialog: true,
        linkUrl,
        linkPath,
        linkText,
      },
      () => {
        cb && cb();
      }
    );
  };

  // 按键操作
  handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 8) {
    }
  };

  // 添加文本
  addInnerText(str: string) {
    if (this.editorArea) {
      this.editorArea.innerHTML += str;
    }
  }

  handleLinkTextChange = (event: Record<string, any>) => {
    this.setState({ linkText: event.target.value });
  };

  handleLinkUrlChange = (event: Record<string, any>) => {
    this.setState({ linkUrl: event.target.value });
  };

  handleLinkPathChange = (event: Record<string, any>) => {
    this.setState({ linkPath: event.target.value });
  };

  handleCloseDialog = () => {};
  handleSetLink = () => {};
  // 弹窗渲染
  renderDialog = () => {
    const { linkText, linkUrl, linkPath, checkTip, isError } = this.state;
    const label = this.addContentType === 'pro' ? 'AppID:' : '链接:';
    const placeholder =
      this.addContentType === 'pro' ? '请输入小程序AppID' : '请输入链接';
    return (
      <div className="rich-editor-dialog">
        <div className="link-item">
          <span className="link-label">
            <span style={{ color: '#FF554B' }}>*</span>
            文本:
          </span>
          <input
            className="link-input"
            placeholder="请输入文本"
            value={linkText}
            onChange={this.handleLinkTextChange}
          />
        </div>
        <div className="link-item">
          <span className="link-label">
            <span style={{ color: '#FF554B' }}>*</span>
            {label}
          </span>
          <input
            className="link-input"
            placeholder={placeholder}
            value={linkUrl}
            onChange={this.handleLinkUrlChange}
          />
        </div>
        {this.addContentType === 'pro' && (
          <div className="link-item">
            <span className="link-label">路径:</span>
            <input
              className="link-input"
              value={linkPath}
              placeholder="不填写则打开小程序首页"
              onChange={this.handleLinkPathChange}
            />
          </div>
        )}
        {isError && (
          <div className="check-tip">
            <i className="neibugongzuotai_iconfont icon-fuzhishibai" />{' '}
            {checkTip}
          </div>
        )}
        <div className="btns">
          <button className="btn" onClick={this.handleCloseDialog}>
            取消
          </button>
          <button className="btn" onClick={this.handleSetLink}>
            确定
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { showDialog } = this.state;
    return (
      <div>
        <div className="rich-editor-daguo">
          {showDialog && this.renderDialog()}
          <div
            className="rich-editor-area"
            contentEditable={true}
            ref={node => (this.editorArea = node)}
            onClick={this.handleEditClick}
            onKeyUp={this.handleKeyUp}
          />
          <div className="rich-editor-btns">
            <a
              className="btn editor-name"
              onClick={() => this.addInnerText('{访客微信昵称}')}>
              {'+插入{访客微信昵称}'}
            </a>
            <a className="btn editor-mini-pro" onClick={this.handleInnerApp}>
              +插入作品
            </a>
            <a className="btn editor-url" onClick={this.handleInnerLink}>
              +插入外部链接
            </a>
            <a
              className="btn editor-mini-pro"
              onClick={this.handleInnerMiniApp}>
              +插入小程序
            </a>
          </div>
        </div>
      </div>
    );
  }
}
