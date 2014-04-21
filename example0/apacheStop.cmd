@echo off
cls
/webservers/apache2.2/bin/httpd.exe -f /apps/web/accountmgr/conf/apache/httpd.conf -k stop
echo Apache daemon stopped gracefully!
pause