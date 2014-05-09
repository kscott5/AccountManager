require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test should_get_index do
    get :index
    assert_response :success
  end

  test should_get_viewer do
	get :viewer
	assert_response :success
  end
  
  test should_get_windowslive_callback do
	get 'windowslive/callback'
	assert_response :success
  end
  
  test should_get_googleapi_callback do
	get 'googleapi/callback'
	assert_response :success
  end
  
  test should_get_messages_for_windowslive do
    # This should failed with access token from API
	# more of integration test then
    params = { 'server' => 'imap.outlook.com', 
			   'port' => 587, 
			   'email' => 'test@test.com', 
			   'token' => 'SF43ervadf34ge/sef45'
			   'authenticity_token' => 'HOW DO I GET THIS'
			 }
	post 'windowslive/mailbox/inbox/unseen', params
	assert_response :success
  end
  
  test "should get message" do
	#post 
	#assert_response :success
  end
  
end
