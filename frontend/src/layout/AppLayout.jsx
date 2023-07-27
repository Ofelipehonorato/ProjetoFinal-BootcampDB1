/* eslint-disable indent */
/* eslint-disable linebreak-style */
import {
    Button, Col, Layout, Menu, Popconfirm, Row,
} from 'antd';
import { useCallback, useMemo } from 'react';
import { useNavigate, matchPath, useLocation } from 'react-router-dom';

import Logo from '../assets/perde-peso-logo.png';
import LocalStorageHelper from '../helpers/localstorage-helper';

import './AppLayout.css';

const { Header, Footer } = Layout;

const MENU_ITEMS = [
    {
        path: '/tasks',
        label: 'Minhas tarefas',
    },
    {
        path: '/tasks/new',
        label: 'Nova tarefa',
    },
];

function AppLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const selectedKeys = useMemo(() => {
        const cuerrentRoute = MENU_ITEMS.find((item) => matchPath(item.path, location.pathname));

        if (!cuerrentRoute) return [];

        return [cuerrentRoute.path];
    }, [location]);

    const renderMenuItem = (item) => (
        {
            key: item.path,
            label: item.label,
        }
    );

    const handleLogout = useCallback(() => {
        LocalStorageHelper.removeToken();
        navigate('/login');
    }, [navigate]);

    const handleMenuClick = useCallback((item) => {
        navigate(item.key);
    }, [navigate]);

    return (
      <Layout className="AppLayout_layout">
        <Header
          style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                }}
        >
          <img
            src={Logo}
            style={{
                        height: 40,
                        marginLeft: 16,
                        marginRight: 16,
                    }}
            alt="Logotipo"
          />

          <Menu
            style={{
                        flex: 1,
                    }}
            selectedKeys={selectedKeys}
            mode="horizontal"
            theme="dark"
            items={MENU_ITEMS.map(renderMenuItem)}
            onClick={handleMenuClick}
          />
          <Popconfirm
            onConfirm={handleLogout}
            okText="Sair"
            okType="danger"
            cancelText="Cancelar"
            title="Deseja sair do sistema?"
            placement="leftTop"
          >
            <Button
              type="text"
              danger
            >
              Sair
            </Button>
          </Popconfirm>
        </Header>

        {children}

        <Footer>
          <Row justify="center">
            <Col>
              Bootcamp DB1 © 2023
            </Col>
          </Row>
        </Footer>
      </Layout>
    );
}

export default AppLayout;
