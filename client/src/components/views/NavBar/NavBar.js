import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import Logo from './logo.png';
import './Sections/Navbar.css';

function NavBar() {
  const user = useSelector((state) => state.user.userData);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className='menu'>
      <div className='menu__logo'>
        <a href='/'>
          <img src={Logo} className='menu__img' alt='K-Tube' />
          K-Tube
        </a>
      </div>
      <div className='menu__container'>
        <div className='menu_left'>
          <LeftMenu mode='horizontal' />
        </div>
        <div className='menu_rigth'>
          <RightMenu mode='horizontal' />
        </div>
        <Button
          className='menu__mobile-button'
          type='primary'
          onClick={showDrawer}
        >
          <Icon type='align-right' />
        </Button>
        <Drawer
          title={user !== undefined ? user.name : null}
          placement='right'
          className='menu_drawer'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode='inline' />
          <RightMenu mode='inline' />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
