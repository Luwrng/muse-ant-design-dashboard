# Hướng dẫn Debug Authentication

## Vấn đề hiện tại
Admin account không được chuyển hướng đến admin routes sau khi đăng nhập.

## Các bước debug

### 1. Kiểm tra Console Logs
Sau khi đăng nhập, mở Developer Tools (F12) và xem Console để kiểm tra:
- `🔍 Đang lấy thông tin user...`
- `📋 Thông tin user nhận được:`
- `👤 Role của user:`
- `💾 Đã lưu role vào localStorage:`
- `🚀 Chuyển hướng đến admin dashboard` hoặc `🌱 Chuyển hướng đến gardener dashboard`

### 2. Sử dụng DebugInfo Component
Component DebugInfo sẽ hiển thị ở góc trái màn hình với:
- Auth Token
- Account ID  
- Account Name
- User Role
- Avatar

### 3. Test nhanh với DebugInfo
- Click "Set Admin" để test admin role
- Click "Set Gardener" để test gardener role
- Click "Clear All" để xóa tất cả và đăng nhập lại

### 4. Kiểm tra API Response
Trong Console, xem response của API `/accounts/{accountId}` có chứa field role không:
- `roleName`
- `role` 
- `roleId`

### 5. Các nguyên nhân có thể

#### A. API không trả về role
```javascript
// Response có thể thiếu field role
{
  "accountId": "123",
  "name": "Admin User",
  "email": "admin@example.com"
  // Thiếu roleName, role, hoặc roleId
}
```

#### B. Field name khác
```javascript
// Có thể field tên khác
{
  "accountId": "123", 
  "name": "Admin User",
  "userRole": "admin",  // Tên field khác
  "accountRole": "admin" // Hoặc tên này
}
```

#### C. API endpoint sai
- Endpoint `/accounts/me` có thể không tồn tại
- Đã thay đổi thành `/accounts/{accountId}`

### 6. Cách fix

#### Fix 1: Cập nhật field name trong SignIn.js
```javascript
const userRole = userInfo.userRole?.toLowerCase() || 
                userInfo.accountRole?.toLowerCase() ||
                userInfo.roleName?.toLowerCase() || 
                userInfo.role?.toLowerCase() || 
                userInfo.roleId?.toLowerCase() || 
                "guest";
```

#### Fix 2: Hardcode test (tạm thời)
Trong SignIn.js, uncomment dòng:
```javascript
// userRole = "admin";
```

#### Fix 3: Kiểm tra backend API
Đảm bảo API `/accounts/{accountId}` trả về field role với tên đúng.

### 7. Test Cases

#### Test Case 1: Admin Account
1. Đăng nhập với admin account
2. Kiểm tra console logs
3. Kiểm tra DebugInfo component
4. Xem có chuyển hướng đến `/dashboard` không

#### Test Case 2: Gardener Account  
1. Đăng nhập với gardener account
2. Kiểm tra console logs
3. Kiểm tra DebugInfo component
4. Xem có chuyển hướng đến `/gardener/dashboard` không

#### Test Case 3: Manual Role Test
1. Đăng nhập bất kỳ account nào
2. Click "Set Admin" trong DebugInfo
3. Refresh trang
4. Xem có vào admin dashboard không

### 8. Expected Behavior

#### Admin Login:
```
🔍 Đang lấy thông tin user...
📋 Thông tin user nhận được: {roleName: "admin", ...}
👤 Role của user: admin
💾 Đã lưu role vào localStorage: admin
🚀 Chuyển hướng đến admin dashboard
```

#### Gardener Login:
```
🔍 Đang lấy thông tin user...
📋 Thông tin user nhận được: {roleName: "gardener", ...}
👤 Role của user: gardener
💾 Đã lưu role vào localStorage: gardener
🌱 Chuyển hướng đến gardener dashboard
```

### 9. Troubleshooting Commands

#### Kiểm tra localStorage:
```javascript
// Trong browser console
console.log('Token:', localStorage.getItem('auth_token'));
console.log('Role:', localStorage.getItem('user_role'));
console.log('Account ID:', localStorage.getItem('account_id'));
```

#### Test API manually:
```javascript
// Trong browser console
const token = localStorage.getItem('auth_token');
const accountId = localStorage.getItem('account_id');

fetch(`YOUR_API_URL/accounts/${accountId}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log('API Response:', data));
``` 