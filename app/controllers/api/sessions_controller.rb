module Api
    class SessionsController < ApplicationController
        def index
            user = session[:user_id] && User.find_by(id: session[:user_id])
            if user
                render json: {logged_in: true, user: user}
            else
                render json: {logged_in: false, user: nil}
            end
        end

        def create
            user = User
                    .find_by(username: login_params[:username])
                    .try(:authenticate, login_params[:password])     
            # .try(...) is built in authenticate by rails
            #   => returns user object if authenticated
            #   => return false if failed   => play around in console

            if user
                session[:user_id] = user.id #give them a cookie
                render json: {status: :created, logged_in: true, user: user}
            else
                render json: {status: 401}
            end
        end

        def destroy
            session[:user_id] = nil
            render json: {status: :destroyed, logged_in: false}
        end

        private
        def login_params
            params.require(:session).permit(:username, :password)
        end
    end
end