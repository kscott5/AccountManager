@echo off

set DEVDRIVE=%~dp0
set Path=%DEVDRIVE%scripts;%DEVDRIVE%tools/7-zip;%DEVDRIVE%tools/Chrome;%DEVDRIVE%tools/DevKit/32bit/bin;%DEVDRIVE%tools/DevKit/32bit/mingw/bin;%DEVDRIVE%tools/Git/bin;%DEVDRIVE%tools/ILSpy;%DEVDRIVE%tools/jZip;%DEVDRIVE%tools/notepad++;%DEVDRIVE%tools/Powershell/v1.0;%DEVDRIVE%tools/Ruby200/bin;%DEVDRIVE%tools/java/jdk1.7.0_10/bin;%DEVDRIVE%tools/sqlite;%DEVDRIVE%apps/web/servers/php-5.5.11;

cls
echo Nginx server started listening on port 1095 (acctmgr/example5)...
/apps/web/servers/nginx-1.5.12/nginx.exe -p /apps/web/acctmgr/example5 -c conf/nginx/nginx.conf
