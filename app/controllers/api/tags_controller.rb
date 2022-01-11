module Api
    class TagsController < ApplicationController
        def index
            tags = Tag.all.where("name LIKE '%#{params[:search]}%'").order(params[:order])
            render json: tags.as_json(options)   # This works as well
        end
        
        def show
            tag = Tag.find_by(id: params[:id])
            if tag == nil
                render json: {error:"Tag not found", status: 404}
            else
                jsonTag = tag.as_json(options)
                jsonTag[:tasks] = tag.tasks.where(
                        "public=true OR (public=false AND user_id='#{session[:user_id] || -1}')"
                    ).where(
                        "name LIKE '%#{params[:task_search]}%'"
                    ).order(
                        params[:task_order]
                    ).as_json(tasks_options)     #Use the task serializer option as_json to get associated tags to all tasks
                
                jsonTag[:session_id] = session[:user_id]
                render json: jsonTag
            end
        end

        def create
            if session[:user_id] == nil
                render json: {error: "You must login to create a tag", status: 401}
            else
                newTag = Tag.new(tag_params)
                if newTag.save
                    render json: newTag.to_json(options)
                else
                    render json: { error: newTag.errors.messages, status: 422}
                end
            end
        end

        def update
            if session[:user_id] == nil
                render json: {error: "You must login to edit a tag", status: 401}
            else
                tag = Tag.find_by(id: params[:id])
                if tag == nil
                    render json: { error: "Tag not found", status: 404}
                elsif tag.user_id != session[:user_id]
                    render json: { error: "Unauthorised action", status: 401}
                elsif tag.update(tag_params)
                    render json: tag.to_json(options)
                else
                    render json: { error: tag.errors.messages , status: 422}
                end
            end
        end

        def destroy
            if session[:user_id] == nil
                render json: {error: "You must login to delete a tag", status: 401}
            else
                tag = Tag.find_by(id: params[:id])
                if tag.user_id != session[:user_id]
                    render json: { error: "Unauthorised action", status: 401}
                elsif tag.destroy
                    head :no_content
                else
                    render json: { errors: tag.errors.messages , status: 422}
                end
            end
        end
        
        private
        def tasks_options
            @taskOptions ||= { include: [:tags, :user], methods: [:timeLeft] }
        end

        def tag_params
            filtered = params.require(:tag).permit(:name, :description, :colour)
            filtered[:user_id] = session[:user_id]
            return filtered
        end

        def options
            @options ||= { include: :user }
            # options are not a special feature of JSONAPI:Serializer 
            #   => comes from .as_json(options) method
        end
    end
end