*****************************************************
*				NOT READY YET. 
*		FIGURATE OUT WINDOWS SERVICES WORKAROUND
*****************************************************
*
*   Apache 2.2 requires the following folders, files 
*   and scripts be contained in this directory to 
*   start and stop its web server daemon successfully.
*
*   ASSUMPTION: Apache 2.2 is stored locally in the
*               following directory
*
*               /webservers/apache2.2
*****************************************************


\logs
\conf
    \apache
		\extra
			httpd-autoindex.conf
			httpd-dav.conf
			httpd-default.conf
			httpd-info.conf
			httpd-languages.conf
			httpd-manual.conf
			httpd-mpm.conf
			httpd-multilang-errordoc.conf
			httpd-ssl.conf
			httpd-userdir.conf
			httpd-vhosts.conf			
		charset.conv
		httpd.conf
		magic
		mime.types

apacheStart.cmd #******* starts the web server daemon
apacheStop.cmd  #******* stops the web server daemon
    