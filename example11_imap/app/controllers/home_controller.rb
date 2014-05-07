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

  # OAuth2 library callback
  def callback
	library = params[:library].capitalize
	
	case library.capitalize
		when 'GOOGLEAPI' then render :callbackGoogleApi, layout: 'googleapi'
		else render :callbackWindowsLive, layout: 'windowslive'
	end
  end # callback
  
  # Refresh the authentication token using Windows Live API
  def refresh
	library = params[:library].capitalize	

	render json: 'not implemented', layout: false
  end #refresh

  # The Windows Live API regarding the callback .html does go into
  # great details regarding what you should do with this page.
  # However, through review the actual wl.debug.js library file
  # and trial and error, I discovered the following:
  #
  # 1) The callback.html file SHOULD only contain exactly what they 
  #	   specified. Their library detects if the page was load due
  #    to their authentication server calling it.
  #
  # 2) The callback.html server side code needs to handle the
  #    POST response from the oauth20_token.srf call. There is 
  #    little documentation that I saw regarding this but you
  #    need to store the response within the wl_auth cookie.
  #    This is IMPORTANT because the wl.debug.js library
  #    that's in the callback.html NEEDS to interact with
  #    this cookie to complete the authentication and authorization
  #    process (OAuth 2.0 flow).
  #
  # 3) Finally, pay attention to the Oauth2.0 flow you plan to use
  #    There are two, implicit and server-side. I'm using the server-
  #    side flow which requires the correct POST url and response_type
  #
  # Fiddler is a great tool to compose a GET or POST response
  # to interact with the Windows Live (WL) API
  #
  # NOTE: There is a Ruby gem that handles oauth2 flow but I'm still green
  #       and didn't want to introduce to much. To add it do the following
  #
  #		1) Run gem install oauth2 
  #     2) Update the GEMFILEs
  #     3) Add  the require 'oauth2' to the controller
  #
  def callbackWindowsLive
    # Step 2 use code to get access token and authentication token
	if not params[:code].nil?		
		# Request authorization now...
		# Will redirect back to this method
		RestClient.post 'https://login.live.com/oauth20_token.srf', 
			'client_id=0000000048117D67' +
			'&redirect_uri=http%3A%2F%2Fksacctmgr.com%2Fwindowslive%2Fcallback' +
			'&client_secret=BWDsH6czEa68fQWXbcmdeOITbt0UslpE' +
			'&code=' + params[:code] +
			'&grant_type=authorization_code',
			:content_type => 'application/x-www-form-urlencoded'	

		logger.debug ("#Requested for authorization made")			
	end 
	
	#Response from authorization request succeed
	if not params[:access_token].nil?
		logger.debug ("#Response from authorization request succeed")
		
		# Get current wl_auth cookie values
		wl_authCookieValues = cookies['wl_auth']

		# Append the authorization response to the wl_auth cookie values
		wl_authCookieValues << "&access_token=#{access_token}" % params
		wl_authCookieValues << "&authentication_token=#{authentication_token}" % params
		wl_authCookieValues << "&token_type=#{token_type}" % params
		wl_authCookieValues << "&expires_in=#{expires_in}" % params
		wl_authCookieValues << "&scope=#{scope}" % params
		
		cookies['wl_auth'] = wl_authCookieValues
	end
	
	#Response from authorization request failed
	if not params[:error].nil?
		logger.debug ("#Response from authorization request failed")
		
		# Get current wl_auth cookie values
		wl_authCookieValues = cookies['wl_auth']

		wl_authCookieValues << "&error=#{error}" % params
		wl_authCookieValues << "&error_descriptiobn=#{error_description}" % params
		
		cookies['wl_auth'] = wl_authCookieValues
	end	
  end # callbackWindowsLive

  # Google API OAuth2 flow
  def callbackGoogleApi	
  end # callbackGoogleApi
 
  # Action for IMAP access. 
  # Review routes.rb file
  def mailbox
	library = params[:library].capitalize # WINDOWSLIVE, GOOGLEAPI
	boxname = params[:name].capitalize  # ex. INBOX, JUNK or any other mailbox that's created
	command = params[:command].capitalize # UNSEEN, SEEN, RECENT or any other command
	
	profile = getLibraryProfile(library)
	return render json: 'Access Denied'.to_json, layout: false if profile.nil?

	accessToken = profile['access_token']
	email = profile['email']
	server = profile['imap_server']
	port = profile['imap_server_port']
	
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
	
	# Prep read-only view 
	imap.examine(boxname)
	
	envelopes = []; # initialize array
		
	# Retrieve unread message
	imap.search(command).each do |message_id,uid| # TODO: use params[:searchCommand]
	
		# Get information (to,from,subject,message_id,etc...) 
		# http://tools.ietf.org/html/rfc3501#page-49
		envelope = imap.fetch(message_id, "ENVELOPE")[0]
		
		envelopes.push(envelope)
	end #seach
	
	imap.disconnect
	
	render json: '{\'error\': \'NO_DATA\'}'.to_json, layout: false if envelopes.length == 0
	render json: envelopes.to_json, layout: false if envelopes.length > 0
  end #mailbox
  
  def message
  	library = params[:library].capitalize # WINDOWSLIVE, GOOGLEAPI
	mailbox = params[:name].capitalize  # ex. INBOX, JUNK or any other mailbox that's created
	messageId = params[:messageid]

	profile = getLibraryProfile(library)
	return render json: 'Access Denied'.to_json, layout: false if profile.nil?
	
	accessToken = profile['access_token']
	email = profile['email']
	server = profile['imap_server']
	port = profile['imap_server_port']	

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
  
  #private
  
  # Get the profile for the library
  def getLibraryProfile(library)
	profile = nil
	case library.capitalize
		when 'GOOGLEAPI' then profile = googleApiProfile
		else profile = windowsLiveProfile
	end
	
	profile 
  end # getLibraryProfile
  
  # Gets the user profile from Google API
  def googleApiProfile
	# TODO: GET IT NOW...
	
	profile = Hash.new
	
	profile['access_token'] = ''
	profile['email'] = ''
	profile['imap_server'] = ''
	profile['imap_server_port'] = 0

	profile
  end # googleApiProfile
  
  # Gets the user profile from Windows Live API
  def windowsLiveProfile
  	return nil if cookies['wl_auth'].nil?

	# Get current wl_auth cookie values
	wl_authCookieValues = cookies['wl_auth']
	
	wl_authHash = Rack::Utils.parse_query(wl_authCookieValues)
		
	accessToken = wl_authHash['access_token']

	resp = RestClient.get 'https://apis.live.net/v5.0/me', { :params => {:access_token => accessToken}}
	
	# allows  respHash['emails']['preferred'] access
	respHash = JSON.parse(resp)
	
	profile = Hash.new
	
	profile['access_token'] = accessToken
	profile['email'] = respHash['emails']['preferred']
	profile['imap_server'] = 'imap-mail.outlook.com'
	profile['imap_server_port'] = 993
	
	#render json: profile.to_json, layout: false
	profile
  end #windowsLiveProfile
 end # HomeController
