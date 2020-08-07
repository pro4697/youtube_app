import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';

function LeftMenu(props) {
  const user = useSelector((state) => state.user);
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='mail'>
          <a href='/'>Home</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='mail'>
          <a href='/'>Home</a>
        </Menu.Item>
        <Menu.Item key='subscription'>
          <a href='/subscription'>Subscription</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default LeftMenu;
