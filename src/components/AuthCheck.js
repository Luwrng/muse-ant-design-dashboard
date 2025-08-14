import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthCheck = ({ children }) => {
    const history = useHistory();

    useEffect(() => {
        const authToken = localStorage.getItem('auth_token');
        const userRole = localStorage.getItem('user_role');
        const currentPath = window.location.pathname;

        // Cho phép truy cập vào trang đăng nhập và đăng ký mà không cần token
        if (currentPath === '/' || currentPath === '/sign-in' || currentPath === '/sign-up') {
            // Nếu đã có token và đang ở trang đăng nhập, chuyển hướng
            if (authToken && currentPath === '/sign-in') {
                if (userRole === 'admin') {
                    history.push('/dashboard');
                } else {
                    history.push('/gardener/dashboard');
                }
            }
            return;
        }

        // Với các route khác, kiểm tra token
        if (!authToken) {
            // Nếu không có token, chuyển về trang đăng nhập
            history.push('/');
            return;
        }
    }, [history]);

    return <>{children}</>;
};

export default AuthCheck; 