@echo off
echo ===============================================================
echo     SAHA HMS - COMPLETE DATABASE SETUP (Windows)
echo ===============================================================
echo.

REM Step 1: Generate Prisma Client
echo [1/5] Generating Prisma Client...
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
echo [2/5] Running Database Migrations...
call npx prisma migrate deploy
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Migration failed. Trying direct push...
    call npx prisma db push --accept-data-loss
)
echo.

REM Step 3: Seed Users
echo [3/5] Creating Default Users...
node -e "const{PrismaClient}=require('@prisma/client');const bcrypt=require('bcryptjs');const prisma=new PrismaClient();async function seed(){try{const c=await prisma.user.count();if(c>0){console.log('Users already exist');return;}const p=await bcrypt.hash('admin123',10);await prisma.user.createMany({data:[{name:'Admin User',email:'admin@saha-hms.com',password:p,role:'ADMIN',phone:'+1234567890'},{name:'Dr. Ahmed Hassan',email:'doctor@saha-hms.com',password:p,role:'DOCTOR',phone:'+1234567891'},{name:'Nurse Fatima',email:'nurse@saha-hms.com',password:p,role:'NURSE',phone:'+1234567892'},{name:'Sarah Johnson',email:'receptionist@saha-hms.com',password:p,role:'RECEPTIONIST',phone:'+1234567893'}]});console.log('Users created successfully');}catch(e){console.error('Error:',e.message);}finally{await prisma.$disconnect();}}seed();"
echo.

REM Step 4: Create System Settings
echo [4/5] Creating System Settings...
node -e "const{PrismaClient}=require('@prisma/client');const prisma=new PrismaClient();async function seed(){try{const e=await prisma.systemSettings.findFirst();if(e){console.log('Settings already exist');return;}await prisma.systemSettings.create({data:{defaultLanguage:'en',defaultDirection:'ltr'}});console.log('System settings created');}catch(e){console.error('Error:',e.message);}finally{await prisma.$disconnect();}}seed();"
echo.

REM Step 5: Verify
echo [5/5] Verifying Setup...
node -e "const{PrismaClient}=require('@prisma/client');const prisma=new PrismaClient();async function verify(){try{const u=await prisma.user.count();const s=await prisma.systemSettings.count();console.log('');console.log('===============================================');console.log('SETUP COMPLETE!');console.log('===============================================');console.log('Users:',u);console.log('Settings:',s);console.log('');console.log('Login with:');console.log('  Email: admin@saha-hms.com');console.log('  Password: admin123');console.log('===============================================');}catch(e){console.error('Error:',e.message);}finally{await prisma.$disconnect();}}verify();"

echo.
echo ===============================================================
echo Setup completed! Run: npm run dev
echo ===============================================================
pause
