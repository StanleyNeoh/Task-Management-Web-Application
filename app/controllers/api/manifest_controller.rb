module Api
    class ManifestController < ApplicationController
        def create
            manifest = Manifest.new(manifest_params)
            if manifest.user_id != session[:user_id]
                render json: {error: "Unauthorised action", status: 401}
            elsif manifest.save
                render json: manifest.to_json
            else
                render json: {error: manifest.errors.messages, status: 422}
            end
        end

        def destroy
            manifest = Manifest.find_by(tag_id: params[:tag_id], task_id: params[:id])
            if manifest == nil
                render json: {error: "Manifest not found", status: 404}
            elsif manifest.user_id != session[:user_id]
                render json: {error: "Unauthorised action", status: 401}
            elsif manifest.destroy
                head :no_content
            else
                render json: {error: manifest.errors.messages, status: 422}
            end
        end

        private
        def manifest_params
            filtered = params.require(:manifest).permit(:task_id)
            filtered[:tag_id] = params[:tag_id]
            return filtered
        end
    end
end