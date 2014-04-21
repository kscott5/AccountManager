require 'json'
require 'rest-client'
require 'oauth2'

class HomeController < ApplicationController
  layout "home" #Overrides layout inheritted from base controller
  
  # Single Page Application (SPA)
  def index
  end
  
  # Displays the readme page
  def readme
	render layout: "home.readme" #Overrides layout of this controller
  end
  
  def wlcbk
	#User has grant our app access
    access_token = params[:access_token]
	
	render json: access_token.to_json
  end
  
  def terms
	render layout: "home.readme" #Overrides layout of this controller
  end
  
  def privacy
	render layout: "home.readme" #Overrides layout of this controller
  end
end
