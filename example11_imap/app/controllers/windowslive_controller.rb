require 'rest-client'
require 'json'

require 'customnet/imap'

# PROBLEM_SSL_CONNECT_ERROR
require 'openssl'
require 'openssl-extensions'

require 'net/imap'
require 'customnet/imap' #convention over configuration 

# NOTE: I install the lastest version of rails 4.1.0 but 
#       after reviewing the release notes for 4.1.0 and looking
#       what I'm trying to accomplished it does make since.
#       It wouldn't help fix the OpenSSL issue so no need.
#
#       GEMFile and GEMFile.lock are currently set to 4.0.4.
#
class WindowsliveController < ApplicationController 
  layout 'windowslive'
	
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
  def callback
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
  end # callback
  
  # Refresh the authentication token using Windows Live API
  def refresh
	render json: 'not implemented', layout: false
  end #refresh
  
  # Windows Live API (IMAP - inbox)
  #
  # http://ruby-doc.org/stdlib-1.9.3/libdoc/net/imap/rdoc/Net/IMAP.html
  #
  # I know error handling is important. There's alot to put together 
  # for new Ruby on Rails users
  def mailbox
	accessToken = getAccessToken	
	profile = getMe(accessToken)
	return render json: 'Access Denied'.to_json, layout: false if accessToken.nil? or profile.nil?
	
	email = profile['emails']['preferred']

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
	imap = CustomNet::IMAP.new('imap-mail.outlook.com', {:port => 993, :ssl => {:verify_mode => OpenSSL::SSL::VERIFY_NONE}}, :verify => false)
		  
	# Uses custom Authenticator 
	imap.authenticate('XOAUTH2', email, accessToken)
	
	# Prep read-only view 
	imap.examine('INBOX')  # TODO: use params[:mailboxName]
	
	envelopes = []; # initialize array
	
	#command = if params[:searchCommand].nil? 'UNSEEN' else params[:searchCommand].to_a
	
	# Retrieve unread message
	imap.search(['UNSEEN']).each do |message_id| # TODO: use params[:searchCommand]
	
		# Get information (to,from,subject,message_id,etc...) 
		# http://tools.ietf.org/html/rfc3501#page-49
		envelope = imap.fetch(message_id, "ENVELOPE")[0]
	
		envelopes.push(envelope)
	end #seach
	
	render json: 'NO_DATA'.to_json, layout: false if envelopes.length == 0
	render json: envelopes.to_json, layout: false if envelopes.length > 0
  end #mailbox
  
  def message
	messageId = params[:messageId]
	accessToken = getAccessToken	
	profile = getMe(accessToken)
	return render json: 'Access Denied'.to_json, layout: false if messageId.nil? or accessToken.nil? or profile.nil?
	
	email = profile['emails']['preferred']

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
	imap = CustomNet::IMAP.new('imap-mail.outlook.com', {:port => 993, :ssl => {:verify_mode => OpenSSL::SSL::VERIFY_NONE}}, :verify => false)
		  
	# Uses custom Authenticator 
	imap.authenticate('XOAUTH2', email, accessToken)
		
	# Retrieve the full message
	envelope = imap.fetch(messageId, "FULL")
	
	render json: 'NO_DATA'.to_json, layout: false if envelopes.nil?
	render json: envelope.to_json, layout: false if not envelopes.nil?
  end # message

  #private
  def getAccessToken
	return nil if cookies['wl_auth'].nil?

	# Get current wl_auth cookie values
	wl_authCookieValues = cookies['wl_auth']
	
	wl_authHash = Rack::Utils.parse_query(wl_authCookieValues)
		
	#render json: wl_authHash['access_token']
	wl_authHash['access_token'] #return
  end #getAuthToken

  def getMe(accessToken)
    return nil if accessToken.nil?
	resp = RestClient.get 'https://apis.live.net/v5.0/me', { :params => {:access_token => accessToken}}
	
	# allows  respHash['emails']['preferred'] access
	respHash = JSON.parse(resp)
	
	respHash  # return
	#render json: resp
  end #getMe
	
end #WindowsLiveController