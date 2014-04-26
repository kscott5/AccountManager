require 'base64'

module CustomNet
	class IMAP < NET::IMAP
		# Authenticator for the "XOAUTH2" authentication type.  See
		# #authenticate().
		class XOAuth2Authenticator
		  def process(data)			
			enc = Base64.encode64("user=#{@user}\u0001Auth=Bearer #{@password}\u0001\u0001")
			return enc
		  end

		  private

		  def initialize(user, password)
			@user = user
			@password = password
		  end
		end # XOAuth2Authenticator
		add_authenticator "XOAUTH2", XOAuth2Authenticator
	end # IMAP
end # Custom