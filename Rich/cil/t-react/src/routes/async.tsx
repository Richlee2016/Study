import * as React from 'react';

export default function asyncComponent(importComponent: any) {
    class AsyncComponent extends React.Component {
        public state = {
            component: null,
        };
        async componentDidMount() {
            const { default: component } = await importComponent();
            this.setState({
                component: component,
            });
        }
        render() {
            const C: any = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
    return AsyncComponent;
}
