class MuscleGroup < ApplicationRecord
    has_many :exercise_muscles
    has_many :exercises, through: :exercise_muscles
    has_many :muscles
end
