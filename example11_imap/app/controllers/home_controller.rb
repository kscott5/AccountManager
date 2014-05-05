class HomeController < ApplicationController
  layout "home" #Overrides layout inherited from base controller
  
  # Single Page Application (SPA)
  def index
  end # index
  
  # Viewer is just that. No header or footers available
  def viewer
	render
  end # viewer
  
 end # HomeController
