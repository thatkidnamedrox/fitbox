class WorkoutsController < ApplicationController
    before_action :authorized
    skip_before_action :authorized, only: [:new, :create] # or whatever onlys you need
    
    def index
        if logged_in?
            workouts = current_user.all
            workoutsHashed = workouts.map do |workout|
                workout.full_hash
            end
            render json: workoutsHashed
        else
            workouts = Workout.all
            workoutsHashed = workouts.map do |workout|
                workout.full_hash
            end
            render json: workoutsHashed
        end

    end

    def new

    end

    def create
        workout = Workout.create(workout_params);
        workout.bundles.each do |bundle|
            bundle.exercises.each do |exercise|
                puts exercise
                exercise.exercise_sets.each do |es|
                    es.update(bundle: bundle, exercise: exercise);
                end
            end
        end

        
        render json: workout.full_hash
    end

    def show
    end

    def destroy
        workout = Workout.find(params[:id]);
        puts workout
        workout.destroy
        render json: workout
    end

    

    private
    def workout_params
        params.require(:workout).permit(
            :name,
            :user_id,
            :description,
            :video_link,
            :bundles_attributes => [
                :name,
                :exercises_attributes => [
                    :name,
                    :muscle_groups_attributes => [
                        :name
                    ],
                    :exercise_sets_attributes => [
                        :sets,
                        :reps, 
                        :rest, 
                        :time,
                        :execution,
                        :distance,
                        :tempo  
                    ]
                ]
            ])
            
    end
end
