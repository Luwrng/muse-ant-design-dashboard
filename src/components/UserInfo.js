import React from 'react';
import { Avatar, Dropdown, Menu, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const UserInfo = () => {
    const history = useHistory();
    const userName = localStorage.getItem('account_name') || 'User';
    const userAvatar = localStorage.getItem('account_avatar');
    const userRole = localStorage.getItem('user_role') || 'guest';

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    };

    const menu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <span>Role: {userRole}</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Avatar
                    src={userAvatar}
                    icon={<UserOutlined />}
                    style={{ marginRight: 8 }}
                />
                <span>{userName}</span>
            </div>
        </Dropdown>
    );
};

export default UserInfo; 