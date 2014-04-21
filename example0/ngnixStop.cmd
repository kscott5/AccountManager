@echo off
cls
/webservers/nginx-1.5.12/nginx.exe -p /apps/web/account_mgr -c conf/nginx/nginx.conf -s quit
echo Nginx server stopped listening on port 81 (account_mgr)...
pause