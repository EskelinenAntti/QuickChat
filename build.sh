sudo systemctl stop quick-chat
cd /home/antti/QuickChat/frontend/
npm i
npm run build
cd /home/antti/QuickChat/backend/
npm i
sudo systemctl start quick-chat