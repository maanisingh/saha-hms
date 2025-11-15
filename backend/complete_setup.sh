#!/bin/bash

echo "═══════════════════════════════════════════════════════════"
echo "    SAHA HMS - COMPLETE DATABASE SETUP"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 0: Install Dependencies
echo -e "${BLUE}[0/6] Installing Dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi
echo ""

# Step 1: Generate Prisma Client
echo -e "${BLUE}[1/6] Generating Prisma Client...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Prisma Client generated successfully${NC}"
else
    echo -e "${RED}❌ Failed to generate Prisma Client${NC}"
    exit 1
fi
echo ""

# Step 2: Run Migrations
echo -e "${BLUE}[2/6] Running Database Migrations...${NC}"
npx prisma migrate deploy
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migrations completed successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Migration failed. Trying to push schema directly...${NC}"
    npx prisma db push --accept-data-loss
fi
echo ""

# Step 3: Seed Default Users
echo -e "${BLUE}[3/6] Creating Default Users...${NC}"
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function seedUsers() {
  try {
    // Check if users exist
    const userCount = await prisma.user.count();

    if (userCount > 0) {
      console.log('✅ Users already exist. Skipping...');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create default admin user
    const admin = await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'User',
        displayName: 'Admin User',
        email: 'admin@saha-hms.com',
        password: hashedPassword,
        role: 'ADMIN',
        phone: '+1234567890',
      }
    });

    console.log('✅ Admin user created: admin@saha-hms.com / admin123');

    // Create doctor
    const doctor = await prisma.user.create({
      data: {
        firstName: 'Ahmed',
        lastName: 'Hassan',
        displayName: 'Dr. Ahmed Hassan',
        email: 'doctor@saha-hms.com',
        password: hashedPassword,
        role: 'DOCTOR',
        phone: '+1234567891',
      }
    });

    console.log('✅ Doctor user created: doctor@saha-hms.com / admin123');

    // Create nurse
    const nurse = await prisma.user.create({
      data: {
        firstName: 'Fatima',
        lastName: 'Al-Rashid',
        displayName: 'Nurse Fatima',
        email: 'nurse@saha-hms.com',
        password: hashedPassword,
        role: 'NURSE',
        phone: '+1234567892',
      }
    });

    console.log('✅ Nurse user created: nurse@saha-hms.com / admin123');

    // Create receptionist
    const receptionist = await prisma.user.create({
      data: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        displayName: 'Sarah Johnson',
        email: 'receptionist@saha-hms.com',
        password: hashedPassword,
        role: 'ADMIN',
        phone: '+1234567893',
      }
    });

    console.log('✅ Receptionist user created: receptionist@saha-hms.com / admin123');

    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('DEFAULT USERS CREATED:');
    console.log('═══════════════════════════════════════════');
    console.log('ADMIN:        admin@saha-hms.com / admin123');
    console.log('DOCTOR:       doctor@saha-hms.com / admin123');
    console.log('NURSE:        nurse@saha-hms.com / admin123');
    console.log('RECEPTIONIST: receptionist@saha-hms.com / admin123');
    console.log('═══════════════════════════════════════════');

  } catch (error) {
    console.error('❌ Error creating users:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
}

seedUsers();
" || echo -e "${YELLOW}⚠️  User seeding skipped or failed${NC}"
echo ""

# Step 4: Create System Settings
echo -e "${BLUE}[4/6] Creating System Settings...${NC}"
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSettings() {
  try {
    const existing = await prisma.systemSettings.findFirst();

    if (existing) {
      console.log('✅ System settings already exist');
      return;
    }

    await prisma.systemSettings.create({
      data: {
        defaultLanguage: 'en',
        defaultDirection: 'ltr',
      }
    });

    console.log('✅ System settings created (English/LTR)');
  } catch (error) {
    console.error('⚠️  Error creating system settings:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
}

seedSettings();
" || echo -e "${YELLOW}⚠️  System settings creation skipped${NC}"
echo ""

# Step 5: Install Frontend Dependencies
echo -e "${BLUE}[5/6] Installing Frontend Dependencies...${NC}"
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
    else
        echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    fi
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi
cd ../backend
echo ""

# Step 6: Verify Setup
echo -e "${BLUE}[6/6] Verifying Setup...${NC}"
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  try {
    const userCount = await prisma.user.count();
    const settingsCount = await prisma.systemSettings.count();

    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('SETUP VERIFICATION:');
    console.log('═══════════════════════════════════════════');
    console.log('✅ Users in database:', userCount);
    console.log('✅ System settings:', settingsCount);
    console.log('═══════════════════════════════════════════');
    console.log('');

    if (userCount >= 4 && settingsCount >= 1) {
      console.log('🎉 SETUP COMPLETED SUCCESSFULLY!');
      console.log('');
      console.log('You can now start the server with:');
      console.log('  npm run dev');
      console.log('');
      console.log('Login with:');
      console.log('  Email: admin@saha-hms.com');
      console.log('  Password: admin123');
    } else {
      console.log('⚠️  Setup incomplete. Please check errors above.');
    }

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
}

verify();
" || echo -e "${RED}❌ Verification failed${NC}"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Setup script completed!"
echo "═══════════════════════════════════════════════════════════"
