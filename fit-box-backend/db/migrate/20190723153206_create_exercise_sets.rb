class CreateExerciseSets < ActiveRecord::Migration[5.2]
  def change
    create_table :exercise_sets do |t|
      t.integer :sets
      t.integer :reps
      t.integer :rest
      t.time :time
      t.string :execution
      t.integer :distance
      t.string :tempo
      t.integer :bundle_exercise_id
      t.integer :exercise_id

      t.timestamps
    end
  end
end
