@echo off
cls
/apps/web/servers/nginx-1.5.12/nginx.exe -p /apps/web/acctmgr/example4 -c conf/nginx/nginx.conf -s quit
del logs\*.* /q
echo Nginx server stopped listening on port 94 (acctmgr/example4)...
pause