# 🔧 Prisma Client Error - Fix Guide for Saha HMS

## ❌ Error Description

When deploying from GitHub, you're getting this error:

```
Error: @prisma/client did not initialize yet.
Please run "prisma generate" and try to import it again.
```

## ✅ Solution Applied

The error occurs because Prisma Client needs to be generated after installing dependencies. This is now **automatically fixed** with the updated `package.json`.

## 🚀 Deployment Instructions (For Windows Users)

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/saha-hms.git
cd saha-hms/backend
```

### Step 2: Install Dependencies

```bash
npm install
```

**✅ The Prisma client will now generate automatically after `npm install`** (due to the `postinstall` script)

### Step 3: Set Up Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DATABASE_URL="mysql://root:password@localhost:3306/saha_hms"

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your_secure_jwt_secret_key_here

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Step 4: Database Setup

```bash
# Create the database
npx prisma migrate dev --name init

# Seed initial data (optional)
npx prisma db seed
```

### Step 5: Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🛠️ Manual Fix (If Needed)

If you still encounter the Prisma error, manually run:

```bash
cd backend
npx prisma generate
```

## 📝 What Was Changed

**File:** `backend/package.json`

**Added Script:**
```json
"postinstall": "npx prisma generate"
```

This ensures Prisma Client is **automatically generated** every time you run `npm install`.

## 🔄 Common Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio (Database GUI)
npm run prisma:studio

# Seed database
npm run prisma:seed
```

## 🐛 Troubleshooting

### Issue 1: "Prisma schema not found"
**Solution:**
```bash
cd backend
ls prisma/schema.prisma  # Verify file exists
npx prisma generate
```

### Issue 2: "Database connection error"
**Solution:**
- Check `.env` file has correct DATABASE_URL
- Ensure MySQL/PostgreSQL is running
- Verify database credentials

### Issue 3: "Module not found: @prisma/client"
**Solution:**
```bash
npm install @prisma/client
npx prisma generate
```

## 📦 Complete Setup Checklist

- [x] Repository cloned
- [x] Dependencies installed (`npm install`)
- [x] Prisma Client generated (automatic with `postinstall`)
- [ ] `.env` file created and configured
- [ ] Database created
- [ ] Migrations run (`npx prisma migrate dev`)
- [ ] Server started (`npm run dev`)

## 🌐 Frontend Setup

Don't forget to set up the frontend too:

```bash
cd ../frontend
npm install
npm run dev
```

## 📞 Support

If you still encounter issues:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Run `npx prisma generate` manually
4. Try starting the server

## ✅ Verification

After setup, verify Prisma is working:

```bash
# Check if Prisma client exists
ls node_modules/.prisma/client/

# You should see files like:
# - index.js
# - schema.prisma
# - default.js
```

## 🎯 Quick Commands Summary

```bash
# One-time setup
cd saha-hms/backend
npm install                    # Installs deps + generates Prisma
npx prisma migrate dev        # Creates database schema

# Daily development
npm run dev                   # Start dev server

# Database management
npm run prisma:studio         # Open database GUI
npm run prisma:generate       # Regenerate Prisma client
```

---

**Last Updated:** November 15, 2024
**Status:** ✅ Fixed with automatic postinstall script
