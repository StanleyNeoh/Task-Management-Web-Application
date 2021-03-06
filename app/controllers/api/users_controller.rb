require 'bcrypt'

module Api
    class UsersController < ApplicationController
        include BCrypt

        def show
            user = User.find_by(id: params[:id])
            if user == nil
                render json: {error: "User not found", status: 404}
            else
                jsonUser = user.as_json(options)
                jsonUser[:tasks] = user.tasks.where(
                    "public=true OR (public=false AND user_id='#{session[:user_id] || -1}')"
                ).where(
                    "LOWER(name) LIKE LOWER('%#{params[:task_search]}%')"
                ).order(params[:task_order]).as_json(tasks_options);
                jsonUser[:tags] = user.tags.where(
                    "LOWER(name) LIKE LOWER('%#{params[:tag_search]}%')"
                ).order(params[:tag_order]).as_json(tags_options);
                jsonUser[:session_id] = session[:user_id]
                render json: jsonUser
            end 
        end

        def create
            user = User.new(
                username: params["username"],
                password: params["password"],
                password_confirmation: params["password_confirmation"]
            )
            if user.save
                session[:user_id] = user.id
                render json: {logged_in: true, status: :created, user: user }
            else
                render json: {logged_in: false, error: user.errors.messages, status: 500 }
            end
        end

        def update
            user = User.find_by(id: params[:id])
            if user == nil
                render json: {error: "User not found", status: 404}
            elsif session[:user_id] == user.id
                if user.update(user_params)
                    render json: {logged_in: true, status: :updated, user: user}
                else
                    render json: {error: user.errors.messages, status: 422}
                end
            else
                render json: {error: "Unauthorised action", status: 401}
            end
        end

        def destroy
            user = User.find_by(id: params[:id])
            if user == nil
                render json: {error: "User not found", status: 404}
            elsif session[:user_id] == user.id
                if user.destroy
                    session[:user_id] = nil
                    render json: {logged_in: false, status: :destroyed }
                else
                    render json: {error: user.errors.messages, status: 422}
                end
            else
                render json: {error: "Unauthorised action", status: 401}
            end
        end

        private
        def tasks_options
            @taskOptions ||= { include: [:tags, :user], methods: [:timeLeft] }
        end

        def tags_options
            @tagOptions ||= { include: :user }
        end
        
        def user_params
            filtered = params.require(:user).permit(:username, :password, :password_confirmation)
            return filtered
        end
        def options
            @options ||= {only: [:username]}
        end
    end
end