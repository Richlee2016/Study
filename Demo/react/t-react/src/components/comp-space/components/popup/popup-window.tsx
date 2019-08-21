// 待研究

import React, { Component, ComponentType, Children, cloneElement } from 'react';
import ReactDOM, { createPortal, unmountComponentAtNode } from 'react-dom';

export interface PopUpProps {
  /**
   * 真实要渲染到的DOM容器，默认document.body
   */
  container?: Element;
  /**
   * 包含过渡效果的className，用于popup后执行过渡效果
   */
  transition?: string;
  /**
   * 显示后的回调
   */
  onShown?: () => void;
  /**
   * 关闭后的回调
   */
  onClosed?: () => void;
}

function getInstanceId() {
  return '' + Date.now();
}

/**
 * PopUp能力绑定的高阶组件
 * @template P
 * @param {ComponentType<P>} WrappedComponent 被包装的目标组件
 * @param {boolean} [singleton=true] 是否是单例的，同时只能渲染一个组件
 * @returns 返回PopUpComponent组件，拥有静态方法show
 */
function factory<P>(
  WrappedComponent: ComponentType<P>,
  singleton: boolean = true
) {
  return class PopUpComponent extends Component<PopUpProps> {
    static defaultProps: PopUpProps = {
      container: document.body,
    };

    // 组件实例引用，便于单例管理和全局关闭/回收
    static instances: Record<string, PopUpComponent> = {};

    /**
     * 动态渲染组件，不需要提前放入布局中
     * @static show 静态方法
     * @param {P & PopUpProps} props 被包装组件和PopUp容器的联合属性
     */
    static show(props?: P & PopUpProps) {
      const {
        container,
        transition,
        onShown,
        onClosed,
        ...wrappedProps
      } = (props || {}) as any;

      // 单例，不能再重复创建组件实例
      if (singleton) {
        // TODO:
        // 为了保证新传入的props能够被渲染，在没有其他更好办法的情况下，先销毁实例，然后重新创建
        for (const instanceId in PopUpComponent.instances) {
          const instance = PopUpComponent.instances[instanceId];
          instance.close(true);
        }
      }

      const instanceId = getInstanceId();
      const overlay = document.createElement('div');

      const instance = ReactDOM.render(
        <PopUpComponent
          container={container}
          transition={transition}
          onShown={onShown}
          onClosed={onClosed}>
          <WrappedComponent {...wrappedProps} />
        </PopUpComponent>,
        overlay
      ) as any;

      instance.overlay = overlay;
      instance.instanceId = instanceId;
      PopUpComponent.instances[instanceId] = instance;
      return instanceId;
    }

    /**
     * 关闭popup弹窗，默认关闭所有弹窗(同类)
     * @static hide 静态方法
     * @param {string} [instanceId] 可以外部传入执有的popup实例ID引用，销毁该弹窗
     */
    static hide(instanceId?: string) {
      if (instanceId) {
        const instance = PopUpComponent.instances[instanceId];
        instance && instance.close();
        return;
      }
      // 关闭所有弹窗
      for (const instanceId in PopUpComponent.instances) {
        const instance = PopUpComponent.instances[instanceId];
        instance.close();
      }
    }

    static get(instanceId: string) {
      const instance = PopUpComponent.instances[instanceId];
      return instance ? instance : null;
    }

    // 假的容器
    // 因为createPortal真实渲染的容器是container
    overlay: Element | null = null;
    instanceId: string | null = null;

    render() {
      const { container = document.body, children } = this.props;
      const childElement = Children.only(children) as React.ReactElement;
      const clonedElement = cloneElement(childElement, {
        onClose: () => {
          this.close();
          childElement.props.onClose && childElement.props.onClose();
        },
      });
      return createPortal(clonedElement, container);
    }

    /**
     * 关闭自身，卸载组件
     */
    close(immediate?: boolean) {
      const { transition } = this.props;
      if (!immediate && transition) {
        this.removeTransition(() => this._close());
        return;
      }
      this._close();
    }

    _close() {
      // NOTE: 卸载组件，要用传递给render的那个假容器来卸载
      this.overlay && unmountComponentAtNode(this.overlay);
    }

    addTransition() {
      const { transition } = this.props;
      if (!transition) return;
      const node = ReactDOM.findDOMNode(this) as Element;
      node.classList.add(transition);
    }

    removeTransition(callback: () => void) {
      const { transition } = this.props;
      if (!transition) return;
      const node = ReactDOM.findDOMNode(this) as Element;
      const onTransitionEnd = () => {
        callback();
        node.removeEventListener('transitionend', onTransitionEnd);
      };
      node.addEventListener('transitionend', onTransitionEnd);
      node.classList.remove(transition);
    }

    componentDidMount() {
      const { transition, onShown } = this.props;
      if (transition) window.setTimeout(() => this.addTransition(), 0);
      onShown && onShown();
    }

    componentWillUnmount() {
      const { onClosed } = this.props;
      onClosed && onClosed();
      // 卸载后，清除实例引用
      if (this.instanceId) {
        delete PopUpComponent.instances[this.instanceId];
      }
    }
  };
}

export default factory;
