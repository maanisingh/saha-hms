@echo off
echo ===============================================================
echo     SAHA HMS - COMPLETE DATABASE SETUP (Windows)
echo ===============================================================
echo.

REM Step 0: Install Dependencies
echo [0/6] Installing Dependencies...
if not exist "node_modules\" (
    call npm install
    if %ERRORLEVEL% EQU 0 (
        echo SUCCESS: Dependencies installed
    ) else (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed
)
echo.

REM Step 1: Generate Prisma Client
echo [1/6] Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Prisma Client generated
) else (
    echo ERROR: Failed to generate Prisma Client
    pause
    exit /b 1
)
echo.

REM Step 2: Run Migrations
echo [2/6] Running Database Migrations...
call npx prisma migrate deploy
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Migration failed. Trying direct push...
    call npx prisma db push --accept-data-loss
)
echo.

REM Step 3: Seed Users
echo [3/6] Creating Default Users...
node -e "const{PrismaClient}=require('@prisma/client');const bcrypt=require('bcryptjs');const prisma=new PrismaClient();async function seed(){try{const c=await prisma.user.count();if(c>0){console.log('Users already exist');return;}const p=await bcrypt.hash('admin123',10);await prisma.user.createMany({data:[{firstName:'Admin',lastName:'User',displayName:'Admin User',email:'admin@saha-hms.com',password:p,role:'ADMIN',phone:'+1234567890'},{firstName:'Ahmed',lastName:'Hassan',displayName:'Dr. Ahmed Hassan',email:'doctor@saha-hms.com',password:p,role:'DOCTOR',phone:'+1234567891'},{firstName:'Fatima',lastName:'Al-Rashid',displayName:'Nurse Fatima',email:'nurse@saha-hms.com',password:p,role:'NURSE',phone:'+1234567892'},{firstName:'Sarah',lastName:'Johnson',displayName:'Sarah Johnson',email:'receptionist@saha-hms.com',password:p,role:'ADMIN',phone:'+1234567893'}]});console.log('Users created successfully');}catch(e){console.error('Error:',e.message);}finally{await prisma.$disconnect();}}seed();"
echo.

REM Step 4: Create System Settings
echo [4/6] Creating System Settings...
node -e "const{PrismaClient}=require('@prisma/client');const prisma=new PrismaClient();async function seed(){try{const e=await prisma.systemSettings.findFirst();if(e){console.log('Settings already exist');return;}await prisma.systemSettings.create({data:{defaultLanguage:'en',defaultDirection:'ltr'}});console.log('System settings created');}catch(e){console.error('Error:',e.message);}finally{await prisma.$disconnect();}}seed();"
echo.

REM Step 5: Install Frontend Dependencies
echo [5/6] Installing Frontend Dependencies...
cd ..\frontend
if not exist "node_modules\" (
    call npm install
    if %ERRORLEVEL% EQU 0 (
        echo SUCCESS: Frontend dependencies installed
    ) else (
        echo ERROR: Failed to install frontend dependencies
    )
) else (
    echo Frontend dependencies already installed
)
cd ..\backend
echo.

REM Step 6: Verify
echo [6/6] Verifying Setup...
node -e "const{PrismaClient}=require('@prisma/client');const prisma=new PrismaClient();async function verify(){try{const u=await prisma.user.count();const s=await prisma.systemSettings.count();console.log('');console.log('===============================================');console.log('SETUP COMPLETE!');console.log('===============================================');console.log('Users:',u);console.log('Settings:',s);console.log('');console.log('Login with:');console.log('  Email: admin@saha-hms.com');console.log('  Password: admin123');console.log('===============================================');}catch(e){console.error('Error:',e.message);}finally{await prisma.$disconnect();}}verify();"

echo.
echo ===============================================================
echo Setup completed! Run: npm run dev
echo ===============================================================
pause
