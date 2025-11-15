# ✅ Global Language System - Admin Controlled

## 🎯 System Overview

**Type**: System-wide language setting (NOT per-user)  
**Control**: ADMIN users only  
**Persistence**: Database-backed (MySQL)  
**Loading**: Zero delay, fetched on app initialization

---

## 🔧 How It Works

### 1. **Admin Sets Language**
- Only users with `role = 'ADMIN'` can see the language switcher
- When admin clicks the language button, it updates the **entire system**
- The change is saved to the database (`system_settings` table)

### 2. **All Users See Same Language**
- When any user loads the app, it fetches the global language setting from `/api/settings/system`
- Everyone sees the same language that the admin configured
- No per-user preferences - it's system-wide

### 3. **No Switching on Load**
- Language is fetched **once** when the app initializes
- Once set to Arabic, it **stays in Arabic** for everyone
- No flashing or switching between languages during load

---

## 📁 Files Modified/Created

### Backend

1. **New Model: SystemSettings**
   - File: `backend/prisma/schema.prisma`
   - Fields:
     - `defaultLanguage` (String): 'en' or 'ar'
     - `defaultDirection` (String): 'ltr' or 'rtl'
   - Table: `system_settings`

2. **New Controller: settingsController.js**
   - `getSystemSettings()` - Public endpoint, anyone can fetch
   - `updateSystemLanguage()` - Protected endpoint, ADMIN only

3. **New Routes: settingsRoutes.js**
   - `GET /api/settings/system` - Get current system language (public)
   - `PUT /api/settings/system/language` - Update system language (admin only)

4. **Updated: server.js**
   - Added `import settingsRoutes`
   - Registered `/api/settings` route

### Frontend

1. **Updated: LanguageContext.jsx**
   - Removed localStorage-based language storage
   - Added `fetchSystemLanguage()` - fetches from API on mount
   - Added `updateSystemLanguage()` - admin function to update system-wide language
   - Added `loading` state while fetching initial language

2. **Updated: LanguageSwitcher.jsx**
   - Only visible to ADMIN users (`if (!user || user.role !== 'ADMIN') return null`)
   - Calls `updateSystemLanguage()` when clicked
   - Shows loading state (`updating`) during API call
   - Shows success/error messages

---

## 🔐 Security

### Access Control

**Language Switcher Visibility:**
```jsx
if (!user || user.role !== 'ADMIN') {
  return null; // Button hidden for non-admin users
}
```

**Backend API Protection:**
```javascript
router.put('/system/language', 
  authenticate,           // Must be logged in
  checkRole(['ADMIN']),   // Must be ADMIN role
  updateSystemLanguage
);
```

### Public vs Protected Routes

| Endpoint | Access | Purpose |
|----------|--------|---------|
| `GET /api/settings/system` | Public | All users need to know the system language |
| `PUT /api/settings/system/language` | Admin Only | Only admins can change it |

---

## 🗄️ Database Schema

```sql
CREATE TABLE system_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  defaultLanguage VARCHAR(10) DEFAULT 'en',
  defaultDirection VARCHAR(10) DEFAULT 'ltr',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Default Values:**
- Language: `'en'` (English)
- Direction: `'ltr'` (Left-to-Right)

**After admin switches to Arabic:**
- Language: `'ar'`
- Direction: `'rtl'`

---

## 🚀 User Flow

### Admin User Flow

1. **Admin logs in** (admin@vitalcore.com / admin123)
2. **Sees language switcher** in TopBar (shows "عربي" button)
3. **Clicks the button**
4. **API call made**: `PUT /api/settings/system/language { language: 'ar' }`
5. **Database updated**: `defaultLanguage = 'ar', defaultDirection = 'rtl'`
6. **UI instantly switches** to Arabic/RTL
7. **All other users** now see Arabic when they load/refresh

### Non-Admin User Flow

1. **User logs in** (doctor, nurse, etc.)
2. **Language switcher is hidden** (they can't change it)
3. **Sees whatever language admin set**
4. **If admin set Arabic**: User sees Arabic
5. **If admin set English**: User sees English

### First-Time Load

1. **App initializes**
2. **LanguageContext fetches**: `GET /api/settings/system`
3. **Receives**: `{ defaultLanguage: 'ar', defaultDirection: 'rtl' }`
4. **Sets language immediately**: No switching, no flash
5. **Renders in Arabic**: Entire app in Arabic from the start

---

## 💡 Key Features

### ✅ System-Wide Control
- One setting for the entire hospital
- Admin decides the language
- All users see the same language

### ✅ No Per-User Preferences
- No localStorage per user
- No user-specific language settings
- Everyone sees the admin's choice

### ✅ Persistent Across Sessions
- Saved in database, not browser
- Survives server restarts
- Survives browser cache clears

### ✅ Zero Loading Delay
- Fetched once on app init
- No flashing between languages
- Instant RTL flip when set to Arabic

### ✅ Instant Switch
- Admin changes language
- All logged-in users see change immediately (on next action/refresh)
- No page reload required for admin

---

## 🧪 Testing

### Test as Admin

1. Login as admin: `admin@vitalcore.com` / `admin123`
2. You should see language switcher button in TopBar
3. Click it - should switch to Arabic immediately
4. Check database: `SELECT * FROM system_settings;`
   - Should show `defaultLanguage = 'ar'`
5. Logout and login as different user
6. Should see Arabic interface

### Test as Non-Admin

1. Login as doctor: `doctor@vitalcore.com` / `doctor123`
2. Language switcher should be **hidden**
3. Should see whatever language admin set
4. Cannot change language (no button visible)

### Test Persistence

1. Admin sets language to Arabic
2. Stop backend: `docker-compose down`
3. Start backend: `docker-compose up -d`
4. Login as any user
5. Should still be in Arabic (persisted in database)

---

## 📊 API Reference

### Get System Settings
```bash
GET /api/settings/system

# Response
{
  "success": true,
  "data": {
    "id": 1,
    "defaultLanguage": "ar",
    "defaultDirection": "rtl",
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:30:00.000Z"
  }
}
```

### Update System Language (Admin Only)
```bash
PUT /api/settings/system/language
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "language": "ar"
}

# Response
{
  "success": true,
  "message": "System language updated to Arabic",
  "data": {
    "id": 1,
    "defaultLanguage": "ar",
    "defaultDirection": "rtl",
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:35:00.000Z"
  }
}
```

---

## 🔄 Migration Required

After implementing this, you need to:

1. **Create Prisma Migration**:
```bash
cd /root/saha-hms
docker-compose exec backend npx prisma migrate dev --name add_system_settings
```

2. **Or using setup script**:
```bash
./setup.sh
# Migration will run automatically
```

---

## ✅ Comparison: Before vs After

### Before (Per-User localStorage)
- ❌ Each user could set their own language
- ❌ Stored in browser localStorage
- ❌ Lost on browser cache clear
- ❌ Not consistent across users
- ❌ No admin control

### After (Global Database Setting)
- ✅ One language for entire system
- ✅ Stored in MySQL database
- ✅ Persists across sessions
- ✅ Consistent for all users
- ✅ Admin-only control
- ✅ Fetched on app init (no delay)

---

## 🎊 Summary

**What was changed:**
1. Added `SystemSettings` model to database
2. Created backend API for system language management
3. Updated `LanguageContext` to fetch from API (not localStorage)
4. Updated `LanguageSwitcher` to only show for ADMIN
5. Language is now **system-wide**, not per-user

**Result:**
- When admin sets Arabic → **everyone sees Arabic**
- When admin sets English → **everyone sees English**
- No switching on load, no delays
- Perfect for hospital-wide language policy

---

Built with ❤️ for consistent multi-language experience
