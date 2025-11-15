# 🚀 Saha HMS - Complete Deployment Guide

## Problem Solved

When users pull from GitHub, they need:
- ✅ All database tables created
- ✅ Default users with login credentials
- ✅ System settings configured
- ✅ Everything ready to use immediately

## One-Command Setup

### For Linux/Mac:

```bash
cd saha-hms/backend
chmod +x complete_setup.sh
./complete_setup.sh
```

**Note:** The script will automatically install all backend AND frontend dependencies!

### For Windows:

```cmd
cd saha-hms\backend
complete_setup.bat
```

**Note:** The script will automatically install all backend AND frontend dependencies!

## What the Setup Script Does

1. **Installs Backend Dependencies** - Runs npm install automatically
2. **Generates Prisma Client** - Creates database models
3. **Runs Migrations** - Creates all database tables
4. **Seeds Default Users** - Creates admin, doctor, nurse, receptionist
5. **Creates System Settings** - Configures English/LTR defaults
6. **Installs Frontend Dependencies** - Sets up frontend automatically
7. **Verifies Setup** - Confirms everything is working

## Default Users Created

After setup, you can login with these credentials:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@saha-hms.com | admin123 |
| **Doctor** | doctor@saha-hms.com | admin123 |
| **Nurse** | nurse@saha-hms.com | admin123 |
| **Receptionist** | receptionist@saha-hms.com | admin123 |

## Complete Step-by-Step Deployment

### 1. Clone Repository

```bash
git clone https://github.com/maanisingh/saha-hms.git
cd saha-hms
```

### 2. Backend Setup

```bash
cd backend

# Configure environment (if .env doesn't exist)
cp .env.example .env
# Edit .env with your database credentials

# Run complete setup (installs deps + creates tables + users + settings)
./complete_setup.sh     # Linux/Mac
# OR
complete_setup.bat      # Windows

# Start backend server
npm run dev
```

**Note:** You don't need to run `npm install` manually - the setup script does it!

Server will run on: **http://localhost:8100**

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Frontend dependencies already installed by setup script!
# Just start the dev server

npm run dev
```

**Note:** The backend setup script already installed frontend dependencies!

Frontend will run on: **http://localhost:5173**

### 4. Access the Application

Open browser: **http://localhost:5173**

Login with:
- **Email:** admin@saha-hms.com
- **Password:** admin123

## Database Configuration

Edit `backend/.env`:

```env
# MySQL Database (Default)
DATABASE_URL="mysql://root:password@localhost:3306/hospital_db"

# OR PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/hospital_db"

# Server Configuration
PORT=8100
NODE_ENV=development

# JWT Secret (change this!)
JWT_SECRET=your_super_secret_key_change_this_in_production

# CORS Origin
CORS_ORIGIN=http://localhost:5173
```

## Manual Setup (If Script Fails)

### Step 1: Generate Prisma Client

```bash
npx prisma generate
```

### Step 2: Run Migrations

```bash
npx prisma migrate deploy
```

### Step 3: Create Users Manually

```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin User',
        email: 'admin@saha-hms.com',
        password: password,
        role: 'ADMIN',
        phone: '+1234567890'
      },
      {
        name: 'Dr. Ahmed Hassan',
        email: 'doctor@saha-hms.com',
        password: password,
        role: 'DOCTOR',
        phone: '+1234567891'
      }
    ]
  });

  console.log('Users created!');
  await prisma.\$disconnect();
}

main();
"
```

### Step 4: Create System Settings

```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.systemSettings.create({
    data: {
      defaultLanguage: 'en',
      defaultDirection: 'ltr'
    }
  });

  console.log('Settings created!');
  await prisma.\$disconnect();
}

main();
"
```

## Troubleshooting

### Issue 1: Prisma Client Error

```bash
Error: @prisma/client did not initialize yet
```

**Solution:**
```bash
npx prisma generate
```

### Issue 2: Database Connection Error

```bash
Error: P1000: Authentication failed
```

**Solution:**
- Check DATABASE_URL in `.env`
- Verify MySQL/PostgreSQL is running
- Confirm database exists

### Issue 3: Migration Failed

```bash
Error: Migration failed
```

**Solution:**
```bash
# Create database first
mysql -u root -p -e "CREATE DATABASE hospital_db;"

# Then run migrations
npx prisma migrate deploy
```

### Issue 4: Users Already Exist

```bash
Error: Unique constraint failed
```

**Solution:**
This is OK! Users were created in a previous run. You can proceed.

## Verification Checklist

After setup, verify:

- [ ] Backend running on http://localhost:8100
- [ ] Frontend running on http://localhost:5173
- [ ] Can login with admin@saha-hms.com / admin123
- [ ] Dashboard loads successfully
- [ ] Language switcher visible (admin only)
- [ ] Can switch between English ↔ Arabic

## Database Tables Created

The setup creates these tables:

- ✅ `users` - User accounts
- ✅ `patients` - Patient records
- ✅ `appointments` - Appointments
- ✅ `prescriptions` - Prescriptions
- ✅ `departments` - Hospital departments
- ✅ `medicines` - Medicine inventory
- ✅ `lab_orders` - Lab tests
- ✅ `radiology_orders` - Radiology tests
- ✅ `system_settings` - Language & system config
- ✅ And many more...

## Features After Setup

✅ **Multi-user system** with role-based access
✅ **Patient management** - Add, edit, view patients
✅ **Appointment scheduling** - Book and manage appointments
✅ **Prescription management** - Create and track prescriptions
✅ **Lab & Radiology** - Order and track tests
✅ **Pharmacy** - Manage medicine inventory
✅ **Billing** - Generate invoices
✅ **Reports** - Analytics and reporting
✅ **Language switching** - English ↔ Arabic (Admin only)
✅ **RTL/LTR support** - Full bidirectional text support

## Production Deployment

For production:

1. **Change passwords** in database
2. **Set strong JWT_SECRET** in .env
3. **Use production database** (not localhost)
4. **Enable HTTPS**
5. **Set NODE_ENV=production**
6. **Build frontend:** `npm run build`
7. **Use PM2 or systemd** for backend

## Support

If you encounter issues:

1. Check `backend/.env` configuration
2. Verify database is running
3. Run `./complete_setup.sh` again
4. Check console for error messages
5. Refer to `LANGUAGE_UPDATE_FIX.md` for language issues

## Quick Start Summary

```bash
# Clone
git clone https://github.com/maanisingh/saha-hms.git
cd saha-hms

# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with database config
./complete_setup.sh
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev

# Open browser
# http://localhost:5173
# Login: admin@saha-hms.com / admin123
```

---

**Repository:** https://github.com/maanisingh/saha-hms
**Last Updated:** November 15, 2024
**Status:** ✅ Production Ready
