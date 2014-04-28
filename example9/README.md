Account Manager
==============	
Example 9 of 9


Simple self-contain web application to learn 
KnockoutJS, RequireJS, text and toastr javascript 
frameworks.

Well, it evolved into a more complex application
as should any project over a few iteration. 

> In the previous examples, I did the following:

1) Windows Live API calls for session, me and onedrive access
2) Application logging and configuration 
3) Knockout binding of folders, files, etc 

> Here's what to expect in this example: 

1) Made the manager the Manager. Just what it's name implies. It's responsible for overseeing the project. It cantains logic to allow selection of API (Windows or Google). It coordinates the work between the technical team (ViewModels), user experience (Views), and end-user (html templates). 
2) Included a shell API for Google's Docs and GMail access 
3) Included Microsoft OneDrive access to top level folder 
4) Included Microsoft Outlook access (This is a major undertaken and could be divided across multiple iterations or sprints) 
5) Separated the Rails controllers into two distinct parts. HomeController and WindowsliveController. We can later add GoogleController. 
6) Changes in how the Manager interacts with the RequireJS library. This was a challenge due to the number of ways in which their documentation allows for dynamically loading javascript files but it appears to be working as expected. 

> Recommendations 

1) Better handling of Windows Live async execution 
2) Complete access to Microsoft's OneDrive and Outlook (IMAP) REST API 
3) Apply overall styling using CSS 
4) Unit testing where appropriate (NOT FOR THIS SAMPLE)
5) Change API client secrets (VERY IMPORTANT) 
6) Public domain. http://ksacctmgr.com is FAKE and access via Fiddler Tools - HOST mapping of 127.0.0.1







