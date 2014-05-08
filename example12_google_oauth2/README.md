Account Manager
==============	
Example 12 - Google OAuth2 and IMAP API integration


Simple self-contain web application to learn 
KnockoutJS, RequireJS, text and toastr javascript 
frameworks.

Well, it evolved into a more complex application
as should any project over a few iteration. If you
review the examples 8 thru now you will notice
many code changes.  Noticeably,

1) Replacing duplicate code on client side. Reviewing
the apps/models you will see base model and all other
view models extended from this object. 

2) Replacing duplicate code on server side. This fun
part considering how new I am to Rails. It includes
route configuration to map to single controller. Very
important with IMAP considering this is an industry standard.

3) Its also worth mentioning manager navigate to view. Design
here was also important and allows great flexibility in adding new
views such as Mail.Viewer which is used to view IMAP email message.

4) Error handling and debug information. This was a life saver as the
functionality increased. It help trace holes in the logic, duplicate
function calls and state during method execution.

5) Creation of jqueryExtend modules. This is good practice in cases 
where you need to build custom javascript routines that extend 
the existing jQuery functionality. One good example is the $.postJSON
I create to retrieving IMAP messages in a particular mailbox. 

NOTE: Because Rails using the protect_from_forgery, POST require the
authenticity_token. Just add <%= csrf_meta_tags %> to all layout <head> 
tags.

6) IMAP performance issue greatly improved. Rails imap.rb file suggest
iterating over message_id related to the search command.

imap.examine("INBOX")
imap.search("UNSEEN").each do |message_id]
  envelope = imap.fetch(message_id, "ENVELOPE")[0]
end

This is VERY slow. In fact, IMAP RFC documents mention passing a list of message_id.
This is better.

imap.examine("INBOX")
idList = imap.search("UNSEEN")
envelopes = []
imap.fetch(msgIdList, "ENVELOPE").each do |envelope|	
	envelopes.push(envelope)
end

7) Revisiting OAuth2 integration

8) Lastly, back in example6 I generated the this Rails application using
'rails new Example6', since then, as I made major changes I copied files to
new folder. Hence, this example name 'Example12_google_oauth2'. Well grep the
entire application and replace Example6 with AccountManager.
	