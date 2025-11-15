# Hospital Management System - Quick Start Guide

## 🌐 Access the Application

**Website**: https://hms.alexandratechlab.com

## 🔑 First Time Setup

The system is deployed but needs initial user creation. You can:

1. **Register a new user** via the frontend registration page
2. **Create an admin user** directly in the database

### Create Admin User via Database

```bash
# Access MySQL
docker exec -it hospital-mysql mysql -u hospital_user -phospital_secure_2024 hospital_db

# Create admin user (adjust details as needed)
INSERT INTO User (email, password, role, firstName, lastName, isActive, createdAt, updatedAt) 
VALUES ('admin@hospital.com', 'hashed_password_here', 'ADMIN', 'Admin', 'User', true, NOW(), NOW());
```

## 📱 Features Available

- **Patient Management**: Register and manage patient records
- **Doctor Management**: Track doctors and specializations
- **Appointments**: Schedule and manage appointments
- **Prescriptions**: Digital prescription management
- **Pharmacy**: Medicine inventory and sales
- **Laboratory**: Lab test ordering and results
- **Radiology**: Radiology orders and imaging
- **Billing**: Invoice and payment tracking
- **Staff Management**: Employee and attendance tracking
- **Location Tracking**: Real-time staff location via beacons
- **Reports**: Comprehensive reporting system

## 🔧 Quick Commands

```bash
# Check system status
/root/test_hospital.sh

# View backend logs
pm2 logs hospital-backend

# Restart backend
pm2 restart hospital-backend

# Check database
docker ps | grep hospital-mysql
```

## 🆘 Troubleshooting

**Backend not responding?**
```bash
pm2 restart hospital-backend
pm2 logs hospital-backend --lines 50
```

**Database connection issues?**
```bash
docker logs hospital-mysql --tail 50
docker restart hospital-mysql
```

**Frontend not loading?**
```bash
systemctl status nginx
nginx -t
systemctl reload nginx
```

## 📚 Documentation

Full documentation: `/root/Hospital/DEPLOYMENT_INFO.md`

---

**Need help?** Check the logs or review the API endpoints in DEPLOYMENT_INFO.md
