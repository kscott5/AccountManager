require 'rest-client'
class GoogleapiController < ApplicationController
	layout 'googleapi'
	# We should refactor this can into resuable module
	def callback		
		# https://developers.google.com/accounts/docs/OAuth2WebServer
		if not params[:code].nil?
			# Request authorization now...
			# Will redirect back to this method
			resp = RestClient.post 'https://accounts.google.com/o/oauth2/token', 
				 'code=' + params[:code] +
				'&client_id=1082334669557-rlki04e4u64eg249mvirs8vsgl4ug99h.apps.googleusercontent.com' +
				'&client_secret=nwfJHHy6W1giM_NQhA-grLRv' +
				'&redirect_uri=http%3A%2F%2Fksacctmgr.com%2Fgoogleapi%2Fcallback' +
				'&grant_type=authorization_code',
				:content_type => 'application/x-www-form-urlencoded'
						
			logger.debug ("#Requested for authorization made Response => " + resp)
			render nothing: true
		end # access code check
		
		#Response from authorization request succeed
		if not params[:access_token].nil?
				logger.debug ("#Response from authorization request succeed")
		
			# Get current gapi_auth cookie values
			gapi_CookieValues = cookies['gapi_auth']

			# Append the authorization response to the gapi_ cookie values
			gapi_CookieValues << "&access_token=#{access_token}" % params
			gapi_CookieValues << "&id_token=#{id_token}" % params
			gapi_CookieValues << "&token_type=#{token_type}" % params
			gapi_CookieValues << "&expires_in=#{expires_in}" % params
			
			cookies['gapi_auth'] = gapi_CookieValues
		end # access token check
	
		#Response from authorization request failed
		if not params[:error].nil?
			logger.debug ("#Response from authorization request failed  ERROR =>#{error}" % params)
			
			# Get current gapi_auth cookie values
			gapi_CookieValues = cookies['gapi_auth']
			gapi_CookieValues << "&error=#{error}" % params
			
			cookies['gapi_auth'] = gapi_CookieValues
		end # error
		
		if not params[:error_description].nil?
			logger.debug ("#Response from authorization request failed  ERROR_DESC =>#{error_description}" % params)
			
			# Get current gapi_auth cookie values
			gapi_CookieValues = cookies['gapi_auth']
			gapi_CookieValues << "&error_description=#{error_description}" % params
			
			cookies['gapi_auth'] = gapi_CookieValues
		end # error check		
	end # callback
end
