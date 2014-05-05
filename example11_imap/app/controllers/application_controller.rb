class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :ensure_authorized

  def ensure_authorized
	# Good place to prevent overall access
	if request.env['REMOTE_HOST'] != '127.0.0.1' || request.env['SERVER_NAME'] != 'ksacctmgr.com'
		log.debug('Unauthorized access by remote host: ' << request.env['REMOTE_HOST'])
	end
  end 
end
