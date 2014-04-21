@echo off
cls
echo copying hosts file
xcopy c:\Windows\System32\drivers\etc\hosts hosts.original /Y /Q
xcopy hosts c:\Windows\System32\etc\hosts /Y /Q
echo Nginx server started listening on port 81 (account_mgr)...
/webservers/nginx-1.5.12/nginx.exe -p /apps/web/account_mgr -c conf/nginx/nginx.conf
xcopy c:\Windows\System32\drivers\etc\hosts.original c:\Windows\System32\drivers\etc\hosts /Y /Q
del c:\Windows\System32\drivers\etc\hosts.original
echo Nginx server stopped listening on port 81 (account_mgr)...

