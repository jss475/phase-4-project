class UsersController < ApplicationController
    
    def index
        render json: User.all, status: :ok
    end

    def show
        user = User.find(params[:id])
        render json: user, status: :ok
    end

    def create
      User.create!(user_params)
    end

    private

    def user_params
      params.permit(:name, :username, :password)
    end
    
end
