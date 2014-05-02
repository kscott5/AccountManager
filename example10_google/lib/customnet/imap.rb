require 'net/imap'

module CustomNet
	class IMAP < Net::IMAP		
		# Authenticator for the "XOAUTH2" authentication type.  See
		# #authenticate().
		class XOAuth2Authenticator
		  def process(data)
			# http://utf8-chartable.de/unicode-utf8-table.pl?utf8=dec
			# http://www.fileformat.info/tip/microsoft/enter_unicode.htm
			# NOTE: To get the Ctrl+A = U+0001 =  do the following
			#
			# 1) Hold the Alt key down (DON'T LET GO)
			# 2) Hold the Shift key down (DON'T LET GO)
			# 3) Press the U key
			# 4) Press 0 key (ON NUMBER PAD)
			# 4) Press 0 key (ON NUMBER PAD)
			# 4) Press 0 key (ON NUMBER PAD)
			# 4) Press 1 key (ON NUMBER PAD)
			return 'user='<<@email<<'auth=Bearer '<<@accessToken<<''	
		  end

		  private

		  def initialize(email, accessToken)
			@email = email
			@accessToken = accessToken		
		  end
		end # XOAuth2Authenticator
	end # IMAP
end # CustomNet