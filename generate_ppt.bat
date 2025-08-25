@echo off
echo ========================================
echo BloodApp PPT Generator
echo ========================================
echo.

echo 📦 Installing required dependencies...
pip install -r requirements.txt

echo.
echo 🚀 Generating PowerPoint presentation...
python create_bloodapp_ppt.py

echo.
echo ✅ Done! Check for BloodApp_Architecture_Presentation.pptx
echo.
pause 