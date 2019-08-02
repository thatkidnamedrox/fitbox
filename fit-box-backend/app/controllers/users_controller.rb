class UsersController < ApplicationController

    def index
        users = User.all
        render json: users.map { |user| user.full_hash }
    end
    def new
    end

    def create
        user = User.new(user_params)

        if user.valid?
            user.save
            session[:user_id] = user.id
            render json: user
        else
            render json: { :errors => user.errors.full_messages }, status: 422
        end
    end

    def login
        user = User.find_by(username: params[:username])
        if user
            session[:user_id] = user.id
            render json: user.full_hash
        else
            # flash[:error] = user.errors.full_messages
            render json: { error: "YOU CAN'T LOG IN" }, status: 401
        end
    end

    def show
        user = User.find(params[:id])
        render json: user.full_hash
    end

    def update
        user = User.find(params[:id])
        user.update(
            username: params[:username],
            bio: params[:bio],
            profile_img_url: params[:profile_img_url]
        )
        render json: user.full_hash
    end

    def destroy
        user = User.find(params[:id])
        session.delete :user_id
        user.destroy
        render json: user
    end

    def following
        follow_params = {
            user_id: params[:user_id],
            following_id: params[:following_id]
        }
        follow = Follow.find_by(follow_params);
        render json: follow
    end

    def follow
        follow_params = {
            user_id: params[:user_id],
            following_id: params[:following_id]
        }
        
        follow = Follow.create(follow_params);
        render json: follow
    end

    def unfollow
        follow_params = {
            user_id: params[:user_id],
            following_id: params[:following_id]
        }
        follow = Follow.find_by(follow_params);
        follow.destroy
        render json: follow
    end

    def workouts
        workouts = Workout.where(user_id: params[:id]);
        workoutsHashed = workouts.map do |workout|
            workout.full_hash
        end
        render json: workoutsHashed
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password, :bio, :profile_img_url)
    end

end
