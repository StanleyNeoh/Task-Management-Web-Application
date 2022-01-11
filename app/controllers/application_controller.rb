class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    # Skipped as we are handling verification else where
end
