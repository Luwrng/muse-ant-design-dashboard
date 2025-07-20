import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRoles = [], ...rest }) => {
    const userRole = localStorage.getItem('user_role') || 'guest';
    const authToken = localStorage.getItem('auth_token');

    // Nếu không có token, chuyển về trang đăng nhập
    if (!authToken) {
        return <Redirect to="/" />;
    }

    // Nếu không có allowedRoles hoặc user có role được phép
    if (allowedRoles.length === 0 || allowedRoles.includes(userRole)) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    }

    // Nếu không có quyền, chuyển hướng dựa trên role
    if (userRole === 'admin') {
        return <Redirect to="/dashboard" />;
    } else {
        return <Redirect to="/gardener/dashboard" />;
    }
};

export default ProtectedRoute; 