@echo off
cls
echo Nginx server stopped listening on port 1095 (acctmgr/example5)...
/apps/web/servers/nginx-1.5.12/nginx.exe -p /apps/web/acctmgr/example5 -c conf/nginx/nginx.conf -s quit
del logs\*.* /q
pause
