@echo off
cls
/apps/web/servers/nginx-1.5.12/nginx.exe -p /apps/web/acctmgr/example1 -c conf/nginx/nginx.conf -s quit
del logs\*.* /q
echo Nginx server stopped listening on port 91 (acctmgr/example1)...
pause