class Bundle < ApplicationRecord
    belongs_to :workout
    has_many :exercise_sets
    has_many :exercises, through: :exercise_sets
    accepts_nested_attributes_for :exercise_sets
    accepts_nested_attributes_for :exercises

    # def self.names
    #     bundles = [
    #         "Circuit Training",
    #         "Pyramid",
    #         "HIIT - High Intensity Interval Training",
    #         "AMRAP - As Many Reps As Possible",
    #         "Tabata",
    #         "Supersets",
    #         "EMOM - Every Minute On the Minute",
    #         "Add-On",
    #         "Challenge",
    #         "5x5 Strength Training"
    #     ]
    # end
    
end