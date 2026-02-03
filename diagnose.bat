@echo off
echo ========================================
echo Axion E-Commerce - Diagnostic Script
echo ========================================
echo.

echo [1/5] Checking MongoDB...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is RUNNING
) else (
    echo ❌ MongoDB is NOT running
    echo    Fix: Run "net start MongoDB" or start MongoDB manually
)
echo.

echo [2/5] Checking if port 5000 is available...
netstat -ano | findstr :5000 >NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ Port 5000 is IN USE (backend might be running)
) else (
    echo ❌ Port 5000 is FREE (backend is NOT running)
)
echo.

echo [3/5] Checking if port 3000 is available...
netstat -ano | findstr :3000 >NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ Port 3000 is IN USE (frontend might be running)
) else (
    echo ❌ Port 3000 is FREE (frontend is NOT running)
)
echo.

echo [4/5] Checking backend .env file...
if exist "backend\.env" (
    echo ✅ backend\.env EXISTS
    type backend\.env
) else (
    echo ❌ backend\.env NOT FOUND
)
echo.

echo [5/5] Checking frontend .env.local file...
if exist "frontend\.env.local" (
    echo ✅ frontend\.env.local EXISTS
    type frontend\.env.local
) else (
    echo ❌ frontend\.env.local NOT FOUND
)
echo.

echo ========================================
echo Diagnostic Complete
echo ========================================
echo.
echo Next Steps:
echo 1. If MongoDB not running: net start MongoDB
echo 2. Start backend: cd backend ^&^& npm run dev
echo 3. Start frontend: cd frontend ^&^& npm run dev
echo.
pause
