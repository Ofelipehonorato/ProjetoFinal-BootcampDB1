import { Layout, Space } from 'antd';


function HeaderStyle {
    const {
        Header, Footer, Sider, Content,
    } = Layout;
    const headerStyle = {
        textAlign: 'center',
        color: '#000', // Alterado para texto preto para contrastar com o fundo branco
        height: 64,
        padding: '0 50px', // Alterado para espaçamento horizontal usando shorthand padding
        lineHeight: '64px',
        backgroundColor: '#ffffff', // Alterado para fundo branco
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    };
    const contentStyle = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundImage: 'url(gymblur.jpg")',

    };
    const siderStyle = {
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#3ba0e9',
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7dbcea',
    };
}

export default HeaderStyle;