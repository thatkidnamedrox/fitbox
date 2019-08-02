class BundleExercise < ApplicationRecord
    belongs_to :bundle
    belongs_to :exercise
    has_many :exercise_sets
    has_many :exercises, through: :exercise_sets
    # accepts_nested_attributes_for :exercise
    accepts_nested_attributes_for :exercise_sets
    accepts_nested_attributes_for :exercises
    
end
