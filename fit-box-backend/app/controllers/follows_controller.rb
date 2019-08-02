class FollowsController < ApplicationController

    # def show
    #     user = User.find(params[:id])
    #     render json: user.following.map {|u| u.workouts.map{|w| w.full_hash} }
    # end

    def new
    end

    def create
        follow = Follow.create(user_id: params[:user_id], following_id: params[:following_id])
        render json: follow
    end

end
