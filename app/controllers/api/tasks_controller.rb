module Api
    class TasksController < ApplicationController
        def index
            tasks = Task.where(
                "public=true OR (public=false AND user_id='#{session[:user_id] || -1}')"
            ).where(
                "name LIKE '%#{params[:search]}%'"
            ).order(params[:order])
            render json: tasks.as_json(options)
        end

        def show
            task = Task.find_by(id: params[:id])
            if task == nil
                render json: {error: "Task not found", status: 404}
            elsif task.public || task.user_id == session[:user_id]
                jsonTask = task.as_json(options);
                jsonTask[:session_id] = session[:user_id];
                render json: jsonTask
            else
                render json: {error: "Unauthorised action", status: 401}
            end
        end

        def create
            if session[:user_id] == nil
                render json: {error: "You must login to create a task", status: 401}
            else
                newTask = Task.new(task_params)
                if newTask.save
                    render json: newTask.as_json(options)
                else
                    render json: { error: newTask.errors.messages, status: 422}
                end
            end
        end

        def update
            if session[:user_id] == nil
                render json: {error: "You must login to edit a task.", status: 401}
            else
                task = Task.find_by(id: params[:id])
                if task == nil
                    render json: {error: "Task not found", status: 404}
                elsif task.user_id != session[:user_id]
                    render json: { error: "Unauthorised action", status: 401}
                elsif task.update(task_params)
                    render json:  task.as_json(options)
                else
                    render json: { error: task.errors.messages, status: 422 }
                end
            end
        end

        def destroy
            if session[:user_id] == nil
                render json: {error: "You must login to delete a task.", status: 401}
            else
                task = Task.find_by(id: params[:id])
                if task == nil
                    render json: {error: "Task not found", status: 404}
                elsif task.user_id != session[:user_id]
                    render json: { error: "Unauthorised action", status: 401}
                elsif task.destroy
                    head :no_content
                else
                    render json: { errors: task.errors.messages, status: 422}
                end
            end
        end

        private
        def task_params
            filtered = params.require(:task).permit(:name, :description, :importance, :deadline, :public, :completed)
            filtered[:user_id] = session[:user_id]
            return filtered
        end

        def options
            @options ||= { include: [:tags, :user], methods: [:timeLeft] }  
            # This is what gets the tags data sent
            # Tells serializer to get all included data out as a compound document
        end
    end
end