# 🚀 Quick Deploy Guide - VitalCore HMS

## One-Click Local Deployment

### Prerequisites
- Docker Desktop installed ([Download here](https://docs.docker.com/get-docker/))
- Git installed

### Deploy in 3 Commands

```bash
# 1. Clone the repository
git clone https://github.com/maanisingh/vitalcore-hms.git
cd vitalcore-hms

# 2. Run the automated setup script
./setup.sh
```

That's it! The setup script will:
- ✅ Check for Docker installation
- ✅ Create environment files automatically
- ✅ Start all services (MySQL, Backend, Frontend)
- ✅ Run database migrations
- ✅ Seed the database with sample data

### Access the Application

After setup completes (takes ~2 minutes):

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8100
- **API Health Check:** http://localhost:8100/health

### Default Login Credentials

**Admin Login:**
- Email: `admin@vitalcore.com`
- Password: `admin123`

**Other Test Users:**
- Doctor: `doctor@vitalcore.com` / `doctor123`
- Nurse: `nurse@vitalcore.com` / `nurse123`
- Pharmacist: `pharmacist@vitalcore.com` / `pharma123`
- Lab Tech: `lab@vitalcore.com` / `lab123`

## Manual Setup (If you prefer)

### Step 1: Clone Repository
```bash
git clone https://github.com/maanisingh/vitalcore-hms.git
cd vitalcore-hms
```

### Step 2: Create Environment Files
```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.example frontend/.env
```

### Step 3: Start Services
```bash
docker-compose up -d
```

### Step 4: Initialize Database
```bash
# Wait 10 seconds for MySQL to start
sleep 10

# Run migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database (optional)
docker-compose exec backend npx prisma db seed
```

## Useful Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend
```

### Stop Services
```bash
docker-compose down
```

### Restart Services
```bash
docker-compose restart
```

### Access Database GUI (Prisma Studio)
```bash
docker-compose exec backend npx prisma studio
```
Then open: http://localhost:5555

### Reset Database
```bash
docker-compose exec backend npx prisma migrate reset
```

## Troubleshooting

### Port Already in Use

If you get an error that ports 3000, 8100, or 3306 are already in use:

**Option 1:** Stop the conflicting service
```bash
# Find what's using the port
lsof -i :3000  # or :8100 or :3306

# Kill the process
kill -9 <PID>
```

**Option 2:** Change the ports in `docker-compose.yml`
```yaml
services:
  backend:
    ports:
      - "8101:8100"  # Change from 8100 to 8101

  frontend:
    ports:
      - "3001:3000"  # Change from 3000 to 3001
```

### Container Won't Start

Check logs:
```bash
docker-compose logs backend
docker-compose logs mysql
```

Rebuild containers:
```bash
docker-compose down
docker-compose up --build -d
```

### Database Connection Error

Wait longer for MySQL to initialize:
```bash
# Check MySQL is ready
docker-compose exec mysql mysqladmin ping -h localhost -u root -p
```

### Frontend Can't Connect to Backend

1. Check backend is running: http://localhost:8100/health
2. Verify frontend .env has correct API URL
3. Check browser console for CORS errors

## System Requirements

- **OS:** Windows 10+, macOS 10.14+, or Linux
- **RAM:** 4GB minimum (8GB recommended)
- **Disk Space:** 2GB free space
- **Docker:** Latest version
- **Ports Required:** 3000, 8100, 3306

## What Gets Installed

When you run the setup:

1. **MySQL 8.0 Container**
   - Database: `vitalcore_hms`
   - User: `hms_user`
   - Password: `hms_password`
   - Port: 3306

2. **Backend Container (Node.js)**
   - Express API server
   - Prisma ORM
   - JWT authentication
   - Port: 8100

3. **Frontend Container (React)**
   - Vite development server
   - React 18
   - Tailwind CSS
   - Port: 3000

## Data Persistence

All database data is persisted in a Docker volume named `vitalcore_hms_mysql_data`.

To completely remove everything:
```bash
docker-compose down -v
```

## Production Deployment

For production deployment, see the main [README.md](README.md) for:
- Environment variable configuration
- Building production images
- Nginx setup
- SSL certificate configuration

## Support

If you encounter issues:
1. Check the [README.md](README.md) for detailed documentation
2. Review [FIXES_SUMMARY.md](FIXES_SUMMARY.md) for what was fixed
3. Open an issue on GitHub

---

**Enjoy using VitalCore HMS!** 🏥
