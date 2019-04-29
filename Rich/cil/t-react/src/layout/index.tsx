import * as React from 'react';
import { Layout } from 'antd';
import Routers from '../routes';
const { Content, Sider, Footer, Header } = Layout;
import './zstyle.less';

export default class LayoutIndex extends React.Component {
    render() {
        return (
            <Layout className="content">
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        <Routers />
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        );
    }
}
