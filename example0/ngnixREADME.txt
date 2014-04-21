*****************************************************
*
*   Nginx 1.5.12 requires the following folders, files 
*   and scripts be contained in this directory to 
*   start and stop the Nginx web server successfully.
*
*   ASSUMPTION: Nginx is stored locally in the
*               following directory
*
*               /webservers/nginx-1.5.12
*****************************************************

\logs
\conf
    \nginx
		fastcgi.conf
		fastcgi_params
		koi-utf
		koi-win
		mime.types
		nginx.conf
		scgi_params
		uwsgi_params
		win-utf
\temp
    \client_body_temp
	\fastcgi_temp
	\proxy_temp
	\scgi_temp
	\uwsgi_temp

nginxStart.cmd #******* starts the web server
nginxStop.cmd  #******* stops the web server
    