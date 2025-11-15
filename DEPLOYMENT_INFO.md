# Hospital Management System - Deployment Information

## 🚀 Deployment Summary

The Hospital Management System has been successfully deployed to **hms.alexandratechlab.com**

## 📋 System Overview

### Frontend
- **URL**: https://hms.alexandratechlab.com
- **Technology**: React + Vite + TypeScript
- **Location**: `/root/Hospital/frontend/dist`
- **Web Server**: Nginx with SSL/TLS

### Backend
- **API Base URL**: https://hms.alexandratechlab.com/api
- **Technology**: Node.js + Express + Prisma ORM
- **Port**: 8100 (internal)
- **Process Manager**: PM2
- **Location**: `/root/Hospital/backend`

### Database
- **Type**: MySQL 8.0
- **Container**: hospital-mysql (Docker)
- **Port**: 3306
- **Database Name**: hospital_db
- **User**: hospital_user
- **Password**: hospital_secure_2024

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Patient Management
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctor Management
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create new doctor
- `GET /api/doctors/:id` - Get doctor by ID

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:id` - Get appointment details

### Medicine & Pharmacy
- `GET /api/medicines` - Get all medicines
- `POST /api/medicines` - Add new medicine
- `GET /api/prescriptions` - Get prescriptions

### Laboratory
- `GET /api/lab` - Get lab tests
- `POST /api/lab` - Create lab test

### Radiology
- `GET /api/radiology` - Get radiology orders
- `POST /api/radiology` - Create radiology order

### Additional Endpoints
- `GET /api/employees` - Employee management
- `GET /api/departments` - Department management
- `GET /api/invoices` - Billing & invoices
- `GET /api/staffattendance` - Staff attendance
- `GET /api/locationtracker` - Location tracking
- `GET /api/beacon` - Beacon management

## 🔐 Security Features

- ✅ SSL/TLS Certificate (Let's Encrypt)
- ✅ HTTPS enforced (HTTP → HTTPS redirect)
- ✅ JWT-based authentication
- ✅ CORS enabled for frontend
- ✅ Security headers configured
- ✅ Database credentials secured

## 🛠️ Management Commands

### Backend Management
```bash
# View backend logs
pm2 logs hospital-backend

# Restart backend
pm2 restart hospital-backend

# Stop backend
pm2 stop hospital-backend

# View backend status
pm2 status
```

### Database Management
```bash
# Access MySQL shell
docker exec -it hospital-mysql mysql -u hospital_user -p

# View database logs
docker logs hospital-mysql

# Restart database
docker restart hospital-mysql
```

### Nginx Management
```bash
# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx

# Restart Nginx
systemctl restart nginx

# View error logs
tail -f /var/log/nginx/error.log
```

### SSL Certificate Renewal
```bash
# Renew certificate (auto-renews via cron)
certbot renew

# Force renewal
certbot renew --force-renewal
```

## 📁 File Locations

- **Frontend Build**: `/root/Hospital/frontend/dist`
- **Backend Source**: `/root/Hospital/backend/src`
- **Environment Config**: `/root/Hospital/backend/.env`
- **Prisma Schema**: `/root/Hospital/backend/prisma/schema.prisma`
- **Nginx Config**: `/etc/nginx/sites-available/hms.alexandratechlab.com`
- **SSL Certificates**: `/etc/letsencrypt/live/hms.alexandratechlab.com/`
- **PM2 Config**: `/root/.pm2/dump.pm2`

## 🔄 Update Procedures

### Updating Frontend
```bash
cd /root/Hospital/frontend
git pull
npm install
npm run build
```

### Updating Backend
```bash
cd /root/Hospital/backend
git pull
npm install
npx prisma generate
npx prisma db push
pm2 restart hospital-backend
```

## 🗄️ Database Schema

The system uses Prisma ORM with comprehensive models including:
- User (centralized authentication)
- Patient, Doctor, Nurse, Pharmacist
- Appointments, Prescriptions
- Laboratory & Radiology
- Billing & Invoices
- Medicine & Pharmacy
- Blood Bank
- Location Tracking (Beacon-based)
- Staff Attendance & Duty Roster
- Commission & Referral Management
- Insurance Claims
- And many more...

## 🌐 Access Information

**Frontend URL**: https://hms.alexandratechlab.com

The application is now live and accessible. The database is empty and ready for initial data seeding or user registration.

## 📞 Support

For issues or questions:
1. Check PM2 logs: `pm2 logs hospital-backend`
2. Check Nginx logs: `/var/log/nginx/error.log`
3. Check database status: `docker logs hospital-mysql`
4. Run test script: `/root/test_hospital.sh`

---

**Deployment Date**: November 13, 2025
**Domain**: hms.alexandratechlab.com
**Status**: ✅ Active
