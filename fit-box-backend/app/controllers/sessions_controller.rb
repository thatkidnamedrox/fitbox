class SessionsController < ApplicationController
  
    def create

      user = User.find_by(username: params[:username])
      
      if user && user.authenticate(params[:password]) # Shortcircuiting
        
        session[:user_id] = user.id
        render json: user.full_hash
      else
        render json: { :errors => "user not found" }, status: 422
      end
    end
  
    def destroy
      session.delete :user_id
    end
  end