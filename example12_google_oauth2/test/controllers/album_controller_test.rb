require 'test_helper'

class AlbumControllerTest < ActionController::TestCase
  test "should get label_name" do
    get :label_name
    assert_response :success
  end

  test "should get artist_name" do
    get :artist_name
    assert_response :success
  end

end
