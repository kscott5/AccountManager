require 'rest-client'
require 'json'

require 'customnet/imap'

# PROBLEM_SSL_CONNECT_ERROR
require 'openssl'
require 'openssl-extensions'

require 'net/imap'
require 'customnet/imap' #convention over configuration 

class HomeController < ApplicationController
  layout 'home' #Overrides layout inherited from base controller
  
  # Single Page Application (SPA)
  def index
  end # index
  
  # Viewer is just that. No header or footers available
  def viewer
  end # viewer
 
  # Retrieves all the library's command (UNSEEN) messages from boxname (INBOX)
  #
  # :library/mailbox/:name/:command
  # ex. windowslive/mailbox/inbox/unseen
  def mailbox
    #**********************************************************************************
    # TODO: DETERMINE HOW THIS PERFORMANCES WITH MULTIPLE REQUEST FROM DIFFERENT USERS
	#**********************************************************************************	
	
	library = params[:library].downcase # windowslive, googleapi
	boxname = params[:name].upcase  # ex. INBOX, JUNK or any other mailbox that's created
	command = params[:command].upcase # UNSEEN, SEEN, RECENT or any other command
	
    accessToken = params[:token]
	email = params[:email]
	server = params[:server]
	port = params[:port].to_i	
	
	CustomNet::IMAP.debug = false
	
	# NOTE: Ruby self is similar to static 
	# Add custom authenticator to IMAP first
	CustomNet::IMAP.add_authenticator 'XOAUTH2', CustomNet::IMAP::XOAuth2Authenticator

	# PROBLEM_SSL_CONNECT_ERROR
	# SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed
	#
	# SOLUTION_SSL_CONNECT_ERROR (review the imap.rb file helps too)
	# 1) gem install openssl-extensions
	# 2) require 'openssl' and 'openssl-extensions'
	# 3) hash the :ssl parameter with :verify_mode => OpenSSL::VERIFY_NONE
	# 4) :verify => false
	imap = CustomNet::IMAP.new(server, {:port => port, :ssl => {:verify_mode => OpenSSL::SSL::VERIFY_NONE}}, :verify => false)
		  
	# Uses custom Authenticator 
	imap.authenticate('XOAUTH2', email, accessToken)
	 
	imap.examine(boxname) # Prep read-only view
	envelopes = []; # initialize array
	
	msgIdList = imap.search(command) # Search by command
	
	
	# Fetch by list of message_id is better PERFORMANCE 
	# than the documented approach found in the imap.rb file.
	imap.fetch(msgIdList, "ENVELOPE").each do |envelope|	
		envelopes.push(envelope)
	end if msgIdList.count > 0 # ensure we have message id list before fetching
		
	imap.disconnect
	
	render json: '{\'error\': \'NO_DATA\'}'.to_json, layout: false if envelopes.length == 0
	render json: envelopes.to_json, layout: false if envelopes.length > 0
  end #mailbox
  
  # Retrieves a library's individual message using id from the name (INBOX)
  #
  # :library/:name/view/:id
  # ex: windowslive/inbox/view/173
  def message
  	library = params[:library].downcase # windowslive, googleapi
	mailbox = params[:name].upcase  # ex. INBOX, JUNK or any other mailbox that's created
	messageId = params[:messageid]

    accessToken = params[:token]
	email = params[:email]
	server = params[:server]
	port = params[:server_port]	
	
	CustomNet::IMAP.debug = false
	
	# NOTE: Ruby self is similar to static 
	# Add custom authenticator to IMAP first
	CustomNet::IMAP.add_authenticator 'XOAUTH2', CustomNet::IMAP::XOAuth2Authenticator

	# PROBLEM_SSL_CONNECT_ERROR
	# SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed
	#
	# SOLUTION_SSL_CONNECT_ERROR (review the imap.rb file helps too)
	# 1) gem install openssl-extensions
	# 2) require 'openssl' and 'openssl-extensions'
	# 3) hash the :ssl parameter with :verify_mode => OpenSSL::VERIFY_NONE
	# 4) :verify => false
	imap = CustomNet::IMAP.new(server, {:port => port, :ssl => {:verify_mode => OpenSSL::SSL::VERIFY_NONE}}, :verify => false)
		  
	# Uses custom Authenticator 
	imap.authenticate('XOAUTH2', email, accessToken)
	
	imap.examine(mailbox)
	
	# Retrieve the following message information
	#   ENVELOPE structure (to, from, cc, bcc,etc...)
	#	BODY.PEEK but never marks it as seen (UTF8 decode)
	#		[] empty is the entire message
	#       TEXT body only
	envelope = imap.fetch(messageId.to_i, ['ENVELOPE', 'BODY.PEEK[]'] )
	
	imap.disconnect
	
	render json: '{\'error\': \'NO_DATA\'}'.to_json, layout: false if envelope.nil? 
	render json: envelope.to_json, layout: false if not envelope.nil?
  end # message
  
  # The Windows Live API callback 
  def windowslive_callback
	logger.debug('Windows Live initiated an OAuth2 authorization request/response')
	
	#IMPORTANT (http://msdn.microsoft.com/en-us/library/dn631818.aspx#signinflow)
	#
	# Because the sign-in control flow requires no server-side processing, 
	# apps can access user info only after the page has loaded.
	#
	# Therefore the code below isn't required
	#
	#if not params[:code].nil?
	#	# Request authorization now...
	#	# Will redirect back to this method
	#	RestClient.post 'https://login.live.com/oauth20_token.srf', 
	#		'client_id=0000000048117D67' +
	#		'&redirect_uri=http%3A%2F%2Fksacctmgr.com%2Fwindowslive%2Fcallback' +
	#		'&client_secret=BWDsH6czEa68fQWXbcmdeOITbt0UslpE' +
	#		'&code=' + params[:code] +
	#		'&grant_type=authorization_code',
	#		:content_type => 'application/x-www-form-urlencoded'	
    #
	#	logger.debug ("#Requested for authorization made")
	#end
	
	render file: 'home/callback', layout: 'callback'
  end # windowslive_callback

  # Google API callback 
  def googleapi_callback	
	logger.debug('Google API callback initiated an OAuth2 authorization request/response')	
	
	render file: 'home/callback', layout: 'callback'
  end # googleapi_callback
 end # HomeController
