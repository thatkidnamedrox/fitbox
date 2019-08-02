class Exercise < ApplicationRecord
    has_many :exercise_sets
    has_many :exercise_muscles
    has_many :muscle_groups, through: :exercise_muscles
    # has_many :bundles, through: :bundle_exercises
    accepts_nested_attributes_for :exercise_sets
    accepts_nested_attributes_for :muscle_groups
    

    
end
