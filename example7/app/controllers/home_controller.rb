require 'rest-client'

class HomeController < ApplicationController
  layout "home" #Overrides layout inherited from base controller
  
  # Single Page Application (SPA)
  def index
  end # index
  
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

  def wlcbk2
    # Step 2 use code to get access token and authentication token
    authorization_code = params[:code]

	if not authorization_code.nil?
		# Request authorization now...
		resp = RestClient.post 'https://login.live.com/oauth20_token.srf', 
			'client_id=0000000048117D67' +
			'&redirect_uri=http%3A%2F%2Fksacctmgr.com%2Fhome%2Fwlcbk' +
			'&client_secret=BWDsH6czEa68fQWXbcmdeOITbt0UslpE' +
			'&code=' + authorization_code +
			'&grant_type=authorization_code',
			:content_type => 'application/x-www-form-urlencoded'
	
		# Convert resp to query string
		respQuery = JSON.parse(resp).to_query()

		# Get current wl_auth cookie values
		wl_authCookieValues = cookies['wl_auth']

		# Append the authorization response to the wl_auth cookie values
		if not wl_authCookieValues.nil? and 
		   not wl_authCookieValues.length == 0
		   wl_authCookieValues << "&" << respQuery
		else
			wl_authCookieValues = respQuery
		end
		
		#cookies.delete('wl_auth')
		
		# Update the wl_auth cookie
		#cookies['wl_auth'] = {
		#	value: wl_authCookieValues,
		#	expires: 1.hour.from_now,
		#	domain: 'ksacctmgr.com' # NOTE: REMOVE HARD CODED VALUE 
		#}
		
	end
  end # wlcbk2
      
  def wlcbk3
	# Get current wl_auth cookie values
	wl_authCookieValues = cookies['wl_auth']

	# Append the authorization response to the wl_auth cookie values
	if not wl_authCookieValues.nil? and 
	   not wl_authCookieValues.length == 0
	   wl_authCookieValues << "&" << respQuery
	else
		wl_authCookieValues = respQuery
	end
	
	cookies.delete('wl_auth')
	
	# Update the wl_auth cookie
	cookies['wl_auth'] = {
		value: wl_authCookieValues,
		expires: 1.hour.from_now,
		domain: 'ksacctmgr.com' # NOTE: REMOVE HARD CODED VALUE 
	}
  end # wlcbk
  
 end # HomeController
