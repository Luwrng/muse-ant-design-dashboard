import React from 'react';
import { Card, Typography, Button } from 'antd';

const { Text, Title } = Typography;

const DebugInfo = () => {
    const authToken = localStorage.getItem('auth_token');
    const accountId = localStorage.getItem('account_id');
    const accountName = localStorage.getItem('account_name');
    const userRole = localStorage.getItem('user_role');
    const accountAvatar = localStorage.getItem('account_avatar');

    const clearAll = () => {
        localStorage.clear();
        window.location.reload();
    };

    const setAdminRole = () => {
        localStorage.setItem('user_role', 'admin');
        window.location.reload();
    };

    const setGardenerRole = () => {
        localStorage.setItem('user_role', 'gardener');
        window.location.reload();
    };

    return (
        <Card
            title="🔧 Debug Information"
            style={{
                position: 'fixed',
                top: 10,
                left: 10,
                zIndex: 9999,
                maxWidth: 400,
                backgroundColor: '#f0f8ff'
            }}
        >
            <div style={{ marginBottom: 10 }}>
                <Text strong>Auth Token: </Text>
                <Text code>{authToken ? `${authToken.substring(0, 20)}...` : 'None'}</Text>
            </div>

            <div style={{ marginBottom: 10 }}>
                <Text strong>Account ID: </Text>
                <Text code>{accountId || 'None'}</Text>
            </div>

            <div style={{ marginBottom: 10 }}>
                <Text strong>Account Name: </Text>
                <Text code>{accountName || 'None'}</Text>
            </div>

            <div style={{ marginBottom: 10 }}>
                <Text strong>User Role: </Text>
                <Text code style={{
                    color: userRole === 'admin' ? '#52c41a' :
                        userRole === 'gardener' ? '#1890ff' : '#faad14'
                }}>
                    {userRole || 'None'}
                </Text>
            </div>

            <div style={{ marginBottom: 15 }}>
                <Text strong>Avatar: </Text>
                <Text code>{accountAvatar ? 'Yes' : 'None'}</Text>
            </div>

            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                <Button size="small" onClick={setAdminRole} type="primary">
                    Set Admin
                </Button>
                <Button size="small" onClick={setGardenerRole} type="default">
                    Set Gardener
                </Button>
                <Button size="small" onClick={clearAll} danger>
                    Clear All
                </Button>
            </div>
        </Card>
    );
};

export default DebugInfo; 