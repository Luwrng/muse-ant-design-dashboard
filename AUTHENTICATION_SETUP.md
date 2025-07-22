# Hướng dẫn Setup Authentication và Role-based Routing

## Tổng quan
Hệ thống đã được cập nhật để hỗ trợ authentication và role-based routing. Khi user đăng nhập, hệ thống sẽ kiểm tra role và chuyển hướng đến trang phù hợp.

## Các Role được hỗ trợ
- **admin**: Truy cập vào admin dashboard (`/dashboard`)
- **gardener**: Truy cập vào gardener dashboard (`/gardener/dashboard`)
- **retailer**: Truy cập vào gardener dashboard (`/gardener/dashboard`)
- **guest**: Truy cập vào gardener dashboard (`/gardener/dashboard`)

## Các Component đã được tạo/cập nhật

### 1. ProtectedRoute Component (`src/components/ProtectedRoute.js`)
- Kiểm tra authentication token
- Kiểm tra role của user
- Chuyển hướng nếu không có quyền truy cập

### 2. UserInfo Component (`src/components/UserInfo.js`)
- Hiển thị thông tin user (tên, avatar, role)
- Nút đăng xuất
- Dropdown menu với thông tin user

### 3. AuthCheck Component (`src/components/AuthCheck.js`)
- Kiểm tra authentication khi load app
- Tự động chuyển hướng nếu đã đăng nhập

### 4. Cập nhật SignIn Component (`src/pages/SignIn.js`)
- Sau khi đăng nhập thành công, gọi API để lấy thông tin user
- Lưu role vào localStorage
- Chuyển hướng dựa trên role

### 5. Cập nhật authenticateService (`src/pages/services/apiServices/authenticateService.js`)
- Thêm function `getUserInfo()` để lấy thông tin user

## Cách hoạt động

### 1. Đăng nhập
```javascript
// Khi user đăng nhập thành công
const result = await authenticateService.login(values);
const userInfo = await authenticateService.getUserInfo();
const userRole = userInfo.roleName?.toLowerCase();

// Lưu thông tin vào localStorage
localStorage.setItem("auth_token", result.token);
localStorage.setItem("user_role", userRole);

// Chuyển hướng dựa trên role
if (userRole === "admin") {
  history.push("/dashboard");
} else {
  history.push("/gardener/dashboard");
}
```

### 2. Bảo vệ Route
```javascript
// Route chỉ dành cho admin
<ProtectedRoute 
  path="/dashboard" 
  component={Home} 
  allowedRoles={['admin']} 
/>

// Route dành cho gardener và retailer
<ProtectedRoute 
  path="/gardener/dashboard" 
  component={GDashboard} 
  allowedRoles={['gardener', 'retailer']} 
/>
```

### 3. Kiểm tra Authentication
```javascript
// AuthCheck component tự động kiểm tra
const authToken = localStorage.getItem('auth_token');
const userRole = localStorage.getItem('user_role');

if (!authToken) {
  history.push('/'); // Về trang đăng nhập
}
```

## API Endpoints cần thiết

### 1. Login API
```
POST /login
Body: { phoneNumber, password }
Response: { token, accountId, name, avatar }
```

### 2. Get User Info API
```
GET /accounts/me
Headers: Authorization: Bearer {token}
Response: { roleName, ...otherUserInfo }
```

## Cách test

### 1. Test với Admin Account
- Đăng nhập với tài khoản có role "admin"
- Hệ thống sẽ chuyển hướng đến `/dashboard`
- Có thể truy cập tất cả admin routes

### 2. Test với Gardener Account
- Đăng nhập với tài khoản có role "gardener"
- Hệ thống sẽ chuyển hướng đến `/gardener/dashboard`
- Chỉ có thể truy cập gardener routes

### 3. Test với Retailer Account
- Đăng nhập với tài khoản có role "retailer"
- Hệ thống sẽ chuyển hướng đến `/gardener/dashboard`
- Có thể truy cập gardener routes

## Lưu ý quan trọng

1. **Backend API**: Đảm bảo API `/accounts/me` trả về field `roleName` với giá trị chính xác
2. **Token Management**: Token được lưu trong localStorage, có thể cân nhắc sử dụng httpOnly cookies cho bảo mật cao hơn
3. **Error Handling**: Hệ thống có xử lý lỗi khi không thể lấy thông tin user
4. **Logout**: Khi đăng xuất, tất cả thông tin trong localStorage sẽ bị xóa

## Troubleshooting

### Lỗi "Không thể lấy thông tin user"
- Kiểm tra API endpoint `/accounts/me` có hoạt động không
- Kiểm tra token có hợp lệ không
- Kiểm tra response format của API

### User không được chuyển hướng đúng
- Kiểm tra field `roleName` trong response API
- Kiểm tra logic chuyển hướng trong `SignIn.js`
- Kiểm tra localStorage có lưu đúng thông tin không 