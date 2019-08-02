class ExerciseSet < ApplicationRecord
    belongs_to :exercise
    belongs_to :bundle
    accepts_nested_attributes_for :exercise
end
