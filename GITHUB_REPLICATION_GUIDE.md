# 📦 GitHub Replication Guide for Saha HMS

## ✅ Current Status

The Saha HMS repository is **COMPLETE** and ready for replication. All essential files are tracked in version control.

**Repository:** https://github.com/maanisingh/saha-hms.git

---

## 📋 Essential Files Checklist

### ✅ Database & Schema Files (ALL TRACKED)

#### Backend Prisma Database Files:
- ✅ `backend/prisma/schema.prisma` - Complete database schema (48,837 bytes)
- ✅ `backend/prisma/migrations/` - **8 migration files** (all tracked)
  - `20251103093009_init/migration.sql`
  - `20251103105208_add_lab_order/migration.sql`
  - `20251103113844_add_medicine_and_stock_models/migration.sql`
  - `20251103114748_add_radiology_order_model/migration.sql`
  - `20251104074544_hospital/migration.sql`
  - `20251104110700_update_schema/migration.sql`
  - `20251115130000_add_system_settings/migration.sql`
  - `migration_lock.toml`
- ✅ `backend/prisma/seed.js` - Database seeding script
- ✅ `backend/prisma/seed-comprehensive.js` - Comprehensive seed data
- ✅ `backend/prisma/add_tracking_devices.sql` - Additional SQL script

#### Frontend Supabase Migrations (Legacy - **6 files tracked**):
- ✅ `frontend/supabase/migrations/20251028192317_create_core_tables.sql`
- ✅ `frontend/supabase/migrations/20251028192420_create_appointments_tables.sql`
- ✅ `frontend/supabase/migrations/20251028192425_create_clinical_services.sql`
- ✅ `frontend/supabase/migrations/20251029062911_add_patient_extended_fields.sql`
- ✅ `frontend/supabase/migrations/20251029062950_create_ipd_management_tables.sql`
- ✅ `frontend/supabase/migrations/20251029074626_extend_medicines_table.sql`

**Note:** The system currently uses **Prisma with MySQL**, not Supabase. The Supabase migrations are legacy files.

---

### ✅ Configuration Files (TRACKED)

- ✅ `backend/.env.example` - Backend environment template
- ✅ `frontend/.env.example` - Frontend environment template
- ✅ `docker-compose.yml` - Docker orchestration configuration
- ✅ `backend/Dockerfile` - Backend Docker image definition
- ✅ `frontend/Dockerfile` - Frontend Docker image definition
- ✅ `backend/package.json` - Backend dependencies
- ✅ `frontend/package.json` - Frontend dependencies
- ✅ `setup.sh` - Automated setup script (executable)

---

### ✅ Source Code (ALL TRACKED)

#### Backend Structure:
```
backend/
├── src/
│   ├── server.js           - Main server entry point
│   ├── config/             - Configuration files
│   ├── controllers/        - API controllers
│   ├── middleware/         - Express middleware
│   ├── routes/             - API routes
│   └── utils/              - Utility functions
├── prisma/                 - Database schema & migrations
├── package.json
├── Dockerfile
└── .env.example
```

#### Frontend Structure:
```
frontend/
├── src/
│   ├── components/         - React components
│   ├── pages/              - Page components
│   ├── services/           - API services
│   ├── utils/              - Utility functions
│   ├── i18n/               - Translation files (14 namespaces)
│   └── App.jsx             - Main app component
├── public/                 - Static assets
├── package.json
├── vite.config.js
├── tailwind.config.js
├── Dockerfile
└── .env.example
```

---

### ❌ Files Excluded from Repository (.gitignore)

These files should **NOT** be in the repository and will be created during setup:

- ❌ `backend/.env` - Contains production secrets (DATABASE_URL, JWT_SECRET)
- ❌ `frontend/.env` - Contains environment-specific API URL
- ❌ `node_modules/` - NPM dependencies (installed via `npm install`)
- ❌ `dist/`, `build/` - Build artifacts
- ❌ Log files, cache files, IDE settings

---

## 🚀 How to Replicate the Project

### For New Developers/Contributors:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/maanisingh/saha-hms.git
   cd saha-hms
   ```

2. **Verify All Files Are Present:**
   ```bash
   # Check database migrations
   ls -la backend/prisma/migrations/

   # Check schema
   ls -la backend/prisma/schema.prisma

   # Check configuration templates
   ls -la backend/.env.example frontend/.env.example

   # Check Docker files
   ls -la docker-compose.yml backend/Dockerfile frontend/Dockerfile
   ```

3. **Run the Automated Setup:**
   ```bash
   ./setup.sh
   ```

   This script will:
   - ✅ Check Docker installation
   - ✅ Create `.env` files from `.env.example` templates
   - ✅ Start Docker containers (MySQL, Backend, Frontend)
   - ✅ Run database migrations
   - ✅ Seed the database with sample data

4. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8100
   - Admin Login: `admin@vitalcore.com` / `admin123`

---

## 🔧 Manual Setup (Alternative)

If you prefer manual setup:

1. **Clone & Navigate:**
   ```bash
   git clone https://github.com/maanisingh/saha-hms.git
   cd saha-hms
   ```

2. **Create Environment Files:**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. **Customize .env Files (Optional):**
   ```bash
   # Edit backend/.env if needed
   nano backend/.env

   # Edit frontend/.env if needed
   nano frontend/.env
   ```

4. **Start with Docker Compose:**
   ```bash
   docker compose up -d
   ```

5. **Run Migrations:**
   ```bash
   docker compose exec backend npx prisma migrate deploy
   ```

6. **Seed Database:**
   ```bash
   docker compose exec backend npx prisma db seed
   ```

---

## 📊 Database Information

### Current Configuration (from backend/.env.example):
- **Database Type:** MySQL 8.0
- **Database Name:** `saha_hms`
- **Default User:** `hms_user`
- **Default Password:** `hms_password`
- **Port:** 3306
- **Connection String:** `mysql://hms_user:hms_password@localhost:3306/saha_hms`

### Prisma Schema Models (48 tables):
The schema includes comprehensive models for:
- **Core:** User, Hospital, Department, MedicalRecord
- **Appointments:** Appointment, AppointmentSlot, TimeSlot
- **Clinical:** Prescription, PrescriptionMedicine, Visit
- **Pharmacy:** Medicine, Stock, MedicineOrder
- **Laboratory:** LabTest, LabOrder, LabResult
- **Radiology:** RadiologyOrder, ImagingStudy
- **Billing:** Invoice, Payment, InsuranceClaim
- **HR:** Employee, Attendance, LeaveRequest
- **Tracking:** LocationTracking, BeaconDevice
- **System:** SystemSettings (for language preferences)

---

## 🔐 Security Notes

### Files That Contain Secrets (NOT in repository):
1. **backend/.env** - Production secrets:
   - `DATABASE_URL` - Database connection string
   - `JWT_SECRET` - JWT signing key
   - `NODE_ENV` - Environment mode

2. **frontend/.env** - Environment configuration:
   - `VITE_API_URL` - Backend API endpoint

### Important:
- ✅ **DO** commit `.env.example` files (templates)
- ❌ **DO NOT** commit `.env` files (actual secrets)
- ✅ **DO** commit database migrations
- ✅ **DO** commit Prisma schema

---

## 🐛 Troubleshooting

### "Migrations not found" error:
- **Cause:** Migrations were accidentally excluded from git
- **Solution:** All migrations are now tracked (fixed in `.gitignore`)
- **Verify:** Run `git ls-files backend/prisma/migrations/`

### "Cannot connect to database" error:
- **Cause:** `.env` file missing or incorrect DATABASE_URL
- **Solution:** Copy from `.env.example` and update if needed

### "Missing dependencies" error:
- **Cause:** `node_modules/` not installed
- **Solution:** Docker automatically runs `npm install` OR manually:
  ```bash
  cd backend && npm install
  cd ../frontend && npm install
  ```

### "Port already in use" error:
- **Cause:** Port 3306, 8100, or 3000 already occupied
- **Solution:** Stop conflicting services or modify `docker-compose.yml`

---

## 📝 .gitignore Configuration

The `.gitignore` file has been **UPDATED** to ensure migrations are tracked:

```gitignore
# Prisma - IMPORTANT: Migrations should be committed to version control
# Only ignore the .env file, not migrations
# prisma/migrations/* (COMMENTED OUT - migrations need to be tracked)
```

**Previous Issue:** `prisma/migrations/*` was incorrectly excluding migrations.
**Resolution:** Commented out this rule. Migrations are essential for database replication.

---

## ✅ Verification Checklist

Before pushing to GitHub, verify:

- [ ] All Prisma migrations are tracked (`git ls-files backend/prisma/migrations/`)
- [ ] `schema.prisma` is tracked
- [ ] `.env.example` files exist for both backend and frontend
- [ ] `.env` files are **NOT** tracked (in `.gitignore`)
- [ ] Docker files are present and tracked
- [ ] `setup.sh` is executable (`chmod +x setup.sh`)
- [ ] `package.json` files are tracked
- [ ] README.md has setup instructions

---

## 🎯 Summary

### What's Included in Repository:
✅ Complete database schema (`schema.prisma`)
✅ All database migrations (8 files)
✅ Seed scripts for sample data
✅ Configuration templates (`.env.example`)
✅ Docker setup files
✅ Complete source code (backend + frontend)
✅ Setup automation script
✅ Documentation (README, guides)

### What Developers Need to Do:
1. Clone repository
2. Run `./setup.sh` (or manual setup)
3. Access application at localhost

### What Gets Created During Setup:
- `.env` files (from templates)
- `node_modules/` (via npm install)
- MySQL database (via Docker)
- Sample data (via Prisma seed)

---

## 📞 Support

If you encounter issues during replication:
1. Check this guide first
2. Verify all files are present with the checklist above
3. Review `README.md` for detailed documentation
4. Check Docker logs: `docker compose logs -f`

---

**Last Updated:** 2025-11-15
**Repository:** https://github.com/maanisingh/saha-hms.git
**Status:** ✅ Complete and Ready for Replication
