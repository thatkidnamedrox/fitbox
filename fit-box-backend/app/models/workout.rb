class Workout < ApplicationRecord
    belongs_to :user
    has_many :bundles
    has_many :exercises, through: :bundles
    has_many :muscle_groups, through: :exercises
    accepts_nested_attributes_for :bundles

    def full_hash
        attributes = self.attributes
        attributes["bundles"] = []
        self.bundles.each do |bundle|
            bundle_attributes = bundle.attributes
            bundle_attributes["exercises"] = []
            bundle.exercises.each do |exercise|
                exercise_attributes = exercise.attributes
                exercise_attributes["muscle_groups"] = [];
                exercise.muscle_groups.each do |muscle_group|
                    exercise_attributes["muscle_groups"].push(muscle_group.attributes);
                end
                exercise_attributes["sets"] = []
                exercise.exercise_sets.each do |exercise_set|
                    exercise_attributes["sets"].push(exercise_set.attributes);
                end
                bundle_attributes["exercises"].push(exercise_attributes);
            end
            attributes["bundles"].push(bundle_attributes)
        end

        attributes
    end
end

