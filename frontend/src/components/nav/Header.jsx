import { LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../../assets/perde-peso.png';

const Header = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('h');
  
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);

    if (e.key === 'logout') {
      handleLogout();
    }
  };

  const handleLogout = () => {

    navigate('/login');
  };

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <img 
          src={Logo} 
          style={{
            width: '5%',
            padding: '8px',
          }} 
          alt="Logo" 
        />
        <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ marginLeft: 'auto', padding: '8px' }}>
          <span>Sair</span>
        </Menu.Item>
      </Menu>
      <Outlet />
    </>
  );
};

export default Header;
