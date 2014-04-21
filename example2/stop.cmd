@echo off
cls
/apps/web/servers/nginx-1.5.12/nginx.exe -p /apps/web/acctmgr/example2 -c conf/nginx/nginx.conf -s quit
del logs\*.* /q
echo Nginx server stopped listening on port 92 (acctmgr/example2)...
pause