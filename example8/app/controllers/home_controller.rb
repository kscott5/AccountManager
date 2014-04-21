require 'rest-client'

class HomeController < ApplicationController
  layout "home" #Overrides layout inherited from base controller
  
  # Single Page Application (SPA)
  def index
  end # index
  
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
  def wlcbk
    # Step 2 use code to get access token and authentication token
	if not params[:code].nil?		
		# Request authorization now...
		# Will this request call the redirect_uri??
		RestClient.post 'https://login.live.com/oauth20_token.srf', 
			'client_id=0000000048117D67' +
			'&redirect_uri=http%3A%2F%2Fksacctmgr.com%2Fhome%2Fwlcbk' +
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
	
	render layout: "home.wlcbk"
  end # wlcbk
  
 end # HomeController
