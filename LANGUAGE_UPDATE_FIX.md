# 🔧 Language Update Failing - Fix Guide

## Problem

User reports that language update is failing when deploying. The issue is that the **`system_settings` table does not exist** in the database.

## Root Cause

The `SystemSettings` model exists in `prisma/schema.prisma` but the migration was never created, so the table doesn't exist in the database.

## Solution

### Option 1: Run Migration (Recommended)

```bash
cd backend

# Run the migration
npx prisma migrate deploy

# Or if in development
npx prisma migrate dev
```

### Option 2: Manual SQL Execution

If migrations fail, run this SQL directly in your MySQL database:

```sql
-- Create system_settings table
CREATE TABLE IF NOT EXISTS `system_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `defaultLanguage` VARCHAR(191) NOT NULL DEFAULT 'en',
    `defaultDirection` VARCHAR(191) NOT NULL DEFAULT 'ltr',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert default settings
INSERT INTO `system_settings` (`defaultLanguage`, `defaultDirection`, `createdAt`, `updatedAt`)
VALUES ('en', 'ltr', NOW(), NOW());
```

### Option 3: Quick Fix Script

Save this as `fix_language.sql` and run it:

```sql
-- Fix for Language Update Issue

-- Step 1: Create table if not exists
CREATE TABLE IF NOT EXISTS `system_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `defaultLanguage` VARCHAR(191) NOT NULL DEFAULT 'en',
    `defaultDirection` VARCHAR(191) NOT NULL DEFAULT 'ltr',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Step 2: Insert default record only if table is empty
INSERT INTO `system_settings` (`defaultLanguage`, `defaultDirection`, `createdAt`, `updatedAt`)
SELECT 'en', 'ltr', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM `system_settings` LIMIT 1);

-- Step 3: Verify
SELECT * FROM `system_settings`;
```

**Execute with:**
```bash
mysql -u root -p hospital_db < fix_language.sql
```

Or using MySQL client:
```bash
mysql -u root -p hospital_db
source fix_language.sql;
```

## Deployment Instructions for User

### Complete Setup Steps:

```bash
# 1. Clone repository
git clone https://github.com/maanisingh/saha-hms.git
cd saha-hms/backend

# 2. Install dependencies
npm install

# 3. Configure .env file
# Make sure DATABASE_URL is correct:
# DATABASE_URL="mysql://root:password@localhost:3306/hospital_db"

# 4. Run ALL migrations (this creates all tables including system_settings)
npx prisma migrate deploy

# 5. Generate Prisma client
npx prisma generate

# 6. Start the server
npm run dev
```

## Verification

After running the fix, verify the table exists:

```sql
-- Check if table exists
SHOW TABLES LIKE 'system_settings';

-- Check table structure
DESCRIBE system_settings;

-- Check data
SELECT * FROM system_settings;
```

Expected output:
```
+------------------+--------------------+------+-----+-------------------+
| Field            | Type               | Null | Key | Default           |
+------------------+--------------------+------+-----+-------------------+
| id               | int                | NO   | PRI | NULL              |
| defaultLanguage  | varchar(191)       | NO   |     | en                |
| defaultDirection | varchar(191)       | NO   |     | ltr               |
| createdAt        | datetime(3)        | NO   |     | CURRENT_TIMESTAMP |
| updatedAt        | datetime(3)        | NO   |     |                   |
+------------------+--------------------+------+-----+-------------------+
```

## Testing Language Switch

After fix, test the language switcher:

1. **Login as ADMIN**
2. **Look for the language button** in top-right (🌐 icon)
3. **Click to switch** between EN ↔ AR
4. **Check if it works** - should update without error

## API Endpoints

The language switcher uses these endpoints:

- **GET** `/api/settings/system` - Fetch current language (public)
- **PUT** `/api/settings/system/language` - Update language (ADMIN only)

Test manually:
```bash
# Get current settings
curl http://localhost:8100/api/settings/system

# Update language (requires admin token)
curl -X PUT http://localhost:8100/api/settings/system/language \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"language":"ar"}'
```

## Common Errors & Solutions

### Error 1: "Table 'hospital_db.system_settings' doesn't exist"
**Solution:** Run the SQL script above or migration

### Error 2: "P1000: Authentication failed"
**Solution:** Check `.env` file database credentials

### Error 3: "Cannot find module '@prisma/client'"
**Solution:** Run `npx prisma generate`

### Error 4: "Language button not visible"
**Solution:** Make sure you're logged in as **ADMIN** user (button only shows for admins)

## Files Modified

1. ✅ Created migration: `prisma/migrations/20251115130000_add_system_settings/migration.sql`
2. ✅ Table already defined in: `prisma/schema.prisma`
3. ✅ Controller exists: `src/controllers/settingsController.js`
4. ✅ Routes exist: `src/routes/settingsRoutes.js`

## Migration Added to Git

The migration has been added and will be committed to the repository.

## Summary

**Problem:** `system_settings` table missing from database
**Cause:** Migration was never run
**Solution:** Run migration or execute SQL manually
**Result:** Language switcher will work properly

### Quick Command for User:

```bash
cd saha-hms/backend
npx prisma migrate deploy
npx prisma generate
npm run dev
```

---

**Created:** November 15, 2024
**Status:** ✅ Migration Created & Ready
**Repository:** https://github.com/maanisingh/saha-hms
