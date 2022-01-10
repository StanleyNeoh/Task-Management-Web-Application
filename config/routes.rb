Rails.application.routes.draw do

  root "pages#index"

  namespace :api do
    resources :tasks
    resources :tags do
      resources :manifest, only: [:create, :destroy]
    end
    resources :users, only: [:show, :create, :update, :destroy]
    resources :sessions, only: [:index, :create, :destroy]
  end

  get "*path", to: "pages#index", via: :all 
  # means all request type
end
