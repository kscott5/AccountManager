Account Manager
==============	
Example 10 - Google API integration


Simple self-contain web application to learn 
KnockoutJS, RequireJS, text and toastr javascript 
frameworks.

Well, it evolved into a more complex application
as should any project over a few iteration. 

> In the previous examples, I did the following:

1) Made the manager the Manager. Just what it's name implies. It's responsible for overseeing the project. It cantains logic to allow selection of API (Windows or Google). It coordinates the work between the technical team (ViewModels), user experience (Views), and end-user (html templates). 
2) Included a shell API for Google's Docs and GMail access 
3) Included Microsoft OneDrive access to top level folder 
4) Included Microsoft Outlook access (This is a major undertaken and could be divided across multiple iterations or sprints) 
5) Separated the Rails controllers into two distinct parts. HomeController and WindowsliveController. We can later add GoogleController. 
6) Changes in how the Manager interacts with the RequireJS library. This was a challenge due to the number of ways in which their documentation allows for dynamically loading javascript files but it appears to be working as expected. 

> Here's what to expect from this example:

1) Switch between Windows and Google API
2) Login and Logout using Google API
3) Display Google API basic profile information
4) Access Google Drive (top or root folder container)

;-)





