@echo off
REM Navigate to the frontend directory relative to the location of this .bat file
cd /d "%~dp0frontend"

REM Run the frontend development server
npm run dev